import { useEffect, useState } from "react";
import { useChatStore } from "@/store/chatStore";
import { UserSelector } from "@/components/custom-ui/chat/UserSelector";
import { initSendbird } from "@/lib/sendbird";
import SendbirdChat from "@sendbird/chat";
import { useGenerateToken } from "@/hooks/users/useGenerateToken.hook";
import { SendBirdUIPanel } from "@/components/custom-ui/chat/SendBirdUiPanel";

export default function ChatPage() {
  const { currentUser } = useChatStore();
  const [sdk, setSdk] = useState<SendbirdChat | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const generateToken = useGenerateToken();

  useEffect(() => {
    const init = async () => {
      if (!currentUser || accessToken || generateToken.isPending) return;

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

  if (!currentUser) return <UserSelector />;
  if (!sdk || !accessToken) return <div>Connecting...</div>;

  return (
    <div className="grid grid-cols-12 h-screen">
      <SendBirdUIPanel
        appId={import.meta.env.VITE_SENDBIRD_APP_ID}
        userId={currentUser.userId}
        accessToken={accessToken}
      />
    </div>
  );
}
