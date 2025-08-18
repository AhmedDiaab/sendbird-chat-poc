import GroupChannelList from "@sendbird/uikit-react/GroupChannelList";
import type { GroupChannel as TGroupChannel } from "@sendbird/chat/groupChannel";

interface ChannelSectionProps {
  handleSetCurrentChannel: (channel: TGroupChannel) => void;
}

export default function GroupChannelSection({
  handleSetCurrentChannel,
}: ChannelSectionProps) {
  return (
    <>
      <GroupChannelList
        onChannelSelect={handleSetCurrentChannel}
        onChannelCreated={handleSetCurrentChannel}
        selectedChannelUrl={undefined} 
      />
    </>
  );
}
