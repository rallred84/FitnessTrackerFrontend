import './nav.css';
import { Link } from 'react-router-dom';

const Nav = ({ myProfile }) => {
  console.log(myProfile);
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
          <Link to="/my-routines">
            <div>MyRoutines</div>
          </Link>
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
