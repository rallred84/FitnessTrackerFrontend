import { useEffect, useState } from 'react';
import { getAllRoutines, createRoutine } from '../../api';
import './routines.css';
import { useNavigate, useOutletContext } from 'react-router';

const Routines = () => {
  const { allRoutines, setAllRoutines, myProfile, token } = useOutletContext();

  const [createWindowOpen, setCreateWindowOpen] = useState(false);

  const [routineName, setRoutineName] = useState('');
  const [routineGoal, setRoutineGoal] = useState('');
  const [routineIsPublic, setRoutineIsPublic] = useState(true);
  const [createRoutineError, setCreateRoutineError] = useState('');

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

  const handleRoutineCreate = async (e) => {
    e.preventDefault();
    const newRoutine = await createRoutine(
      token,
      routineName,
      routineGoal,
      routineIsPublic
    );

    console.log(newRoutine);

    if (!newRoutine.id) {
      if (
        newRoutine.error ===
        'duplicate key value violates unique constraint "routines_name_key"'
      ) {
        setCreateRoutineError('A routine with this name already exists');
      } else setCreateRoutineError(newRoutine.error);
      return;
    }
    const allRoutines = await getAllRoutines();
    setAllRoutines(allRoutines);

    navigate(`/routines/${newRoutine.id}`);
  };

  return (
    <>
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
        {myProfile.id && (
          <div>
            {!createWindowOpen ? (
              <button
                id="open-close-create-routine"
                onClick={() => setCreateWindowOpen(true)}
              >
                Create New Routine
              </button>
            ) : (
              <button
                id="open-close-create-routine"
                onClick={() => setCreateWindowOpen(false)}
              >
                Cancel Create Routine
              </button>
            )}
          </div>
        )}
      </div>

      {createWindowOpen && (
        <div id="create-routine-form">
          <h3>Create Your Routine</h3>
          <form
            action="create-post"
            id="create-routine-form-inputs"
            onSubmit={(e) => handleRoutineCreate(e)}
          >
            <input
              type="text"
              placeholder="Routine Name"
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
            />
            <textarea
              type="text"
              placeholder="Routine Goal"
              value={routineGoal}
              onChange={(e) => setRoutineGoal(e.target.value)}
            />
            <div>
              <label htmlFor="isPublic">Is Public?</label>
              <input
                type="checkbox"
                name="isPublic"
                defaultChecked
                onChange={(e) => {
                  setRoutineIsPublic(e.target.checked);
                }}
              />
            </div>
            <button id="create-routine-button">Create!!</button>
          </form>
          {createRoutineError}
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
