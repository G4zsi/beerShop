import {faker} from '@faker-js/faker';
import { Purchase } from '../models/purchaseModel';
import { randomQueries } from '../utils/seedHelpers';
import { Product } from '../models/productModel';

export {
	createPurchase
};

async function createPurchase() {
	const purchase = new Purchase({
		products: randomQueries(Product, faker.number.int({min:1, max:30}))
	});
	await Purchase.create(purchase);
}