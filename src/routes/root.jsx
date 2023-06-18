import { useEffect, useState } from 'react';
import Header from '../components/header/header';
import Nav from '../components/nav/nav';
import { Outlet, useNavigate } from 'react-router-dom';
import { fetchMyProfile } from '../api';

function Root() {
  const [token, setToken] = useState('');
  const [myProfile, setMyProfile] = useState({});
  const [allRoutines, setAllRoutines] = useState([]);
  const [allActivities, setAllActivities] = useState([]);

  useEffect(() => {
    //If Token exists in local storage, set it to state
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    }
    //If there is a token value, fetch user profile and save to state
    if (token !== '') {
      (async () => {
        const profileValues = await fetchMyProfile(token);
        setMyProfile(profileValues);
      })();
    }
  }, [token]);

  return (
    <>
      <Header myProfile={myProfile} />
      <Nav myProfile={myProfile} setMyProfile={setMyProfile} />
      <div id="main">
        <Outlet
          context={{
            allRoutines,
            setAllRoutines,
            allActivities,
            setAllActivities,
            token,
            setToken,
            myProfile,
            setMyProfile,
          }}
        />
      </div>
    </>
  );
}

export default Root;
