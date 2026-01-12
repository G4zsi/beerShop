import mongoose from 'mongoose';
import { Request } from 'express';
import * as validator from 'validator';
import { User } from '../database/models/userModel';

export {
	validateId,
	validateUser,
	validateProduct
};

async function validateId(id: string) {
	const isValidId = mongoose.Types.ObjectId.isValid(id);
	return isValidId;
}

// user
async function validateUser (user: Request['body']) {
	if(!user.firstName || user.firstName.length === 0) {
		return 'This field is required. Please enter your First name.';
	}

	if(!user.lastName || user.lastName.length === 0) {
		return 'This field is required. Please enter your Last name.';
	}

	if(!user.gender || user.gender.length === 0) {
		return 'This field is required. Please choose your gender';
	} else if(user.gender != 'Male' && user.gender != 'Female' && user.gender != 'Other') {
		return 'The gender must be Male, Female or other.';
	}
	
	if(!user.email || user.email.length === 0) {
		return 'This field is required. Please enter your e-mail address.';
	} else if(!validator.isEmail(user.email)) {
		return 'Wrong e-mail format. Please try again.';
	} else if(await User.findOne({email: user.email}) != undefined) {
		return 'A profile is already uses this e-mail address. Try to login.';
	}

	if(!user.role || user.role.length === 0) {
		return 'A user must have a role!';
	} else if(user.role != 'admin' && user.role != 'manager' && user.role != 'customer') {
		return 'The role must be admin, manager or customer.';
	}

	if(!user.password || user.email.password === 0) {
		return 'This field is required. Please enter your password.';
	} else if(user.password.length < 6) {
		return 'Your password must contain at least 6 characters.';
	} else if(user.password.length > 20) {
		return 'Your password can contain maximum of 20 characters.';
	}

	if(!user.passwordAgain || user.email.passwordAgain === 0) {
		return 'This field is required. Please enter your password again.';
	} else if(user.passwordAgain != user.passwordAgain) {
		return 'The two passwords must be equal.';
	}

	if(!user.birthday || user.email.birthday === 0) {
		return 'This field is required. Please enter your birthday.';
	} else if(validator.isDate(user.birthday)) {
		return 'The birthday must be a valid date.';
	}

	return 'validated';
}

// product
async function validateProduct(product: Request['body']) {
	if(!product.name || product.name.length === 0) {
		return 'This field is required. Please enter the product\'s name.';
	}

	if(!product.onStock || product.onStock.toString().length === 0) {
		return 'This field is required. Please enter how many of this product is on stock.';
	} else if (typeof product.onStock != 'number') {
		return 'Please enter a valid number.';
	}

	if(!product.category || product.category.length === 0) {
		return 'Please choose a category for the product.';
	} else if(product.category != 'beer' && product.category != 'snack' && product.category != 'glass'
	&& product.category != 'clothing' && product.category != 'non-alcoholic' && product.category != 'gift card' && product.category != 'other'
	) {
		return 'The category must be beer, snack, glass, clothing, non-alcoholic, gift card or other.';
	}

	if(!product.description || product.description.length === 0) {
		return 'Please enter description for the product.';
	}

	if(!product.price || product.price.toString().length === 0) {
		return 'Please enter the correnct price for the product';
	} else if (typeof product.price != 'number') {
		return 'Please enter a valid number.';
	}

	if(!product.discount || product.discount.toString().length === 0) {
		return 'If the product is not discounted, please enter "0" Else enter the percentage of the discount.';
	} else if (typeof product.discount != 'number') {
		return 'Please enter a valid number.';
	}

	if(product.fermentation) {
		if(product.fermentation != 'ale' && product.fermentation != 'lager' && product.fermentation != 'hibrid') {
			return 'The fermentation type can be only ale, lager or hibrid';
		}
	}

	if(!product.manufacturer || product.manufacturer.length === 0) {
		return 'Please enter the manufacturer of the product';
	}

	return 'validated';
}