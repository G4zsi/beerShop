import {faker} from '@faker-js/faker';
import { Coupon } from '../models/couponModel';
import { randomQuery } from '../utils/seedHelpers';
import { Product } from '../models/productModel';

export {
	createCoupon
};

async function createCoupon() {
	const productId = await randomQuery(Product);
	const coupon = await new Coupon({
		code: faker.string.alphanumeric(5),
		discount: faker.number.float({min: 0, max: 1}),
		combinable: faker.datatype.boolean(),
		active: faker.datatype.boolean(),
		startDate: faker.date.recent(),
		expirationDate: faker.date.soon(),
		restrictedProducts: [productId],
	});
	await Coupon.create(coupon);

}