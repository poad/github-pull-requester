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
  }: CreatePullRequestOption): Promise<{ repository: { id: string } }> {
    const { repository } = await this.client.request<{
      repository: { id: string };
    }>(query, {
      owner,
      repo,
    });

    return await this.client.request(mutation, {
      base,
      head,
      repoId: repository.id,
      title,
      body,
    });
  }
}

export default GitHubClient;
