import './header.css';

const Header = ({ myProfile }) => {
  return (
    <div id="header">
      {myProfile.id && (
        <span id="logged-in-declaration">
          Logged in as {myProfile.username}
        </span>
      )}

      <h1 id="company-name">Fitness Track.kr</h1>
      <h3 id="company-slogan">Tracking your fitness since 2023</h3>
    </div>
  );
};

export default Header;
