"use client";

import cl from "classnames";
import { useRouter } from "next/navigation";

import { ApiHelper } from "@/api/api.helpers";
import { useSocket } from "@/components/providers/SocketProvider";
import { useAuthMutations } from "@/hooks/useAuthMutations";
import { useChat } from "@/hooks/useChat";
import { useCreateRoom } from "@/hooks/useCreateRoom";
import { useGetUsers } from "@/hooks/useGetUsers";
import { Button } from "@/shared/Button/Button";
import { useRoomsMessagesStore } from "@/store/store";

import styles from "./Home.module.scss";

export const Home = () => {
  const { push } = useRouter();
  const { mutateLogout, isPendingLogout } = useAuthMutations();
  const { data: users, isLoading, error } = useGetUsers();
  const rooms = useRoomsMessagesStore((state) => state.rooms);
  const currentUser = ApiHelper.getUser();
  const { socket } = useSocket();

  console.log(currentUser);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <main className={styles.wrap}>
      <div className={"w-full flex items-end justify-end p-4"}>
        <Button onClick={mutateLogout} disabled={isPendingLogout}>
          Logout
        </Button>
      </div>
      <ul>
        {users &&
          currentUser &&
          users.map((user) => (
            <li
              key={user.id}
              className={cl({
                "bg-blue-300": currentUser?.id === user.id,
                "bg-grayBg": currentUser?.id !== user.id,
              })}
            >
              {user.email}
              <span
                className={cl({
                  "text-red": !user.isAdmin,
                  "text-green-500": user.isAdmin,
                })}
              >
                {`${user.isAdmin}`}
              </span>
              {rooms.filter((room) =>
                room.users.filter((userr) => userr.id === user.id)
              ).length > 0 ? null : (
                <Button
                  onClick={() =>
                    socket?.emit("create-room", {
                      userIds: [user.id, currentUser.id],
                    })
                  }
                >
                  Message
                </Button>
              )}
            </li>
          ))}
      </ul>
      <ul>
        {rooms.map((room) => (
          <li key={room.id} className={"bg-slate-950 text-white"}>
            {room.messages[room.messages.length - 1]
              ? room.messages[room.messages.length - 1].message
              : ""}
            <Button onClick={() => push(`/chat/${room.id}`)}>Message</Button>
          </li>
        ))}
      </ul>
    </main>
  );
};
