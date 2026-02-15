import { Request, Response } from 'express';
import { User } from '../database/models/userModel';
import * as validators from './validators';

export {
	getAllUsers,
	getUser,
	deleteUser,
	createUser,
	updateUser
};

async function getAllUsers(_req: Request, res: Response) {
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
	if(!await validators.validateId(String(req.params.id))) {
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
	if(!await validators.validateId(String(req.params.id))) {
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
	const validatedUser = await validators.validateUser(req.body, {update: false});
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

async function updateUser(req: Request, res: Response) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let editedUser: any;
	if(!await validators.validateId(String(req.params.id))) {
		res.status(404).json({
			status: 'failed',
			message: 'Document not found, invalid ID.'
		});
		return;
	}

	try{
		editedUser = await User.findById(req.params.id);
	} catch {
		res.status(400).json({
			status: 'error',
			message: 'Unknown error. Please try again later.'
		});
		return;
	}

	if (!editedUser) {
		res.status(404).json({
			status: 'failed',
			message: 'User not found.'
		});
		return;
	}

	const validatedUser = await validators.validateUser(req.body, {update: true});

	if(validatedUser != 'validated') {
		res.status(406).json({
			status: 'failed',
			message: validatedUser
		});
		return;
	}

	await User.findByIdAndUpdate(req.params.id, req.body);

	res.status(200).json({
		status: 'success',
		data: {
			data: null
		}
	});
}
 