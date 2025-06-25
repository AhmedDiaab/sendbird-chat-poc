import { useChatStore } from "@/store/chatStore";
import { useListUsers } from "@/hooks/users/useListUsers.hook";

export function UserSelector() {
  const { data } = useListUsers({ token: null });
  const setCurrentUser = useChatStore((s) => s.setCurrentUser);

  return (
    <div className="p-6 space-y-2 max-w-md mx-auto">
      <h2 className="font-bold text-lg">Select User</h2>
      {data?.users?.map((u: any) => (
        <button
          key={u.userId}
          className="block w-full text-left border p-2 hover:bg-gray-100"
          onClick={() =>
            setCurrentUser({ userId: u.userId, nickname: u.nickname })
          }
        >
          {u.nickname}
        </button>
      ))}
    </div>
  );
}
