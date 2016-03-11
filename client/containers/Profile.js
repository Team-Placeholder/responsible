import React from 'react';
import { connect } from 'react-redux';

import { FriendItemList } from '../components/FriendItemList';
import { UserImage } from '../components/UserImage';
import { ProfileInfoItemList } from '../components/ProfileInfoItemList';
import * as userAction from '../actionCreators/user';

export class Profile extends React.Component {
  constructor ({ user, profileInfoItems = [], friends = [], onFriendClick }) {
    super();

    this.user = user;
    this.profileInfoItems = profileInfoItems;
    this.friends = friends;
    this.onFriendClick = onFriendClick;
  };

  render() {
    console.log('attempting to render Profile.js');
    return (
      <div className="ProfileContainer">
        <UserImage {...this.user} imageType="portrait" />
        <ProfileInfoItemList profileInfoItems={this.profileInfoItems} />
        <FriendItemList friends={this.friends} onFriendClick={this.onFriendClick} />
      </div>
    );
  };
};

const mapStateToProps = function (state) {
  return state.toJS();
};

const mapDispatchToProps = function (dispatch) {
  return {
    onFriendClick: function (userId) {
      dispatch(userAction.displayProfile(userId));
    },
  };
};

export const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
