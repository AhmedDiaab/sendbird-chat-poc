import { useEffect, useState } from "react";
import { useChatStore } from "@/store/chatStore";
import { UserSelector } from "@/components/custom-ui/chat/UserSelector";
import { ChannelList } from "@/components/custom-ui/chat/ChannelList";
import { MessagePanel } from "@/components/custom-ui/chat/MessagePanel";
import { initSendbird } from "@/lib/sendbird";
import SendbirdChat from "@sendbird/chat";

export default function ChatPage() {
  const { currentUser } = useChatStore();
  const [sdk, setSdk] = useState<SendbirdChat | null>(null);

  useEffect(() => {
    if (currentUser) {
      initSendbird(currentUser.userId, currentUser.nickname).then(setSdk);
    }
  }, [currentUser]);

  if (!currentUser) return <UserSelector />;
  if (!sdk) return <div>Connecting...</div>;

  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-3 border-r">
        <ChannelList />
      </div>
      <div className="col-span-9">
        <MessagePanel />
      </div>
    </div>
  );
}
