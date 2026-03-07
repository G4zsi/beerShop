import mongoose from 'mongoose';
import { Request } from 'express';
import * as validator from 'validator';
import { User } from '../database/models/userModel';
import { Product } from '../database/models/productModel';
import { Review } from '../database/models/reviewModel';
import { passwordRegex } from '../utils/passwordRegex';
import { genderTypes, roleTypes } from '../utils/dbValues/userValues';
import { productCategories, fermentationTypes } from '../utils/dbValues/productValues';
import { starValues } from '../utils/dbValues/reviewValues';
import { Purchase } from '../database/models/purchaseModel';
import { Coupon } from '../database/models/couponModel';

export {
	validateId,
	validateUser,
	validateProduct,
	validateReview,
	validatePurchase,
	validateCoupon
};

async function validateId(id: string) {
	const isValidId = mongoose.Types.ObjectId.isValid(id);
	return isValidId;
}

// user
async function validateUser (user: Request['body'], options: {update: boolean}) {
	try {
		await checkExtraFields(user, User);
	} catch (err) {
		return err;
	}

	if(!options.update) {
		if(!user.firstName) {
			return 'This field is required. Please enter your First name.';
		}

		if(!user.lastName) {
			return 'This field is required. Please enter your Last name.';
		}

		if(!user.gender) {
			return 'This field is required. Please choose your gender';
		}	
		
		if(!user.email) {
			return 'This field is required. Please enter your e-mail address.';
		}

		if(!user.role) {
			return 'A user must have a role!';
		}

		if(!user.password) {
			return 'This field is required. Please enter your password.';
		}

		if(!user.passwordAgain) {
			return 'This field is required. Please enter your password again.';
		}

		if(!user.birthday) {
			return 'This field is required. Please enter your birth date.';
		}
	}

	if(user.firstName && user.firstName.length === 0) {
		return 'This field is required. Please enter your First name.';
	} 

	if(user.lastName && user.lastName.length === 0) {
		return 'This field is required. Please enter your Last name.';
	}

	if (user.gender) {
		if(user.gender.length === 0) {
			return 'This field is required. Please choose your gender';
		} else if(!genderTypes.includes(user.gender)) {
			const formatted = `${genderTypes.slice(0, -1).join(', ')} or ${genderTypes[genderTypes.length - 1]}`;
			return `The gender must be ${formatted}.`;
		}
	}
	
	if(user.email) {
		if(user.email.length === 0) {
			return 'This field is required. Please enter your e-mail address.';
		} else if(!validator.isEmail(user.email)) {
			return 'Wrong e-mail format. Please try again.';
		} else if(await User.findOne({email: user.email}) != undefined) {
			return 'A profile is already uses this e-mail address. Try to login.';
		}
	}

	if(user.role) {
		if(user.role.length === 0) {
			return 'A user must have a role!';
		} else if(!roleTypes.includes(user.role)) {
			const formatted = `${roleTypes.slice(0, -1).join(', ')} or ${roleTypes[roleTypes.length - 1]}`;
			return `The role must be ${formatted}.`;
		}
	}

	if(user.password && !user.password.match(passwordRegex)) {
		return 'Your password must contain at least one letter, one number and one special character.';
	}

	if( user.passwordAgain) {
		if(!user.passwordAgain.match(passwordRegex)) {
			return 'The two passwords must be equal';
		} else if(user.passwordAgain != user.password) {
			return 'The two passwords must be equal.';
		}
	}

	if (user.birthday) {
		if(user.birthday.length === 0) {
			return 'This field is required. Please enter your birth date.';
		} else if(!validator.isDate(user.birthday, {format: 'YYYY.MM.DD', delimiters: ['.', '/']})) {
			return 'The birthday must be a valid date.';
		}
	}

	return 'validated';
}

