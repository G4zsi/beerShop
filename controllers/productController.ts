import { Request, Response } from 'express';
import { Product } from '../database/models/productModel';
import * as validators from './validators';

export {
	getAllProducts,
	getProduct,
	deleteProduct,
	createProduct
};

async function getAllProducts(req: Request, res: Response) {
	const queries = await Product.find();

	res.status(200).json({
		status: 'success',
		length: queries.length,
		data: {
			queries
		}
	});

	return queries;
}

async function getProduct(req: Request, res: Response) {
	if(!await validators.validateId(req.params.id)) {
		res.status(404).json({
			status: 'failed',
			message: 'Product not found, invalid ID.'
		});
		return;
	}

	const query = await Product.findById(req.params.id);
	if (!query) {
		res.status(404).json({
			status: 'failed',
			message: 'Product not found.'
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


async function deleteProduct(req: Request, res: Response) {
	if(!await validators.validateId(req.params.id)) {
		res.status(404).json({
			status: 'failed',
			message: 'Product not found, invalid ID.'
		});
		return;
	}
	
	const query = await Product.findByIdAndDelete(req.params.id);
	if (!query) {
		res.status(404).json({
			status: 'failed',
			message: 'Product not found.'
		});
	} else {
		res.status(200).json({
			status: 'success',
			message: 'Product deleted.'
		});
	}
}

async function createProduct(req: Request, res: Response) {
	const validatedProduct = await validators.validateProduct(req);
	if(validatedProduct != 'validated') {
		res.status(406).json({
			status: 'failed',
			message: validatedProduct
		});
		return;
	}
	const newProduct = await new Product(req.body);
	await Product.create(newProduct);

	res.status(201).json({
		status: 'success',
		data: {
			newProduct
		}
	});
}

