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
		type: [String]
	}
}, { timestamps: true, strict: true });

export const Purchase = models.Purchase || model('Purchase', purchaseSchema);