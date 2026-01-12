import { createBeer, createProduct, createTestProducts } from '../factories/productFactory';

export {
	seedProducts,
	seedBeers,
	seedTestProducts
};

async function seedProducts(quantity: number) {
	for(let i = 0; i < quantity; i++) {
		await createProduct();
	}
}

async function seedBeers(quantity: number) {
	for(let i = 0; i < quantity; i++) {
		await createBeer();
	}
}

async function seedTestProducts() {
	await createTestProducts(20, 12, 5);
}