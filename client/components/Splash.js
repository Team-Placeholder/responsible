import { DriveButton } from './DriveButton';
import { CatchARideButton } from './CatchARideButton';
import * as userAction from '../actionCreators/user';

export function Splash({ onDriveButtonClick, onRideButtonClick }) {
  return (
    <div className='splash'>
      <DriveButton onDriveButtonClick={onDriveButtonClick} />
      <CatchARideButton onCatchARideButtonClick={onRideButtonClick} />
    </div>
  );
};

// jscs:disable
const mapDispatchToProps = function(dispatch) {
  return {
    onDriveButtonClick() {
      dispatch(userAction.setDriver(true));
    },
    onRideButtonClick() {
      dispatch(userAction.setRider(true));
    }
  };
};
// jscs:enable

export const SplashContainer = connect(
  mapDispatchToProps,
)(Splash);
