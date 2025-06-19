import * as sb from '../services/sendbird.service.mjs';

/**
 * Login (or sign-up) and return a fresh Sendbird access token.
 * POST /auth/login  { userId, nickname, profileUrl }
 */
export const login = async (req, res, next) => {
    try {
        const { userId, nickname, profileUrl } = req.body;

        // upsert the user (idempotent)
        await sb.createUser(userId, nickname || userId, profileUrl);

        // issue 24-h token
        const tokenInfo = await sb.createUserToken(userId);
        res.json(tokenInfo);            // { user_id, token, expires_at }
    } catch (err) {
        next(err);
    }
};
