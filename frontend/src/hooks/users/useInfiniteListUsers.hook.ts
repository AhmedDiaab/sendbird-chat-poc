// useInfiniteListUsers.hook.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useInfiniteListUsers() {
    return useInfiniteQuery({
        queryKey: ["users-infinite"],
        queryFn: async ({ pageParam = null }) => {
            const { data } = await api.get("/users", {
                params: { token: pageParam, limit: 10 },
            });
            return data;
        },
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    });
}
