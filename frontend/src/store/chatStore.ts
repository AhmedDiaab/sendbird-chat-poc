import { create } from "zustand";

interface ChatState {
    currentUser: { userId: string; nickname: string } | null;
    selectedChannel: string | null;
    currentChannelType: "open" | "group";
    currentGroupChannelUrl: string | null;
    currentOpenChannelUrl: string | null;
    setCurrentUser: (user: ChatState["currentUser"]) => void;
    setSelectedChannel: (channelUrl: string | null) => void;
    setCurrentChannelType: (channelType: ChatState["currentChannelType"]) => void;
    setCurrentGroupChannelUrl: (url: ChatState["currentGroupChannelUrl"]) => void;
    setCurrentOpenChannelUrl: (url: ChatState["currentOpenChannelUrl"]) => void;

}

export const useChatStore = create<ChatState>((set) => ({
    currentUser: null,
    selectedChannel: null,
    currentChannelType: "open",
    currentGroupChannelUrl: null,
    currentOpenChannelUrl: null,
    setCurrentUser: (user) => set({ currentUser: user }),
    setSelectedChannel: (channelUrl) => set({ selectedChannel: channelUrl }),
    setCurrentChannelType: (channelType) => set({ currentChannelType: channelType }),
    setCurrentGroupChannelUrl: (url) => set({ currentGroupChannelUrl: url }),
    setCurrentOpenChannelUrl: (url) => set({ currentOpenChannelUrl: url })
}));