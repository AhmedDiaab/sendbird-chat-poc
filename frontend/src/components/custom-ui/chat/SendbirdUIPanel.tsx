import { decrypt, encrypt } from "@/utils/encryption.util";
import { CachedDataClearOrder, LocalCacheConfig } from "@sendbird/chat";
import { App as SendbirdApp } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";

interface SendBirdUIPanelProps {
  appId: string;
  userId: string;
  accessToken?: string;
}

const SECRET_KEY = import.meta.env.VITE_SENDBIRD_SECRET_KEY;

export function SendBirdUIPanel({
  appId,
  userId,
  accessToken,
}: SendBirdUIPanelProps) {
  return (
    <div style={{ width: "80vw", height: "100vh" }}>
      <SendbirdApp
        appId={appId}
        userId={userId}
        accessToken={accessToken}
        sdkInitParams={{
          localCacheEnabled: true,
          localCacheEncryption: {
            encrypt: async (rawData) => {
              const encrypted = await encrypt(rawData, SECRET_KEY);
              return { key: encrypted }; // ✅ Wrap in expected object
            },
            decrypt: async (encryptedData) => {
              const { key } = encryptedData as { key: string };
              return await decrypt({ key }, SECRET_KEY);
            },
          },
          localCacheConfig: new LocalCacheConfig({
            maxSize: 256,
            clearOrder: CachedDataClearOrder.CUSTOM,
            customClearOrderComparator: (a, b) =>
              a.cachedMessageCount - b.cachedMessageCount,
          }),
        }}
      />
    </div>
  );
}
