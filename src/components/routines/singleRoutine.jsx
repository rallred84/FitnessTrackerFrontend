import { useOutletContext, useParams } from 'react-router';

const SingleRoutine = () => {
  const { routineId } = useParams();
  const { allRoutines } = useOutletContext();

  const routine = allRoutines.find((routine) => routine.id == routineId);

  return (
    <>
      <h2>{routine.name}</h2>
      <h3>Created by {routine.creatorName}</h3>
      <p>Goal: {routine.goal}</p>
    </>
  );
};

export default SingleRoutine;
