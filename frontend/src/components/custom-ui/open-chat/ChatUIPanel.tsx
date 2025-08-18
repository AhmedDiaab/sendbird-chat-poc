// import { decrypt, encrypt } from "@/utils/encryption.util";
// import { CachedDataClearOrder, LocalCacheConfig } from "@sendbird/chat";
// import { App as SendbirdApp } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";
import ChatSidebar from "./layout/ChatSideBar";
import { SendBirdProvider } from "@sendbird/uikit-react";
import { GroupChannel } from "@sendbird/uikit-react/GroupChannel";
import { Outlet } from "react-router-dom";
interface SendBirdUIPanelProps {
  appId: string;
  userId: string;
  accessToken?: string;
}

// const SECRET_KEY = import.meta.env.VITE_SENDBIRD_SECRET_KEY;

export function ChatUIPanel({}: //   appId,
//   userId,
//   accessToken,
SendBirdUIPanelProps) {
  const appId = import.meta.env.VITE_SENDBIRD_APP_ID;
  const selectedAccount = localStorage.getItem("selectedAccount") || "{}";
  const userId = JSON.parse(selectedAccount)!.userId;
  const accessToken = localStorage.getItem("token")!;

  return (
    <div
      style={{
        width: "80vw",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        columnGap: "1",
      }}
    >
      <SendBirdProvider appId={appId} userId={userId} accessToken={accessToken}>
        <ChatSidebar />
        <div className="m-1"></div>
        <Outlet />
      </SendBirdProvider>
    </div>
  );
}
