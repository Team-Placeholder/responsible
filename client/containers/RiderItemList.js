import { connect } from 'react-redux';
import { curry } from 'ramda';

import * as rideAction from '../actionCreators/ride';

import{ RiderItem } from '../components/RiderItem';
import * as rideActions from '../actionCreators/ride';

function nullFn(e) { console.log('you clicked me ' + e.target.className); };

export function List({ riders, user, onRiderClick, }) {
  return (
    <div className="riderList">
    <h1>Friends Waiting for Rides!</h1>
      {
        riders.map(function (rider) {
          console.log('key', rider.user_id);
          return <RiderItem
            key={rider.user_id}
            ride_driver={user.user_id}
            onRiderItemClick={onRiderClick}
            {...rider}
          />;
        })
      }
    </div>
  );
};

const mapStateToProps = function (state) {
  // console.log('main container mapStateToProps state:', state.toJS());
  return state.toJS();
};

const mapDispatchToProps = function (dispatch) {
  return {
    onRiderClick: curry(function (ride_driver, user_id) {
      console.log('we have a rider and a driver', ride_driver, user_id);

      // dispatch(userAction.addFriend(friendObject));
    }),
  };
};

export const RiderItemList = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
