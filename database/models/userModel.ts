import { Schema,model, models } from 'mongoose';

const userSchema = new Schema({
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

	phoneNumber: {
		type: String,
		required: [true, 'Please enter your phone number.'],
		unique: true,
		lowercase: true
	},

	password: {
		type: String,
		required: true,
		select: false,
		minlength: [8, 'A password must contain at least 8 characters'],
		maxlenght: [20, 'A password can contain maximum 20 characters']
	},

	passwordAgain: {
		type: String,
		required: true,
		select: false,
		minlength: [8, 'A password must contain at least 8 characters'],
		maxlenght: [20, 'A password can contain maximum 20 characters']
	},

	birthday: {
		type: Date,
		required: true
	},

	newsLetter: {
		type: Boolean,
		default: false
	}
});

export const User = models.User || model('User', userSchema);