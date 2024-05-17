import {Router} from 'express';
const router = Router();

import { UserController } from './controllers/user/UserController';

router.post('/users/create', new UserController().create);

export { router };

