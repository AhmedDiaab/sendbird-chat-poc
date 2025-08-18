import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSendbird } from "@/lib/sendbird";
import type { BaseMessage } from "@sendbird/chat/message";
import ChatMessages from "@/components/custom-ui/open-chat/components/ChatMessages";
import ChatInput from "@/components/custom-ui/open-chat/components/ChatInput";
import type { OpenChannel } from "@sendbird/chat/openChannel";

export default function ChatMessagesPage({ type }: { type: "open" | "group" }) {
  const { channelUrl } = useParams();
  const [channel, setChannel] = useState<any>(null);
  const [messages, setMessages] = useState<BaseMessage[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const sb = getSendbird();
      if (!sb || !channelUrl) return;

      const channel =
        type === "group"
          ? await sb.groupChannel.getChannel(channelUrl)
          : await sb.openChannel.getChannel(channelUrl);

      if (type === "open") await (channel as OpenChannel).enter();

      const fetchedMessages = await channel.getMessagesByTimestamp(Date.now(), {
        nextResultSize: 50,
        prevResultSize: 50
      });

      setMessages(fetchedMessages);
      setChannel(channel);
    };

    fetch();
  }, [channelUrl, type]);

  const handleNewMessage = (msg: BaseMessage) => {
    setMessages((prev) => [...prev, msg]);
  };

  return (
    <div className="flex flex-col flex-1 h-full">
      <ChatMessages messages={messages} channel={channel} />
      <ChatInput channel={channel} onSend={handleNewMessage} />
    </div>
  );
}
