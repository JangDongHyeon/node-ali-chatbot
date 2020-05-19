import express from 'express';
import passprot from 'passport';
const router = express.Router();

import {
    userById,
    read,
    authRead
} from '../controllers/user';

import {
    requireSignin,
    isAuth
} from '../controllers/auth';


router.get('/me', passprot.authenticate('jwt', {
    session: false
}), authRead)
router.get('/:userId', passprot.authenticate('jwt', {
    session: false
}), isAuth, read);


router.param('userId', userById);

module.exports = router;