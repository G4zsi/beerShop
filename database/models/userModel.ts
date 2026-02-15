import { Schema,model, models } from 'mongoose';
import { genderTypes, roleTypes } from '../../utils/dbValues/userValues';
import { passwordRegex } from '../../utils/passwordRegex';

const userSchema = new Schema({
	// required
	firstName: {
		type: String,
		required: [true, 'Please enter your first name.']
	},

	lastName: {
		type: String,
		required: [true, 'Please enter your last name.']
	},
    
	gender: {
		type: String,
		required: [true, 'Please enter your gender.'],
		enum: {
			values: genderTypes,
			message: `User's gender can be: ${genderTypes.join(', ')}`
		}
	},

	email: {
		type: String,
		required: [true, 'Please enter your email.'],
		unique: true,
		lowercase: true
	},

	role: {
		type: String,
		required: [true, 'Please choose from the role categories.'],
		enum: {
			values: roleTypes,
			message: `User's role can be: ${roleTypes.join(', ')}`
		}
	},
	
	password: {
		type: String,
		required: [true, 'Please enter your password.'],
		select: false,
		minlength: [8, 'A password must contain at least 8 characters'],
		maxlength: [20, 'A password can contain maximum 20 characters'],
		match: [passwordRegex, 'A password must contain at least 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character.']
	},
	
	passwordAgain: {
		type: String,
		required: [true, 'Please enter your password again.'],
		select: false,
		minlength: [8, 'A password must contain at least 8 characters'],
		maxlength: [20, 'A password can contain maximum 20 characters'],
		match: [passwordRegex, 'A password must contain at least 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character.']
	},
	
	birthday: {
		type: Date,
		required: [true, 'Please enter your birthday.']
	},

	// optional
	phoneNumber: {
		type: String,
		lowercase: true
	},

	zipCode: {
		type: Number
	},

	city: {
		type: String
	},

	address: {
		type: String
	},

	billingZipCode: {
		type: Number
	},

	billingCity: {
		type: String
	},

	billingAddress: {
		type: String
	},

	newsLetter: {
		type: Boolean,
		default: false
	},

	favorites: {
		type: [Schema.Types.ObjectId],
		ref: 'Product'
	},

	wishlist: {
		type: [Schema.Types.ObjectId],
		ref: 'Product'
	},

	purchaseHistory: {
		type: [Schema.Types.ObjectId],
		ref: 'Purchase'
	},

	cart: {
		type: [Schema.Types.ObjectId],
		ref: 'Product'
	},

	reviews: {
		type: [Schema.Types.ObjectId],
		ref: 'Review'
	}
}, { timestamps: true, strict: true });

export const User = models.User || model('User', userSchema);