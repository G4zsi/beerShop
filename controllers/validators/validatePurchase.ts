import { Request } from 'express';
import { Purchase } from '../../database/models/purchaseModel';
import { checkExtraFields } from '../utils/checkExtraFields';
import { handleValidationWarning, handleValidationError, handleSuccessfulValidation } from '../utils/loggerHelper';

export {
	validatePurchase
};

async function validatePurchase(purchase: Request['body'], options: {update: boolean}) {
	try {
		await checkExtraFields(purchase, Purchase);
	} catch (err) {
		return handleValidationError(String(err));
	}

	if(!options.update) {
		if(!purchase.user) {
			return handleValidationWarning('The user field is required.');
		}
		if(!purchase.products) {
			return handleValidationWarning('A purchase must contain at least one product.');
		}
		if(!purchase.price) {
			return handleValidationWarning('A purchase must have a price.');
		}
	}

	if(purchase.user && purchase.user.length === 0) {
		return handleValidationWarning('The user field is required.');
	}

	if(purchase.products && purchase.products.length === 0) {
		return handleValidationWarning('A purchase must contain at least one product.');
	}

	if (purchase.price) {
		if(purchase.price.toString().length === 0) {
			return handleValidationWarning('A purchase must have a price.');
		} else if (typeof purchase.price != 'number') {
			return handleValidationWarning('Please enter a valid number.');
		} else if (purchase.price < 0) {
			return handleValidationWarning('The price can\'t be negative.');
		}
	}

	if (purchase.discount && purchase.discount.toString().length > 0) {
		if (typeof purchase.discount != 'number') {
			return handleValidationWarning('Please enter a valid number.');
		} else if (purchase.discount < 0) {
			return handleValidationWarning('The discount can\'t be negative.');
		} else if (purchase.discount > 1) {
			return handleValidationWarning('The discount can\'t be more than 100%.');
		}
	}
	
	return handleSuccessfulValidation('Purchase validated successfully.');
}