import AddActivity from './editScreens/addActivity';
import './popUpEdit.css';

const PopUpEdit = (props) => {
  return (
    <div id="edit-screen">
      <div id="edit-window">
        {props.editMode === 'Add Activity' && (
          <AddActivity
            setEditMode={props.setEditMode}
            routine={props.routine}
            setUserRoutines={props.setUserRoutines}
            token={props.token}
            myProfile={props.myProfile}
            setAllRoutines={props.setAllRoutines}
          />
        )}
      </div>
    </div>
  );
};

export default PopUpEdit;
