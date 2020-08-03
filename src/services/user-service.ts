import axios from "axios";
export const userService = {
  login,
  logout,
  register,
};
function login(username: string, password: string) {
  return axios
    .post(`/api/auth/signin`, { email: username, password })
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
}
function register(user: any) {
  return axios.post(`/api/auth/signup`, { ...user }).then((retUser) => {
    return retUser;
  });
}
function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}
