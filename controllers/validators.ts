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
async function validateUser (req: Request) {
	if(!req.body.firstName || req.body.firstName.length === 0) {
		return 'This field is required. Please enter your First name.';
	}

	if(!req.body.lastName || req.body.lastName.length === 0) {
		return 'This field is required. Please enter your Last name.';
	}

	if(!req.body.gender || req.body.gender.length === 0) {
		return 'This field is required. Please choose your gender';
	} else if(req.body.gender != 'Male' && req.body.gender != 'Female' && req.body.gender != 'Other') {
		return 'The gender must be Male, Female or other.';
	}
	
	if(!req.body.email || req.body.email.length === 0) {
		return 'This field is required. Please enter your e-mail address.';
	} else if(!validator.isEmail(req.body.email)) {
		return 'Wrong e-mail format. Please try again.';
	} else if(await User.findOne({email: req.body.email}) != undefined) {
		return 'A profile is already uses this e-mail address. Try to login.';
	}

	if(!req.body.role || req.body.role.length === 0) {
		return 'A user must have a role!';
	} else if(req.body.role != 'admin' && req.body.role != 'manager' && req.body.role != 'customer') {
		return 'The role must be admin, manager or customer.';
	}

	if(!req.body.password || req.body.email.password === 0) {
		return 'This field is required. Please enter your password.';
	} else if(req.body.password.length < 6) {
		return 'Your password must contain at least 6 characters.';
	} else if(req.body.password.length > 20) {
		return 'Your password can contain maximum of 20 characters.';
	}

	if(!req.body.passwordAgain || req.body.email.passwordAgain === 0) {
		return 'This field is required. Please enter your password again.';
	} else if(req.body.passwordAgain != req.body.passwordAgain) {
		return 'The two passwords must be equal.';
	}

	if(!req.body.birthday || req.body.email.birthday === 0) {
		return 'This field is required. Please enter your birthday.';
	} else if(validator.isDate(req.body.birthday)) {
		return 'The birthday must be a valid date.';
	}

	return 'validated';
}

// product
async function validateProduct(req: Request) {
	if(!req.body.name || req.body.name.length === 0) {
		return 'This field is required. Please enter the product\'s name.';
	}

	if(!req.body.onStock || req.body.onStock.length === 0) {
		return 'This field is required. Please enter how many of this product is on stock.';
	} else if (typeof req.body.onStock != 'number') {
		return 'Please enter a valid number.';
	}

	if(!req.body.category || req.body.category.length === 0) {
		return 'Please choose a category for the product.';
	} else if(req.body.category != 'beer' && req.body.category != 'snack' && req.body.category != 'glass'
	&& req.body.category != 'clothing' && req.body.category != 'non-alcoholic' && req.body.category != 'gift card' && req.body.category != 'other'
	) {
		return 'The category must be beer, snack, glass, clothing, non-alcoholic, gift card or other.';
	}

	if(!req.body.description || req.body.description.length === 0) {
		return 'Please enter description for the product.';
	}

	if(!req.body.price || req.body.price.length === 0) {
		return 'Please enter the correnct price for the product';
	}

	if(req.body.fermentation) {
		if(req.body.fermentation != 'ale' && req.body.fermentation != 'lager' && req.body.fermentation != 'hibrid') {
			return 'The fermentation type can be only ale, lager or hibrid';
		}
	}

	return 'validated';
}