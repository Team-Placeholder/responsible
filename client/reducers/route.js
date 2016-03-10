import Immutable from 'immutable';
import {
    LOCATION_CHANGE
} from 'react-router-redux';

const initialState = Immutable.fromJS({
  locationBeforeTransitions: null,
});

export default function routeReducer(state = initialState, action) {
  console.log('router state!:', state.toJS());
  if (action.type === LOCATION_CHANGE) {
    return state.merge({
      locationBeforeTransitions: action.payload,
    });
  }

  return state;
};
