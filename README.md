# github-pull-requester

Create a new Pull Request by [octokit/rest.js](https://github.com/octokit/rest.js/).

## Useage

```
- name: Create a new Pull Request
  uses: poad/github-pull-requester@v1
  with:
      head_branch: { name of head branch }
      base_branch: master # If omitted, it is equivalent to specifying main.
      github_token: { GitHub token for Pull Request creation }
      owner: { name of repository owner }
      repository: { name of repository }
      title: { title (optional) }
      body: { body (optional) }
```

###　Reference Information
[GitHub API](https://docs.github.com/en/free-pro-team@latest/rest/reference/pulls#create-a-pull-request)

#### The following parameters are not supported.

- maintainer_can_modify
- draft
- issue