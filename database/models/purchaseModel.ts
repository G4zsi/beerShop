import { Schema,model, models } from 'mongoose';

const purchaseSchema = new Schema({
	products: {
		type: [Schema.Types.ObjectId],
		ref: 'Product',
		required: [true, 'You need at least one product']
	},

	usedCoupons: {
		type: [String]
	}
}, { timestamps: true });

export const Purchase = models.Purchase || model('Purchase', purchaseSchema);