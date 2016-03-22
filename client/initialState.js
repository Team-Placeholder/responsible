export default {
  user: {
    user_id: 1,
    isLoggedIn: false,
    location: null,
    profile: {
      avatar: 'https://i.ytimg.com/vi/1v6M41Divso/maxresdefault.jpg',
      name: 'Kim Panda',
      address: 'back handle lane Austin, VA',
      zip: '56352',
    },
    isDriver: false,
    isRider: false,
    isFetchingUserState: false,
    isChangingAddress: false,
    changeAddressError: false,
    friends: [
      {
        user_id: 2,
        avatar: 'http://dreamatico.com/data_images/dolphin/dolphin-2.jpg',
        name: 'Flipp',
      },
      {
        user_id: 7,
        avatar: 'http://vignette3.wikia.nocookie.net/pokemon/images/1/' +
                '16/025Pikachu_OS_anime_10.png/revision/20150102074354',
        name: 'PIKA',
      },
      {
        user_id: 8,
        avatar: 'http://vignette1.wikia.nocookie.net/pokemon/images/b/b8/' +
          '001Bulbasaur_Dream.png/revision/latest?cb=20140903033758',
        name: 'Bulb',
      },
      {
        user_id: 9,
        avatar: 'http://petupon.com/wp-content/uploads/2014/05/259758xcitefun-cute-animals-0.jpg',
        name: 'Ears',
      },
      {
        user_id: 11,
        avatar: 'https://s-media-cache-ak0.pinimg.com/236x/b6/83/9d/' +
          'b6839df8dc84c73e6f641f8a05cf7347.jpg',
        name: 'Bunneh',
      },
      {
        user_id: 12,
        avatar: 'http://www.funcage.com/blog/wp-content/uploads/2013/'
         + '11/Cute-Animals-Saying-Hi-To-You-001.jpg',
        name: 'Lazy Harp Seal',
      },
    ],
  },
  ride: {
    ride_id: 3,
    match: null,
    directions: null,
    riders: [
      {
        user_id: 1,
        foreign_rider: 12,
        location: { lat: 30.2687464, lng: -97.741185 },
      },
      {
        user_id: 2,
        foreign_rider: 11,
        location: { lat: 30.267701, lng: -97.736303 },
      },
      {
        user_id: 3,
        foreign_rider: 8,
        location:   { lat: 30.271188, lng: -97.7469099 },
      },
    ], // Array of this driver's friends who are looking for a ride.
    messages: [
      { id: 5, time: '12:30', text: 'Where are you?', },
      { id: 7, time: '12:42', text: 'On my way. Where you at?', },
      { id: 5, time: '12:45', text: 'Four Horseman', },
      { id: 7, time: '12:50', text: 'Be there in ten.', },
    ],
    isWaitingForMatch: false,
    isAddingDriver: false,
    isRemovingDriver: false,
    isMatched: false,
    isConfirmed: false,
    isCancelling: false,
    isAccepting: false,
    isFetchingMessages: false,
    acceptRideError: null,
    rideRequestError: null,
    messagesFetchError: null,
    driverAddError: null,
  },
  routing: {
    locationBeforeTransitions: null,
  },
};
