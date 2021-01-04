"use strict";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const core = require("@actions/core");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const client = require("./githubClient");
function run() {
    try {
        const token = core.getInput("github-token");
        const head = core.getInput("head-branch");
        const base = core.getInput("base-branch");
        const title = core.getInput("title");
        const body = core.getInput("body");
        const owner = core.getInput("owner");
        const repository = core.getInput("repository");
        const gh = client.GitHubClient(token);
        gh.createPullRequest({
            owner: owner,
            repo: repository,
            title: title,
            body: body,
            head: head,
            base: base
        })
            .then((prNum) => core.setOutput("dest-number", prNum))
            .catch((error) => core.setFailed(error.message));
    }
    catch (error) {
        core.console.error(error);
        core.setFailed(error.message);
    }
}
run();
