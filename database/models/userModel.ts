import { Schema,model, models } from 'mongoose';

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
		required: [true, 'Please enter your gender.']
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
			values: ['admin', 'manager', 'customer'],
			message: 'User\'s role can be: admin, manager or customer'
		}
	},

	phoneNumber: {
		type: String,
		required: [true, 'Please enter your phone number.'],
		unique: true,
		lowercase: true,
		minlength: [6, 'A password must contain at least 6 characters'],
		maxlenght: [20, 'A password can contain maximum 20 characters']
	},

	password: {
		type: String,
		required: [true, 'Please enter your password.'],
		select: false,
		minlength: [6, 'A password must contain at least 6 characters'],
		maxlenght: [20, 'A password can contain maximum 20 characters']
	},

	passwordAgain: {
		type: String,
		required: [true, 'Please enter your password again.'],
		select: false,
		minlength: [8, 'A password must contain at least 8 characters'],
		maxlenght: [20, 'A password can contain maximum 20 characters']
	},

	birthday: {
		type: Date,
		required: [true, 'Please enter your birthday.']
	},

	// optional
	newsLetter: {
		type: Boolean,
		default: false
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

	favourites: {
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
}, { timestamps: true });

export const User = models.User || model('User', userSchema);