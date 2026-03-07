import { Schema, model, models } from 'mongoose';
import { productCategories } from '../../utils/dbValues/productValues';

const couponSchema = new Schema({
	code: {
		type: String,
		required: [true, 'A coupon must have a code.'],
		unique: true,
		minlength: [3, 'The coupon code must be at least 3 characters long.'],
		maxlength: [20, 'The coupon code can\'t be longer than 20 characters.'],
	},

	discount: {
		type: Number,
		required: [true, 'A coupon must have a discount.'],
		min: [0, 'The discount can\'t be negative.'],
		max: [1, 'The discount can\'t be more than 100%.']
	},

	combinable: {
		type: Boolean,
		required: [true, 'Please specify if the coupon can be combined with other coupons.'],
		default: false
	},

	active: {
		type: Boolean,
		required: [true, 'Please specify if the coupon is active.'],
		default: false
	},

	startDate: {
		type: Date,
	},

	expirationDate: {
		type: Date,
	},

	restrictedProducts: {
		type: [Schema.Types.ObjectId],
		ref: 'Product'
	},
	
	restrictedCategories: {
		type: [String],
		enum: {
			values: productCategories,
			message: `Product category can only be: ${productCategories.join(', ')}`
		}
	},

	usedBy: {
		type: [Schema.Types.ObjectId],
		ref: 'User'
	},

	limitedUse: {
		type: Number,
		min: [1, 'The coupon must be usable at least once.']
	},

	minValue: {
		type: Number,
		min: [0, 'The minimum value can\'t be negative.']
	},

	maxValue: {
		type: Number,
		min: [0, 'The maximum value can\'t be negative.']
	}
}, { timestamps: true, strict: true });

export const Coupon = models.Coupon || model('Coupon', couponSchema);