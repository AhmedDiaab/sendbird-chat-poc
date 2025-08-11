import SendbirdPlatformSdk, { createConfiguration, CreateUserData, CreateUserTokenData, GroupChannelApi, OpenChannelApi, ServerConfiguration, UserApi } from 'sendbird-platform-sdk-typescript';
import { randomUUID } from 'crypto';
import { withRetry } from '../utils/withRetry.util.mjs';

/* ------------------------------------------------------------------ *
 * CONFIG
 * ------------------------------------------------------------------ */
const apiToken = process.env.SENDBIRD_API_KEY;
const appId = process.env.SENDBIRD_APP_ID;

/* ------------------------------------------------------------------ *
 * API INSTANCES (share the same base URL)
 * ------------------------------------------------------------------ */
const serverConfig = new ServerConfiguration(
    `https://api-${appId}.sendbird.com`,
    { app_id: appId }
);

const configuration = createConfiguration({
    baseServer: serverConfig,
});

const userApi = new UserApi(configuration);
const gcApi = new GroupChannelApi(configuration);
const ocApi = new OpenChannelApi(configuration);



/* ------------------------------------------------------------------ *
 * USERS
 * ------------------------------------------------------------------ */
async function createUser(nickname, profileUrl) {

    let createUserData = new CreateUserData();

    createUserData = {
        userId: randomUUID(),
        nickname,
        profileUrl,
        issueAccessToken: false, // once create user issue access token
    };

    const data = await userApi.createUser(apiToken, createUserData);
    return data;
}

async function createUserToken(userId, expiresInSec = 60 * 60 * 24) {
    const body = new CreateUserTokenData({
        expires_at: Math.floor(Date.now() / 1000) + expiresInSec,
    });

    const data = await withRetry(() => userApi.createUserToken(apiToken, userId, body));
    return data;
}

async function updateUser(userId, params = {}) {
    const data = await withRetry(() => userApi.updateUserById(apiToken, userId, {
        nickname: params.nickname,
        profileUrl: params.profileUrl,
        isActive: params.isActive,
        // sessionTokenExpiresAt,
    }));
    return data;
}

async function listUsers(query = {
    limit, // limit per api
    token, // specify token
    activeMode, // 'activated' | 'deactivated' | 'all' | Specifies the activation status of the users in the list. Acceptable values are `activated`, `deactivated`, and `all`. (Default: `activated`) (optional)
    // showBot: false, // show bots 
    // userIds: "user_ids_example", 
    // nickname: "nickname_example", 
    // nicknameStartswith: "nickname_startswith_example", 
    // metadatakey: "metadatakey_example",
    // string | Searches for blocked users with metadata containing an item with the key specified by the metadatakey parameter above, and the value of that item matches one or more values specified by this parameter. The string should be specified with multiple urlencoded metadata values separated by commas (for example, `?metadatavalues_in=urlencoded_value_1, urlencoded_value_2`). This parameter should be specified in conjunction with the `metadatakey` above. (optional)
    // metadatavaluesIn: "metadatavalues_in_example", 
    // apiToken: "{{API_TOKEN}}",

}) {
    const data = await withRetry(() => userApi.listUsers(apiToken, query.token, query.limit, query.activeMode));
    return data;
}

async function viewUserById(userId) {
    const data = await withRetry(() => userApi.viewUserById(apiToken, userId));
    return data;
}

/** Delete a user permanently. */
async function deleteUser(userId) {
    // 204 No-Content on success
    await withRetry(() => userApi.deleteUserById(apiToken, userId));
}

/* ------------------------------------------------------------------ *
 * CHANNEL HELPERS
 * ------------------------------------------------------------------ */
async function createChannel(payload = {
    userIds,
    coverUrl,
    name,
    isPublic,
    isDistinct,
    organization
}) {
    const data = await withRetry(() => gcApi.gcCreateChannel(apiToken, {
        name: payload.name,
        userIds: payload.userIds,
        coverUrl: payload.coverUrl,
        isPublic: payload.isPublic,
        isDistinct: payload.isDistinct,
        data: JSON.stringify({ organization, type: 'tma' })
    }));
    return data;
}

async function updateChannel(channelUrl, payload = {
    coverUrl,
    name,
    isPublic,
    isDistinct,
}) {

    const data = await withRetry(() => gcApi.gcUpdateChannelByUrl(apiToken, channelUrl, {
        name: payload.name,
        coverUrl: payload.coverUrl,
        isPublic: payload.isPublic,
        isDistinct: payload.isDistinct,
        data: payload.data || {},
    }));
    return data;
}

async function removeChannel(channelUrl) {
    const data = await withRetry(() => gcApi.gcDeleteChannelByUrl(apiToken, channelUrl));
    return data;
}

