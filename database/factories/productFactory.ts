import {faker} from '@faker-js/faker';
import { Product } from '../models/productModel';

export {
	createProduct,
	createBeer
};

async function createProduct() {
	const product = await new Product({
		name: faker.commerce.productName(),
		onStock: faker.number.int({min: 0}),
		category: faker.helpers.arrayElement(['snack', 'glass', 'clothing', 'non-alcoholic', 'book', 'gift card', 'other']),
		description: faker.commerce.productDescription(),
		price: faker.commerce.price(),
		country: faker.location.country(),
		// reviews
	});
	await Product.create(product);
}

async function createBeer() {
	const beer = await new Product({
		name: faker.commerce.productName(),
		onStock: faker.number.int({min: 0}),
		category: 'beer',
		description: faker.commerce.productDescription(),
		price: faker.commerce.price(),
		country: faker.location.country(),
		type: faker.commerce.product(),
		fermentation: faker.helpers.arrayElement(['ale', 'lager', 'hibrid']),
		color: faker.color.human(),
		brewery: faker.company.name(),
		// reviews
	});
	await Product.create(beer);
}
