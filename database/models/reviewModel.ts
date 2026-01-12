import { Schema, model, models } from 'mongoose';


const reviewSchema = new Schema({
	// required
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'Please log in to write a review.'],
	},

	product: {
		type: Schema.Types.ObjectId,
		ref: 'Product',
		required: [true, 'Please select a product for the review.']
	},

	// optional
	description: {
		type: String,
	},

	stars: {
		type: Number,
		enum: {
			values: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
			message: 'Please write a valid rating.'
		}
	}
}, { timestamps: true });

export const Review = models.Review || model('Review', reviewSchema);