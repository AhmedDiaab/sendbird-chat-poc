import { createChannel, listChannels, updateChannel, viewChannel } from '../services/sendbird.service.mjs';

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
        const channel = await updateChannel(req.params.channelUrl, {
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
