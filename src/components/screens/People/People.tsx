"use client";

import avatar from "/public/images/avatar.jpg";
import Image from "next/image";

import { ApiHelper } from "@/api/api.helpers";
import { useSocket } from "@/components/providers/SocketProvider";
import { useGetUsers } from "@/hooks/useGetUsers";
import { Button } from "@/shared/Button/Button";

import styles from "./People.module.scss";

export const People = () => {
  const { users, isLoading } = useGetUsers();
  const { socket } = useSocket();
  const currentUser = ApiHelper.getUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const createRoom = (difUserId: string) => {
    socket?.emit("create-room", { userIds: [currentUser?.id, difUserId] });
  };

  return (
    <main className={styles.wrap}>
      <div className={styles.main}>
        <h1>People</h1>
        {users?.map((user, index) => {
          if (user.id !== currentUser?.id) {
            return (
              <div key={index}>
                <div>
                  <Image src={avatar} width={50} height={50} alt="avatar" />
                  <p>{user.email}</p>
                </div>
                <Button onClick={() => createRoom(user.id)}>Add</Button>
              </div>
            );
          }
          return null;
        })}
      </div>
    </main>
  );
};
