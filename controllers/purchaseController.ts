import { Request, Response } from 'express';
import { Purchase } from '../database/models/purchaseModel';
import * as validators from './validators';

export {
	getAllPurchases,
	getPurchase,
	deletePurchase,
	createPurchase,
	updatePurchase
};

async function getAllPurchases(_req: Request, res: Response) {
	const queries = await Purchase.find();

	res.status(200).json({
		status: 'success',
		length: queries.length,
		data: {
			queries
		}
	});

	return queries;
}

async function getPurchase(req: Request, res: Response) {
	if(!await validators.validateId(String(req.params.id))) {
		res.status(404).json({
			status: 'failed',
			message: 'Purchase not found, invalid ID.'
		});
		return;
	}  

	const query = await Purchase.findById(req.params.id);
	if (!query) {
		res.status(404).json({
			status: 'failed',
			message: 'Purchase not found.'
		});
	} else {
		res.status(200).json({
			status: 'success',
			data: {
				query
			}
		});
	} 
}

async function deletePurchase(req: Request, res: Response) {
	if(!await validators.validateId(String(req.params.id))) {
		res.status(404).json({
			status: 'failed',
			message: 'Purchase not found, invalid ID.'
		});
		return;
	}

	const query = await Purchase.findByIdAndDelete(req.params.id);
	if (!query) {
		res.status(404).json({
			status: 'failed',
			message: 'Purchase not found.'
		});
	} else {
		res.status(200).json({
			status: 'success',
			message: 'Purchase deleted successfully.'
		});	
	}
}

async function createPurchase(req: Request, res: Response) {
	const validatedPurchase = await validators.validatePurchase(req.body, { update: false });

	if (validatedPurchase != 'validated') {
		res.status(400).json({
			status: 'failed',
			message: validatedPurchase
		});
		return;
	}

	const newPurchase = await new Purchase(req.body);
	await Purchase.create(newPurchase);

	res.status(201).json({
		status: 'success',
		data: {
			newPurchase
		}
	});
}

async function updatePurchase(req: Request, res: Response) {
	let editedPurchase;
	if(!await validators.validateId(String(req.params.id))) {
		res.status(404).json({
			status: 'failed',
			message: 'Purchase not found, invalid ID.'
		});
		return;
	}

	try {
		editedPurchase = await Purchase.findById(req.params.id);
	} catch {
		res.status(400).json({
			status: 'failed',
			message: 'Unknown error. Please try again later.'
		});
		return;
	}
	if (!editedPurchase) {
		res.status(404).json({
			status: 'failed',
			message: 'Purchase not found.'
		});
		return;
	}

	const validatedPurchase = await validators.validatePurchase(req.body, { update: true });
	if (validatedPurchase != 'validated') {
		res.status(406).json({
			status: 'failed',
			message: validatedPurchase
		});
		return;
	}

	await Purchase.findByIdAndUpdate(req.params.id, req.body);
	res.status(200).json({
		status: 'success',
		data: {
			data: null
		}
	});
}