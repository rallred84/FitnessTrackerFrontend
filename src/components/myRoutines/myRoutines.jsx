import { useNavigate, useOutletContext } from 'react-router';
import { seeUserPublicRoutines } from '../../api';
import { useEffect, useState } from 'react';
import './myRoutines.css';

const MyRoutines = () => {
  const { myProfile, token } = useOutletContext();
  const [userRoutines, setUserRoutines] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (token && myProfile.id) {
      (async () => {
        const routines = await seeUserPublicRoutines(token, myProfile.username);
        setUserRoutines(routines);
      })();
    }
  }, [myProfile]);

  return (
    <div id="my-routines-body">
      <h2>Welcome to YOUR routines, {myProfile.username}!</h2>
      <p>
        Here you can browse all your routines, make changes to them, or even
        delete them if you no longer want or need them.
      </p>
      <p>
        {'('}Tip: If you want to keep your routine, but dont want other users to
        be able to see it, set it to 'Private' and it will no longer be
        available to other users.{')'}
      </p>
      {userRoutines[0] ? (
        <h3>Your Routines</h3>
      ) : (
        <h4>You do not have any routines yet. Click here to add some!</h4>
      )}
      <div id="my-routines-list">
        {userRoutines[0] &&
          userRoutines.map((routine) => {
            return (
              <div className="my-routine-cards" key={routine.id}>
                <h4>{routine.name}</h4>
                <p>Goal: {routine.goal}</p>
                <p>Privacy: {routine.isPublic ? 'Public' : 'Private'}</p>
                <div className="my-routine-button-bank">
                  <button>Add activity to routine</button>
                  <button>Edit Routine</button>
                  <button>Delete</button>
                  <button onClick={() => navigate(`/routines/${routine.id}`)}>
                    See Details
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyRoutines;
