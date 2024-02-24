import avatar from "/public/images/avatar.jpg";
import cl from "classnames";
import Image from "next/image";

import styles from "./Chat.module.scss";

interface IMessage {
  message: string;
  own: boolean;
  image: boolean;
}

export const Message = ({ message, own, image }: IMessage) => {
  return (
    <div
      className={cl(styles.message, {
        [styles.ownMessage]: own,
        [styles.difMessage]: !own,
      })}
    >
      {!own && <Image src={avatar} width={50} height={50} alt="avatar" />}
      {!image && <div>{message}</div>}
      {image && (
        <div>
          <img src={message} alt="image-message" />
        </div>
      )}
      {own && <Image src={avatar} width={50} height={50} alt="avatar" />}
    </div>
  );
};
