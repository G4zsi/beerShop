import { Request, Response } from 'express';
import { Review } from '../database/models/reviewModel';
import * as validators from './validators';

export {
	getAllReviews,
	getReview,
	deleteReview,
	createReview
};


async function getAllReviews(res: Response) {
	const queries = await Review.find();

	res.status(200).json({
		status: 'success',
		length: queries.length,
		data: {
			queries
		}
	});

	return queries;
}

async function getReview(req: Request, res: Response) {
	if(!await validators.validateId(String(req.params.id))) {
		res.status(404).json({
			status: 'failed',
			message: 'Review not found, invalid ID.'
		});
		return;
	}

	const query = await Review.findById(req.params.id);
	if (!query) {
		res.status(404).json({
			status: 'failed',
			message: 'Review not found.'
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

async function deleteReview(req: Request, res: Response) {
	if(!await validators.validateId(String(req.params.id))) {
		res.status(404).json({
			status: 'failed',
			message: 'Product not found, invalid ID.'
		});
		return;
	}

	const query = await Review.findByIdAndDelete(req.params.id);
	if (!query) {
		res.status(404).json({
			status: 'failed',
			message: 'Review not found.'
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

async function createReview(req: Request, res: Response) {
	const validatedReview = await validators.validateReview(req.body);
	if (validatedReview != 'validated') {
		res.status(400).json({
			status: 'failed',
			message: validatedReview
		});
		return;
	}
	const newReview = await Review.create(req.body);
	await Review.create(req.body);

	res.status(201).json({
		status: 'success',
		data: {
			newReview
		}
	});
}