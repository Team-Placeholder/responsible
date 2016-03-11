import { Link } from 'react-router';

import { ProfileButton } from '../components/ProfileButton';
import { CancelRideButton } from '../components/CancelRideButton';

export function TopNavBarRightButton({ isRider, isDriver, isMatched,
  isWaitingForMatch, onProfileButtonClick, onCancelRideButtonClick, }) {

  return (
    <div className="topNavBarRightButton">
      {
        isMatched || isWaitingForMatch ?
          <CancelRideButton onCancelRideButtonClick={onCancelRideButtonClick} /> :
          isDriver || isRider ?
            <ProfileButton onProfileButtonClick={onProfileButtonClick} /> :
            <div className="emptyDiv">emptyDiv</div>
      }
    </div>
  );
}
