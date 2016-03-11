import { Map } from 'immutable';

export default function (state = Map(), action) {
  console.log('reducing user state:', state.toJS());

  switch (action.type) {
    case 'SET_DRIVER':
      return setDriver(state, action);
    case 'SET_RIDER':
      return setRider(state, action);
  };

  return state;
};

function setDriver(state, action) {
  let updates = {
    isDriver: action.entry,
    isRider: false,
  };

  return state.merge(updates);
}

function setRider(state, action) {
  let updates = {
    isDriver: false,
    isRider: action.entry,
  };

  return state.merge(updates);
}
