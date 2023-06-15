import { useOutletContext, useParams } from 'react-router';
import './singleRoutine.css';

const SingleRoutine = () => {
  const { routineId } = useParams();
  const { allRoutines } = useOutletContext();

  const routine = allRoutines.find((routine) => routine.id == routineId);

  return (
    <div id="single-routine">
      <div id="single-routine-header">
        <h2 id="single-routine-name">{routine.name}</h2>
        <h3 id="single-routine-creator">Created by {routine.creatorName}</h3>
        <h4 id="single-routine-goal">Goal: {routine.goal}</h4>
      </div>
      <h3 id="activity-details-label">Activity Details:</h3>
      <div id="single-routine-activity-list">
        {routine.activities.map((activity, idx) => {
          return (
            <div className="single-routine-activity" key={activity.id}>
              <p>
                {idx + 1}. {activity.name}
              </p>
              <p>Description: {activity.description}</p>
              <p>Count: {activity.count}</p>
              <p>Duration: {activity.duration}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleRoutine;
