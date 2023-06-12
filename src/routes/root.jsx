import { useEffect, useState } from 'react';
import Header from '../components/header/header';
import Nav from '../components/nav/nav';
import { Outlet } from 'react-router-dom';
import { fetchMyProfile } from '../api';

function Root() {
  const [token, setToken] = useState('');
  const [myProfile, setMyProfile] = useState({});

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
      <Header />
      <Nav />
      <div id="main">
        <Outlet
          context={{
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
