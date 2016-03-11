
export function setDriver(isDriver) {
  return {
    type: 'SET_DRIVER',
    entry: isDriver,
  };
};

export function setRider(isRider) {
  return {
    type: 'SET_RIDER',
    entry: isRider,
  };
};
