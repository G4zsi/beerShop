import {faker} from '@faker-js/faker';
import { randomQuery } from '../utils/seedHelpers';
import { User } from '../models/userModel';
import { Product } from '../models/productModel';
import { Review } from '../models/reviewModel';
import { starValues } from '../../utils/dbValues/reviewValues';

export {
	createReview
};

async function createReview() {
	const userId = await randomQuery(User);
	const productId = await randomQuery(Product);
	const review = await new Review({
		owner: userId,
		product: productId,
		description: faker.lorem.sentences(),
		stars: faker.helpers.arrayElement(starValues)
	});

	const createdReview = await Review.create(review);
	await Product.findByIdAndUpdate(productId, { $push: { reviews: createdReview['_id'] }});
	await User.findByIdAndUpdate(userId, { $push: { reviews: createdReview['_id'] }});
}