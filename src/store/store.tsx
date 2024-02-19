import { create } from "zustand";

import { IMessage, IRoomResponse } from "@/types/user.types";

interface IRoomStore {
  rooms: IRoomResponse[];
  setRooms: (e: IRoomResponse[]) => void;
}

export const useRoomsMessagesStore = create<IRoomStore>()((set) => ({
  rooms: [],
  setRooms: (e: IRoomResponse[]) => set({ rooms: e }),
}));
