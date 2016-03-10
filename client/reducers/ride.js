import { Map } from 'immutable';

import { matchRide } from './matchRide';

export default function(state = Map(), action) {
  console.log('reducing ride state:', state.toJS());
  switch (action.type) {
    case 'RECEIVE_MATCH':

      // set isWaitingForMatch false
      // set isMatched true
      // set Match to action.entry
      return matchRide(state, action);
    case 'REQUEST_MATCH':

      // set isWaitingForMatch true
      // set isConfirmed true
      return matchRide(state, action);
  };

  return state;
}
