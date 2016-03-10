import { Map } from 'immutable';

export default function(state = Map(), action) {
  console.log('reducing ride state:', state.toJS());

  switch (action.type) {
    case 'RECEIVE_MATCH':
      return receiveMatch(state, action);
    case 'REQUEST_MATCH':
      return requestMatch(state, action);
  };

  return state;
}

function requestMatch(state, action) {
  let updates = {
    isWaitingForMatch: true,
    isConfirmed: true,
  };

  return state.merge(updates);
}

function receiveMatch(state, action) {
  let updates = {
    isWaitingForMatch: false,
    isMatched: true,
    Match: action.entry,
  };

  return state.merge(updates);
}
