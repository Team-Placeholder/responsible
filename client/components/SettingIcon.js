
// This function will dispatch action to change to Profile View
function nullFn(e) { console.log('you clicked me ' + e.target.className); };

export function SettingIcon({
  onSettingButtonClick = nullFn,
}) {
  return (
    <div className='SettingIcon' onClick={onSettingButtonClick}>
      <button className='SettingButton btn' type='button'>Settings</button>
    </div>
  );
}
