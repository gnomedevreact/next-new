"use client";

import { ChangeEvent, useEffect, useState } from "react";

import { ApiHelper } from "@/api/api.helpers";
import { useSocket } from "@/components/providers/SocketProvider";
import { useGetChat } from "@/hooks/useGetChat";
import { Button } from "@/shared/Button/Button";
import { useRoomsMessagesStore } from "@/store/store";
import { useQueryClient } from "@tanstack/react-query";

export const Chat = ({ id }: { id: string }) => {
  const { rooms, setRooms } = useRoomsMessagesStore();
  const room = rooms.filter((roomItem) => roomItem.id === id)[0];
  const [messages, setMessages] = useState(room?.messages);
  const [value, setValue] = useState("");
  const { socket } = useSocket();
  const user = ApiHelper.getUser();

  useEffect(() => {
    console.log(rooms);
  }, [rooms]);

  useEffect(() => {
    if (room) {
      setMessages(room.messages);
      console.log(room);
    }
  }, [room]);

  // useEffect(() => {
  //   console.log(socket);
  //   if (socket) {
  //     socket?.on("message", (data) => {
  //       console.log(data);
  //       const new_storage_messages = storage_rooms.map((stRoom) => {
  //         if (stRoom.id === data.roomId) {
  //           return { ...stRoom, messages: [...stRoom.messages, data] };
  //         }
  //         return stRoom;
  //       });
  //     });
  //   }
  // }, [socket]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const sendMessage = () => {
    const data = {
      roomId: room?.id,
      from_id: user?.id,
      to_id: room?.users.filter((userId) => userId.id !== user?.id)[0].id,
      message: value,
    };

    setValue("");

    console.log(data);
    socket?.emit("room-message", data);
  };

  return (
    <div>
      <ul>
        {messages &&
          messages.map((message, index) => (
            <li key={index}>{message.message}</li>
          ))}
      </ul>
      <form>
        <input type="text" value={value} onChange={onChange} />
      </form>
      <Button onClick={sendMessage}>Send</Button>
    </div>
  );
};
