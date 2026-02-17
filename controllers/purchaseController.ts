import { Request, Response } from 'express';
import { Purchase } from '../database/models/purchaseModel';
import * as validators from './validators';

export {
	getAllPurchases,
	getPurchase
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