"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

import { ApiHelper } from "@/api/api.helpers";
import { useChat } from "@/hooks/useChat";
import { useRoomsMessagesStore } from "@/store/store";
import { IRoomResponse } from "@/types/user.types";
import { useQueryClient } from "@tanstack/react-query";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { rooms, isLoading } = useChat();
  const pathname = usePathname();
  const [socket, setSocket] = useState<Socket | null>(null);
  const storage_rooms = useRoomsMessagesStore((state) => state.rooms);
  const setRooms = useRoomsMessagesStore((state) => state.setRooms);

  useEffect(() => {
    if (!isLoading && rooms) {
      console.log(rooms);
      setRooms(rooms);
      const roomIds = rooms.map((room) => room.id);

      const newSocket = io("wss://next-new-nu.vercel.app");

      newSocket.on("connect", () => {
        console.log("connected");
        newSocket.emit("join-room", { roomIds });
      });

      newSocket.on("join", (data) => console.log(data));

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [isLoading]);

  useEffect(() => {
    if (socket) {
      const user = ApiHelper.getUser();

      socket.on("message", (data) => {
        const new_storage_messages = storage_rooms.map((stRoom) => {
          if (stRoom.id === data.roomId) {
            return { ...stRoom, messages: [...stRoom.messages, data] };
          }
          return stRoom;
        });
        setRooms(new_storage_messages);
        console.log(storage_rooms);
        toast.info(data.message);
      });

      socket.on("join-call", (data: IRoomResponse | any) => {
        console.log(data);
        if (data.users.includes(user?.id)) {
          const newData = {
            id: data.id,
            messages: data.messages,
            users: data.users.map((user: string) => ({ id: user })),
          };

          const newStorage = [...storage_rooms, newData];
          setRooms([...storage_rooms, newData]);
          const roomIds = newStorage.map((room) => room.id);
          console.log(roomIds);
          socket.emit("join-room", { roomIds });
        }
      });
    }
  }, [socket, storage_rooms]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
