import { App as SendbirdApp } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";

interface SendBirdUIPanelProps {
  appId: string;
  userId: string;
  accessToken?: string;
}

export function SendBirdUIPanel({
  appId,
  userId,
  accessToken,
}: SendBirdUIPanelProps) {
  return (
    <div style={{ width: "83vw", height: "100vh" }}>
      <SendbirdApp appId={appId} userId={userId} accessToken={accessToken} />
    </div>
  );
}
