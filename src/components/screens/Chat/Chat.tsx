"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { ApiHelper } from "@/api/api.helpers";
import { useSocket } from "@/components/providers/SocketProvider";
import { useGetChat } from "@/hooks/useGetChat";
import { Button } from "@/shared/Button/Button";
import { Svg } from "@/shared/Svg/Svg";
import { useRoomsMessagesStore } from "@/store/store";
import { base64 } from "@/utils/base64";
import { useQueryClient } from "@tanstack/react-query";

import styles from "./Chat.module.scss";
import { Message } from "./Message";

export const Chat = ({ id }: { id: string }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm<{ message: string }>();
  const { rooms, setRooms } = useRoomsMessagesStore();
  const room = rooms.filter((roomItem) => roomItem.id === id)[0];
  const [messages, setMessages] = useState(room?.messages);
  const { socket } = useSocket();
  const user = ApiHelper.getUser();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (room) {
      setMessages(room.messages);
      console.log(room.messages);
    }
  }, [room]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({});
    }
  }, [isSubmitSuccessful]);

  const emitMessage = (message: string, image: boolean) => {
    const objectData = {
      message,
      roomId: room?.id,
      from_id: user?.id,
      to_id: room?.users.filter((userId) => userId.id !== user?.id)[0].id,
      image,
    };

    socket?.emit("room-message", objectData);
  };

  const sendMessage = async (data: { message: string }) => {
    if (!value) return;

    emitMessage(value, false);

    setValue("");
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      try {
        const base64Image = await base64(file);
        emitMessage(base64Image, true);
      } catch (error) {
        console.error(
          "Ошибка при преобразовании файла в base64:",
          //@ts-ignore
          error.message
        );
      }
    }
  }

  const forceInputClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <div className={"w-full"}>
      <ul
        className={"flex flex-col gap-[30px] max-h-[500px] overflow-y-auto p-8"}
      >
        {messages &&
          messages.map((message, index) => (
            <Message
              key={index}
              image={message.image}
              own={message.from_id === user?.id}
              message={message.message}
            />
          ))}
      </ul>
      <form onSubmit={handleSubmit(sendMessage)} className={styles.form}>
        <input
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleImageUpload}
        />
        <Svg.Attach onClick={forceInputClick} />
        <input
          type="text"
          {...register("message")}
          placeholder="Your message..."
          value={value}
          onChange={onChange}
        />
      </form>
    </div>
  );
};
