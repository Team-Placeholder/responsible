import { UserImage } from './UserImage';

export function DriverItem({ avatar, fullName }) {
  return (
    <div className="driverItem">
      <UserImage imageType="icon" avatar={avatar} />
      <span className="friendName">{fullName}</span>
    </div>
  );
};
