import { Model, Schema } from 'mongoose';

export {
	randomQuery,
	randomQueries
};

/**
 * Find a random number between 0 and the model's query length - 1, 
 * then returns a query id with the random index
 * 
 * @param model a mongoose model, where you want a random query's id from
 * @returns a random query's id from the mongoose model
 */
async function randomQuery(model: Model<any>) { // eslint-disable-line
	const count = await model.countDocuments();
	const randomNum = Math.floor(Math.random() * count);
	return (await model.findOne().skip(randomNum))._id;
}

/**
 * Returns a randomized queryNumber long query id array from the desired model
 * 
 * @param model a mongoose model where you want the random query ids from
 * @param queryNumber the lenght of the desired array 
 * (if greater than the queries length, it will be the queries lenght)
 * @returns a randomized queryNumber (or query lenght) long array with the query ids
 */
async function randomQueries(model: Model<any>, queryNumber: number) { // eslint-disable-line
	const queries = await model.find();
	const ids: Schema.Types.ObjectId[] = [];

	queries.map(query => {
		ids.push(query._id);
	});

	const shuffledIds = queries
		.map(label => ({ label, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ label }) => label);

	return shuffledIds.slice(-queryNumber);
}