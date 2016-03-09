
// uses DriverItem (and not FriendItem) for own styling
import {DriverItem} from './DriverItem';

export function DriverItemList({ drivers }) {
  return (
    <div className="driverList">
      {
        drivers.map(function (driver) {
          return <DriverItem {...driver} />;
        })
      }
    </div>
  );
};
