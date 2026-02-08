import mongoose from 'mongoose';
import { Request } from 'express';
import * as validator from 'validator';
import { User } from '../database/models/userModel';
import { Product } from '../database/models/productModel';
import { passwordRegex } from '../utils/passwordRegex';

export {
	validateId,
	validateUser,
	validateProduct,
	validateReview
};

async function validateId(id: string) {
	const isValidId = mongoose.Types.ObjectId.isValid(id);
	return isValidId;
}

// user
async function validateUser (user: Request['body'], options: {update: boolean}) {
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
		} else if(user.gender != 'Male' && user.gender != 'Female' && user.gender != 'Other') {
			return 'The gender must be Male, Female or other.';
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
		} else if(user.role != 'admin' && user.role != 'manager' && user.role != 'customer') {
			return 'The role must be admin, manager or customer.';
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
		return 'Please enter the correct price for the product';
	} else if (typeof product.price != 'number') {
		return 'Please enter a valid number.';
	}

	if(!product.discount || product.discount.toString().length === 0) {
		return 'If the product is not discounted, please enter "0" Else enter the percentage of the discount.';
	} else if (typeof product.discount != 'number') {
		return 'Please enter a valid number.';
	}

	if(product.fermentation) {
		if(product.fermentation != 'ale' && product.fermentation != 'lager' && product.fermentation != 'hybrid') {
			return 'The fermentation type can be only ale, lager or hybrid';
		}
	}

	if(!product.manufacturer || product.manufacturer.length === 0) {
		return 'Please enter the manufacturer of the product';
	}

	return 'validated';
}

// review
async function validateReview(review: Request['body']) {
	if(!review.owner || review.owner.length === 0) {
		return 'Please log in to write a review.';
	} else if (await User.findById(review.owner) == undefined) {
		return 'Please log in with a valid user to write a review.';
	}

	if(!review.product || review.product.length === 0) {
		return 'Please select a product for the review.';
	} else if (await Product.findById(review.product) == undefined) {
		return 'Please select a valid product for the review.';
	}

	if (review.stars) {
		if (review.stars != 0 && review.stars != 0.5 && review.stars != 1 && review.stars != 1.5 && review.stars != 2 &&
			review.stars != 2.5 && review.stars != 3 && review.stars != 3.5 && review.stars != 4 &&
			review.stars != 4.5 && review.stars != 5) {
			return 'Please write a valid rating.';
		}
	}

	return 'validated';
}