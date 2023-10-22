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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0SHViQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2dpdEh1YkNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUEyQztBQVczQyxNQUFNLEtBQUssR0FBRzs7Ozs7O0NBTWIsQ0FBQztBQUVGLE1BQU0sUUFBUSxHQUFHOzs7Ozs7Ozs7O0VBVWYsQ0FBQztBQWtCSCxNQUFNLFlBQVk7SUFDUixLQUFLLENBQVM7SUFFdEIsWUFBWSxLQUFhO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxLQUFLLENBQUMsaUJBQWlCLENBQUMsRUFDdEIsS0FBSyxFQUNMLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLEtBQUssRUFDTCxJQUFJLEdBQ29CO1FBQ3hCLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxNQUFNLElBQUEsaUJBQU8sRUFBMEIsS0FBSyxFQUFFO1lBQ25FLEtBQUs7WUFDTCxJQUFJO1lBQ0osT0FBTyxFQUFFO2dCQUNQLGFBQWEsRUFBRSxTQUFTLElBQUksQ0FBQyxLQUFLLEVBQUU7YUFDckM7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsS0FBSzthQUNOO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFBLGlCQUFPLEVBQTRCLFFBQVEsRUFBRTtZQUNoRSxJQUFJO1lBQ0osSUFBSTtZQUNKLE1BQU0sRUFBRSxVQUFVLENBQUMsRUFBRTtZQUNyQixLQUFLO1lBQ0wsSUFBSTtZQUNKLE9BQU8sRUFBRTtnQkFDUCxhQUFhLEVBQUUsU0FBUyxJQUFJLENBQUMsS0FBSyxFQUFFO2FBQ3JDO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLEtBQUs7YUFDTjtTQUNGLENBQUMsQ0FBQztRQUNILE9BQU87WUFDTCxJQUFJLEVBQUUsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFdBQVc7U0FDM0MsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQUVELGtCQUFlLFlBQVksQ0FBQyJ9