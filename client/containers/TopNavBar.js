import React from 'react';
import { connect } from 'react-redux';

// import { TopNavBarMiddleButton } from '../components/TopNavBarMiddleButton';
import { SettingIcon } from '../components/SettingIcon';
import { Logo } from '../components/Logo';
import { TopNavBarRightButton } from '../components/TopNavBarRightButton';

import * as userAction from '../actionCreators/user';
import * as viewAction from '../actionCreators/view';

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
        <TopNavBarRightButton {...this.props} />
      </div>
    );
  }
};

const mapStateToProps = function (state) {
  return state.toJS();
};

// jscs:disable
const mapDispatchToProps = function (dispatch) {
  return {
    onSettingsButtonClick() {
      dispatch(viewAction.displaySettings(true));
    },
    onMiddleButtonClick(type) {
      // type needs to be the name of a function exported by viewAction
      console.log('clicking middle button of type:', type);
      dispatch(viewAction[type](true));
    },
    onProfileButtonClick() {
      dispatch(viewAction.displayProfile(true));
    }
  };
};
// jscs:enable

export const TopNavBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopNavBar);
