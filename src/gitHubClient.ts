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
  client: typeof graphql;
  constructor(token: string) {
    this.client = graphql.defaults({
      headers: {
        authorization: `token ${token}`,
      },
    });
  }

  async createPullRequest({
    owner,
    repo,
    head,
    base,
    title,
  }: CreatePullRequestOption): Promise<GraphQlQueryResponseData> {
    const { repository } = await this.client<GraphQlQueryResponseData>({
      query: `query repository($owner: String!, $repo: String!) {
        repository(owner:$owner, name:$repo) {
          id
        }
      }`,
      owner,
      repo,
    });

    return await this.client<GraphQlQueryResponseData>({
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
    });
  }
}

export default GitHubClient;
