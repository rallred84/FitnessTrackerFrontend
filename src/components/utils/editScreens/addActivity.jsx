import { useEffect, useState } from 'react';
import { addActivityToRoutine, getAllActivities } from '../../../api';
import { Link, useNavigate } from 'react-router-dom';

const AddActivity = (props) => {
  const navigate = useNavigate();

  const [activitiesList, setActivitiesList] = useState([]);

  const { routine, setEditMode } = props;
  const [activityIDToAdd, setActivityIDToAdd] = useState('');
  const [count, setCount] = useState('');
  const [duration, setDuration] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      const activities = await getAllActivities();
      setActivitiesList(activities);
    })();
  }, []);

  const handleAddActivity = async (e) => {
    e.preventDefault();

    if (activityIDToAdd == 0) {
      setErrorMessage('You must choose an activity');
      return;
    }

    const addedActivity = await addActivityToRoutine(
      routine.id,
      activityIDToAdd,
      count,
      duration
    );

    if (addedActivity.error) {
      if (
        addedActivity.message.includes('invalid input syntax for type integer')
      ) {
        setErrorMessage('Count and Duration must be numbers');
        return;
      }
      setErrorMessage('This activity has already been added to your routine');
    }

    if (addedActivity.id) {
      setEditMode('');
    }
  };

  return (
    <div id="add-activity">
      <h3>Choose an Activity to Add to:</h3>
      <h1>{routine.name}</h1>
      <form action="add-activity" onSubmit={(e) => handleAddActivity(e)}>
        <select
          name="activity"
          id="activity-add-select"
          value={activityIDToAdd}
          onChange={(e) => {
            console.log(e.target.value);
            setActivityIDToAdd(e.target.value);
          }}
        >
          <option value="0">Choose an activity:</option>
          {activitiesList.map((activity) => {
            return (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            );
          })}
        </select>
        <div id="count-and-duration">
          <label htmlFor="count">Count:</label>
          <input
            type="text"
            name="count"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
          <label htmlFor="duration">Duration:</label>
          <input
            type="text"
            name="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <button>Add Activity to {routine.name}</button>
        {errorMessage}
      </form>
      <p>
        Don't see the activity you are looking for? <Link>Create your own</Link>{' '}
        activity to add to your routine or{' '}
        <Link to="/activities">visit the activities page</Link> to see a
        detailed list and search by keyword
      </p>
    </div>
  );
};

export default AddActivity;
