import { useState } from 'react';
import { editCountAndDuration } from '../../../api';

const DurationAndCount = (props) => {
  const { activity, setEditMode, routine, token } = props;

  console.log(activity);

  const [newDuration, setNewDuration] = useState('');
  const [newCount, setNewCount] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();

    const editFields = {};
    if (newDuration !== '') {
      editFields.duration = newDuration;
    }
    if (newCount !== '') {
      editFields.count = newCount;
    }
    console.log(editFields);

    const updatedRoutineActivity = await editCountAndDuration(
      token,
      activity.routineActivityId,
      editFields
    );

    if (updatedRoutineActivity.id) {
      window.location.reload(false);
    }
  };
  return (
    <div id="duration-and-count-edit">
      <h4>Editing Duration and Count for:</h4>
      <h2>Routine: {routine.name}</h2>
      <h2>Activity: {activity.name}</h2>
      <form action="duration-and-count" onSubmit={(e) => handleUpdate(e)}>
        <input
          type="text"
          name="count"
          placeholder="Enter New Count"
          value={newCount}
          onChange={(e) => setNewCount(e.target.value)}
        />

        <input
          type="text"
          name="duration"
          placeholder="Enter New Duration"
          value={newDuration}
          onChange={(e) => setNewDuration(e.target.value)}
        />
        <button>Update Your Routine's Activity</button>
      </form>
      <div id="cancel-button" onClick={() => setEditMode('')}>
        Cancel Edit
      </div>
    </div>
  );
};

export default DurationAndCount;
