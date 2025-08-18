import { useEffect, useState } from "react";
import { useChatStore } from "@/store/chatStore";
import { initSendbird } from "@/lib/sendbird";
import SendbirdChat from "@sendbird/chat";
import { useGenerateToken } from "@/hooks/users/useGenerateToken.hook";
// import { SendBirdUIPanel } from "@/components/custom-ui/chat/SendbirdUIPanel";
import { ChatUIPanel } from "@/components/custom-ui/open-chat/ChatUIPanel";

export default function OpenChatPage() {
  const { currentUser } = useChatStore();
  const [sdk, setSdk] = useState<SendbirdChat | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const generateToken = useGenerateToken();

  useEffect(() => {
    const init = async () => {
      if (!currentUser || accessToken || generateToken.isPending || !currentUser.userId) return;

      try {
        const data = await generateToken.mutateAsync(currentUser.userId);
        setAccessToken(data.token);

        const sdkInstance = await initSendbird(
          currentUser.userId,
          currentUser.nickname,
          data.token
        );
        setSdk(sdkInstance);
      } catch (err: any) {
        console.error("Token generation or init failed:", err.message);
      }
    };

    init();
  }, [currentUser]);

  if (!currentUser) return "Select user first";
  if (!sdk || !accessToken) return <div>Connecting...</div>;

  return (
    <div className="grid grid-cols-12 h-screen">
      <ChatUIPanel
        appId={import.meta.env.VITE_SENDBIRD_APP_ID}
        userId={currentUser.userId}
        accessToken={accessToken}
      />
    </div>
  );
}
