import { useOutletContext } from 'react-router';

const MyRoutines = () => {
  const { myProfile } = useOutletContext();

  return (
    <>
      <div>MY_ROUTINES</div>
      <p>{myProfile.id && `Logged in as ${myProfile.username}`}</p>
    </>
  );
};

export default MyRoutines;
