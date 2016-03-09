import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { fromJS } from 'immutable';
=======
import { ProfileContainer } from './containers/ProfileContainer';
import { TopNavBarContainer } from './containers/TopNavBarContainer';
>>>>>>> b187d04e6b3f1ed72f4929ae4afcd8bf027a2237

// import { ProfileContainer } from './containers/ProfileContainer';
import { TopNavBarContainer } from './containers/TopNavBarContainer';
import rootReducer from './reducers/rootReducer';
import { WrappedProfile } from './containers/ProfileContainer';

const dummyState = {
  user: {
    id: 1,
    avatar: 'https://i.ytimg.com/vi/1v6M41Divso/maxresdefault.jpg',
    fullName: 'Kim Panda',
    street: 'back handle lane',
    city: 'Austin',
    state: 'Virginia',
    zip: '56352',
  },
  friends: [
    {
      id: 2,
      avatar: 'http://www.spirit-animals.com/wp-content/uploads/2012/09/Dolphin.jpg',
      fullName: 'Flipp',
    },
    {
      id: 7,
      avatar: 'http://vignette3.wikia.nocookie.net/pokemon/images/1/' +
              '16/025Pikachu_OS_anime_10.png/revision/20150102074354',
      fullName: 'PIKA',
    },
  ],
  profileInfoItems: [
    { itemTitle: 'Austin' },
    { itemDesc: 'Virginia' },
  ],
};

const store = createStore(rootReducer, fromJS(dummyState));

const dummyFlags = {
  flags: {
    isDriver: false,
    isRider: true,
    isMatched: false,
    isConfirmed: false,
  },
};

const dummyDrivers = {
  drivers: [
    {
      id: 10,
      avatar: 'http://animaliaz-life.com/data_images/dog/dog7.jpg',
      fullName: 'Barkdog',
    },
    {
      id: 15,
      avatar: 'http://media4.popsugar-assets.com/files/2014/08/08/878/n/1922507' +
      '/caef16ec354ca23b_thumb_temp_cover_file32304521407524949.xxxlarge/i/Funny-Cat-GIFs.jpg',
      fullName: 'Mrowr',
    },
  ],
};

ReactDOM.render(
  <Provider store={store}>
    <WrappedProfile />
  </Provider>,

  /* Rendering two containers throws error; will need to render specific ones based on state */

  // <ProfileContainer {...dummyState} />,
  // <TopNavBarContainer {...dummyState} {...dummyFlags} />,
  document.getElementById('app')
);
