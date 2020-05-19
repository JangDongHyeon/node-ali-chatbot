import express from 'express';

const router = express.Router();
import passprot from 'passport';
import {
    aliceRoomById,
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
    updateClub
} from '../controllers/aliceChat';

router.get('/rooms', rooms);


router.patch('/mode/update/:aliceRoomId', passprot.authenticate('jwt', {
    session: false
}), modeUpdate);


router.get('/:aliceRoomId', passprot.authenticate('jwt', {
    session: false
}), getRoom);



router.post('/room/new', passprot.authenticate('jwt', {
    session: false
}), createRoom);


router.put('/room/update/:aliceRoomId', passprot.authenticate('jwt', {
    session: false
}), updateClub)

router.delete('/room/delete/:aliceRoomId', passprot.authenticate('jwt', {
    session: false
}), deleteRoom);


//photo
router.get('/photo/:aliceRoomId', photo);

router.post('/send/:aliceRoomId', passprot.authenticate('jwt', {
    session: false
}), send);

router.post('/user/join/:aliceRoomId', passprot.authenticate('jwt', {
    session: false
}), userJoin);

//socket io get  user List
router.get(
    '/user/:aliceRoomId',
    passprot.authenticate('jwt', {
        session: false
    }),
    getUser
);

//socket io user List delete
router.delete(
    '/user/:aliceRoomId',
    passprot.authenticate('jwt', {
        session: false
    }),
    deleteUser
);

router.param('aliceRoomId', aliceRoomById);





export default router;