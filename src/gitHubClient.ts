import { Octokit } from "@octokit/rest";

export interface CreatePullRequestOption {
  owner: string,
  repo: string,
  head: string,
  base: string,
  title?: string,
  body?: string,
}

export interface PullRequestResponse {
  data: unknown;
}

class GitHubClient {
  token: string;
  constructor(token: string) {
    this.token = token;
  }

  async createPullRequest(
    option: CreatePullRequestOption,
  ): Promise<PullRequestResponse> {
    const octokit = new Octokit({
      auth: this.token
    });

    const req = {
      owner: option.owner,
      repo: option.repo,
      head: option.head,
      base: option.base
    }

    if (option.title !== undefined) {
      Object.assign(req, { title: option.title });
    }

    if (option.base !== undefined) {
      Object.assign(req, { base: option.base });
    }

    return await octokit.pulls.create(req)
      .then((pr: PullRequestResponse) => ({...pr} as  PullRequestResponse))
      .catch((error: Error) => {
        throw error
      });
  }
}

export default GitHubClient;
