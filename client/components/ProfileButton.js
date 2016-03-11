import { Link } from 'react-router';
require('../public/styles/skeleton.css');
require('../public/styles/normalize.css');

// This function will dispatch action to change to Profile View
function nullFn(e) { console.log('you clicked me ' + e.target.className); };

export function ProfileButton({
  onProfileButtonClick = nullFn,
}) {
  return (
    <div className='ProfileButtonDiv two columns' onClick={onProfileButtonClick}>
      <button className='ProfileButton btn u-full-width'>Profile</button>
    </div>
  );
}