// product
async function validateProduct(product: Request['body'], options: {update: boolean}) {
	try {
		await checkExtraFields(product, Product);
	} catch (err) {
		return err;
	}

	if(!options.update) {
		if(!product.name) {
			return 'This field is required. Please enter the product\'s name.';
		}

		if(!product.onStock) {
			return 'This field is required. Please enter how many of this product is on stock.';
		}

		if(!product.category) {
			return 'Please choose a category for the product.';
		}

		if(!product.description) {
			return 'Please enter description for the product.';
		}

		if(!product.price) {
			return 'Please enter the correct price for the product';
		}

		if(!product.discount) {
			return 'If the product is not discounted, please enter "0" Else enter the percentage of the discount.';
		}

		if(!product.manufacturer) {
			return 'Please enter the manufacturer of the product';
		}
	}

	if(product.name && product.name.length === 0) {
		return 'This field is required. Please enter the product\'s name.';
	}

	if (product.onStock) {
		if(product.onStock.toString().length === 0) {
			return 'This field is required. Please enter how many of this product is on stock.';
		} else if (typeof product.onStock != 'number') {
			return 'Please enter a valid number.';
		}
	}

	if (product.category) {
		if(product.category.length === 0) {
			return 'Please choose a category for the product.';
		} else if(!productCategories.includes(product.category)) {
			const formatted = `${productCategories.slice(0, -1).join(', ')} or ${productCategories[productCategories.length - 1]}`;
			return `The category must be ${formatted}.`;
		}
	}

	if(product.description && product.description.length === 0) {
		return 'Please enter description for the product.';
	}

	if (product.price) {
		if(product.price.toString().length === 0) {
			return 'Please enter the correct price for the product';
		} else if (typeof product.price != 'number') {
			return 'Please enter a valid number.';
		}
	}

	if (product.discount) {
		if(product.discount.toString().length === 0) {
			return 'If the product is not discounted, please enter "0" Else enter the percentage of the discount.';
		} else if (typeof product.discount != 'number') {
			return 'Please enter a valid number.';
		}
	}

	if(product.fermentation) {
		if(!fermentationTypes.includes(product.fermentation)) {
			const formatted = `${fermentationTypes.slice(0, -1).join(', ')} or ${fermentationTypes[fermentationTypes.length - 1]}`;
			return `The fermentation type must be ${formatted}.`;
		}
	}

	if(product.manufacturer && product.manufacturer.length === 0) {
		return 'Please enter the manufacturer of the product';
	}

	return 'validated';
}

// review
async function validateReview(review: Request['body'], options: {update: boolean}) {
	try {
		await checkExtraFields(review, Review);
	} catch (err) {
		return err;
	}

	if(!options.update) {
		if(!review.owner) {
			return 'Please log in to write a review.';
		} else if(review.owner && review.owner.length === 0) {
			return 'Please log in to write a review.';
		}
		
		if(!review.product) {
			return 'Please select a product for the review.';
		} else if(review.product && review.product.length === 0) {
			return 'Please select a product for the review.';
		} 
	}

	if (options.update) {
		if(review.owner || review.owner === '') {
			return 'The owner of the review cannot be changed.';
		}

		if(review.product || review.product === '') {
			return 'the product of the review cannot be changed.';
		} 
	}

	if (review.stars) {
		if (typeof review.stars != 'number' || !starValues.includes(review.stars)) {
			return 'Please write a valid rating.';
		}
	}
		
	if((!review.description || review.description.length === 0) && (!review.stars || review.stars.length === 0)) {
		return 'Please write a comment or a rating for the review.';
	}

	return 'validated';
}

async function validatePurchase(purchase: Request['body'], options: {update: boolean}) {
	try {
		await checkExtraFields(purchase, Purchase);
	} catch (err) {
		return err;
	}

	if(!options.update) {
		if(!purchase.user) {
			return 'A purchase must be associated with a user.';
		}
		if(!purchase.products) {
			return 'A purchase must contain at least one product.';
		}
		if(!purchase.price) {
			return 'A purchase must have a price.';
		}
	}

	if(purchase.user && purchase.user.length === 0) {
		return 'The user field is required.';
	}

	if(purchase.products && purchase.products.length === 0) {
		return 'A purchase must contain at least one product.';
	}

	if (purchase.price) {
		if(purchase.price.toString().length === 0) {
			return 'A purchase must have a price.';
		} else if (typeof purchase.price != 'number') {
			return 'Please enter a valid number.';
		} else if (purchase.price < 0) {
			return 'The price can\'t be negative.';
		}
	}

	if (purchase.discount && purchase.discount.toString().length > 0) {
		if (typeof purchase.discount != 'number') {
			return 'Please enter a valid number.';
		} else if (purchase.discount < 0) {
			return 'The discount can\'t be negative.';
		} else if (purchase.discount > 1) {
			return 'The discount can\'t be more than 100%.';
		}
	}

	return 'validated';
}

