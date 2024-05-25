import mongoose from 'mongoose';
import { createAdminUser, createManagerUser } from '../factories/userFactory';
import { seedBeers, seedProducts } from './productSeeder';
import { seedPurchase } from './purchaseSeeder';
import { seedReviews } from './reviewSeeder';
import { seedUsers } from './userSeeder';
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
}

async function dropAllModels() {
	const collections = await mongoose.connection.db.collections();

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
