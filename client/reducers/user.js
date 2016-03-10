import { Map } from 'immutable';

export default function (state = Map(), action) {
  console.log('reducing user state:', state.toJS());

  switch (action.type) {
    case 'SET_DRIVER':
      return state.set('isDriver', action.entry);
    case 'SET_RIDER':
      return state.set('isRider', action.entry);
  };

  return state;
};
