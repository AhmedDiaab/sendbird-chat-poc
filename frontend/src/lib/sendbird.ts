import SendbirdChat from '@sendbird/chat'
import { GroupChannelModule, type SendbirdGroupChat } from '@sendbird/chat/groupChannel';

let sendBird: SendbirdGroupChat | null = null;

export async function initSendbird(userId: string, nickname: string, token: string) {
    if (!sendBird) {
        sendBird = SendbirdChat.init({
            appId: import.meta.env.VITE_SENDBIRD_APP_ID,
            modules: [
                new GroupChannelModule()
            ],
        }) as SendbirdGroupChat;
    }

    if (!sendBird.currentUser) {
        await sendBird.connect(userId, token);
        await sendBird.updateCurrentUserInfo({ nickname });
    }

    return sendBird;
}

export function getSendbird() {
    return sendBird;
}