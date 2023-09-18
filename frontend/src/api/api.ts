import axios, { AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  withCredentials: true,
});

export const connectApi = async <T>(
  url: string,
  method = "GET",
  data?: unknown,
  object?: object
) => {
  const res: AxiosResponse<T> = await api({
    url,
    method: method.toUpperCase(),
    data,
    ...object,
  });

  return res.data;
};
export const postThePosts = async <T>(data: unknown, token: string) => {
  const res: AxiosResponse<T> = await api({
    url: "/post",
    method: "POST",
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
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

export const infoAcc = async <T>(token: string) => {
  const res: AxiosResponse<T> = await api.get("/account", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const refreshAcc = async <T>() => {
  const res: AxiosResponse<T> = await api.put("/login");
  return res.data;
};
