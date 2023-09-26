import { useNavigate, useOutletContext } from 'react-router';
import {
  seeUserPublicRoutines,
  deleteRoutine,
  getAllRoutines,
  createRoutine,
} from '../../api';
import { useEffect, useState } from 'react';
import './myRoutines.css';
import PopUpEdit from '../utils/popUpEdit';
import CreateRoutineForm from '../routines/routinesSubcomoponents/createRoutineForm';

const MyRoutines = () => {
  const { myProfile, token, setAllRoutines } = useOutletContext();
  const [userRoutines, setUserRoutines] = useState([]);
  const [editMode, setEditMode] = useState('');
  const [editRoutine, setEditRoutine] = useState({});
  const [createWindowOpen, setCreateWindowOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (token && myProfile.id) {
      (async () => {
        const routines = await seeUserPublicRoutines(token, myProfile.username);
        setUserRoutines(routines);
      })();
    }
  }, [myProfile]);

  const handleDelete = async (routineId) => {
    await deleteRoutine(token, routineId);
    const routines = await seeUserPublicRoutines(token, myProfile.username);
    setUserRoutines(routines);
  };

  return (
    <>
      <div id="my-routines-body">
        <h2>Welcome to YOUR routines, {myProfile.username}!</h2>
        <p>
          Here you can browse all your routines, make changes to them, or even
          delete them if you no longer want or need them.
        </p>
        <p>
          {'('}Tip: If you want to keep your routine, but dont want other users
          to be able to see it, set it to 'Private' and it will no longer be
          available to other users.{')'}
        </p>
        {userRoutines[0] ? (
          <>
            <h3>Your Routines:</h3>
            <p>
              Don't See what you're looking for?{' '}
              <span
                className="click-here"
                onClick={() => setCreateWindowOpen(true)}
              >
                Click here
              </span>{' '}
              to create a new routine!
            </p>
          </>
        ) : (
          <h4>
            You do not have any routines yet.{' '}
            <span
              className="click-here"
              onClick={() => setCreateWindowOpen(true)}
            >
              Click here
            </span>{' '}
            to add some!
          </h4>
        )}
        <CreateRoutineForm
          createWindowOpen={createWindowOpen}
          createRoutine={createRoutine}
          getAllRoutines={getAllRoutines}
          setAllRoutines={setAllRoutines}
          token={token}
        />
        <div id="my-routines-list">
          {userRoutines[0] &&
            userRoutines.map((routine) => {
              console.log(routine);
              return (
                <div className="my-routine-cards" key={routine.id}>
                  <h4>{routine.name}</h4>
                  <p>Goal: {routine.goal}</p>
                  <p>Privacy: {routine.isPublic ? 'Public' : 'Private'}</p>
                  <p>
                    Activities Included:{' '}
                    {routine.activities[0]
                      ? routine.activities
                          .map((activity) => activity.name)
                          .join(', ')
                      : 'None Yet, add some below!'}
                  </p>

                  <div className="my-routine-button-bank">
                    <button
                      onClick={() => {
                        setEditMode('Add Activity');
                        setEditRoutine(routine);
                      }}
                    >
                      Add activity to routine
                    </button>
                    {editMode === 'Add Activity' && (
                      <PopUpEdit
                        setEditMode={setEditMode}
                        editMode={editMode}
                        routine={editRoutine}
                        setUserRoutines={setUserRoutines}
                        token={token}
                        myProfile={myProfile}
                        setAllRoutines={setAllRoutines}
                      />
                    )}

                    <button
                      onClick={() => {
                        setEditMode('Edit Routine');
                        setEditRoutine(routine);
                      }}
                    >
                      Edit Routine
                    </button>
                    {editMode === 'Edit Routine' && (
                      <PopUpEdit
                        setEditMode={setEditMode}
                        editMode={editMode}
                        routine={editRoutine}
                        token={token}
                        setUserRoutines={setUserRoutines}
                        setAllRoutines={setAllRoutines}
                        myProfile={myProfile}
                      />
                    )}

                    <button onClick={() => handleDelete(routine.id)}>
                      Delete
                    </button>
                    <button onClick={() => navigate(`/routines/${routine.id}`)}>
                      See / Edit Activity Details
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default MyRoutines;
