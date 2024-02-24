"use client";

import { useEffect, useState } from "react";

import { ApiHelper } from "@/api/api.helpers";
import { Room } from "@/shared/Room/Room";
import { useRoomsMessagesStore } from "@/store/store";
import { IUserRoom } from "@/types/user.types";

import { Chat } from "../Chat/Chat";
import styles from "./Home.module.scss";

export const Home = () => {
  const rooms = useRoomsMessagesStore((state) => state.rooms);
  const currentUser = ApiHelper.getUser();
  const [currentChatId, setCurrentChatId] = useState<string>("");

  useEffect(() => {
    if (rooms.length > 0 && !currentChatId) {
      const chatId = localStorage.getItem("chat");
      setCurrentChatId(chatId || rooms[0].id);
    }
  }, [rooms]);

  const findDifUser = (users: IUserRoom[]) => {
    const difUser = users.filter((user) => user.id !== currentUser?.id)[0];

    return difUser;
  };

  const setCurrentChat = (id: string) => {
    setCurrentChatId(id);
    localStorage.setItem("chat", id);
  };

  return (
    <main className={styles.wrap}>
      <div className={styles.main}>
        <div>
          <h1>Chats</h1>
          {rooms.map((room, index) => (
            <Room
              key={index}
              image={
                room.messages.length > 0
                  ? room.messages[room.messages.length - 1].image
                  : false
              }
              roomId={room.id}
              currentId={currentChatId}
              onClick={() => setCurrentChat(room.id)}
              name={findDifUser(room.users).email}
              message={
                room.messages.length > 0
                  ? room.messages[room.messages.length - 1].message
                  : null
              }
            />
          ))}
        </div>
        <div className={styles.chat}>
          <h1>Messages</h1>
          <Chat id={currentChatId} />
        </div>
      </div>
    </main>
  );
};
