import {
    createUser,
    updateUser,
    deleteUser,
    listUsers,
    createUserToken,
    viewUserById,
} from '../services/sendbird.service.mjs';

/* CREATE  ---------------------------------------------------------- */
export const create = async (req, res, next) => {
    try {
        const { nickname, profileUrl } = req.body;
        const user = await createUser(nickname, profileUrl);
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
};

/* TOKEN (extra)  --------------------------------------------------- */
export const token = async (req, res, next) => {
    try {
        const tokenInfo = await createUserToken(req.params.id);
        res.json(tokenInfo);
    } catch (err) {
        next(err);
    }
};

/* LIST  ------------------------------------------------------------ */
export const list = async (req, res, next) => {
    try {
        const users = await listUsers(req.query); // ?limit&token&nickname
        res.json(users);
    } catch (err) {
        next(err);
    }
};

/* VIEW  ------------------------------------------------------------ */
export const view = async (req, res, next) => {
    try {
        const user = await viewUserById(req.params.id);
        res.json(user);
    } catch (err) {
        next(err);
    }
};

/* UPDATE  ---------------------------------------------------------- */
export const update = async (req, res, next) => {
    try {
        const user = await updateUser(req.params.id, req.body);
        res.json(user);
    } catch (err) {
        next(err);
    }
};

export const remove = async (req, res, next) => {
    try {
        await deleteUser(req.params.id);
        res.sendStatus(204);                           // no payload
    } catch (err) {
        next(err);
    }
};