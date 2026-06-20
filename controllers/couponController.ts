import {Request, Response} from 'express';
import { Coupon } from '../database/models/couponModel';
import { validateCoupon } from './validators/validateCoupon';
import { validateID } from './validators/validateID';

export {
	getAllCoupons,
	getCoupon,
	deleteCoupon,
	createCoupon,
	updateCoupon
};

async function getAllCoupons(_req: Request, res: Response) {
	const queries = await Coupon.find();

	res.status(200).json({
		status: 'success',
		length: queries.length,
		data: {
			queries
		}
	});
}

async function getCoupon(req: Request, res: Response) {
	if(!await validateID(String(req.params.id))) {
		res.status(404).json({
			status: 'failed',
			message: 'Coupon not found, invalid ID.'
		});
		return;
	}

	const query = await Coupon.findById(req.params.id);

	if(!query) {
		res.status(404).json({
			status: 'failed',
			message: 'Coupon not found.'
		});
		return;
	}

	res.status(200).json({
		status: 'success',
		data: {
			query
		}
	});

	return query;
}

async function deleteCoupon(req: Request, res: Response) {
	if(!await validateID(String(req.params.id))) {
		res.status(404).json({
			status: 'failed',
			message: 'Coupon not found, invalid ID.'
		});
		return;
	}

	const query = await Coupon.findByIdAndDelete(req.params.id);

	if(!query) {
		res.status(404).json({
			status: 'failed',
			message: 'Coupon not found.'
		});
		return;
	}

	res.status(200).json({
		status: 'success',
		message: 'Coupon deleted.'
	});
}

async function createCoupon(req: Request, res: Response) {
	const validatedCoupon = await validateCoupon(req.body, { update: false });
	if(validatedCoupon != 'validated') {
		res.status(406).json({
			status: 'failed',
			message: validatedCoupon
		});
		return;
	}

	const query = await new Coupon(req.body);
	await Coupon.create(query);

	res.status(201).json({
		status: 'success',
		data: {
			query
		}
	});
}

async function updateCoupon(req: Request, res: Response) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let editedCoupon: any;
	if(!await validateID(String(req.params.id))) {
		res.status(404).json({
			status: 'failed',
			message: 'Coupon not found, invalid ID.'
		});
		return;
	}

	try {
		editedCoupon = await Coupon.findById(req.params.id);
	} catch {
		res.status(400).json({
			status: 'error',
			message: 'Unknown error. Please try again later.'
		});
		return;
	}

	if(!editedCoupon) {
		res.status(404).json({
			status: 'failed',
			message: 'Coupon not found.'
		});
		return;
	}

	const validatedCoupon = await validateCoupon(req.body, { update: true });
	if (validatedCoupon != 'validated') {
		res.status(406).json({
			status: 'failed',
			message: validatedCoupon
		});
		return;
	}

	await Coupon.findByIdAndUpdate(req.params.id, req.body);

	res.status(200).json({
		status: 'success',
		data: {
			data: null
		}
	});
}