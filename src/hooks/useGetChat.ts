import { UsersService } from "@/services/users.service";
import { useQuery } from "@tanstack/react-query";

export const useGetChat = (id: string) => {
  const { data: room, isLoading } = useQuery({
    queryKey: ["get room by id"],
    queryFn: () => UsersService.getByIdRoom(id),
    select: ({ data }) => data,
  });

  return { room, isLoading };
};
