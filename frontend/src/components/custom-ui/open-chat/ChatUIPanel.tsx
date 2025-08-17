// import { decrypt, encrypt } from "@/utils/encryption.util";
// import { CachedDataClearOrder, LocalCacheConfig } from "@sendbird/chat";
// import { App as SendbirdApp } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";
import ChatSidebar from "./layout/ChatSideBar";

interface SendBirdUIPanelProps {
  appId: string;
  userId: string;
  accessToken?: string;
}

// const SECRET_KEY = import.meta.env.VITE_SENDBIRD_SECRET_KEY;

export function ChatUIPanel({
//   appId,
//   userId,
//   accessToken,
}: SendBirdUIPanelProps) {
  return (
    <div style={{ width: "80vw", height: "100vh" }}>
      <ChatSidebar>

      </ChatSidebar>
    </div>
  );
}
