import { gql, GraphQLClient } from 'graphql-request';

export interface CreatePullRequestOption {
  owner: string;
  repo: string;
  head: string;
  base: string;
  title?: string;
  body?: string;
}

const query = gql`
query repository($owner: String!, $repo: String!) {
  repository(owner: $owner, name: $repo) {
    id
  }
}
`;

const mutation = gql`mutation ($base: String!, $head: String!, $repoId: ID!, $title: String!, $body: String) {
  createPullRequest(
    input: {baseRefName: $base, headRefName: $head, repositoryId: $repoId, title: $title, body: $body}
  ) {
    pullRequest {
      id
      url
    }
  }
}`;

interface QueryRepositroyResponse {
  repository: { id: string };
}

interface PullRequestResponse {
  id: string;
  url: string;
}

interface CreatePullRequestResponse {
  createPullRequest: {
    pullRequest: PullRequestResponse;
  };
}

class GitHubClient {
  client: GraphQLClient;
  constructor(token: string) {
    this.client = new GraphQLClient('https://api.github.com/graphql', {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
  }

  async createPullRequest({
    owner,
    repo,
    head,
    base,
    title,
    body,
  }: CreatePullRequestOption): Promise<PullRequestResponse> {
    const { repository } = await this.client.request<QueryRepositroyResponse>(
      query,
      {
        owner,
        repo,
      },
    );

    const result = await this.client.request<CreatePullRequestResponse>(
      mutation,
      {
        base,
        head,
        repoId: repository.id,
        title,
        body,
      },
    );
    return result.createPullRequest.pullRequest;
  }
}

export default GitHubClient;
