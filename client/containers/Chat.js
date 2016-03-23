import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { curry } from 'ramda';

import { DriverItem } from '../components/DriverItem';
import { MessageItemList } from '../components/Chat/MessageItemList';

import * as chatAction from '../actionCreators/chat';

export function box({ match, friends, messages, addMessage }) {

  let friendPartner = friends.filter(function (friend) {
    return match.user_id === friend.user_id;
  });

  return (
    <div className='chatbox'>
      <DriverItem {...match} avatar={friendPartner.avatar} />
      <MessageItemList user_id={user.user_id} messages={messages}/>
      <div className='textSubmit'>
        <form onSubmit={addMessage(user.user_id, match.user_id)}>
          <input className="messageText ten columns" defaultValue='' id="message"></input>
          <input className="messageSubmit button" type="submit" />
        </form>
      </div>
    </div>
  );
}

// jscs:disable
const mapDispatchToProps = function (dispatch) {
  return {
    addMessage: curry(function (user_id, partner_id, e) {
      e.preventDefault();
      let timeStamp = new Date();
      let currentTime = timeStamp.getHours() + ':' + timeStamp.getMinutes();
      let messageObject = {
        user_id: user_id,
        time: currentTime,
        text: e.target.firstChild.value,
      };

      e.target.firstChild.value = '';
      dispatch(chatAction.submitMessage(partner_id, messageObject));
    }),
  };
};
// jscs:enable

export const Chat = connect(
  null,
  mapDispatchToProps
)(box);
