import express from 'express';

const globalRouter = express.Router();

globalRouter.get('/home', (req, res) => {
    res.send(
        'hello'
    )
})



export default globalRouter;