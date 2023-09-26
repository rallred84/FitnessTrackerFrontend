import { useEffect, useState } from 'react';
import './login.css';
import { registerUser, loginUser } from '../../api';
import { useNavigate, useOutletContext } from 'react-router';

const Login = () => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('');
  const [registerFormError, setRegisterFormError] = useState('');
  const { myProfile, setToken } = useOutletContext();

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginFormError, setLoginFormError] = useState('');
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    console.log(
      `Username ${registerUsername}, Password ${registerPassword} PasswordConfirm ${registerPasswordConfirm}`
    );

    if (registerPassword !== registerPasswordConfirm) {
      setRegisterFormError('Passwords Do Not Match');
      return;
    }
    if (registerPassword.length < 8) {
      setRegisterFormError('Password must be 8 or more characters long');
      return;
    }

    const newUser = await registerUser(registerUsername, registerPassword);
    if (!newUser.user) {
      setRegisterFormError(newUser.error);
      return;
    }

    console.log(newUser);
    localStorage.setItem('token', newUser.token);
    setToken(newUser.token);
    navigate('/my-routines');
  }

  async function handleLogin(e) {
    e.preventDefault();
    const loggedInUser = await loginUser(loginUsername, loginPassword);
    if (!loggedInUser.user) {
      setLoginFormError(loggedInUser.error);
      return;
    }
    console.log(loggedInUser);
    localStorage.setItem('token', loggedInUser.token);
    setToken(loggedInUser.token);
    navigate('/my-routines');
  }

  return (
    <>
      <h3>Register</h3>
      <form id="register-form" onSubmit={handleRegister}>
        <input
          placeholder="Create Username"
          type="text"
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          placeholder="Create Password"
          type="password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <input
          placeholder="Confirm Password"
          type="password"
          value={registerPasswordConfirm}
          onChange={(e) => setRegisterPasswordConfirm(e.target.value)}
        />
        <button type="submit">Create New User</button>
        {registerFormError}
      </form>

      <h3>Login</h3>
      <form id="login-form" onSubmit={handleLogin}>
        <input
          placeholder="Username"
          type="text"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {loginFormError}
      </form>
    </>
  );
};

export default Login;
