import reducer from './';
import { FETCH_SUCCESS } from '../../actions';

it('should return the initialState', () => {
  const initialState = {
    loading: false,
    error: null,
    data: [],
    nextPage: null,
    isLastPage: false,
  };
  const action = {};
  const state = reducer(undefined, action);

  expect(state).toEqual(initialState);
});

it('should append to the data array with FETCH_SUCCESS', () => {
  const action = { type: FETCH_SUCCESS, data: [3, 4] };

  const initialState = {
    loading: true,
    error: null,
    data: [1, 2],
    nextPage: null,
    isLastPage: false,
  };

  const result = reducer(initialState, action);
  const expected = [1, 2, 3, 4];

  expect(result.data).toEqual(expected);
});

it('should set isLastPage to true if nextPage is null', () => {
  const action = {
    type: FETCH_SUCCESS, 
    data: [],
    nextPage: null,
  }

  const result = reducer(undefined, action);
  expect(result.isLastPage).toBe(true);
});
