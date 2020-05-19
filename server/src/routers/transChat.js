import express from 'express';

const router = express.Router();
import passprot from 'passport';
import {
    transRoomById,
    rooms,
    getRoom,
    createRoom,
    photo,
    send,
    userJoin,
    getUser,
    deleteUser,
    modeUpdate,
    deleteRoom,
    updateClub,
    transSend
} from '../controllers/transChat';

router.get('/rooms', rooms);


router.patch('/mode/update/:transRoomId', passprot.authenticate('jwt', {
    session: false
}), modeUpdate);


router.get('/:transRoomId', passprot.authenticate('jwt', {
    session: false
}), getRoom);



router.post('/room/new', passprot.authenticate('jwt', {
    session: false
}), createRoom);


router.put('/room/update/:transRoomId', passprot.authenticate('jwt', {
    session: false
}), updateClub)

router.delete('/room/delete/:transRoomId', passprot.authenticate('jwt', {
    session: false
}), deleteRoom);


//photo
router.get('/photo/:transRoomId', photo);

router.post('/send/:transRoomId', passprot.authenticate('jwt', {
    session: false
}), send);

router.post('/socket/send/:transRoomId', passprot.authenticate('jwt', {
    session: false
}), transSend);


router.post('/user/join/:transRoomId', passprot.authenticate('jwt', {
    session: false
}), userJoin);

//socket io get  user List
router.get(
    '/user/:transRoomId',
    passprot.authenticate('jwt', {
        session: false
    }),
    getUser
);

//socket io user List delete
router.delete(
    '/user/:transRoomId',
    passprot.authenticate('jwt', {
        session: false
    }),
    deleteUser
);

router.param('transRoomId', transRoomById);





export default router;