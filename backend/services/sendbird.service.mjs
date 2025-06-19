import SendbirdPlatformSdk from 'sendbird-platform-sdk';

/* ------------------------------------------------------------------ *
 * CONFIG
 * ------------------------------------------------------------------ */
const apiToken = process.env.SENDBIRD_API_KEY;
const appId = process.env.SENDBIRD_APP_ID;

/* ------------------------------------------------------------------ *
 * API INSTANCES (share the same base URL)
 * ------------------------------------------------------------------ */
const userApi = new SendbirdPlatformSdk.UserApi();
const gcApi = new SendbirdPlatformSdk.GroupChannelApi();

[userApi.apiClient, gcApi.apiClient].forEach(
    c => (c.basePath = `https://api-${appId}.sendbird.com`)
);

/* ------------------------------------------------------------------ *
 * USERS
 * ------------------------------------------------------------------ */
async function createUser(userId, nickname, profileUrl) {
    const { data } = await userApi.createUser(apiToken, {
        createUserData: new SendbirdPlatformSdk.CreateUserData(
            userId,
            nickname,
            profileUrl
        ),
    });
    return data;
}

async function createUserToken(userId, expiresInSec = 60 * 60 * 24) {
    const body = new SendbirdPlatformSdk.CreateUserTokenData({
        expires_at: Math.floor(Date.now() / 1000) + expiresInSec,
    });

    const { data } = await userApi.createUserToken(apiToken, userId, {
        createUserTokenData: body,
    });
    return data;
}

async function updateUser(userId, params = {}) {
    const body = SendbirdPlatformSdk.UpdateUserByIdData.constructFromObject({ ...params });

    const { data } = await userApi.updateUserById(apiToken, userId, {
        updateUserByIdData: body,
    });
    return data;
}

async function listUsers(query = {}) {
    const { data } = await userApi.listUsers(apiToken, query);
    return data;
}

async function viewUserById(userId) {
    const { data } = await userApi.viewUserById(apiToken, userId);
    return data;
}

/* ------------------------------------------------------------------ *
 * CHANNEL HELPERS
 * ------------------------------------------------------------------ */
async function createChannel(opts = {}) {
    const body = SendbirdPlatformSdk.GcCreateChannelData.constructFromObject({
        user_ids: opts.userIds,
        name: opts.name,
        is_public: opts.isPublic,
        is_distinct: opts.isDistinct,
        cover_url: opts.coverUrl,
        custom_type: opts.customType,
        data: opts.data,
    });

    const { data: channel } = await gcApi.gcCreateChannel(apiToken, {
        gcCreateChannelData: body,
    });
    return channel;
}

async function updateChannel(channelUrl, params = {}) {
    const body = SendbirdPlatformSdk.GcUpdateChannelByUrlData.constructFromObject({ ...params });

    const { data } = await gcApi.gcUpdateChannelByUrl(apiToken, channelUrl, {
        gcUpdateChannelByUrlData: body,
    });
    return data;
}

async function listChannels({
    limit = 20,
    token,
    showMember = false,
    name,
    customTypes,
    isPublic,
} = {}) {
    const { data } = await gcApi.gcListChannels(apiToken, {
        limit,
        token,
        show_member: showMember,
        name_contains: name,
        custom_types: customTypes,
        is_public: isPublic,
    });
    return data;
}

/* ------------------  Membership ------------------ */
async function inviteToChannel(channelUrl, userIds = []) {
    const { data } = await gcApi.gcInviteAsMembers(apiToken, channelUrl, {
        gcInviteAsMembersData: new SendbirdPlatformSdk.GcInviteAsMembersData(userIds),
    });
    return data;
}

async function acceptInvitation(channelUrl, userId) {
    const { data } = await gcApi.gcAcceptInvitation(apiToken, channelUrl, {
        gcAcceptInvitationData: new SendbirdPlatformSdk.GcAcceptInvitationData(channelUrl, userId),
    });
    return data;
}

async function rejectInvitation(channelUrl, userId) {
    const { data } = await gcApi.gcDeclineInvitation(apiToken, channelUrl, {
        gcDeclineInvitationData: new SendbirdPlatformSdk.GcDeclineInvitationData(channelUrl, userId),
    });
    return data;
}

async function joinChannel(channelUrl, userId, accessCode = '') {
    const { data } = await gcApi.gcJoinChannel(apiToken, channelUrl, {
        gcJoinChannelData: new SendbirdPlatformSdk.GcJoinChannelData(channelUrl, userId, accessCode),
    });
    return data;
}

async function leaveChannel(channelUrl, userIds = []) {
    const { data } = await gcApi.gcLeaveChannel(apiToken, channelUrl, {
        gcLeaveChannelData: new SendbirdPlatformSdk.GcLeaveChannelData(userIds),
    });
    return data;
}

/* ------------------------------------------------------------------ *
 * EXPORTS (ESM)
 * ------------------------------------------------------------------ */
export {
    createUser,
    createUserToken,
    updateUser,
    listUsers,
    viewUserById,
    createChannel,
    updateChannel,
    listChannels,
    inviteToChannel,
    acceptInvitation,
    rejectInvitation,
    joinChannel,
    leaveChannel,
};
