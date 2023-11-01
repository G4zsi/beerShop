import { createPurchase } from '../factories/purchaseFactory';

export {
	seedPurchase
};

async function seedPurchase(quantity: number) {
	for(let i = 0; i < quantity; i++) {
		await createPurchase();
	}
}