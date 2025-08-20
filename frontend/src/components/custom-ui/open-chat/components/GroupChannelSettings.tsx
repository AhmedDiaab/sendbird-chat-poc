import ChannelSettings from "@sendbird/uikit-react/ChannelSettings";

export default function GroupChannelSettings({
  url,
  onCloseClick,
}: {
  url: string;
  onCloseClick: () => void;
}) {
  return (
    <>
      <ChannelSettings channelUrl={url} onCloseClick={onCloseClick} />
    </>
  );
}
