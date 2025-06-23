import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useListUsers } from "@/hooks/users/useListUsers.hook";
import { useCreateUser } from "@/hooks/users/useCreateUser.hook";
import { useUpdateUser } from "@/hooks/users/useUpdateUser.hook";
import { useDeleteUser } from "@/hooks/users/useDeleteUser.hook";
import { useViewUser } from "@/hooks/users/useViewUser.hook";
import { useGenerateToken } from "@/hooks/users/useGenerateToken.hook";

export default function UserCatalogPage() {
  const [nickname, setNickname] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [pageToken, setPageToken] = useState<string | null>(null);

  const list = useListUsers({ token: pageToken, enabled: !!pageToken || pageToken === null });
  const create = useCreateUser();
  const update = useUpdateUser();
  const remove = useDeleteUser();
  const view = useViewUser();
  const generateToken = useGenerateToken();

  const nextPage = () => {
    if (list.data?.next) {
      setPageToken(list.data.next);
    }
  };

  const prevPage = () => {
    setPageToken(null);
  };

  return (
    <div className="p-6 space-y-4 max-w-4xl mx-auto">
      <h2 className="text-lg font-bold">User Management</h2>
      <Card>
        <CardContent className="space-y-2 p-4">
          <Input
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Input
            placeholder="Profile URL"
            value={profileUrl}
            onChange={(e) => setProfileUrl(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <Checkbox
              id="active"
              checked={isActive}
              onCheckedChange={(v) => setIsActive(Boolean(v))}
            />
            <Label htmlFor="active">Active</Label>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => create.mutate({ nickName: nickname, avatar: profileUrl })}>
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
                <div className={user.isActive ? "text-xs text-green-600" : "text-xs text-red-500"}>
                  {user.isActive ? "Active" : "Inactive"}
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
              <Button
                size="sm"
                onClick={() =>
                  update.mutate({
                    userId: user.userId,
                    nickname: `${user.nickname} (Updated)`,
                    profileUrl: user.profileUrl,
                    isActive: !user.isActive,
                  })
                }
              >
                Toggle Active
              </Button>
              <Button size="sm" variant="destructive" onClick={() => remove.mutate(user.userId)}>
                Delete
              </Button>
              <Button size="sm" variant="outline" onClick={() => view.mutate(user.userId)}>
                View
              </Button>
              <Button size="sm" variant="outline" onClick={() => generateToken.mutate(user.userId)}>
                Token
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={prevPage} disabled={!pageToken}>
          First Page
        </Button>
        <Button variant="outline" onClick={nextPage} disabled={!list.data?.next}>
          Next Page
        </Button>
      </div>
    </div>
  );
}
