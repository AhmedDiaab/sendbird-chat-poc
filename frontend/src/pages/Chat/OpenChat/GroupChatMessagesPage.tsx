import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function GroupChatMessagesPage() {
  const { url } = useParams();

  return (
    <div className="flex flex-col flex-1 h-full">
      {url ? (
        <GroupChannel channelUrl={url} />
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-md text-center rounded-2xl shadow-md p-8">
            <CardContent className="flex flex-col items-center space-y-4">
              <MessageSquare className="h-12 w-12 text-gray-400" />
              <h2 className="text-lg font-semibold">
                No conversation selected
              </h2>
              <p className="text-sm text-muted-foreground">
                Choose a chat from the sidebar to start messaging.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
