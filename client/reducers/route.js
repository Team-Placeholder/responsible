import Immutable from 'immutable';
import {
    LOCATION_CHANGE
} from 'react-router-redux';

const initialState = Immutable.fromJS({
  locationBeforeTransitions: null,
});

export function routeReducer(state = initialState, action) {
  console.log('router state!:', state);
  if (action.type === LOCATION_CHANGE) {
    return state.merge({
      locationBeforeTransitions: action.payload,
    });
  }

  return state;
};
