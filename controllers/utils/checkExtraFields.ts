import mongoose from 'mongoose';
import { Request } from 'express';

export {
	checkExtraFields
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function checkExtraFields(data: Request['body'], model: mongoose.Model<any>) {
	const schemaKeys = Object.keys(model.schema.obj);
	const keys = Object.keys(data);
	if (keys.some(key => !schemaKeys.includes(key))) {
		throw new Error(`Some of the data is invalid. Valid entries are: ${schemaKeys.join(', ')}.`);
	}
}