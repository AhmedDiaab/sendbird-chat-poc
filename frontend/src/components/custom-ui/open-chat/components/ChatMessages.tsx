import type { BaseMessage } from "@sendbird/chat/message";

interface Props {
  messages: BaseMessage[];
  channel: any;
}

export default function ChatMessages({ messages, channel }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-white">
      <h2 className="text-xl font-semibold mb-4">{channel?.name}</h2>
      <div className="space-y-2">
        {messages.map((msg: any) => (
          <div key={msg.messageId} className="p-2 border rounded shadow-sm">
            <div className="text-sm text-gray-600">
              {msg.sender?.nickname || "System"}
            </div>
            <div className="text-base">{msg.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
