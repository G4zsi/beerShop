import { createBeer, createProduct } from '../factories/productFactory';

export {
	seedProducts,
	seedBeers
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