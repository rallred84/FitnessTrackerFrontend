import { useState } from 'react';
import { createActivity } from '../../../api';

const ActivityCreate = ({ createWindowOpen, token }) => {
  const [activityName, setActivityName] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [createActivityError, setCreateActivityError] = useState('');

  const handleActivityCreate = async (e) => {
    e.preventDefault();
    const newActivity = await createActivity(
      token,
      activityName,
      activityDescription
    );

    if (newActivity.error) {
      setCreateActivityError('That activity already exists');
      return;
    }
    window.location.reload(false);
  };
  return (
    <>
      {createWindowOpen && (
        <div id="create-activity-form">
          <h3>Create Your Activity</h3>
          <form
            action="create-post"
            id="create-activity-form-inputs"
            onSubmit={(e) => handleActivityCreate(e)}
          >
            <input
              type="text"
              placeholder="Activity Name"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
            />
            <textarea
              type="text"
              placeholder="ActivityDescription"
              value={activityDescription}
              onChange={(e) => setActivityDescription(e.target.value)}
            />
            <button id="create-activity-button">Create!!</button>
          </form>
          {createActivityError}
        </div>
      )}
    </>
  );
};

export default ActivityCreate;
