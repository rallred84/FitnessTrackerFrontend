const BASE_URL = 'http://fitnesstrac-kr.herokuapp.com/api';

// USERS
//POST/users/register
export async function registerUser(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();
    // As written below you can log your result
    // to check what data came back from the above code.
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

//POST/users/login
export async function loginUser(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

//GET/users/me
export async function fetchMyProfile(token) {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

//GET/users/:username/routines
//(Gets public routines of any user)

export async function seeUserPublicRoutines(token, usernameOfSearch) {
  try {
    const response = await fetch(
      `${BASE_URL}/users/${usernameOfSearch}/routines`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

//ROUTINES
//GET/routines
export async function getAllRoutines() {
  try {
    const response = await fetch(`${BASE_URL}/routines`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

//ACTIVITIES
//GET/activities
export async function getAllActivities() {
  try {
    const response = await fetch(`${BASE_URL}/activities`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

//POST/ACTIVITIES
//Create a new activity

export async function createActivity(name, description) {
  try {
    const response = await fetch(`${BASE_URL}/activities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}
