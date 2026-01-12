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
		required: [true, 'Please enter your gender.'],
		enum: {
			values: ['Male', 'Female', 'Other'],
			message: 'User\'s gender can be: Male, Female or Other'
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
			values: ['admin', 'manager', 'customer'],
			message: 'User\'s role can be: admin, manager or customer'
		}
	},
	
	password: {
		type: String,
		required: [true, 'Please enter your password.'],
		select: false,
		minlength: [6, 'A password must contain at least 6 characters'],
		maxlength: [20, 'A password can contain maximum 20 characters']
	},
	
	passwordAgain: {
		type: String,
		required: [true, 'Please enter your password again.'],
		select: false,
		minlength: [6, 'A password must contain at least 6 characters'],
		maxlength: [20, 'A password can contain maximum 20 characters']
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
}, { timestamps: true });

export const User = models.User || model('User', userSchema);