import {faker} from '@faker-js/faker';
import { Coupon } from '../models/couponModel';
import { randomQuery } from '../utils/seedHelpers';
import { Product } from '../models/productModel';

export {
	createCoupon,
	createTestCoupons
};

async function createCoupon(code?: string, discount?: number, combinable?: boolean, active?: boolean, startDate?: Date, expirationDate?: Date) {
	const productId = await randomQuery(Product);
	const coupon = await new Coupon({
		code: code || faker.string.alphanumeric(5),
		discount: discount !== undefined ? discount : faker.number.float({min: 0, max: 1}),
		combinable: combinable !== undefined ? combinable : faker.datatype.boolean(),
		active: active !== undefined ? active : faker.datatype.boolean(),
		startDate: startDate || faker.date.recent(),
		expirationDate: expirationDate || faker.date.soon(),
		restrictedProducts: [productId],
	});
	await Coupon.create(coupon);
}

async function createTestCoupons() {
	for(let i = 0; i < 5; i++) {
		const discount = i /10;
		await createCoupon(`TEST${i}`, discount, true, true, new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
	}
}
