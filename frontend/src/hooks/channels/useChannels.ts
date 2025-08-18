import { useEffect, useState } from "react";
import { getSendbird } from "@/lib/sendbird";
import type { GroupChannel } from "@sendbird/chat/groupChannel";
import type { OpenChannel } from "@sendbird/chat/openChannel";

export function useChannels() {
    const [openChannels, setOpenChannels] = useState<{url: string, name: string}[]>([]);
    const [groupChannels, setGroupChannels] = useState<{url: string, name: string}[]>([]);

    useEffect(() => {
        const sb = getSendbird();
        if (!sb) return;

        const fetch = async () => {
            const openQuery = sb.openChannel.createOpenChannelListQuery();
            const groupQuery = sb.groupChannel.createMyGroupChannelListQuery();

            if (openQuery.hasNext) {
                const open = await openQuery.next();
                setOpenChannels(open.map((c: OpenChannel) => ({
                    url: `/open-chat/${c.url}`,
                    name: c.name || c.url,
                })));
            }

            if (groupQuery.hasNext) {
                const group = await groupQuery.next();
                setGroupChannels(group.map((c: GroupChannel) => ({
                    url: `/chat/${c.url}`,
                    name: c.name || c.url,
                })));
            }
        };

        fetch();
    }, []);

    return { openChannels, groupChannels };
}
