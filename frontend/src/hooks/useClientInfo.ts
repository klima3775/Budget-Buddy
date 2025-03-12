import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useClientInfo = () => {
  return useQuery({
    queryKey: ["clientInfo"],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:5000/api/mono/client-info",
        {
          withCredentials: true,
        }
      );
      return response.data;
    },

    refetchInterval: 45000,
  });
};

export default useClientInfo;
