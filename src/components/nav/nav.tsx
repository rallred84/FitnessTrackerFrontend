import './nav.css';
import { Link, useNavigate } from 'react-router-dom';

const Nav = ({ myProfile, setMyProfile }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setMyProfile({});
    console.log(myProfile);
    navigate('/');
  };

  return (
    <div id="nav">
      <div id="nav-links">
        <Link to="/">
          <div>Home</div>
        </Link>
        <Link to="/routines">
          <div>Routines</div>
        </Link>
        <Link to="/activities">
          <div>Activities</div>
        </Link>
        {myProfile.id ? (
          <>
            <Link to="/my-routines">
              <div>MyRoutines</div>
            </Link>
            <div id="logout-link" onClick={handleLogout}>
              Logout
            </div>
          </>
        ) : (
          <Link to="/login">
            <div>Login/Register</div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
