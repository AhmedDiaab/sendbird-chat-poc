import { useChatStore } from "@/store/chatStore";
import { useEffect, useState, useRef } from "react";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import { getSendbird } from "@/lib/sendbird";

export function MessagePanel() {
  const selectedChannel = useChatStore((s) => s.selectedChannel);
  const [channel, setChannel] = useState<GroupChannel | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const init = async () => {
      if (!selectedChannel) return;
      const sdk = getSendbird();
      if (!sdk) return;

      const groupChannel = await sdk.groupChannel.getChannel(selectedChannel);
      setChannel(groupChannel);

      const msgList = await groupChannel.getMessagesByTimestamp(Date.now(), {
        prevResultSize: 30,
        nextResultSize: 0,
      });

      if (isMounted.current) {
        setMessages(msgList);
      }
    };

    init();

    return () => {
      isMounted.current = false;
    };
  }, [selectedChannel]);

  const sendMessage = async () => {
    if (!text.trim() || !channel) return;

    const pending = channel.sendUserMessage({ message: text });

    pending.onSucceeded((message) => {
      setMessages((prev) => {
        const isDup = prev.some((m) => m.messageId === message.messageId);
        return isDup ? prev : [...prev, message];
      });
      setText("");
    });

    pending.onFailed(() => {
      // Optional: Add error handling/toast
    });
  };

  if (!channel)
    return <div className="p-6">Select a channel to view messages</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m: any) => (
          <div key={m.messageId} className="border p-2 rounded">
            <strong>{m.sender?.nickname}:</strong> {m.message}
          </div>
        ))}
      </div>
      <div className="border-t p-4 flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
