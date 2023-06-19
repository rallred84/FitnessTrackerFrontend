import { useState } from 'react';
import {
  editRoutine,
  seeUserPublicRoutines,
  getAllRoutines,
} from '../../../api';

const EditRoutine = (props) => {
  const {
    routine,
    setEditMode,
    token,
    myProfile,
    setUserRoutines,
    setAllRoutines,
  } = props;

  const [editName, setEditName] = useState('');
  const [editGoal, setEditGoal] = useState('');
  const [editIsPublic, setEditIsPublic] = useState('');

  const handleEditRoutine = async (e) => {
    e.preventDefault();
    let editFields = {};
    if (editName !== '') {
      editFields.name = editName;
    }
    if (editGoal !== '') {
      editFields.goal = editGoal;
    }
    if (editIsPublic !== '') {
      editFields.isPublic = editIsPublic;
    }
    const editedRoutine = await editRoutine(token, routine.id, editFields);

    if (editedRoutine.id) {
      setEditMode('');
      const userRoutines = await seeUserPublicRoutines(
        token,
        myProfile.username
      );
      setUserRoutines(userRoutines);
      const allRoutines = await getAllRoutines();
      setAllRoutines(allRoutines);
    }
  };

  return (
    <div id="edit-routine-window">
      <h2>Editing Post: {routine.name}</h2>
      <p></p>
      <form
        action="create-post"
        id="create-routine-form-inputs"
        onSubmit={(e) => handleEditRoutine(e)}
      >
        <input
          type="text"
          placeholder="New Routine Name"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="New Routine Goal"
          value={editGoal}
          onChange={(e) => setEditGoal(e.target.value)}
        />
        <label htmlFor="isPublic">Public or Private?</label>
        <select
          name="isPublic"
          value={editIsPublic}
          onChange={(e) => setEditIsPublic(e.target.value)}
        >
          <option value="">Change Privacy Settings</option>
          <option value="true">Public</option>
          <option value="false">Private</option>
        </select>
        <button id="create-routine-button">Confirm Edit!!</button>
      </form>
      <div id="cancel-button" onClick={() => setEditMode('')}>
        Cancel Edit
      </div>
    </div>
  );
};

export default EditRoutine;
