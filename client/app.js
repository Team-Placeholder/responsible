import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

import Root from './containers/Root';
import { ProfileContainer } from './containers/Profile';
import { MainContainer } from './containers/Main';

import routeReducer from './reducers/route';
import userReducer from './reducers/user';
import rideReducer from './reducers/ride';

import InitialState from './initialState';

// Update /profile to /profile/:userId when ready. react-router.
const routes = <Route component={Root}>
  <Route path="/" component={MainContainer} />
  <Route path="/profile" component={ProfileContainer} />
</Route>;

const reducersWithRouter = combineReducers({
  user: userReducer,
  ride: rideReducer,
  routing: routeReducer,
});

const historyMiddleware = routerMiddleware(browserHistory);
const store = createStore(
  reducersWithRouter,
  fromJS(InitialState),
  applyMiddleware(historyMiddleware)
);

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState(state) {
    return state.getIn(['routing', 'locationBeforeTransitions']).toJS();
  },
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
