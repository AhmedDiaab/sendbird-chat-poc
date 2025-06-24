import { Router } from 'express';
import withAuth from '../middlewares/auth.middleware.mjs';
import {
    create,
    list,
    update,
    invite,
    join,
    leave,
    accept,
    reject,
    view,
    remove
} from '../controllers/channel.controller.mjs';

const router = Router();

router.use(withAuth);

/* CRUD */
router.post('/', create);            // POST /channels
router.get('/', list);               // GET  /channels
router.put('/:url', update);         // PUT  /channels/:url
router.delete('/:url', remove);         // PUT  /channels/:url
router.get ('/:url', view);          // GET  /channels/:url

/* Membership */
router.post('/:url/invite', invite); // POST /channels/:url/invite
router.post('/:url/join', join);     // POST /channels/:url/join
router.post('/:url/leave', leave);   // POST /channels/:url/leave
router.put('/:url/accept', accept);  // PUT  /channels/:url/accept
router.put('/:url/reject', reject);  // PUT  /channels/:url/reject

export default router;
