"use client";

import cl from "classnames";
import { usePathname, useRouter } from "next/navigation";

import { useAuthMutations } from "@/hooks/useAuthMutations";

import { Button } from "../Button/Button";
import { Svg } from "../Svg/Svg";
import styles from "./SideBar.module.scss";

export const SideBar = () => {
  const { mutateLogout, isPendingLogout } = useAuthMutations();
  const pathname = usePathname();
  const { push } = useRouter();

  if (pathname === "/auth") {
    return null;
  }

  return (
    <div className={styles.side}>
      <ul>
        <li
          className={cl({ [styles.blueC]: pathname === "/" })}
          onClick={() => push("/")}
        >
          <Svg.Chat blue={pathname === "/"} />
          Chats
        </li>
        <li
          className={cl({ [styles.blueC]: pathname === "/people" })}
          onClick={() => push("/people")}
        >
          <Svg.Friend blue={pathname === "/people"} />
          People
        </li>
      </ul>
      <Button onClick={mutateLogout} disabled={isPendingLogout}>
        Exit
      </Button>
    </div>
  );
};
