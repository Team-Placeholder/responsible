import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import * as userAction from '../actionCreators/user';

function nullFn(e) { console.log('you clicked me ' + e.target.className); };

function Button({ onSignoutButtonClick }) {
  return (
    <div className='SignoutButton' onClick={onSignoutButtonClick}>
      <section className='hero is-primary is-outlined'>
        <div className='hero-content 5'>
          <h3 className='SignoutButton'>
          Signout!
          </h3>
        </div>
      </section>
    </div>
  );
}

// This functionality should probably live on the container

const mapStateToProps = function (state) {
  return state.get('user').toJS();
};

const mapDispatchToProps = function (dispatch) {
  return {
    onSignoutButtonClick() {
      OAuth.clearCache();
      dispatch(push('/login'));
      dispatch(userAction.signout(false));
    },
  };
};

export const SignoutButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(Button);
