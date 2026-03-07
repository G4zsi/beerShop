import {faker} from '@faker-js/faker';
import { Purchase } from '../models/purchaseModel';
import { randomQuery, randomQueries } from '../utils/seedHelpers';
import { Product } from '../models/productModel';
import { User } from '../models/userModel';
import { Coupon } from '../models/couponModel';

export {
	createPurchase
};

async function createPurchase() {
	const userId = await randomQuery(User);
	const couponId = await randomQuery(Coupon);
	const purchase = await new Purchase({
		user: userId,
		products: await randomQueries(Product, faker.number.int({min:1, max:30})),
		usedCoupons: [couponId],
		price: faker.number.float({min: 1000, max: 100000}), // TODO fix this to show the actual price of the products in the purchase
	});
	await Purchase.create(purchase);
	await User.findByIdAndUpdate(userId, { $push: { purchaseHistory: purchase['_id'] }});
	await Coupon.findByIdAndUpdate(couponId, { $push: { usedBy: userId }});
}