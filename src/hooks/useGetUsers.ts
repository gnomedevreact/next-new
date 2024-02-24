import { UsersService } from "@/services/users.service";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get all users"],
    queryFn: () => UsersService.getAllUsers(),
    select: ({ data }) => data,
  });

  return { users, isLoading, error };
};
