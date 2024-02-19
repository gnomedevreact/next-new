import cl from "classnames";

import styles from "./Button.module.scss";

interface IButton {
  children: React.ReactNode;
  onClick?: () => void;
  classNames?: string;
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  classNames,
  disabled,
}: IButton) => {
  return (
    <button
      className={cl(styles.btn, classNames)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
