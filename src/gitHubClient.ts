import { graphql } from '@octokit/graphql';
import type { GraphQlQueryResponseData } from '@octokit/graphql';

export interface CreatePullRequestOption {
  owner: string;
  repo: string;
  head: string;
  base: string;
  title?: string;
  body?: string;
}

class GitHubClient {
  token: string;
  constructor(token: string) {
    this.token = token;
  }

  async createPullRequest({
    owner,
    repo,
    head,
    base,
    title,
  }: CreatePullRequestOption): Promise<GraphQlQueryResponseData> {
    const { repository } = await graphql<GraphQlQueryResponseData>({
      query: `query repository($owner: String!, $repo: String!) {
        repository(owner:$owner, name:$repo) {
          id
        }
      }`,
      owner,
      repo,
      headers: {
        authorization: this.token,
      },
    });

    return await graphql<GraphQlQueryResponseData>({
      mutation: `mutation ($base: String!, $head: String!, $repoId: String!, $title: String!) {
        createPullRequest(baseRefName: $owner, headRefName: $head, repositoryId: $repoId, title: $title) {
          pullRequest {
            id
          }
        }
      }`,
      base,
      head,
      repoId: repository.id,
      title,
      headers: {
        authorization: this.token,
      },
    });
  }
}

export default GitHubClient;
