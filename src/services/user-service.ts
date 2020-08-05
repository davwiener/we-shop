import axios from "axios";
export const userService = {
  login,
  logout,
  register,
};
function login(username: string, password: string) {
  return axios.post(`/api/auth/signin`, { email: username, password });
}
function register(user: any) {
  return axios.post(`/api/auth/signup`, { ...user });
}
function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}
