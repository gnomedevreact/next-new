import { useRouter } from "next/navigation";

import { UsersService } from "@/services/users.service";
import { useMutation } from "@tanstack/react-query";

export const useCreateRoom = () => {
  const { push } = useRouter();

  const { mutate: createRoom } = useMutation({
    mutationKey: ["create room"],
    mutationFn: (data: { userIds: string[] }) =>
      UsersService.createOrGetRoom(data),
    onSuccess({ data }) {
      push(`/chat/${data.id}`);
    },
  });

  return { createRoom };
};
