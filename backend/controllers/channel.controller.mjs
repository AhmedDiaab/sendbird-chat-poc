import { createChannel, joinChannel, leaveChannel, listChannelMembers, listChannels, removeChannel, updateChannel, viewChannel } from '../services/sendbird.service.mjs';

/* CREATE ----------------------------------------------------------- */
export const create = async (req, res, next) => {
    try {
        const channel = await createChannel({
            name: req.body.name,
            userIds: req.body.userIds,
            coverUrl: req.body.coverUrl,
            isPublic: req.body.isPublic,
            isDistinct: req.body.isDistinct,
        });
        res.status(201).json(channel);
    } catch (err) {
        next(err);
    }
};

/* LIST ------------------------------------------------------------- */
export const list = async (req, res, next) => {
    try {
        const list = await listChannels(req.query);
        res.json(list);
    } catch (err) {
        next(err);
    }
};

/* UPDATE ----------------------------------------------------------- */
export const update = async (req, res, next) => {
    try {
        const channel = await updateChannel(req.params.url, {
            coverUrl: req.body.coverUrl,
            isDistinct: req.body.isDistinct,
            isPublic: req.body.isPublic,
            name: req.body.name,
        });
        res.json(channel);
    } catch (err) {
        next(err);
    }
};

/* DELETE ----------------------------------------------------------- */
export const remove = async (req, res, next) => {
    try {
        await removeChannel(req.params.url);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

/* VIEW (single) ---------------------------------------------------- */
export const view = async (req, res, next) => {
    try {
        const channel = await viewChannel(req.params.url, {
            showMember: req.query.showMember,
            showDeliveryReceipt: req.query.showDeliveryReceipt,
            showReadReceipt: req.query.showReadReceipt,
        }); // ?showMember=true
        res.json(channel);
    } catch (err) {
        next(err);
    }
};

/* MEMBERSHIP ------------------------------------------------------- */
export const invite = async (req, res, next) => {
    try {
        const out = await inviteToChannel(req.params.url, req.body.userIds);
        res.json(out);
    } catch (err) {
        next(err);
    }
};

export const join = async (req, res, next) => {
    try {
        const out = await joinChannel(
            req.params.url,
            req.body.userId,
            req.body.accessCode
        );
        res.json(out);
    } catch (err) {
        next(err);
    }
};

export const leave = async (req, res, next) => {
    try {
        await leaveChannel(req.params.url, req.body.userIds);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};

export const accept = async (req, res, next) => {
    try {
        await acceptInvitation(req.params.url, req.body.userId);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};

export const reject = async (req, res, next) => {
    try {
        await rejectInvitation(req.params.url, req.body.userId);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};

/* Membership Management */
export const addMembers = async (req, res, next) => { // when add deactivated user, it gives me not found error
    try {
        const { userIds } = req.body;
        const channelId = req.params.url;

        await chunkedExecute(userIds, 4, (userId) =>
            joinChannel(channelId, userId)
        );

        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};


export const listMembers = async (req, res, next) => {
    try {
        const list = await listChannelMembers(req.params.url, {
            limit: req.query.limit,
            token: req.query.token
        });
        res.json(list);
    } catch (err) {
        next(err);
    }
}

export const deleteMembers = async (req, res, next) => {
    try {
        const { userIds, shouldLeaveAll } = req.body;
        const channelId = req.params.url;
        await leaveChannel(channelId, {
            userIds,
            shouldLeaveAll: shouldLeaveAll
        });
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
}