import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCreateOpenChannel } from "@/hooks/open-channels/useCreateOpenChannel.hook";
import { useListOpenChannel } from "@/hooks/open-channels/useListOpenChannel.hook";
import { useDeleteOpenChannel } from "@/hooks/open-channels/useDeleteOpenChannel.hook";
import { useUpdateOpenChannel } from "@/hooks/open-channels/useUpdateOpenChannel.hook";
import { UserMultiSelect } from "@/components/custom-ui/UserMultiSelect";
import { truncate } from "@/utils/truncate.util";
import { useNavigate } from "react-router-dom";

export default function OpenChannelsCatalogPage() {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isDistinct, setIsDistinct] = useState(false);
  const [userIds, setUserIds] = useState<string[]>([]);
  const [selectedChannelUrl, setSelectedChannelUrl] = useState<string | null>(
    null
  );

  const [pageToken, setPageToken] = useState<string | null>(null);
  const list = useListOpenChannel({ token: pageToken });
  const create = useCreateOpenChannel();
  const update = useUpdateOpenChannel();
  const remove = useDeleteOpenChannel();

  const nextPage = () => list.data?.next && setPageToken(list.data.next);
  const prevPage = () => setPageToken(null);

  const navigate = useNavigate();

  const clearForm = () => {
    setName("");
    setCoverUrl("");
    setIsPublic(true);
    setIsDistinct(false);
    setUserIds([]);
    setSelectedChannelUrl(null);
    list.refetch();
  };

  const handleSubmit = () => {
    if (selectedChannelUrl) {
      update.mutate(
        {
          channelUrl: selectedChannelUrl,
          coverUrl,
          organization,
          isDistinct,
          isPublic,
          name,
        },
        {
          onSuccess: clearForm,
        }
      );
    } else {
      create.mutate(
        { name, organization ,userIds, coverUrl, isPublic, isDistinct },
        { onSuccess: clearForm }
      );
    }
    list.refetch();
  };

  const handleSelect = (channel: any) => {
    setSelectedChannelUrl(channel.channelUrl);
    setName(channel.name || "");
    setCoverUrl(channel.coverUrl || "");
    setIsPublic(channel.isPublic);
    setIsDistinct(channel.isDistinct);
    setUserIds(channel.members?.map((m: any) => m.userId) || []);
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
            placeholder="Group Organization"
            value={name}
            onChange={(e) => setOrganization(e.target.value)}
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

          <div className="flex gap-2 flex-wrap">
            <Button onClick={handleSubmit}>
              {selectedChannelUrl ? "Save Changes" : "Create Channel Group"}
            </Button>
            {selectedChannelUrl && (
              <Button variant="ghost" onClick={clearForm}>
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {list.data?.channels?.length > 0 && (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          {list.data.channels.map((channel: any) => (
            <Card
              key={channel.channelUrl}
              className={`p-4 cursor-pointer ${
                selectedChannelUrl === channel.channelUrl
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
              onClick={() => handleSelect(channel)}
            >
              <div className="space-y-1">
                <div className="font-semibold text-lg">{channel.name}</div>
                <div className="font-semibold text-sm text-gray-700">
                  {truncate(channel.channelUrl)}
                </div>
                <div className="text-sm text-gray-500">{channel.id}</div>
                <div className="text-sm text-gray-500">
                  Members: {channel.memberCount || 0}
                </div>
                <div className="text-sm text-gray-500">
                  Organization: {channel.memberCount || 0}
                </div>
                <div className="text-xs">
                  {channel.isPublic ? "Public" : "Private"} /{" "}
                  {channel.isDistinct ? "Distinct" : "Shared"} /{" "}
                  {channel.isAccessCodeRequired
                    ? "Access Code Required"
                    : "No Access Code"}
                </div>
              </div>
              <div className="mt-4 flex gap-2 flex-wrap">
                <Button size="sm" onClick={() => handleSelect(channel)}>
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/open-channels/${channel.channelUrl}/members`);
                  }}
                >
                  Manage Members
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    remove.mutate(channel.channelUrl, {
                      onSuccess: list.refetch,
                    });
                  }}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={prevPage} disabled={!pageToken}>
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
