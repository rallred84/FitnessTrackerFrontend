import { useEffect, useState } from 'react';
import { getAllActivities } from '../../api';
import { useOutletContext } from 'react-router';
import ActivitiesHeader from './activitesSubcomponents/activitiesHeader';
import ActivityCreate from './activitesSubcomponents/activityCreate';

const Activities = () => {
  const { allActivities, setAllActivities, myProfile, token } =
    useOutletContext();
  const [displayedActivities, setDisplayedActivities] = useState([]);
  const [createWindowOpen, setCreateWindowOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const allActivities = await getAllActivities();
      setAllActivities(allActivities);
      setDisplayedActivities(allActivities);
    })();
  }, []);

  return (
    <>
      <ActivitiesHeader
        createWindowOpen={createWindowOpen}
        setCreateWindowOpen={setCreateWindowOpen}
        allActivities={allActivities}
        setDisplayedActivities={setDisplayedActivities}
        displayedActivities={displayedActivities}
        myProfile={myProfile}
      />
      <ActivityCreate createWindowOpen={createWindowOpen} token={token} />
      <div id="activities-list">
        {displayedActivities.map((activity) => {
          return (
            <div key={activity.id} className="activity-card">
              <h4>{activity.name}</h4>
              <p>Description: {activity.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Activities;
