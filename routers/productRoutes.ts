import * as express from 'express';
import * as productController from '../controllers/productController';


export {
	productRouter
};

const productRouter = express.Router();

productRouter.route('/')
	.get(productController.getAllProducts)
	.post(productController.createProduct);

productRouter.route('/:id')
	.get(productController.getProduct)
	.delete(productController.deleteProduct);