import { connect } from 'react-redux';

import { TopNavBarContainer } from './TopNavBar';
import { Splash } from '../components/Splash';

// import { Map } from './googleMapComponent';
// import {BottomBarContainer } from './BottomBar';

function Main({ isDriver, isRider }) {
  return (
    <div className="MainApp">
      <TopNavBarContainer />
      {
        !isDriver && !isRider ?
          <Splash /> :
          (<h2>Hey - No splashing!</h2>)
      }
    </div>
  );
};

const mapStateToProps = function (state) {
  console.log('main container mapStateToProps state:', state.toJS());

  let stateJS = state.toJS();
  return {
    isRider: stateJS.isRider,
    isDriver: stateJS.isDriver,
  };
};

export const MainContainer = connect(
  mapStateToProps
)(Main);
