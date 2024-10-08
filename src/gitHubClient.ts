import { graphql } from '@octokit/graphql';

export interface CreatePullRequestOption {
  owner: string;
  repo: string;
  head: string;
  base: string;
  title?: string;
  body?: string;
}

const query = `
query repository($owner: String!, $repo: String!) {
  repository(owner: $owner, name: $repo) {
    id
  }
}
`;

const mutation = `mutation ($base: String!, $head: String!, $repoId: ID!, $title: String!, $body: String) {
  createPullRequest(
    input: {baseRefName: $base, headRefName: $head, repositoryId: $repoId, title: $title, body: $body}
  ) {
    pullRequest {
      id
      url
      number
    }
  }
}`;

interface QueryRepositroyResponse {
  repository: { id: string };
}

interface PullRequestResponse {
  id: string;
  url: string;
  number: number;
}

interface CreatePullRequestResponse {
  createPullRequest: {
    pullRequest: PullRequestResponse;
  };
}

class GitHubClient {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async createPullRequest({
    owner,
    repo,
    head,
    base,
    title,
    body,
  }: CreatePullRequestOption): Promise<{ data: PullRequestResponse }> {
    const { repository } = await graphql<QueryRepositroyResponse>(query, {
      owner,
      repo,
      headers: {
        authorization: `token ${this.token}`,
      },
      request: {
        fetch,
      },
    });

    const result = await graphql<CreatePullRequestResponse>(mutation, {
      base,
      head,
      repoId: repository.id,
      title,
      body,
      headers: {
        authorization: `token ${this.token}`,
      },
      request: {
        fetch,
      },
    });
    return {
      data: result.createPullRequest.pullRequest,
    };
  }
}

export default GitHubClient;
