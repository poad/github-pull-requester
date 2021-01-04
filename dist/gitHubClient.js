"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@octokit/rest");
class GitHubClient {
    constructor(token) {
        this.token = token;
    }
    async createPullRequest(option) {
        const octokit = new rest_1.Octokit({
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
exports.default = GitHubClient;
