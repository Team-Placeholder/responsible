import React from 'react';
import { TopNavBarMiddleButton } from '../components/TopNavBarMiddleButton';
import { SettingIcon } from '../components/SettingIcon';

export class TopNavBarContainer extends React.Component {
  constructor({ drivers, flags }) {
    super();
    this.drivers = drivers;
    this.flags = flags;
  }

  render() {
    return (
      <div className="TopNavBarContainer">
        <SettingIcon />
        <TopNavBarMiddleButton {...this.flags} drivers={this.drivers} />
      </div>
    );
  }
}
