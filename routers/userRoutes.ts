import * as express from 'express';
import * as userController from '../controllers/userController';

export {
	userRouter
};

const userRouter = express.Router();

userRouter.route('/')
	.get(userController.getAllUsers)
	.post(userController.createUser);

userRouter.route('/:id')
	.get(userController.getUser)
	.delete(userController.deleteUser);