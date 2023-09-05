"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@octokit/graphql");
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
class GitHubClient {
    token;
    constructor(token) {
        this.token = token;
    }
    async createPullRequest({ owner, repo, head, base, title, body, }) {
        const { repository } = await (0, graphql_1.graphql)(query, {
            owner,
            repo,
            headers: {
                authorization: `token ${this.token}`,
            },
            request: {
                fetch,
            },
        });
        const result = await (0, graphql_1.graphql)(mutation, {
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
exports.default = GitHubClient;
