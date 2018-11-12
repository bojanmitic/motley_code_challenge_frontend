import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { FETCH_START, FETCH_SUCCESS, fetchUserRepos } from './';
import mockData from './__mocks__/data';

const mockStore = configureMockStore([thunk]);
const username = 'petetnt';

const store = mockStore({
  RepoList: {
    nextPage: null,
  },
});

beforeAll(() => {
  const link = `<https://api.github.com/user/${username}/repos?page=2&per_page=4>; rel="next", \
                <https://api.github.com/user/${username}/repos?page=23&per_page=4>; rel="last" `;
  const headers = { Link: link };
  fetchMock.get(
    `https://api.github.com/users/${username}/repos?page=1&per_page=4`,
    { body: mockData, headers },
  );
});

beforeEach(() => {
  store.clearActions();
});

it('fetches repos for the user and sets them as action data', async () => {
  await store.dispatch(fetchUserRepos(username));
  
  expect(store.getActions().pop().data).toEqual(mockData);
});

it('fetching repos first sets state to loading', async () => {
  await store.dispatch(fetchUserRepos(username));

  expect(store.getActions()[0].type).toEqual(FETCH_START);
});

it('successful fetch sets nextPage to Link header value', async () => {
  await store.dispatch(fetchUserRepos(username));
  const action = store.getActions()[1];

  expect(action.type).toEqual(FETCH_SUCCESS);
  expect(action.nextPage).toEqual('2');
});