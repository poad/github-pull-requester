import * as core from '@actions/core'
import GitHubClient from './gitHubClient';

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

    const repo = repository.startsWith(`${owner}/`) ? repository.replace(`${owner}/`, '') : repository;
    
    core.info(`owner: ${owner}`);
    core.info(`repo: ${repo}`);
    core.info(`HEAD: ${head}`);
    core.info(`BASE: ${base}`);

    const req = {
      owner,
      repo,
      title,
      body,
      head,
      base
    };

    const gh = new GitHubClient(token);

    gh.createPullRequest(req)
      .then((prNum: number) => core.setOutput('dest_number', prNum))
      .catch(errHandler);
  } catch (error) {
    errHandler(error);
  }
}

run();
