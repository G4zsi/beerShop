import { createProduct } from '../factories/productFactory';

export {
	seedProducts
};

async function seedProducts(quantity: number) {
	for(let i = 0; i < quantity; i++) {
		await createProduct();
	}
}