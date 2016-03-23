import { connect } from 'react-redux';

import { ConfirmLocationButton } from './ConfirmLocationButton';
import { Chat } from '../../containers/Chat';

import * as rideAction from '../../actionCreators/ride';

export function BottomButton({ isWaitingForMatch, isConfirmed, isMatched,
  match, messages, friends, confirmLocation, }) {

  return (
    <div className="BottomNavBarRightButton">
    {
      !isWaitingForMatch && !isConfirmed ?
        <ConfirmLocationButton confirmLocation={confirmLocation} /> :

        isConfirmed && isWaitingForMatch ?
          <div className='WaitingForMatch'>
            <section className='hero is-success'>
              <div className='hero-content4'>
                <h2 className='button is-success is-loading'>
                Waiting for a match
                </h2>
              </div>
            </section>
          </div> :

          isMatched ?
              <Chat match={match} friends={friends} messages={messages}/> :
            <h3>Uh oh. How did this happen?</h3>
    }
    </div>
  );
}
