import { createCoupon, createTestCoupons } from '../factories/couponFactory';

export {
	seedCoupons,
	seedTestCoupons
};

async function seedCoupons(quantity: number) {
	for(let i = 0; i < quantity; i++) {
		await createCoupon();
	}  
}

async function seedTestCoupons() {
	console.log('Seeding test coupons...');
	await createTestCoupons();
}