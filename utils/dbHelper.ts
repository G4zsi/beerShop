/**
 * Database helper functions
 */

import * as dotenv from 'dotenv';

export {
	getDBConnection
};

dotenv.config();

/**
 * Reads the DB connection parameters from the .env file
 * username, password, and database name. If the DB name not existing,
 * the Mongoose creates a new DB with the new name.
 * @param dbName the database name
 * @returns the connection string
 */
async function getDBConnection(dbName?: string) : Promise<string> {
	if(!dbName) {
		dbName = process.env.DATABASE1;
	}
	
	return String(process.env.DBLINK?.replace('<USER>', String(process.env.USER))
		.replace('<PASSWORD>', String(process.env.DATABASE_PASSWORD))
		.replace('<DATABASE>', String(dbName)));
}
