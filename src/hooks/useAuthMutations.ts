import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ApiHelper } from "@/api/api.helpers";
import { useSocket } from "@/components/providers/SocketProvider";
import { AuthService } from "@/services/auth.service";
import { useRoomsMessagesStore } from "@/store/store";
import { IFormData } from "@/types/auth.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAuthMutations = () => {
  const { replace } = useRouter();
  const { socket } = useSocket();
  const setRooms = useRoomsMessagesStore((state) => state.setRooms);
  const queryClient = useQueryClient();

  const {
    mutate: mutateLogin,
    isPending: isPendingLogin,
    error: errorLogin,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: IFormData) => {
      const promise = AuthService.auth("login", data);
      toast.promise(promise, {
        loading: "Loading...",
      });
      return promise;
    },
    onSuccess({ data }) {
      toast.success("You successfully logged in");
      ApiHelper.setAccessToken(data.accessToken);
      ApiHelper.setUser(data.user);
      replace("/");
    },
    onError() {
      toast.error("An error has occured");
    },
  });

  const {
    mutate: mutateRegister,
    isPending: isPendingRegister,
    error: errorRegister,
  } = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: IFormData) => {
      const promise = AuthService.auth("register", data);
      toast.promise(promise, {
        loading: "Loading...",
      });
      return promise;
    },
    onSuccess({ data }) {
      toast.success("You successfully signed in");
      ApiHelper.setAccessToken(data.accessToken);
      ApiHelper.setUser(data.user);
      replace("/");
    },
    onError() {
      toast.error("An error has occured");
    },
  });

  const { mutate: mutateLogout, isPending: isPendingLogout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => {
      const promise = AuthService.logout();
      toast.promise(promise, {
        loading: "Loading...",
      });
      return promise;
    },
    onSuccess() {
      ApiHelper.removeAccessToken();
      ApiHelper.removeUser();
      setRooms([]);
      socket?.disconnect();
      // queryClient.invalidateQueries();
      replace("/auth");
    },
  });

  return {
    mutateLogin,
    mutateRegister,
    mutateLogout,
    isPendingLogin,
    isPendingRegister,
    isPendingLogout,
    errorLogin,
    errorRegister,
  };
};
