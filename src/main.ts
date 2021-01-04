// eslint-disable-next-line @typescript-eslint/no-var-requires
const core = require("@actions/core");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const client = require("./githubClient");

function run(): void {
  try {
    const token: string = core.getInput("github-token");
    const head: string = core.getInput("head-branch");
    const base: string = core.getInput("base-branch");
    const title: string = core.getInput("title");
    const body: string = core.getInput("body");
    const owner: string = core.getInput("owner");
    const repository: string = core.getInput("repository");

    const gh = client.GitHubClient(token);

    gh.createPullRequest(
      {
        owner: owner,
        repo: repository,
        title: title,
        body: body,
        head: head,
        base: base
      }
    )
    .then((prNum: number) => core.setOutput("dest-number", prNum))
    .catch((error: Error) => core.setFailed(error.message));
  } catch (error) {
    core.console.error(error);
    core.setFailed(error.message);
  }
}

run();
