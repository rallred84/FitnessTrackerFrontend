import { useState } from 'react';
import Header from '../components/Header/Header';
import Nav from '../components/nav/nav';
import { Outlet } from 'react-router-dom';

function Root() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Nav />
      <Outlet />
    </>
  );
}

export default Root;
