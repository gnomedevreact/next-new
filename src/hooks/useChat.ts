import { UsersService } from "@/services/users.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useChat = () => {
  // const queryClient = useQueryClient();
  // queryClient.invalidateQueries({ queryKey: ["get rooms"] });

  const { data: rooms, isLoading } = useQuery({
    queryKey: ["get rooms"],
    queryFn: () => UsersService.getUserRooms(),
    select: ({ data }) => data,
  });

  return { rooms, isLoading };
};
