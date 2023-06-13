import { useOutletContext, useParams } from 'react-router';

const SingleRoutine = () => {
  const { routineId } = useParams();
  const { allRoutines } = useOutletContext();

  const routine = allRoutines.find((routine) => routine.id == routineId);

  return <div>Single Routine: {routine.name}</div>;
};

export default SingleRoutine;
