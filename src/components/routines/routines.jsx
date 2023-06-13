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
      <p>Returning {allRoutines.length} routines...</p>
      {allRoutines.map((routine) => {
        return (
          <div
            className="routine-card"
            key={routine.id}
            onClick={(e) => handleRoutineSelect(routine)}
          >
            <h4>{routine.name}</h4>
            <p>Created by {routine.creatorName}</p>
            <p>Goal: {routine.goal}</p>
            <p>
              Activities Included:{' '}
              {routine.activities.length === 0
                ? 'N/A'
                : routine.activities
                    .map((activity) => activity.name)
                    .join(', ')}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default Routines;
