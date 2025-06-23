import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCreateChannelGroup } from "@/hooks/channel-groups/useCreateChannelGroup.hook";
import { useListChannelGroups } from "@/hooks/channel-groups/useListChannelGroups.hook";
import { UserMultiSelect } from "@/components/custom-ui/UserMultiSelect";

export default function ChannelGroupCatalogPage() {
  const [name, setName] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isDistinct, setIsDistinct] = useState(false);
  const [userIds, setUserIds] = useState<string[]>([]);

  const create = useCreateChannelGroup();
  const list = useListChannelGroups();

  const handleCreate = () => {
    create.mutate(
      { name, userIds, coverUrl, isPublic, isDistinct },
      { onSuccess: () => clearForm() }
    );
  };

  const clearForm = () => {
    setName("");
    setCoverUrl("");
    setIsPublic(true);
    setIsDistinct(false);
    setUserIds([]);
    list.refetch();
  };

  return (
    <div className="p-6 space-y-4 max-w-3xl mx-auto">
      <h2 className="text-lg font-bold">Channel Group Management</h2>

      <Card>
        <CardContent className="space-y-2 p-4">
          <Input
            placeholder="Group Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Cover URL"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
          />

          <UserMultiSelect selected={userIds} setSelected={setUserIds} />

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="public"
                checked={isPublic}
                onCheckedChange={(v) => setIsPublic(Boolean(v))}
              />
              <Label htmlFor="public">Public</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="distinct"
                checked={isDistinct}
                onCheckedChange={(v) => setIsDistinct(Boolean(v))}
              />
              <Label htmlFor="distinct">Distinct</Label>
            </div>
          </div>

          <Button onClick={handleCreate}>Create Channel Group</Button>
        </CardContent>
      </Card>

      {list.data?.groups?.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.data.groups.map((group: any) => (
            <Card key={group.id} className="p-4">
              <div className="space-y-1">
                <div className="font-semibold text-lg">{group.name}</div>
                <div className="text-sm text-gray-500">{group.id}</div>
                <div className="text-sm text-gray-500">
                  Members: {group.userIds?.length || 0}
                </div>
                <div className="text-xs">
                  {group.isPublic ? "Public" : "Private"} /{" "}
                  {group.isDistinct ? "Distinct" : "Shared"}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
