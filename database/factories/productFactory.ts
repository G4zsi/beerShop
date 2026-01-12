import {faker} from '@faker-js/faker';
import { Product } from '../models/productModel';

export {
	createProduct,
	createBeer,
	createTestProducts
};

async function createProduct() {
	const product = await new Product({
		name: faker.commerce.productName(),
		onStock: faker.number.int({min: 0}),
		category: faker.helpers.arrayElement(['snack', 'glass', 'clothing', 'non-alcoholic', 'book', 'gift card', 'other']),
		description: faker.commerce.productDescription(),
		price: faker.commerce.price(),
		country: faker.location.country(),
		manufacturer: faker.company.name(),
		discount: faker.number.int({min: 0, max: 50})
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
		manufacturer: faker.company.name(),
		discount: faker.number.int({min: 0, max: 50})
		// reviews
	});
	await Product.create(beer);
}

async function createTestProducts(beerNum: number, snackNum: number, glassNum: number) {
	// beers
	for(let i=0; i<beerNum; i++){
		const beer = await new Product({
			name: `beer${i}`,
			onStock: i,
			category: 'beer',
			description: 'beeeer',
			price: calculatePrice(i),
			type: 'beer',
			country: 'Hungary',
			fermentation: i % 2 ? 'lager' : 'ale',
			color: 'light',
			manufacturer: 'test brewery',
			discount: 0
		});
		await Product.create(beer);
	}

	// other products
	for(let i=0; i<snackNum; i++){
		const beer = await new Product({
			name: `snack${i}`,
			onStock: i,
			category: 'snack',
			description: 'snaaack',
			price: calculatePrice(i),
			country: 'Hungary',
			manufacturer: 'test company',
			discount: 10
		});
		await Product.create(beer);
	}

	for(let i=0; i<glassNum; i++){
		const beer = await new Product({
			name: `product${i}`,
			onStock: i,
			category: 'glass',
			description: 'glaaaass',
			price: calculatePrice(i),
			country: 'Hungary',
			manufacturer: 'test company',
			discount: 0
		});
		await Product.create(beer);
	}

	function calculatePrice(iterator: number) {
		switch (iterator % 5) {
		case 0:
			return 990;
		case 1:
			return 1250;
		case 2:
			return 1590;
		case 3:
			return 2090;
		case 4:
			return 2500;
		} 
	}

	
}