async function validateCoupon(coupon: Request['body'], options: {update: boolean}) {
	try {
		await checkExtraFields(coupon, Coupon);
	} catch (err) {
		return err;
	}

	if(!options.update) {
		if(!coupon.code) {
			return 'A coupon must have a code.';
		}
		if(!coupon.discount) {
			return 'A coupon must have a discount.';
		}
		if(!coupon.combinable) {
			return 'Please specify if the coupon can be combined with other coupons.';
		}
		if(!coupon.active) {
			return 'Please specify if the coupon is active.';
		}
	}

	if (coupon.code) {
		if (coupon.code.length === 0) {
			return 'A coupon must have a code.';
		}
		 else if (coupon.code.length < 3) {
			return 'The coupon code must be at least 3 characters long.';
		} else if (coupon.code.length > 20) {
			return 'The coupon code can\'t be longer than 20 characters.';
		} else if (await Coupon.findOne({code: coupon.code}) != undefined) {
			return 'A coupon with this code already exists.';
		}
	}

	if (coupon.discount) {
		if (coupon.discount.toString().length === 0) {
			return 'A coupon must have a discount.';
		} else if (typeof coupon.discount != 'number') {
			return 'Please enter a valid number.';
		} else if (coupon.discount < 0) {
			return 'The discount can\'t be negative.';
		} else if (coupon.discount > 1) {
			return 'The discount can\'t be more than 100%.';
		}
	}

	if (coupon.combinable && typeof coupon.combinable != 'boolean') {
		return 'Please specify if the coupon can be combined with other coupons.';
	}

	if (coupon.active && typeof coupon.active != 'boolean') {
		return 'Please specify if the coupon is active.';
	}
	
	if (coupon.startDate && !validator.isDate(coupon.startDate, {format: 'YYYY.MM.DD', delimiters: ['.', '/']})) {
		return 'The start date must be a valid date.';
	}

	if (coupon.expirationDate) {
		if(!validator.isDate(coupon.expirationDate, {format: 'YYYY.MM.DD', delimiters: ['.', '/']})) {
			return 'The expiration date must be a valid date.';
		} else if (coupon.startDate && new Date(coupon.expirationDate) < new Date(coupon.startDate)) {
			return 'The expiration date can\'t be before the start date.';
		}
	}

	if (coupon.limitedUse) {
		if (typeof coupon.limitedUse != 'number') {
			return 'Please enter a valid number.';
		} else if (coupon.limitedUse < 1) {
			return 'The coupon must be usable at least once.';
		}
	}

	if (coupon.minValue) {
		if (typeof coupon.minValue != 'number') {
			return 'Please enter a valid number.';
		} else if (coupon.minValue < 0) {
			return 'The minimum value can\'t be negative.';
		}
	}

	if (coupon.maxValue) {
		if (typeof coupon.maxValue != 'number') {
			return 'Please enter a valid number.';
		} else if (coupon.maxValue < 0) {
			return 'The maximum value can\'t be negative.';
		}
	}
	
	return 'validated';
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function checkExtraFields(data: Request['body'], model: mongoose.Model<any>) {
	const schemaKeys = Object.keys(model.schema.obj);
	const keys = Object.keys(data);
	if (keys.some(key => !schemaKeys.includes(key))) {
		throw new Error(`Some of the data is invalid. Valid entries are: ${schemaKeys.join(', ')}.`);
	}
}