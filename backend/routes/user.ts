import express from 'express';
import { userRegister, userLogin, getUser } from '../controllers/userController';
import userMiddleware from '../middleware/auth';
const userRouter = express.Router();

userRouter.post('/login', userLogin);
userRouter.post('/register', userRegister);
userRouter.get('/auth', userMiddleware, getUser);

export default userRouter;
