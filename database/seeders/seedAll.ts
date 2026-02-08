import mongoose from 'mongoose';
import { createAdminUser, createManagerUser } from '../factories/userFactory';
import { seedBeers, seedProducts, seedTestProducts } from './productSeeder';
import { seedPurchase } from './purchaseSeeder';
import { seedReviews } from './reviewSeeder';
import { seedUsers, seedTestUsers } from './userSeeder';
import { getDBConnection } from '../../utils/dbHelper';

async function seedAll() {
	// create products
	await seedProducts(20);
	//create beers
	await seedBeers(25);
	// create admin
	await createAdminUser();
	// create manager
	await createManagerUser();
	//create users
	await seedUsers(15);
	// create reviews
	await seedReviews(5);
	// create purchases
	await seedPurchase(5);

	console.log('DB seed done');
}

async function seedTest() {
	await seedTestUsers();
	await seedTestProducts();
	console.log('Test DB seed done');
}

async function dropAllModels() {
	const db = mongoose.connection.db;
	if (!db) {
		console.log('Database connection is not available');
		return;
	}
	const collections = await db.collections();

	for (const collection of collections) {
		await collection.drop();
	}
	console.log('Collections are removed');
}

(async function () {
	try {
		let dbName;

		if(process.argv[3]) {
			dbName = process.argv[3];
		} else {
			dbName = 'db1';
		}

		if(process.argv[2] === 'seedTest') {
			dbName = 'test';
		}

		console.log('Connecting to DB...');
		const DB: string = await getDBConnection(dbName);
		await mongoose.connect(DB);
		console.log('Conencted to DB.');


		/* eslint-disable */
		switch (process.argv[2]) {
			case 'seed':
				await seedAll();
				break;
			case 'destroy':
				await dropAllModels();
				break;
			case 'seedTest':
				await dropAllModels();
				await seedTest();
				break;
			default:
				await dropAllModels();
				await seedAll();
				break;
		}
		/* eslint-enable */

		await mongoose.connection.close();
		console.log('DB connection removed.');
	} catch (err) {
		console.error(err);
		await mongoose.connection.close();
		console.log('DB connection removed.');
	}
})();
