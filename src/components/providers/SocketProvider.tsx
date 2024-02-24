"use client";

import "react-loading-skeleton/dist/skeleton.css";

import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
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
  const currentUser = ApiHelper.getUser();

  useEffect(() => {
    if (!isLoading && rooms) {
      setRooms(rooms);
      const roomIds = rooms.map((room) => room.id);

      const newSocket = io(`${process.env.SOCKET_URL}`, {
        autoConnect: false,
      });

      newSocket.on("connect", () => {
        console.log("connected");
        newSocket.emit("join-room", { roomIds });
      });

      newSocket.on("disconnect", () => {
        console.log("disconnected");
      });

      newSocket.on("join", (data) => console.log(data));

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [isLoading, rooms]);

  useEffect(() => {
    if (pathname !== "/auth" && !socket?.connected) {
      socket?.connect();
    }
  }, [pathname, socket]);

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
        if (currentUser?.id !== data.from_id) {
          toast.info(data.image ? "You recieved the message" : data.message);
        }
      });

      socket.on("join-call", (data: IRoomResponse | any) => {
        const filteredUsersArray = data.users.map((user: any) => user.id);
        if (filteredUsersArray.includes(user?.id)) {
          const newData = {
            id: data.id,
            messages: data.messages,
            users: data.users,
          };

          const newStorage = [...storage_rooms, newData];
          setRooms([...storage_rooms, newData]);
          const roomIds = newStorage.map((room) => room.id);
          socket.emit("join-room", { roomIds });
        }
      });

      return () => {
        socket.off("message");
        socket.off("join-call");
      };
    }
  }, [socket, storage_rooms]);

  if (isLoading) {
    return (
      <SkeletonTheme baseColor={"#202329"} highlightColor={"#2e333d"}>
        <div
          className={
            "w-full h-full flex items-center justify-center gap-6 p-10"
          }
        >
          <div className="w-full">
            <Skeleton
              style={{ marginBottom: "20px" }}
              count={5}
              width={"100%"}
              height={80}
            />
          </div>
          <div className={"w-full"}>
            <Skeleton width={"100%"} height={500} />
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
