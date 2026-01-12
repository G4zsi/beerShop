import { Schema, model, models } from 'mongoose';

const productSchema = new Schema({
	//required
	name: {
		type: String,
		required: [true, 'Please enter the product\'s name.']
	},

	onStock: {
		type: Number,
		required: [true, 'Please enter how many is on stock']
	},

	category: {
		type: String,
		required: [true, 'Please choose from the categories'],
		enum: {
			values: ['beer', 'snack', 'glass', 'clothing', 'non-alcoholic', 'book', 'gift card', 'other'],
			message: 'Product category can only be: beer, snack, glass, clothing, non-alcoholic, book, gift card or other.'
		}
	},

	description: {
		type: String,
		required: [true, 'Please enter a description.']
	},

	price: {
		type: Number,
		required: [true, 'Please enter the product\'s price']
	},

	manufacturer: {
		type: String,
		required: [true, 'Please enter the product\'s manufacturer']
	},

	discount: {
		type: Number,
		required: [true, 'If the product is not discounted, please enter "0" Else enter the percentage of the discount.']
	},

	// optional
	type: {
		type: String
	},

	country: {
		type: String
	},

	fermentation: {
		type: String,
		enum: {
			values: ['ale', 'lager', 'hybrid'],
			message: 'Beer fermentation can be: ale, lager or hybrid'
		}
	},

	color: {
		type: String
	},

	reviews: {
		type: [Schema.Types.ObjectId],
		ref: 'Review'
	}
}, { timestamps: true });

export const Product = models.Product || model('Product', productSchema);