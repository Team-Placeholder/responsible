require('../public/styles/skeleton.css');
require('../public/styles/normalize.css');

// This function will dispatch action to change to Settings View
function nullFn(e) { console.log('you clicked me ' + e.target.className); };

export function SettingIcon({
  onSettingsButtonClick = nullFn,
}) {
  return (

    // Ah! Sorry, Kim! Let's talk about what to do with these conflicts tomorrow morning.
    // <div className='SettingIcon two columns' onClick={onSettingButtonClick}>
    //   <select className='SettingButton btn u-full-width'>
    //     <option>Settings</option>
    //     <option>Profile</option>
    //   </select>
    <div className='SettingIcon two columns' onClick={onSettingsButtonClick}>
      <button className='SettingButton btn u-full-width' type='button'>Settings!</button>
    </div>
  );
}
