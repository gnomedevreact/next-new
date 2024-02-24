import { usePathname } from "next/navigation";

import { UsersService } from "@/services/users.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useChat = () => {
  const pathname = usePathname();

  const { data: rooms, isLoading } = useQuery({
    queryKey: ["get rooms"],
    queryFn: () => UsersService.getUserRooms(),
    select: ({ data }) => data,
    enabled: pathname !== "/auth",
  });

  return { rooms, isLoading };
};
