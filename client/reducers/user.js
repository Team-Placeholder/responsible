import {List, Map} from 'immutable';

export default function (state = Map(), action) {
  console.log('reducing state:', state);

  switch (action.type) {
    case 'SET_DRIVER':
      return state.set('isDriver', action.entry);
    case 'SET_RIDER':
      return state.set('isRider', action.entry);
    case 'DISPLAY_SETTINGS':
      return state.set('displaySettings', action.entry);
    case 'DISPLAY_MATCH_INFO':
      return state.set('displayMatchInfo', action.entry);

    // case 'REQUEST_PAIR':
    //   return state.set('waitingForMatch', action.entry);
    // case 'RECEIVE_PAIR':
    //   return matchWithPair(state, action);
  };

  return state;
};

function matchWithPair(state, action) {
  // isMatched turns to the action.entry (userId)
  // waitingForMatch turns false
};
