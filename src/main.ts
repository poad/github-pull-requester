import * as core from '@actions/core'
import GitHubClient, { PullRequestResponse } from './gitHubClient';

function run(): void {
  const errHandler = (error: Error) => {
    core.error(error.message);
    core.setFailed(error.message)
  };

  try {
    const token: string = core.getInput('github_token');
    const head: string = core.getInput('head_branch');
    const base: string = core.getInput('base_branch');
    const title: string = core.getInput('title');
    const body: string = core.getInput('body');
    const owner: string = core.getInput('owner');
    const repository: string = core.getInput('repository');

    core.info(`owner: ${owner}`);
    core.info(`repo: ${repository}`);
    core.info(`HEAD: ${head}`);
    core.info(`BASE: ${base}`);

    const req = {
      owner,
      repo: repository,
      title,
      body,
      head,
      base
    };

    const gh = new GitHubClient(token);

    gh.createPullRequest(req)
      .then((result: PullRequestResponse) => {
        core.setOutput('result', result);
      })
      .catch(errHandler);
  } catch (error) {
    if (error instanceof Error) {
      errHandler(error);
    } else {
      core.error(JSON.stringify(error))
      core.setFailed(JSON.stringify(error))
    }
  }
}

run();
