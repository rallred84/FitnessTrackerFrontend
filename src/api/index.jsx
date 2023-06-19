const BASE_URL = 'https://fitnesstrac-kr.herokuapp.com/api';

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

//POST/routines
//creates a new routine

export async function createRoutine(token, name, goal, isPublic) {
  try {
    const response = await fetch(`${BASE_URL}/routines`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

//POST/routines/:routineId/activities
//Attaches a single activity to a routine

export async function addActivityToRoutine(
  routineId,
  activityId,
  count,
  duration
) {
  try {
    const response = await fetch(
      `${BASE_URL}/routines/${routineId}/activities`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activityId,
          count,
          duration,
        }),
      }
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

//PATCH/routines/:routineId
//Edit existing routine

export async function editRoutine(token, routineId, editFields) {
  try {
    const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editFields),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

//DELETE/routines/:routineId
//Permanentyly deletes a routine

export async function deleteRoutine(token, routineId) {
  try {
    const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
      method: 'DELETE',
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

//ACTIVITIES
//GET/activities
export async function getAllActivities() {
  try {
    const response = await fetch(`${BASE_URL}/activities`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

//POST/ACTIVITIES
//Create a new activity

export async function createActivity(token, name, description) {
  try {
    const response = await fetch(`${BASE_URL}/activities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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

//DELETE /routine_activities/:routineActivityId
//remove activity from routine

export async function removeActivityFromRoutine(routineActivityId, token) {
  try {
    const response = await fetch(
      `${BASE_URL}/routine_activities/${routineActivityId}`,
      {
        method: 'DELETE',
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

//PATCH /routine_activities/:routineActivityId

export async function editCountAndDuration(token, routineId, editFields) {
  try {
    const response = await fetch(
      `${BASE_URL}/routine_activities/${routineId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editFields),
      }
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}
