import { Request } from 'express';
import * as validator from 'validator';
import { User } from '../../database/models/userModel';
import { checkExtraFields } from '../utils/checkExtraFields';
import { genderTypes, roleTypes } from '../../types/UserTypes';
import { passwordRegex } from '../../utils/passwordRegex';
import { handleValidationWarning, handleValidationError, handleSuccessfulValidation } from '../utils/loggerHelper';

export {
	validateUser
};


async function validateUser (user: Request['body'], options: {update: boolean}) {
	try {
		await checkExtraFields(user, User);
	} catch (err) {
		return handleValidationError(String(err));
	}

	if(!options.update) {
		if(!user.firstName) {
			return handleValidationWarning('This field is required. Please enter your First name.');
		}

		if(!user.lastName) {
			return handleValidationWarning('This field is required. Please enter your Last name.');
		}

		if(!user.gender) {
			return handleValidationWarning('This field is required. Please choose your gender.');
		}	
		
		if(!user.email) {
			return handleValidationWarning('This field is required. Please enter your e-mail address.');
		}

		if(!user.role) {
			return handleValidationWarning('This field is required. A user must have a role!');
		}

		if(!user.password) {
			return handleValidationWarning('This field is required. Please enter your password.');
		}

		if(!user.passwordAgain) {
			return handleValidationWarning('This field is required. Please enter your password again.');
		}

		if(!user.birthday) {
			return handleValidationWarning('This field is required. Please enter your birth date.');
		}
	}

	if(user.zipCode || user.city || user.address) {
		if(!user.zipCode || user.zipCode.length === 0) {
			return handleValidationWarning('Please enter your zip code.');
		}
		if(typeof user.zipCode != 'number') {
			return handleValidationWarning('Please enter a valid number as a zip code.');
		}
		if(!user.city || user.city.length === 0) {
			return handleValidationWarning('Please enter your city.');
		}
		if(!user.address || user.address.length === 0) {
			return handleValidationWarning('Please enter your address.');
		}
	}

	if(user.billingZipCode || user.billingCity || user.billingAddress) {
		if(!user.zipCode || user.zipCode.length === 0) {
			return handleValidationWarning('Please enter your zip code.');
		}
		if(!user.city || user.city.length === 0) {
			return handleValidationWarning('Please enter your city.');
		}
		if(!user.address || user.address.length === 0) {
			return handleValidationWarning('Please enter your address.');
		}
		if(!user.billingZipCode || user.billingZipCode.length === 0) {
			return handleValidationWarning('Please enter your billing zip code.');
		}
		if(!user.billingCity || user.billingCity.length === 0) {
			return handleValidationWarning('Please enter your billing city.');
		}
		if(!user.billingAddress || user.billingAddress.length === 0) {
			return handleValidationWarning('Please enter your billing address.');
		}
	}

	if(user.firstName && user.firstName.length === 0) {
		return handleValidationWarning('This field is required. Please enter your First name.');
	} 

	if(user.lastName && user.lastName.length === 0) {
		return handleValidationWarning('This field is required. Please enter your Last name.');
	}

	if (user.gender) {
		if(user.gender.length === 0) {
			return handleValidationWarning('This field is required. Please choose your gender.');
		} else if(!genderTypes.includes(user.gender)) {
			const formatted = `${genderTypes.slice(0, -1).join(', ')} or ${genderTypes[genderTypes.length - 1]}`;
			return handleValidationWarning(`The gender must be ${formatted}.`);
		}
	}
	
	if(user.email) {
		if(user.email.length === 0) {
			return handleValidationWarning('This field is required. Please enter your e-mail address.');
		} else if(!validator.isEmail(user.email)) {
			return handleValidationWarning('Wrong e-mail format. Please try again.');
		} else if(await User.findOne({email: user.email}) != undefined) {
			return handleValidationWarning('A profile is already uses this e-mail address. Try to login.');
		}
	}

	if(user.role) {
		if(user.role.length === 0) {
			return handleValidationWarning('This field is required. A user must have a role!');
		} else if(!roleTypes.includes(user.role)) {
			const formatted = `${roleTypes.slice(0, -1).join(', ')} or ${roleTypes[roleTypes.length - 1]}`;
			return handleValidationWarning(`The role must be ${formatted}.`);
		}
	}

	if(user.password && !user.password.match(passwordRegex)) {
		return handleValidationWarning('A password must contain at least 8 characters and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character.');
	}

	if( user.passwordAgain) {
		if(!user.passwordAgain.match(passwordRegex)) {
			return handleValidationWarning('The two passwords must be equal');
		} else if(user.passwordAgain != user.password) {
			return handleValidationWarning('The two passwords must be equal.');
		}
	}

	if (user.birthday) {
		if(user.birthday.length === 0) {
			return handleValidationWarning('This field is required. Please enter your birth date.');
		} else if(!validator.isDate(user.birthday, {format: 'YYYY.MM.DD', delimiters: ['.', '/']})) {
			return handleValidationWarning('The birthday must be a valid date.');
		}
	}

	return handleSuccessfulValidation('validated');
}