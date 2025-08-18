import { useState } from "react";

interface Props {
  channel: any;
  onSend: (msg: any) => void;
}

export default function ChatInput({ channel, onSend }: Props) {
  const [text, setText] = useState("");

  const sendMessage = async () => {
    if (!text.trim()) return;
    const message = await channel.sendUserMessage({ message: text });
    onSend(message);
    setText("");
  };

  return (
    <div className="border-t p-3 flex gap-2">
      <input
        className="flex-1 border px-3 py-2 rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}
