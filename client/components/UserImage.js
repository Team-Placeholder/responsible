require('../public/styles/profile.css');

export function UserImage({ avatar, imageType }) {
  return (
    <div className="avatar">
    {
      imageType === 'portrait' ?
        <img className="userPortrait" src={ avatar /*  portrait size */ } /> :
        <img className="userIcon" src={ avatar /*  icon size  */ } />
    }
    </div>
  );
}
