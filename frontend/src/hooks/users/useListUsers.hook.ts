import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useListUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await api.get("/users");
            return data;
        },
    });
}