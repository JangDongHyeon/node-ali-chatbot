import express from 'express';

const router = express.Router();
import passprot from 'passport';
import {
    chatSelectionsFun,
    chatSimSimFun,
    chatSimSimRoom,
    chatSimSimGet,
    simsimRoomById
} from '../controllers/dataChat';


router.post('/data/send', passprot.authenticate('jwt', {
    session: false
}), chatSelectionsFun);

router.post('/simsim/chat/:simRoomId', passprot.authenticate('jwt', {
    session: false
}), chatSimSimFun);

router.post('/simsim/room', passprot.authenticate('jwt', {
    session: false
}), chatSimSimRoom)

router.get('/simsim/get/:simRoomId', passprot.authenticate('jwt', {
    session: false
}), chatSimSimGet)

router.param('simRoomId', simsimRoomById);


export default router;