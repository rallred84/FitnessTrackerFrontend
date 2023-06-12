import { useEffect, useState } from 'react';
import { getAllRoutines } from '../../api';

const Routines = () => {
  const [allRoutines, setAllRoutines] = useState([]);

  useEffect(() => {
    (async () => {
      const allRoutines = await getAllRoutines();
      setAllRoutines(allRoutines);
      console.log(allRoutines[0]);
    })();
  }, []);

  return (
    <>
      <h4>Returning {allRoutines.length} routines...</h4>
      {allRoutines.map((routine) => {
        return <p key={routine.id}>{routine.name}</p>;
      })}
    </>
  );
};

export default Routines;
