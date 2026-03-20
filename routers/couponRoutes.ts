import * as express from 'express';
import * as couponController from '../controllers/couponController';


export {
	couponRouter
};

const couponRouter = express.Router();

couponRouter.route('/')
	.get(couponController.getAllCoupons)
	.post(couponController.createCoupon);

couponRouter.route('/:id')
	.get(couponController.getCoupon)
	.patch(couponController.updateCoupon)
	.delete(couponController.deleteCoupon);