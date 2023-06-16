import { useEffect, useState } from 'react';
import { getAllRoutines, createRoutine } from '../../api';
import './routines.css';
import { useNavigate, useOutletContext } from 'react-router';

const Routines = () => {
  const { allRoutines, setAllRoutines, myProfile } = useOutletContext();

  const [createWindowOpen, setCreateWindowOpen] = useState(false);

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
      {myProfile.id && (
        <div id="routines-header">
          <div>
            <p>Returning {allRoutines.length} routines...</p>
            <div id="routine-search">
              <form action="filter-routines">
                <input
                  id="filter-routines-search"
                  type="text"
                  placeholder="Enter a Keyword to narrow your routine search"
                />
                <button id="filter-routines-button">Filter Routines</button>
              </form>
            </div>
          </div>
          <div>
            <button id="open-create-routine">Create New Routine</button>
          </div>
        </div>
      )}

      {!createWindowOpen && (
        <div id="create-post-form">
          <h3>Create Your Routine</h3>
          <form action="create-post">
            <input type="text" placeholder="Routine Name" />
            <input type="text" placeholder="Routine Goal" />
          </form>
        </div>
      )}

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
                  onClick={() => handleRoutineSelect(routine)}
                >
                  Try Now!
                </div>
              </div>
              {routine.activities.length > 0 && (
                <div>
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
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Routines;
