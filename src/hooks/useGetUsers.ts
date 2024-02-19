import { UsersService } from "@/services/users.service";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get all users"],
    queryFn: () => UsersService.getAllUsers(),
    select: ({ data }) => data,
  });

  return { data, isLoading, error };
};
