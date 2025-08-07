import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useOpenChannelMembers } from "@/hooks/open-channels/useOpenChannelMembers.hook";
import { useAddOpenChannelMembers } from "@/hooks/open-channels/useAddOpenChannelMembers.hook";
import { useRemoveOpenChannelMembers } from "@/hooks/open-channels/useRemoveOpenChannelMembers.hook";
import { useState } from "react";
import { UserMultiSelect } from "@/components/custom-ui/UserMultiSelect";

export default function OpenChannelManageMembersPage() {
  const { url } = useParams();
  const members = useOpenChannelMembers(url!);
  const add = useAddOpenChannelMembers();
  const remove = useRemoveOpenChannelMembers();

  const [selectedToAdd, setSelectedToAdd] = useState<string[]>([]);
  const [selectedToRemove, setSelectedToRemove] = useState<string[]>([]);

  const handleAdd = () => {
    if (!url || selectedToAdd.length === 0) return;
    add.mutate(
      { channelUrl: url, userIds: selectedToAdd },
      {
        onSuccess: () => {
          setSelectedToAdd([]);
          members.refetch();
        },
      }
    );
  };

  const handleRemove = () => {
    if (!url) return;
    if (!selectedToRemove?.length) {
      remove.mutate(
        { channelUrl: url, userIds: [], shouldLeaveAll: true },
        {
          onSuccess: () => {
            setSelectedToRemove([]);
            members.refetch();
          },
        }
      );
    } else {
      remove.mutate(
        { channelUrl: url, userIds: selectedToRemove, shouldLeaveAll: false },
        {
          onSuccess: () => {
            setSelectedToRemove([]);
            members.refetch();
          },
        }
      );
    }
  };

  return (
    <div className="p-6 space-y-4 max-w-3xl mx-auto">
      <h2 className="text-lg font-bold">Manage Members of Channel: {url}</h2>

      <Card>
        <CardContent className="p-4 space-y-4">
          <h4 className="font-semibold">Add Users</h4>
          <UserMultiSelect
            selected={selectedToAdd}
            setSelected={setSelectedToAdd}
            hiddenIds={members.data?.map((member: any) => member.userId)}
          />
          <Button onClick={handleAdd} disabled={add.isPending}>
            Add Selected Users
          </Button>

          <h4 className="font-semibold pt-4">Current Members</h4>
          <div className="space-y-2">
            {members.data?.map((user: any) => (
              <div
                key={user.userId}
                className="flex items-center justify-between"
              >
                <span>{user.nickname}</span>
                <Button
                  size="sm"
                  variant={
                    selectedToRemove.includes(user.userId)
                      ? "secondary"
                      : "outline"
                  }
                  onClick={() =>
                    setSelectedToRemove((prev) =>
                      prev.includes(user.userId)
                        ? prev.filter((id) => id !== user.userId)
                        : [...prev, user.userId]
                    )
                  }
                >
                  {selectedToRemove.includes(user.userId)
                    ? "Unmark"
                    : "Mark to Remove"}
                </Button>
              </div>
            ))}
          </div>
          <Button
            variant="destructive"
            className="mt-2"
            onClick={handleRemove}
            disabled={remove.isPending}
          >
            Remove Marked Users
          </Button>

          <Button
            variant="destructive"
            className="mt-2 ml-2"
            onClick={handleRemove}
            disabled={remove.isPending}
          >
            Clear All Members
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
