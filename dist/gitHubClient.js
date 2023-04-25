"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@octokit/graphql");
class GitHubClient {
    client;
    constructor(token) {
        this.client = graphql_1.graphql.defaults({
            headers: {
                authorization: `token ${token}`,
            },
        });
    }
    async createPullRequest({ owner, repo, head, base, title, }) {
        const { repository } = await this.client({
            query: `query repository($owner: String!, $repo: String!) {
        repository(owner:$owner, name:$repo) {
          id
        }
      }`,
            owner,
            repo,
        });
        return await this.client({
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
exports.default = GitHubClient;
