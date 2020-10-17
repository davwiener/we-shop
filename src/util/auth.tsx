export const addInterceptors = (axios: any) => {
  axios.interceptors.request.use(
    (req: any) => {
      req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
      return req;
    },
    (err: any) => Promise.reject(err)
  );

  axios.interceptors.response.use(
    (res: any) => {
      return res;
    },
    (error: any) => {
      if (error.response.status === 401) {
        return (window.location.href = "/login");
      }
    }
  );
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};
