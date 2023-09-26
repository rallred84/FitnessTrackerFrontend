import { useState } from 'react';
import { useNavigate } from 'react-router';

const CreateRoutineForm = ({
  createWindowOpen,
  createRoutine,
  getAllRoutines,
  setAllRoutines,
  token,
}) => {
  const [routineName, setRoutineName] = useState('');
  const [routineGoal, setRoutineGoal] = useState('');
  const [routineIsPublic, setRoutineIsPublic] = useState(true);
  const [createRoutineError, setCreateRoutineError] = useState('');

  const navigate = useNavigate();

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
    </>
  );
};

export default CreateRoutineForm;
