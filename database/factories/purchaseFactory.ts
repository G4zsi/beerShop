import {faker} from '@faker-js/faker';
import { Purchase } from '../models/purchaseModel';
import { randomQuery, randomQueries } from '../utils/seedHelpers';
import { Product } from '../models/productModel';
import { User } from '../models/userModel';
import { Coupon } from '../models/couponModel';

export {
	createPurchase,
	createTestPurchases
};

async function createPurchase(userId?: string, productIds?: string[], couponId?: string, price?: number) {
	const addedUserId = userId ? userId : await randomQuery(User);
	const addedCoupon = await randomQuery(Coupon);
	const addedProductIds = productIds ? productIds : await randomQueries(Product, faker.number.int({min:1, max:30}));
	const addedPurchase = await new Purchase({
		user: addedUserId,
		products: addedProductIds,
		usedCoupons: [addedCoupon['_id']],
		price: price ? price : faker.number.float({min: 1000, max: 100000}),
	});
	await Purchase.create(addedPurchase);
	await User.findByIdAndUpdate(addedUserId, { $push: { purchaseHistory: addedPurchase['_id'] }});
	await Coupon.findByIdAndUpdate(addedCoupon['_id'], { $push: { usedBy: addedUserId }});
	await Product.updateMany({ _id: { $in: addedProductIds } }, { $inc: { onStock: -1 }});
}

async function createTestPurchases() {
	const users = await User.find();
	const products = await Product.find();
	const coupons = await Coupon.find();
	for(let i = 0; i < 20; i++) {
		const price = products[i % products.length].price * (1 - coupons[i % coupons.length].discount / 100);
		await createPurchase(users[i % users.length]._id.toString(), [products[i % products.length]._id.toString()], coupons[i % coupons.length]._id.toString(), price);
	}
}