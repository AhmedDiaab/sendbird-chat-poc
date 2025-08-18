import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import ChannelSection from "../components/ChannelSection";
import { useChannels } from "@/hooks/channels/useChannels";

export default function ChatSidebar() {
  const [tab, setTab] = useState<"open" | "group">("open");
  const { openChannels, groupChannels } = useChannels();

  return (
    <div className="w-64 h-screen p-4 border-r flex flex-col bg-gray-50">
      <h2 className="text-lg font-bold mb-4">Chat Channels</h2>

      <ToggleGroup
        type="single"
        value={tab}
        onValueChange={(v: any) => v && setTab(v as "open" | "group")}
        className="mb-4"
      >
        <ToggleGroupItem value="open">Open</ToggleGroupItem>
        <ToggleGroupItem value="group">Group</ToggleGroupItem>
      </ToggleGroup>

      {tab === "open" && <ChannelSection channels={openChannels} />}
      {tab === "group" && <ChannelSection channels={groupChannels} />}
    </div>
  );
}
