import AddActivity from './editScreens/addActivity';
import EditRoutine from './editScreens/editRoutine';
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
        {props.editMode === 'Edit Routine' && (
          <EditRoutine
            setEditMode={props.setEditMode}
            routine={props.routine}
            token={props.token}
            setUserRoutines={props.setUserRoutines}
            setAllRoutines={props.setAllRoutines}
            myProfile={props.myProfile}
          />
        )}
      </div>
    </div>
  );
};

export default PopUpEdit;
