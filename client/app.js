import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { routeReducer } from './reducers/routeReducer';

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

import Root from './containers/Root';
import { ProfileContainer } from './containers/Profile';
import { MainContainer } from './containers/Main';
import rootReducer from './reducers/rootReducer';

import InitialState from './initialState';

// Update /profile to /profile/:userId when ready. react-router.
const routes = <Route component={Root}>
  <Route path="/" component={MainContainer} />
  <Route path="/profile" component={ProfileContainer} />
</Route>;

const reducersWithRouter = combineReducers({
  rootReducer,
  routing: routeReducer,
});

const historyMiddleware = routerMiddleware(browserHistory);
const store = createStore(
  reducersWithRouter,
  applyMiddleware(historyMiddleware),
  fromJS(InitialState)
);

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState(state) {
    return state.getIn('locationBeforeTransitions').toJS();
  },
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
