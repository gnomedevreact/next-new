import { ApiHelper } from "@/api/api.helpers";
import { axiosAuth, axiosClassic } from "@/api/interceptors";
import { IAuthResponse } from "@/types/auth.types";

import { IFormData } from "../types/auth.types";

export const AuthService = {
  async auth(type: "register" | "login", data: IFormData) {
    return await axiosClassic.post<IAuthResponse>(`/auth/${type}`, data);
  },

  async logout() {
    return await axiosAuth.post("/auth/logout");
  },

  async getNewTokens() {
    const response = await axiosClassic.post<IAuthResponse>(
      "/auth/access-token"
    );

    if (response.data.accessToken) {
      ApiHelper.setAccessToken(response.data.accessToken);
    }

    return response;
  },

  async googleAuth() {
    return await axiosClassic.get("/google");
  },
};
