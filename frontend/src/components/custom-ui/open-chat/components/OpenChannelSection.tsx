import type { OpenChannel as TOpenChannel } from "@sendbird/chat/openChannel";
import OpenChannelList from "@sendbird/uikit-react/OpenChannelList";

interface ChannelSectionProps {
  handleSetCurrentChannel: (channel: TOpenChannel) => void;
}

export default function OpenChannelSection({
  handleSetCurrentChannel,
}: ChannelSectionProps) {
  return (
    <>
      <OpenChannelList onChannelSelected={handleSetCurrentChannel} />
    </>
  );
}
