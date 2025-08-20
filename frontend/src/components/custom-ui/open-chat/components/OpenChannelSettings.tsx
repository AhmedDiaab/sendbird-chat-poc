import OpenChannelSettings from "@sendbird/uikit-react/OpenChannelSettings";

export default function OpenCSettings({
  url,
  onCloseClick,
}: {
  url: string;
  onCloseClick: () => void;
}) {
  console.log(url)
  return (
    <>
      <OpenChannelSettings channelUrl={url} onCloseClick={onCloseClick} />
    </>
  );
}
