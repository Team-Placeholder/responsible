import { connect } from 'react-redux';

import { TopNavBarContainer } from './TopNavBar';
import { SplashContainer } from '../components/Splash';

// import { Map } from './googleMapComponent';
// import {BottomBarContainer } from './BottomBar';

function Main({ isDriver, isRider }) {
  return (
    <div className="MainApp">
      <TopNavBarContainer />
      {
        !isDriver && !isRider ?
          <SplashContainer /> :
          (<h2>Hey - No splashing!</h2>)
      }
    </div>
  );
};

const mapStateToProps = function (state) {
  // console.log('main container mapStateToProps state:', state.toJS());

  let userState = state.toJS().user;
  return {
    isRider: userState.isRider,
    isDriver: userState.isDriver,
  };
};

export const MainContainer = connect(
  mapStateToProps
)(Main);
