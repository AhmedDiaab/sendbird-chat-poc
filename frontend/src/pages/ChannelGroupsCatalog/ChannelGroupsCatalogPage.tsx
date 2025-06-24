import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCreateChannelGroup } from "@/hooks/channel-groups/useCreateChannelGroup.hook";
import { useListChannelGroups } from "@/hooks/channel-groups/useListChannelGroups.hook";
import { UserMultiSelect } from "@/components/custom-ui/UserMultiSelect";
import { truncate } from "@/utils/truncate.util";

export default function ChannelGroupCatalogPage() {
  const [name, setName] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isDistinct, setIsDistinct] = useState(false);
  const [userIds, setUserIds] = useState<string[]>([]);

  const [pageToken, setPageToken] = useState<string | null>(null);
  const list = useListChannelGroups({ token: pageToken });

  const nextPage = () => {
    if (list.data?.next) setPageToken(list.data.next);
  };

  const prevPage = () => {
    setPageToken(null);
  };

  const create = useCreateChannelGroup();
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

      {list.data?.channels?.length > 0 && (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          {list.data.channels?.map((channel: any) => (
            <Card key={channel.id} className="p-4">
              <div className="space-y-1">
                <div className="font-semibold text-lg">{channel.name}</div>
                <div className="font-semibold text-lg">{truncate(channel.channelUrl)}</div>
                <div className="text-sm text-gray-500">{channel.id}</div>
                <div className="text-sm text-gray-500">
                  Members: {channel.memberCount || 0}
                </div>
                <div className="text-xs">
                  {channel.isPublic ? "Public" : "Private"} /{" "}
                  {channel.isDistinct ? "Distinct" : "Shared"}/{" "}
                  {channel.isAccessCodeRequired ? "Access Code Required" : "No Access Code Required"}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
