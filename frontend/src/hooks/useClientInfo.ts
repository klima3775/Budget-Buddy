import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useClientInfo = () => {
  return useQuery({
    queryKey: ["clientInfo"],
    queryFn: async () => {
      const response = await axios.get("/api/client-info", {
        withCredentials: true,
      });
      return response.data;
    },
    staleTime: 45000,
    refetchInterval: 45000,
  });
};

export default useClientInfo;
