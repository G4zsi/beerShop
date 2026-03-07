import { Schema, model, models } from 'mongoose';

const purchaseSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'A purchase must be associated with a user.']
	},

	products: {
		type: [Schema.Types.ObjectId],
		ref: 'Product',
		required: [true, 'You need at least one product']
	},

	usedCoupons: {
		type: [Schema.Types.ObjectId],
		ref: 'Coupon'
	},

	price: {
		type: Number,
		required: [true, 'A purchase must have a price.'],
		min: [0, 'The price can\'t be negative.']
	},

	discount: {
		type: Number,
		default: 0,
		min: [0, 'The discount can\'t be negative.'],
		max: [1, 'The discount can\'t be more than 100%.']
	}
}, { timestamps: true, strict: true });

export const Purchase = models.Purchase || model('Purchase', purchaseSchema);