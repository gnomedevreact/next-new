import avatar from "/public/images/avatar.jpg";
import cl from "classnames";
import Image from "next/image";

import styles from "./Room.module.scss";

interface IRoom {
  name: string;
  message: string | null;
  onClick: () => void;
  currentId: string;
  roomId: string;
  image: boolean;
}

export const Room = ({
  message,
  name,
  onClick,
  currentId,
  roomId,
  image,
}: IRoom) => {
  return (
    <div
      className={cl(styles.room, {
        "bg-blue": currentId === roomId,
        "bg-lightGray": currentId !== roomId,
      })}
      onClick={onClick}
    >
      <Image
        src={avatar}
        width={50}
        height={50}
        alt="avatar"
        className={"rounded-xl"}
      />
      <div>
        <p>{name}</p>
        <p>{image ? "Image" : message}</p>
      </div>
    </div>
  );
};
