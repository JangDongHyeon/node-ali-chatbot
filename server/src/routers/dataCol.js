import express from 'express';

const router = express.Router();
import passprot from 'passport';
import {
    chatSelectionsFun,
    chatDataColFun,
    chatDataColRoom,
    chatDataColGet,
    dataColRoomById
} from '../controllers/dataCol';


router.post('/data/send', passprot.authenticate('jwt', {
    session: false
}), chatSelectionsFun);

router.post('/chat/:dataColId', passprot.authenticate('jwt', {
    session: false
}), chatDataColFun);

router.post('/room', passprot.authenticate('jwt', {
    session: false
}), chatDataColRoom)

router.get('/get/:dataColId', passprot.authenticate('jwt', {
    session: false
}), chatDataColGet)

router.param('dataColId', dataColRoomById);


export default router;