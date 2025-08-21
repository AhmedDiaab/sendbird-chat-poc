import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { GroupChannel as TGroupChannel } from "@sendbird/chat/groupChannel";
import type { OpenChannel as TOpenChannel } from "@sendbird/chat/openChannel";
import { useEffect, useState } from "react";
import GroupChannelSection from "../components/GroupChannelSection";
import OpenChannelSection from "../components/OpenChannelSection";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "@/store/chatStore";

type TabValue = "open" | "group";

export default function ChatSidebar() {
  const [tab, setTab] = useState<TabValue>("open");
  const setCurrentChannelType = useChatStore((s) => s.setCurrentChannelType);
  const setCurrentGroupChannelUrl = useChatStore((s) => s.setCurrentGroupChannelUrl);
  const setCurrentOpenChannelUrl = useChatStore((s) => s.setCurrentOpenChannelUrl);
  const currentGroupChannelUrl = useChatStore((s) => s.currentGroupChannelUrl);

  const navigate = useNavigate();
  const [currentGroupChannel, setCurrentGroupChannel] =
    useState<TGroupChannel | null>(null);

  const [currentOpenChannel, setCurrentOpenChannel] =
    useState<TOpenChannel | null>(null);

  const handleSetCurrentGroupChannel = (channel: TGroupChannel) => {
    setCurrentGroupChannel(channel);
    if (!channel?.url) return;
    navigate(`/open-chat/group/${channel.url}`);
    setCurrentGroupChannelUrl(channel.url);
  };

  const handleSetCurrentOpenChannel = (channel: TOpenChannel) => {
    setCurrentOpenChannel(channel);
    if (!channel?.url) return;
    navigate(`/open-chat/open/${channel.url}`);
    setCurrentOpenChannelUrl(channel.url);
  };

  const handleTabValueChange = (v: any) => {
    if (!v) return;
    navigate(`/open-chat`);
    setTab(v as TabValue);
    setCurrentGroupChannelUrl(null);
    setCurrentOpenChannelUrl(null);
    setCurrentChannelType(v as TabValue);    
  };


  return (
    <div className="w-64 h-screen border-r flex flex-col bg-gray-50">
      <h2 className="text-lg font-bold mb-2">Chat Channels</h2>

      <ToggleGroup
        type="single"
        value={tab}
        onValueChange={handleTabValueChange}
        className="mb-2"
      >
        <ToggleGroupItem value="open">Open</ToggleGroupItem>
        <ToggleGroupItem value="group">Group</ToggleGroupItem>
      </ToggleGroup>

      {tab === "group" && (
        <GroupChannelSection
          handleSetCurrentChannel={handleSetCurrentGroupChannel}
        />
      )}
      {tab === "open" && (
        <OpenChannelSection
          handleSetCurrentChannel={handleSetCurrentOpenChannel}
        />
      )}
    </div>
  );
}
