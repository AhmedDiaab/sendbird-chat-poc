import { useEffect, useState } from "react";
import {
  GroupChannel,
  GroupChannelListOrder,
} from "@sendbird/chat/groupChannel";
import { useChatStore } from "@/store/chatStore";
import { getSendbird } from "@/lib/sendbird";

export function ChannelList() {
  const [channels, setChannels] = useState<GroupChannel[]>([]);
  const setSelectedChannel = useChatStore((s) => s.setSelectedChannel);

  useEffect(() => {
    const fetchChannels = async () => {
      const sdk = getSendbird();
      if (!sdk) return;

      const query = sdk.groupChannel.createMyGroupChannelListQuery({
        order: GroupChannelListOrder.LATEST_LAST_MESSAGE,
      });

      const results = await query.next();
      setChannels(results);
    };
    fetchChannels();
  }, []);

  return (
    <div className="p-4 space-y-2">
      <h4 className="font-semibold">Channels</h4>
      {channels.map((ch) => (
        <div
          key={ch.url}
          className="p-2 border rounded cursor-pointer hover:bg-gray-100"
          onClick={() => setSelectedChannel(ch.url)}
        >
          {ch.name || ch.url}
        </div>
      ))}
    </div>
  );
}
