import { Request, Response } from 'express';
import { Review } from '../database/models/reviewModel';
import * as validators from './validators';
import { User } from '../database/models/userModel';
import { Product } from '../database/models/productModel';

export {
	getAllReviews,
	getReview,
	deleteReview,
	createReview,
	updateReview
};


async function getAllReviews(_req: Request, res: Response) {
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
			message: 'Review not found, invalid ID.'
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
	const validatedReview = await validators.validateReview(req.body, {update: false});
	let user;
	let product;
	let newReview;
	if (validatedReview != 'validated') {
		res.status(400).json({
			status: 'failed',
			message: validatedReview
		});
		return;
	}

	try {
		user = await User.findById(req.body.owner);
	} catch {
		res.status(400).json({
			status: 'error',
			message: 'Unknown DB error. Please try again later.'
		});
		return;
	}

	if (!user) {
		res.status(404).json({
			status: 'failed',
			message: 'User not found. Please log in with a valid user to write a review.'
		});
		return;
	}

	try {
		product = await Product.findById(req.body.product);
	} catch {
		res.status(400).json({
			status: 'error',
			message: 'Unknown DB error. Please try again later.'
		});
		return;
	}

	if (!product) {
		res.status(404).json({
			status: 'failed',
			message: 'Product not found.'
		});
		return;
	}
	
	try {
		newReview = await Review.create(req.body);
		await User.findByIdAndUpdate(req.body.owner, {$push: {reviews: newReview._id}});
		await Product.findByIdAndUpdate(req.body.product, {$push: {reviews: newReview._id}});
	} catch {
		res.status(400).json({
			status: 'error',
			message: 'Unknown DB error. Please try again later.'
		});
		return;
	}

	res.status(201).json({
		status: 'success',
		data: {
			newReview
		}
	});
}

async function updateReview(req: Request, res: Response) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let editedReview: any;
	if(!await validators.validateId(String(req.params.id))) {
		res.status(404).json({
			status: 'failed',
			message: 'Review not found, invalid ID.'
		});
		return;
	}

	try {
		editedReview = await Review.findById(req.params.id);
	} catch {
		res.status(400).json({
			status: 'error',
			message: 'Unknown error. Please try again later.'
		});
		return;
	}

	if (!editedReview) {
		res.status(404).json({
			status: 'failed',
			message: 'Review not found.'
		});
		return;
	}	


	const validatedReview = await validators.validateReview(req.body, {update: true});
	if (validatedReview != 'validated') {
		res.status(406).json({
			status: 'failed',
			message: validatedReview
		});
		return;
	}

	await Review.findByIdAndUpdate(req.params.id, req.body);

	res.status(200).json({
		status: 'success',
		data: {
			data: null
		}
	});
}