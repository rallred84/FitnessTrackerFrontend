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
      <h4>Returning {allActivities.length} activities...</h4>
      {allActivities.map((activity) => {
        return <p key={activity.id}>{activity.name}</p>;
      })}
    </>
  );
};

export default Activities;
