"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const query = (0, graphql_request_1.gql) `
query repository($owner: String!, $repo: String!) {
  repository(owner: $owner, name: $repo) {
    id
  }
}
`;
const mutation = (0, graphql_request_1.gql) `mutation ($base: String!, $head: String!, $repoId: ID!, $title: String!, $body: String) {
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
    client;
    constructor(token) {
        this.client = new graphql_request_1.GraphQLClient('https://api.github.com/graphql', {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
    }
    async createPullRequest({ owner, repo, head, base, title, body, }) {
        const { repository } = await this.client.request(query, {
            owner,
            repo,
        });
        const result = await this.client.request(mutation, {
            base,
            head,
            repoId: repository.id,
            title,
            body,
        });
        return result.createPullRequest.pullRequest;
    }
}
exports.default = GitHubClient;
