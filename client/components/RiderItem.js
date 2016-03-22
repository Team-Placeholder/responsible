import { UserImage } from './UserImage';

export function RiderItem({ user_id, location, onRiderItemClick, ride_driver, }) {
  /* Commented this out to avoid lat/long errors */

  // return (
  //   <div className="riderItem" onClick={onRiderItemClick}>
  //     <div className="rider_id">{user_id}</div>
  //     <div className="lat">{location.lat}</div>
  //     <div className='lng'>{location.lng}</div>
  //   </div>
  // );
  return (
    <div className="riderItem">
      <div key={user_id} className="rider_id" onClick=
        {onRiderItemClick.bind(null, ride_driver, user_id)}>{user_id}</div>
    </div>
  );
};

