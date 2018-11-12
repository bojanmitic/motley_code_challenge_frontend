import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import RepoList from './containers/RepoList';
import ErrorBoundary from './components/ErrorBoundary';
import reducers from './reducers';

/*eslint-disable */
const composeEnhancers =
  process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
/* eslint-enable */

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const App = () => (
  <Provider store={store}>
    <ErrorBoundary>
      <RepoList username="petetnt" />
    </ErrorBoundary>
  </Provider>
);

export default App;
