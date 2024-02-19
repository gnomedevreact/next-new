import { axiosAuth } from "@/api/interceptors";
import { IUser } from "@/types/auth.types";
import { IRoomCreate, IRoomResponse } from "@/types/user.types";

export const UsersService = {
  async getAllUsers() {
    return await axiosAuth.get<IUser[]>("/users/get-all");
  },

  async getUserRooms() {
    return await axiosAuth.get<IRoomResponse[]>("/chat/rooms");
  },

  async createOrGetRoom(data: { userIds: string[] }) {
    return await axiosAuth.post<IRoomCreate>("/chat/create-room", data);
  },

  async getByIdRoom(id: string) {
    return await axiosAuth.get<IRoomResponse>(`/chat/by-id/${id}`);
  },
};
