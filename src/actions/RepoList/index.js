import parseLinkHeaders from 'parse-link-header';

export const FETCH_START = '@fetch/start';
export const FETCH_ERROR = '@fetch/error';
export const FETCH_SUCCESS = '@fetch/success';

const fetchStart = () => ({
  type: FETCH_START,
});

const fetchError = error => ({
  type: FETCH_ERROR,
  error,
});

const fetchSuccess = ({ nextPage, data }) => ({
  type: FETCH_SUCCESS,
  nextPage,
  data,
});

export const fetchUserRepos = (username, currentPage = 1) => async dispatch => {
  dispatch(fetchStart());

  const { REACT_APP_GITHUB_API_KEY: token } = process.env;

  try {
    const url = `https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=4`;

    const authToken = {
      headers: {
        authorization: token,
      },
    };

    const response = await fetch(url, authToken);
    const data = await response.json();

    const linkHeader = response.headers.get('link');
    const parsed = parseLinkHeaders(linkHeader);

    dispatch(
      fetchSuccess({
        nextPage:
          parsed.last.page === parsed.next.page ? null : parsed.next.page,
        data,
      }),
    );
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};
