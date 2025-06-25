import { create } from "zustand";

interface ChatState {
    currentUser: { userId: string; nickname: string } | null;
    selectedChannel: string | null;
    setCurrentUser: (user: ChatState["currentUser"]) => void;
    setSelectedChannel: (channelUrl: string | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
    currentUser: null,
    selectedChannel: null,
    setCurrentUser: (user) => set({ currentUser: user }),
    setSelectedChannel: (channelUrl) => set({ selectedChannel: channelUrl }),
}));