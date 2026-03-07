import { createCoupon } from '../factories/couponFactory';

export {
	seedCoupons
};

async function seedCoupons(quantity: number) {
	for(let i = 0; i < quantity; i++) {
		await createCoupon();
	}  
}