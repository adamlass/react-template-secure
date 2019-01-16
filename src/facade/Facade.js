import { handleHttpErrors, makeOptions, setToken, getToken } from "../utils/FacadeUtils";
const URI = "http://localhost:8084"


class ApiFacade {

  //Don't delete
  getURI = () => {
    return URI
  }

  getAll = async () => {
    try {
      const res = await fetch(URI)
      console.log(res)
      const json = await handleHttpErrors(res)
      return json
    } catch (error) {
      alert("Status: " + error.status + "\nFull Error: " + JSON.stringify(error.fullError))
    }
  }

  //Don't delete

  //Login and signup

  //Logs in the user
  login = async (email, pass) => {
    const options = makeOptions("POST", true, { email: email, password: pass })
    try {
      const res = await fetch(URI + "/api/login", options, true)
      const json = await (handleHttpErrors(res))
      setToken(json.token)
    } catch (e) {
      return e;
    }
  }

  //returns true if user is logged in
  loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  }

  //clears localStorage
  logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
  }

  //Signs up user
  signUp = async (email, pass) => {
    const options = makeOptions("POST", true, { email: email, password: pass })
    try {
      const res = await fetch(URI + "/api/users", options)
      const json = await (handleHttpErrors(res))
      setToken(json.token)
    } catch (e) {
      return e;
    }
  }

  //Admin - Users

  //Returns promise - Contains array of all users
  getUsers = async () => {
    const options = makeOptions("GET", true)
    return await fetch(URI + "/api/users", options).then(handleHttpErrors)
  }

  //Returns promise - Contains edited user {email and role}
  editUser = async (email) => {
    const options = makeOptions("PUT", true)
    return await fetch(URI + `/api/users/${email}`, options).then(handleHttpErrors)
  }

  //Returns promise - Contains array of all roles
  getRoles = async () => {
    const options = makeOptions("GET", true)
    return await fetch(URI + "/api/roles", options).then(handleHttpErrors)
  }
}
const facade = new ApiFacade();
export default facade;