import { useEffect, useState } from 'react';
import { getAllActivities } from '../../api';

const Activities = () => {
  const [allActivities, setAllActivities] = useState([]);

  useEffect(() => {
    (async () => {
      const allActivities = await getAllActivities();
      setAllActivities(allActivities);
      console.log(allActivities[0]);
    })();
  }, []);

  return (
    <>
      <p>Returning {allActivities.length} activities...</p>
      {allActivities.map((activity) => {
        return (
          <div key={activity.id} className="activity-card">
            <h4>{activity.name}</h4>
            <p>Description: {activity.description}</p>
          </div>
        );
      })}
    </>
  );
};

export default Activities;
