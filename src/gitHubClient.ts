import { Octokit } from "@octokit/rest";

interface PullRequestResponse {
  data: {
    number: number;
  };
}

export interface CreatePullRequestOption {
  owner: string,
  repo: string,
  head: string,
  base: string,
  title?: string,
  body?: string,
}

class GitHubClient {
  token: string;
  constructor(token: string) {
    this.token = token;
  }

  async createPullRequest(
    option: CreatePullRequestOption,
  ): Promise<number> {
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
      .then((pr: PullRequestResponse) => pr.data.number)
      .catch(() => {
        throw this
      });
  }
}

export default GitHubClient;
