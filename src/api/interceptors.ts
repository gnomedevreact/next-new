import axios, { CreateAxiosDefaults } from "axios";

import { AuthService } from "@/services/auth.service";

import { ApiHelper } from "./api.helpers";
import { errorCatch } from "./error";

// https://nest-new.onrender.com/api
// http://localhost:7000/api

const options: CreateAxiosDefaults = {
  baseURL: "https://nest-new.onrender.com/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

const axiosClassic = axios.create(options);
const axiosAuth = axios.create(options);

axiosAuth.interceptors.request.use((config) => {
  const accessToken = ApiHelper.getAccessToken();

  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 ||
      errorCatch(error) === "jwt expired" ||
      errorCatch(error) === "jwt must be provided" ||
      (errorCatch(error) === "refresh token was not provided" &&
        error.config &&
        !originalRequest._isRetry)
    ) {
      originalRequest._isRetry = true;
      try {
        await AuthService.getNewTokens();
        return axiosAuth.request(originalRequest);
      } catch (err) {
        if (
          errorCatch(err) === "jwt expired" ||
          errorCatch(err) === "refresh token was not provided"
        )
          ApiHelper.removeAccessToken();
        ApiHelper.removeUser();
      }
    }

    throw error;
  }
);

export { axiosClassic, axiosAuth };
