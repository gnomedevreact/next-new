import Cookies from "js-cookie";

import { EnumTokens } from "@/types/enums";

import { IUser } from "../types/auth.types";

export const ApiHelper = {
  getAccessToken() {
    const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
    return accessToken || null;
  },

  setAccessToken(accessToken: string) {
    Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
      domain: "https://next-new-nu.vercel.app",
      sameSite: "strict",
      expires: 1,
    });
  },

  removeAccessToken() {
    Cookies.remove(EnumTokens.ACCESS_TOKEN);
  },

  getUser() {
    const user = Cookies.get("user");

    if (!user) {
      return null;
    }

    const parsedUser: IUser = JSON.parse(user);

    return parsedUser;
  },

  setUser(user: IUser) {
    Cookies.set("user", JSON.stringify(user));
  },

  removeUser() {
    Cookies.remove("user");
  },
};
