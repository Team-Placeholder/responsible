
// This function will dispatch action to change isDriver to true
function nullFn(e) { console.log('you clicked me ' + e.target.className); };

export function DriveButton({
  onDriveButton = nullFn,
}) {
  return (
    <div className='DriveButton' onClick={onDriveButton}>
      <button className='DriveButton btn' type='button'>Drive!</button>
    </div>
  );
}
