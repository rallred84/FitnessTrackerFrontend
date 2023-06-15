import { useEffect } from 'react';
import { getAllRoutines } from '../../api';
import './routines.css';
import { useNavigate, useOutletContext } from 'react-router';

const Routines = () => {
  const { allRoutines, setAllRoutines } = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const allRoutines = await getAllRoutines();
      setAllRoutines(allRoutines);
      console.log(allRoutines[0]);
    })();
  }, []);

  const handleRoutineSelect = (routine) => {
    console.log(routine);
    navigate(`/routines/${routine.id}`);
  };

  return (
    <>
      <div id="routine-search">
        <p>Returning {allRoutines.length} routines...</p>
      </div>
      <div id="routines-list">
        {allRoutines.map((routine) => {
          return (
            <div className="routine-card" key={routine.id}>
              <div className="routine-card-top">
                <div className="routine-details">
                  <h4 className="routine-name">{routine.name}</h4>
                  <p className="routine-creator">
                    Created by {routine.creatorName}
                  </p>
                  <p className="routine-goal">Goal: {routine.goal}</p>
                </div>
                <div
                  className="try-routine-button"
                  onClick={(e) => handleRoutineSelect(routine)}
                >
                  Try Now!
                </div>
              </div>
              <div>
                {routine.activities.length > 0 && (
                  <>
                    <p className="routine-activities-header">
                      Activities Included:{' '}
                    </p>

                    <div className="routine-activity-bubble-container">
                      {routine.activities.map((activity) => (
                        <span
                          key={activity.id}
                          className="routine-activity-bubble"
                        >
                          {activity.name}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Routines;
