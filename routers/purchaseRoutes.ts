import * as express from 'express';
import * as purchaseController from '../controllers/purchaseController';


export {
	purchaseRouter
};

const purchaseRouter = express.Router();

purchaseRouter.route('/')
	.get(purchaseController.getAllPurchases)
	.post(purchaseController.createPurchase);

purchaseRouter.route('/:id')
	.get(purchaseController.getPurchase)
	.patch(purchaseController.updatePurchase)
	.delete(purchaseController.deletePurchase);