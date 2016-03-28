import { UserImage } from './UserImage';
import { Chat } from '../containers/Chat';

function nullFn(e) { console.log('you clicked me ' + e.target.className); };

export function DriverItem({ name, avatar, onRideInfoButtonClick = nullFn, }) {
  return (
    <div className="driverItem" onClick={onRideInfoButtonClick}>
      <span className="userName" >Your match is: {name}</span>
      <UserImage imageType="icon" avatar={avatar} />
    </div>
  );
};
