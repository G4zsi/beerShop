import { Request, Response } from 'express';
import { Product } from '../database/models/productModel';
import * as validators from './validators';

export {
	getAllProducts,
	getProduct,
	deleteProduct,
	createProduct,
	updateProduct
};

async function getAllProducts(_req: Request, res: Response) {
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
	if(!await validators.validateId(String(req.params.id))) {
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
	if(!await validators.validateId(String(req.params.id))) {
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
	const validatedProduct = await validators.validateProduct(req.body);
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

async function updateProduct(req: Request, res: Response) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let editedProduct: any;

	if(!await validators.validateId(String(req.params.id))) {
		res.status(404).json({
			status: 'failed',
			message: 'Document not found, invalid ID.'
		});
		return;
	}

	try{
		editedProduct = await Product.findById(req.params.id);
	} catch {
		res.status(400).json({
			status: 'error',
			message: 'Unknown error. Please try again later.'
		});
		return;
	}

	if(!editedProduct) {
		res.status(404).json({
			status: 'error',
			message: 'Product not found.'
		});
		return;
	}

	if(!req.body.name) {
		req.body.name = editedProduct['name'];
	}

	if(!req.body.onStock) {
		req.body.onStock = editedProduct['onStock'];
	}

	if(!req.body.category) {
		req.body.category = editedProduct['category'];
	}

	if(!req.body.description) {
		req.body.description = editedProduct['description'];
	}

	if(!req.body.price) {
		req.body.price = editedProduct['price'];
	}

	if(!req.body.manufacturer) {
		req.body.manufacturer = editedProduct['manufacturer'];
	}

	if(!req.body.discount) {
		req.body.discount = editedProduct['discount'];
	}

	if(!req.body.type) {
		req.body.type = editedProduct['type'];
	}

	if(!req.body.country) {
		req.body.country = editedProduct['country'];
	}

	if(!req.body.fermentation) {
		req.body.fermentation = editedProduct['fermentation'];
	}

	if(!req.body.color) {
		req.body.color = editedProduct['color'];
	}

	const validatedProduct = await validators.validateProduct(req.body);

	if(validatedProduct != 'validated') {
		res.status(406).json({
			status: 'failed',
			message: validatedProduct
		});
		return;
	}

	await Product.findByIdAndUpdate(req.params.id, req.body);

	res.status(200).json({
		status: 'success',
		data: {
			data: null
		}
	});
}

