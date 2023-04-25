"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@octokit/graphql");
class GitHubClient {
    token;
    constructor(token) {
        this.token = token;
    }
    async createPullRequest({ owner, repo, head, base, title, }) {
        const { repository } = await (0, graphql_1.graphql)({
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
        return await (0, graphql_1.graphql)({
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
exports.default = GitHubClient;
