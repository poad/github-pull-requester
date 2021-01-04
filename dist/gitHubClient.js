// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Octokit } = require("@octokit/rest");
class GitHubClient {
    constructor(token) {
        this.token = token;
    }
    async createPullRequest(option) {
        const octokit = new Octokit({
            auth: this.token
        });
        return await octokit.pulls.create({
            owner: option.owner,
            repo: option.repo,
            head: option.head,
            base: option.base,
            title: option.title,
            body: option.body,
        })
            .then((pr) => pr.data.number)
            .catch(() => {
            throw this;
        });
    }
}
export default GitHubClient;
