"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@octokit/rest");
class GitHubClient {
    token;
    constructor(token) {
        this.token = token;
    }
    async createPullRequest(option) {
        const octokit = new rest_1.Octokit({
            auth: this.token
        });
        const req = {
            owner: option.owner,
            repo: option.repo,
            head: option.head,
            base: option.base
        };
        if (option.title !== undefined) {
            Object.assign(req, { title: option.title });
        }
        if (option.base !== undefined) {
            Object.assign(req, { base: option.base });
        }
        return await octokit.pulls.create(req)
            .then((pr) => ({ ...pr }))
            .catch((error) => {
            throw error;
        });
    }
}
exports.default = GitHubClient;
