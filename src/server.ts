import mongoose from 'mongoose';
import { getDBConnection } from '../utils/dbHelper';
import { app } from './app';

export {
	server
};

async function server() {
	try {
		const DB = await getDBConnection('db1');
		await mongoose.connect(DB);
		console.log('DB connection was successful.');
		const port = process.env.PORT || 3000;
		app.listen(port, () => {
			console.log(`App running on port ${port}...`);
		});
	} catch (err) {
		console.error(err);
	}
}

server();