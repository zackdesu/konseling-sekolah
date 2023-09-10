import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const useApi = async (
  url: string,
  method: string = "GET",
  data?: unknown
) => {
  try {
    const res = await api({
      url,
      method: method.toUpperCase(),
      data,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

// api.interceptors.request.use(
//   async (config) => {
//     const currentTime = new Date().getTime();

//     if (data && data.exp * 1000 < currentTime) {
//       const res: IAPISuccess = await refreshAcc();
//       config.headers.Authorization = `Bearer ${res.token}`;
//       const decoded = res.token && jwt(res.token);
//       setData(decoded as IToken);
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const infoAcc = async (token: string) => {
  try {
    const res = await api.get("/account", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const refreshAcc = async () => {
  try {
    const res = await api.put("/login");
    return res.data;
  } catch (error) {
    throw error;
  }
};