async function listChannels({
    limit = 20,
    token,
    showMember = false,
    isPublic,
    isDistinct,
    isSuper,
    createdAfter,
    createdBefore,
    showEmpty
} = {}) {
    const data = await withRetry(() => gcApi.gcListChannels(apiToken,
        token,
        limit,
        isDistinct,
        isPublic,
        isSuper,
        createdAfter,
        createdBefore,
        showEmpty,
        showMember,

    ));
    return data;
}

/** View a single channel by URL. */
async function viewChannel(channelUrl, { showMember = false, showDeliveryReceipt = false, showReadReceipt = false } = {}) {
    const data = await withRetry(() => gcApi.gcViewChannelByUrl(apiToken, channelUrl, showDeliveryReceipt, showReadReceipt, showMember));
    return data;
}


/* ------------------  Membership ------------------ */
async function inviteToChannel(channelUrl, userIds = []) {
    const data = await withRetry(() => gcApi.gcInviteAsMembers(apiToken, channelUrl, {
        gcInviteAsMembersData: new SendbirdPlatformSdk.GcInviteAsMembersData(userIds),
    }));
    return data;
}

async function acceptInvitation(channelUrl, userId) {
    const data = await withRetry(() => gcApi.gcAcceptInvitation(apiToken, channelUrl, {
        gcAcceptInvitationData: new SendbirdPlatformSdk.GcAcceptInvitationData(channelUrl, userId),
    }));
    return data;
}

async function rejectInvitation(channelUrl, userId) {
    const data = await withRetry(() => gcApi.gcDeclineInvitation(apiToken, channelUrl, {
        gcDeclineInvitationData: new SendbirdPlatformSdk.GcDeclineInvitationData(channelUrl, userId),
    }));
    return data;
}

async function joinChannel(channelUrl, userId, accessCode = '') {
    const data = await withRetry(() => gcApi.gcJoinChannel(apiToken, channelUrl, {
        userId,
        channelUrl,
        accessCode
    }));
    return data;
}

async function leaveChannel(channelUrl, payload = {
    userIds: [],
    shouldLeaveAll: false
}) {
    const data = await withRetry(() => gcApi.gcLeaveChannel(apiToken, channelUrl, {
        channelUrl,
        userIds: payload.userIds,
        shouldLeaveAll: payload.shouldLeaveAll,
    }));
    return data;
}

async function listChannelMembers(channelUrl, payload = {
    token,
    limit
}) {
    const data = await withRetry(() => gcApi.gcListMembers(apiToken, channelUrl, payload.token, payload.limit));
    return data;
}

/* ------------------------------------------------------------------ *
 * Open Channels
 * ------------------------------------------------------------------ */
async function createOpenChannel(payload = {
    name,
    coverUrl,
    customType,
    operatorUserIds,
    organization
}) {
    return withRetry(() => ocApi.ocCreateChannel(apiToken,{
        name: payload.name,
        coverUrl: payload.coverUrl,
        customType: payload.customType,
        operatorIds: payload.operatorUserIds,
        isEphemeral: true,
        isDynamicPartitioned: true,
    }));
}

async function updateOpenChannel(channelUrl, payload = {
    name,
    coverUrl,
    customType,
    operatorUserIds,
    organization
}) {
    return withRetry(() => ocApi.ocUpdateChannelByUrl(apiToken, channelUrl, {
        name: payload.name,
        coverUrl: payload.coverUrl,
        customType: payload.customType ?? 'open',
        operatorIds: payload.operatorUserIds,
        data: JSON.stringify({ organization: payload.organization, type: 'tma', ...(payload.data || {}) })
    }));
}

async function deleteOpenChannel(channelUrl) {
    return withRetry(() => ocApi.ocDeleteChannelByUrl(apiToken, channelUrl));
}

async function listOpenChannels({
    token,
    limit = 20,
    customType,
    nameContains = undefined,
    showFrozen = false,
} = {}) {
    return withRetry(() => ocApi.ocListChannels(apiToken, token, limit,customType ,nameContains, undefined, showFrozen));
}

async function viewOpenChannel(channelUrl) {
    return withRetry(() => ocApi.ocViewChannelByUrl(apiToken, channelUrl));
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
    deleteUser,
    createChannel,
    updateChannel,
    listChannels,
    inviteToChannel,
    acceptInvitation,
    rejectInvitation,
    joinChannel,
    leaveChannel,
    viewChannel,
    removeChannel,
    listChannelMembers,
    createOpenChannel,
    updateOpenChannel,
    deleteOpenChannel,
    listOpenChannels,
    viewOpenChannel,
};
