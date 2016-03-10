import React from 'react';
import { connect } from 'react-redux';

// import { TopNavBarMiddleButton } from '../components/TopNavBarMiddleButton';
import { SettingIcon } from '../components/SettingIcon';
import { Logo } from '../components/Logo';
import { TopNavBarRightButton } from '../components/TopNavBarRightButton';

import * as userAction from '../actionCreators/user';
import * as rideAction from '../actionCreators/ride';

require('../public/styles/normalize.css');
require('../public/styles/skeleton.css');

export class TopNavBar extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="TopNavBarContainer row">
        <SettingIcon />
        <Logo />
        <TopNavBarRightButton {...this.props.ride} />
      </div>
    );
  }
};

const mapStateToProps = function (state) {
  console.log('TopNavBar state to props state:', state.toJS());

  return state.toJS();
};

// jscs:disable
const mapDispatchToProps = function (dispatch) {
  return {
    onSettingsButtonClick() {

      // import push from react-redux-router
      // dispatch(viewAction.displaySettings(true));
    },
    onProfileButtonClick() {

      // import push from react-redux-router
      // dispatch(viewAction.displayProfile(true));
    }
  };
};
// jscs:enable

export const TopNavBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopNavBar);
