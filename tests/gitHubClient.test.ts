import {test, describe} from '@jest/globals'
import nock from 'nock';
import GitHubClient from '../src/gitHubClient';

describe('Create pull request', () => {

  test('Create the pull request (default)', (): void => {
    const scope = nock('https://api.github.com/graphql');
    const client = new GitHubClient('dummy');
    client.createPullRequest(
      {
        owner: 'testUser',
        repo: 'test-repo',
        title: 'hoge',
        body: '',
        head: 'test',
        base: 'master',
      }
    )
    .then(() => {})
    .catch(error => {
      
    });
    scope.done();
  });

  test('Create the pull request (omit title, body)', (): void => {
    const scope = nock('https://api.github.com/graphql');
    const client = new GitHubClient('dummy');
    client.createPullRequest(
      {
        owner: 'testUser',
        repo: 'test-repo',
        head: 'test',
        base: 'master',
      }
    )
    .then(() => {})
    .catch(error => {

    });
    scope.done();
  });


});
