import * as express from 'express';
import * as reviewController from '../controllers/reviewController';

export {
	reviewRouter
};

const reviewRouter = express.Router();

reviewRouter.route('/')
	.get(reviewController.getAllReviews)
	.post(reviewController.createReview);

reviewRouter.route('/:id')
	.get(reviewController.getReview)
	.delete(reviewController.deleteReview)
	.patch(reviewController.updateReview);