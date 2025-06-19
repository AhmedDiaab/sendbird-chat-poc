import { Router } from 'express';
import withAuth from '../middlewares/auth.middleware.mjs';
import {
    create,
    list,
    view,
    update,
    token
} from '../controllers/user.controller.mjs';

const router = Router();

router.use(withAuth);                // protect all /users routes

router.post('/', create);            // POST   /users
router.get('/', list);               // GET    /users
router.get('/:id', view);            // GET    /users/:id
router.put('/:id', update);          // PUT    /users/:id
router.post('/:id/token', token);    // POST   /users/:id/token

export default router;
