# github-pull-requester

[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](LICENSE)
![CI](https://github.com/poad/github-pull-requester/workflows/CI/badge.svg)
[![GitHub release](https://img.shields.io/github/release/poad/github-pull-requester.svg)](https://GitHub.com/poad/github-pull-requester/releases/)

Create a new Pull Request by GitHub GraphQL API.

## Useage

```$yaml
- name: Create a new Pull Request
  uses: poad/github-pull-requester@v2.0.0
  with:
      head_branch: { name of head branch }
      base_branch: master # If omitted, it is equivalent to specifying main.
      github_token: { GitHub token for Pull Request creation }
      owner: { name of repository owner }
      repository: { name of repository }
      title: { title (optional) }
      body: { body (optional) }
```

### Reference Information

[GitHub API](https://docs.github.com/en/free-pro-team@latest/rest/reference/pulls#create-a-pull-request)

#### The following parameters are not supported

- maintainer_can_modify
- draft
- issue

## Outputs

### key

`result`

### value

| key | value |
|-----|-------|
| id | GraphQL Node ID of GitHub Pull Request. |
| url | URL of GitHub Pull Request. |

## Security Policy

See [SECURITY.md](./SECURITY.md).
