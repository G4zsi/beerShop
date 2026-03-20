import { createPurchase, createTestPurchases } from '../factories/purchaseFactory';

export {
	seedPurchase,
	seedTestPurchases
};

async function seedPurchase(quantity: number) {
	for(let i = 0; i < quantity; i++) {
		await createPurchase();
	}
}

async function seedTestPurchases() {
	console.log('Seeding test purchases...');
	await createTestPurchases();
}