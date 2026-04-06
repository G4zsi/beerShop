import mongoose from 'mongoose';
import { getDBConnection } from '../utils/dbHelper';
import { app } from './app';

export {
	server
};

async function server() {
	try {
		const DB = await getDBConnection('test');
		await mongoose.connect(DB);
		console.log('DB connection was successful.');
		const port = parseInt(process.env.PORT || '5000', 10);
		app.listen(port, '0.0.0.0', () => {
			console.log(`App running on port ${port}...`);
		});
	} catch (err) {
		console.error(err);
	}
}

server();