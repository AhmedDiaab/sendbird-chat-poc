import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useListUsers } from "@/hooks/users/useListUsers.hook";
import { useCreateUser } from "@/hooks/users/useCreateUser.hook";
import { useUpdateUser } from "@/hooks/users/useUpdateUser.hook";
import { useDeleteUser } from "@/hooks/users/useDeleteUser.hook";
import { useViewUser } from "@/hooks/users/useViewUser.hook";
import { useGenerateToken } from "@/hooks/users/useGenerateToken.hook";

export default function UserCatalogPage() {
  const [nickName, setNickName] = useState("");
  const [avatar, setAvatar] = useState("");

  const list = useListUsers();
  const create = useCreateUser();
  const update = useUpdateUser();
  const remove = useDeleteUser();
  const view = useViewUser();
  const generateToken = useGenerateToken();

  return (
    <div className="p-6 space-y-4 max-w-4xl mx-auto">
      <h2 className="text-lg font-bold">User Management</h2>
      <Card>
        <CardContent className="space-y-2 p-4">
          <Input
            placeholder="Nickname"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
          <Input
            placeholder="Avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => create.mutate({ nickName, avatar })}>
              Create
            </Button>
            <Button variant="outline" onClick={() => list.refetch()}>
              Refresh List
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.data?.users?.map((user: any) => (
          <Card key={user.userId} className="p-4">
            <div className="flex items-center gap-4">
              <img
                src={user.profileUrl || "https://via.placeholder.com/40"}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-semibold">{user.nickname}</div>
                <div className="text-sm text-gray-500">{user.userId}</div>
              </div>
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
              <Button size="sm" onClick={() => update.mutate({ userId: user.userId, nickName: `${user.nickname} (Updated)`, avatar: `${user.profileUrl } (Updated)` })}>Update</Button>
              <Button size="sm" variant="destructive" onClick={() => remove.mutate(user.userId)}>Delete</Button>
              <Button size="sm" variant="outline" onClick={() => view.mutate(user.userId)}>View</Button>
              <Button size="sm" variant="outline" onClick={() => generateToken.mutate(user.userId)}>Token</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
