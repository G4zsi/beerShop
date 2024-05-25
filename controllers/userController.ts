import { Request, Response } from 'express';
import { User } from '../database/models/userModel';
import * as validators from './validators';

// TODO: better validation, edit user
export {
	getAllUsers,
	getUser,
	deleteUser,
	createUser
};

async function getAllUsers(req: Request, res: Response) {
	const queries = await User.find();

	res.status(200).json({
		status: 'success',
		length: queries.length,
		data: {
			queries
		}
	});

	return queries;
}

async function getUser(req: Request, res: Response) {
	if(!await validators.validateId(req.params.id)) {
		res.status(404).json({
			status: 'failed',
			message: 'User not found, invalid ID.'
		});
		return;
	}

	const query = await User.findById(req.params.id);
	if (!query) {
		res.status(404).json({
			status: 'failed',
			message: 'User not found.'
		});
	} else {
		res.status(200).json({
			status: 'success',
			data: {
				query
			}
		});
	}

	return query;
}

async function deleteUser(req: Request, res: Response) {
	if(!await validators.validateId(req.params.id)) {
		res.status(404).json({
			status: 'failed',
			message: 'Document not found, invalid ID.'
		});
		return;
	}
	
	const query = await User.findByIdAndDelete(req.params.id);
	if (!query) {
		res.status(404).json({
			status: 'failed',
			message: 'Document not found.'
		});
	} else {
		res.status(200).json({
			status: 'success',
			message: 'User deleted.'
		});
	}
}

async function createUser(req: Request, res: Response) {
	const validatedUser = await validators.validateUser(req);
	if(validatedUser != 'validated') {
		res.status(406).json({
			status: 'failed',
			message: validatedUser
		});
		return;
	}
	const newUser = await new User(req.body);
	await User.create(newUser);

	res.status(201).json({
		status: 'success',
		data: {
			newUser
		}
	});
}

 