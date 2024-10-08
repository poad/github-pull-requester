import { graphql } from '@octokit/graphql';
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
        const { repository } = await graphql(query, {
            owner,
            repo,
            headers: {
                authorization: `token ${this.token}`,
            },
            request: {
                fetch,
            },
        });
        const result = await graphql(mutation, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0SHViQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2dpdEh1YkNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFXM0MsTUFBTSxLQUFLLEdBQUc7Ozs7OztDQU1iLENBQUM7QUFFRixNQUFNLFFBQVEsR0FBRzs7Ozs7Ozs7OztFQVVmLENBQUM7QUFrQkgsTUFBTSxZQUFZO0lBQ1IsS0FBSyxDQUFTO0lBRXRCLFlBQVksS0FBYTtRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRUQsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEVBQ3RCLEtBQUssRUFDTCxJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixLQUFLLEVBQ0wsSUFBSSxHQUNvQjtRQUN4QixNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsTUFBTSxPQUFPLENBQTBCLEtBQUssRUFBRTtZQUNuRSxLQUFLO1lBQ0wsSUFBSTtZQUNKLE9BQU8sRUFBRTtnQkFDUCxhQUFhLEVBQUUsU0FBUyxJQUFJLENBQUMsS0FBSyxFQUFFO2FBQ3JDO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLEtBQUs7YUFDTjtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUE0QixRQUFRLEVBQUU7WUFDaEUsSUFBSTtZQUNKLElBQUk7WUFDSixNQUFNLEVBQUUsVUFBVSxDQUFDLEVBQUU7WUFDckIsS0FBSztZQUNMLElBQUk7WUFDSixPQUFPLEVBQUU7Z0JBQ1AsYUFBYSxFQUFFLFNBQVMsSUFBSSxDQUFDLEtBQUssRUFBRTthQUNyQztZQUNELE9BQU8sRUFBRTtnQkFDUCxLQUFLO2FBQ047U0FDRixDQUFDLENBQUM7UUFDSCxPQUFPO1lBQ0wsSUFBSSxFQUFFLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXO1NBQzNDLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFRCxlQUFlLFlBQVksQ0FBQyJ9