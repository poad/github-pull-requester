import * as core from '@actions/core'
import GitHubClient from './gitHubClient';

function run(): void {
  try {
    const token: string = core.getInput('github_token');
    const head: string = core.getInput('head_branch');
    const base: string = core.getInput('base_branch');
    const title: string = core.getInput('title');
    const body: string = core.getInput('body');
    const owner: string = core.getInput('owner');
    const repository: string = core.getInput('repository');

    const gh = new GitHubClient(token);

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
      .then((prNum: number) => core.setOutput('dest_number', prNum))
      .catch((error: Error) => core.setFailed(error.message));
  } catch (error) {
    core.error(error.message);
    core.setFailed(error.message);
  }
}

run();
