import { Request } from 'express';
import { Review } from '../../database/models/reviewModel';
import { checkExtraFields } from '../utils/checkExtraFields';
import { starValues } from '../../types/ReviewTypes';
import { handleValidationWarning, handleValidationError, handleSuccessfulValidation } from '../utils/loggerHelper';

export {
	validateReview
};

async function validateReview(review: Request['body'], options: {update: boolean}) {
	try {
		await checkExtraFields(review, Review);
	} catch (err) {
		return handleValidationError(String(err));
	}

	if(!options.update) {
		if(!review.owner) {
			return handleValidationWarning('Please log in to write a review.');
		} else if(review.owner && review.owner.length === 0) {
			return handleValidationWarning('Please log in to write a review.');
		}
		
		if(!review.product) {
			return handleValidationWarning('Please select a product for the review.');
		} else if(review.product && review.product.length === 0) {
			return handleValidationWarning('Please select a product for the review.');
		} 
	}

	if (options.update) {
		if(review.owner || review.owner === '') {
			return handleValidationWarning('The owner of the review cannot be changed.');
		}

		if(review.product || review.product === '') {
			return handleValidationWarning('the product of the review cannot be changed.');
		} 
	}

	if (review.stars) {
		if (typeof review.stars != 'number' || !starValues.includes(review.stars)) {
			return handleValidationWarning('Please write a valid rating.');
		}
	}
		
	if((!review.description || review.description.length === 0) && (!review.stars || review.stars.length === 0)) {
		return handleValidationWarning('Please write a comment or a rating for the review.');
	}

	return handleSuccessfulValidation('Review validated successfully.');
}