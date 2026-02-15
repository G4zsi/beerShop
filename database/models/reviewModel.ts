import { Schema, model, models } from 'mongoose';
import { starValues } from '../../utils/dbValues/reviewValues';
import { commentRegex } from '../../utils/commentRegex';


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
		required: false,
		minLength: [2, 'Please write a comment or a rating for the review.'],
		match: [commentRegex, 'Your comment must be at least 2 characters long.']
	},

	stars: {
		type: Number,
		required: false,
		enum: {
			values: starValues,
			message: 'Please write a valid rating.'
		}
	}
}, { timestamps: true, strict: true });

export const Review = models.Review || model('Review', reviewSchema);