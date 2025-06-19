import * as sb from '../services/sendbird.service.mjs';

/* CREATE ----------------------------------------------------------- */
export const create = async (req, res, next) => {
    try {
        const channel = await sb.createChannel(req.body);
        res.status(201).json(channel);
    } catch (err) {
        next(err);
    }
};

/* LIST ------------------------------------------------------------- */
export const list = async (req, res, next) => {
    try {
        const list = await sb.listChannels(req.query);
        res.json(list);
    } catch (err) {
        next(err);
    }
};

/* UPDATE ----------------------------------------------------------- */
export const update = async (req, res, next) => {
    try {
        const channel = await sb.updateChannel(req.params.url, req.body);
        res.json(channel);
    } catch (err) {
        next(err);
    }
};

/* MEMBERSHIP ------------------------------------------------------- */
export const invite = async (req, res, next) => {
    try {
        const out = await sb.inviteToChannel(req.params.url, req.body.userIds);
        res.json(out);
    } catch (err) {
        next(err);
    }
};

export const join = async (req, res, next) => {
    try {
        const out = await sb.joinChannel(
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
        await sb.leaveChannel(req.params.url, req.body.userIds);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};

export const accept = async (req, res, next) => {
    try {
        await sb.acceptInvitation(req.params.url, req.body.userId);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};

export const reject = async (req, res, next) => {
    try {
        await sb.rejectInvitation(req.params.url, req.body.userId);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};
