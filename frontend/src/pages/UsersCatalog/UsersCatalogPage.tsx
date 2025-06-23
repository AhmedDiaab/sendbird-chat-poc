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
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const list = useListUsers({ token: pageToken });
  const create = useCreateUser();
  const update = useUpdateUser();
  const remove = useDeleteUser();
  const view = useViewUser();
  const generateToken = useGenerateToken();

  const handleSelect = (user: any) => {
    setSelectedId(user.userId);
    setNickname(user.nickname || "");
    setProfileUrl(user.profileUrl || "");
    setIsActive(Boolean(user.isActive));
  };

  const handleCreate = () => {
    create.mutate(
      { nickName: nickname, avatar: profileUrl },
      {
        onSuccess: () => {
          clearForm();
          list.refetch();
        },
      }
    );
  };

  const handleUpdate = () => {
    if (!selectedId) return;
    update.mutate(
      { userId: selectedId, nickname, profileUrl, isActive },
      {
        onSuccess: () => {
          clearForm();
          list.refetch();
        },
      }
    );
  };

  const clearForm = () => {
    setSelectedId(null);
    setNickname("");
    setProfileUrl("");
    setIsActive(true);
  };

  const nextPage = () => list.data?.next && setPageToken(list.data.next);
  const firstPage = () => setPageToken(null);

  return (
    <div className="p-6 space-y-4 max-w-4xl mx-auto">
      <h2 className="text-lg font-bold">User Management</h2>

      {/* Form */}
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
              onCheckedChange={(v: any) => setIsActive(Boolean(v))}
            />
            <Label htmlFor="active">Active</Label>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleCreate}>Create</Button>
            {selectedId && (
              <Button variant="secondary" onClick={handleUpdate}>
                Save Changes
              </Button>
            )}
            <Button variant="outline" onClick={() => list.refetch()}>
              Refresh List
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.data?.users?.map((user: any) => (
          <Card
            key={user.userId}
            className={`p-4 cursor-pointer ${
              selectedId === user.userId ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => handleSelect(user)}
          >
            <div className="flex items-center gap-4">
              <img
                src={user.profileUrl || "https://via.placeholder.com/40"}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-semibold">{user.nickname}</div>
                <div className="text-sm text-gray-500">{user.userId}</div>
                <div
                  className={
                    user.isActive
                      ? "text-xs text-green-600"
                      : "text-xs text-red-500"
                  }
                >
                  {user.isActive ? "Active" : "Inactive"}
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
              <Button size="sm" onClick={() => handleSelect(user)}>
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => remove.mutate(user.userId)}
              >
                Delete
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => view.mutate(user.userId)}
              >
                View
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => generateToken.mutate(user.userId)}
              >
                Token
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={firstPage} disabled={!pageToken}>
          First Page
        </Button>
        <Button
          variant="outline"
          onClick={nextPage}
          disabled={!list.data?.next}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
}
