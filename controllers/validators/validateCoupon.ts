import { Request } from 'express';
import { Coupon } from '../../database/models/couponModel';
import { checkExtraFields } from '../utils/checkExtraFields';
import validator from 'validator';
import { handleSuccessfulValidation, handleValidationWarning, handleValidationError } from '../utils/loggerHelper';

export {
	validateCoupon
};

async function validateCoupon(coupon: Request['body'], options: {update: boolean}) {
	try {
		await checkExtraFields(coupon, Coupon);
	} catch (err) {
		return handleValidationError(String(err));
	}

	if(!options.update) {
		if(!coupon.code) {
			return handleValidationWarning('A coupon must have a code.');
		}
		if(!coupon.discount) {
			return handleValidationWarning('A coupon must have a discount.');
		}
		if(coupon.combinable === undefined) {
			return handleValidationWarning('Please specify if the coupon can be combined with other coupons.');
		}
		if(coupon.active === undefined) {
			return handleValidationWarning('Please specify if the coupon is active.');
		}
	}

	if (coupon.code) {
		if (coupon.code.length === 0) {
			return handleValidationWarning('A coupon must have a code.');
		}
		 else if (coupon.code.length < 3) {
			return handleValidationWarning('The coupon code must be at least 3 characters long.');
		} else if (coupon.code.length > 20) {
			return handleValidationWarning('The coupon code can\'t be longer than 20 characters.');
		} else if (await Coupon.findOne({code: coupon.code}) != undefined) {
			return handleValidationWarning('A coupon with this code already exists.');
		}
	}

	if (coupon.discount) {
		if (coupon.discount.toString().length === 0) {
			return handleValidationWarning('A coupon must have a discount.');
		} else if (typeof coupon.discount != 'number') {
			return handleValidationWarning('Please enter a valid number.');
		} else if (coupon.discount < 0) {
			return handleValidationWarning('The discount can\'t be negative.');
		} else if (coupon.discount > 1) {
			return handleValidationWarning('The discount can\'t be more than 100%.');
		}
	}

	if (coupon.combinable && typeof coupon.combinable != 'boolean') {
		return handleValidationWarning('Please specify if the coupon can be combined with other coupons.');
	}

	if (coupon.active && typeof coupon.active != 'boolean') {
		return handleValidationWarning('Please specify if the coupon is active.');
	}
	
	if (coupon.startDate && !validator.isDate(coupon.startDate, {format: 'YYYY.MM.DD', delimiters: ['.', '/']})) {
		return handleValidationWarning('The start date must be a valid date.');
	}

	if (coupon.expirationDate) {
		if(!validator.isDate(coupon.expirationDate, {format: 'YYYY.MM.DD', delimiters: ['.', '/']})) {
			return handleValidationWarning('The expiration date must be a valid date.');
		} else if (coupon.startDate && new Date(coupon.expirationDate) < new Date(coupon.startDate)) {
			return handleValidationWarning('The expiration date can\'t be before the start date.');
		}
	}

	if (coupon.limitedUse) {
		if (typeof coupon.limitedUse != 'number') {
			return handleValidationWarning('Please enter a valid number.');
		} else if (coupon.limitedUse < 1) {
			return handleValidationWarning('The coupon must be usable at least once.');
		}
	}

	if (coupon.minValue) {
		if (typeof coupon.minValue != 'number') {
			return handleValidationWarning('Please enter a valid number.');
		} else if (coupon.minValue < 0) {
			return handleValidationWarning('The minimum value can\'t be negative.');
		}
	}

	if (coupon.maxValue) {
		if (typeof coupon.maxValue != 'number') {
			return handleValidationWarning('Please enter a valid number.');
		} else if (coupon.maxValue < 0) {
			return handleValidationWarning('The maximum value can\'t be negative.');
		}
	}
	
	return handleSuccessfulValidation(`Validation completed. Coupon: ${coupon} is valid.`);
}