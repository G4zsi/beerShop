import {faker} from '@faker-js/faker';
import { randomQuery } from '../utils/seedHelpers';
import { User } from '../models/userModel';
import { Product } from '../models/productModel';
import { Review } from '../models/reviewModel';
import { StarValues, starValues } from '../../utils/dbValues/reviewValues';

export {
	createReview,
	createTestReviews
};

async function createReview(userId?: string, productId?: string, description?: string, stars?: StarValues) {
	const addedUserId = userId? userId : await randomQuery(User);
	const addedProductId = productId? productId : await randomQuery(Product);
	const review = await new Review({
		owner: addedUserId,
		product: addedProductId,
		description: description ? description : faker.lorem.sentences(),
		stars: stars ? stars: faker.helpers.arrayElement(starValues)
	});

	const createdReview = await Review.create(review);
	await Product.findByIdAndUpdate(addedProductId, { $push: { reviews: createdReview['_id'] }});
	await User.findByIdAndUpdate(addedUserId, { $push: { reviews: createdReview['_id'] }});
}

async function createTestReviews() {
	const users = await User.find();
	const products = await Product.find();
	for(let i = 0; i < 10; i++) {
		await createReview(users[i % users.length]._id.toString(), products[i % products.length]._id.toString(), `This is a review ${i}`, starValues[Math.floor(i / 2)]);
	}
}
