/**
 * Generic API CRUD functions, for the DB modification
 */
import { Model } from 'mongoose';
import { Response, Request } from 'express';

export {
	getAllQueries,
	getOneQuery,
	createQuery,
	deleteOneQuery,
	updateOneQuery
};


async function getAllQueries(model: Model<any>, req: Request, res: Response) { // eslint-disable-line
	const queries = await model.find();

	res.status(200).json({
		status: 'success',
		lenght: queries.length,
		data: {
			queries
		}
	});

	return queries;
}

async function getOneQuery(model: Model<any>, req: Request, res: Response) { // eslint-disable-line
	const query = await model.findById(req.params.id);

	if (!query) {
		res.status(404).json({
			status: 'failed',
			message: 'Document not found'
		});
	} else {
		res.status(200).json({
			status: 'success',
			data: {
				query
			}
		});
	}

	return query;
}

async function createQuery(model: Model<any>, req: Request, res: Response) { // eslint-disable-line
	const query = await new model(req.body);
	await model.create(query);

	res.status(201).json({
		status: 'success',
		data: {
			query
		}
	});

	return query;
}

async function deleteOneQuery(model: Model<any>, req: Request, res: Response) { // eslint-disable-line
	const query = await model.findByIdAndDelete(req.params.id);

	if (!query) {
		res.status(404).json({
			status: 'failed',
			message: 'Document not found'
		});
	} else {
		res.status(204).json({
			status: 'success',
			data: {
				data: null
			}
		});
	}
}

async function updateOneQuery(model: Model<any>, req: Request, res: Response) { // eslint-disable-line
	const query = await model.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		updatedExisting: true,
		upsert: false,
		runValidators: true
	});

	if (!query) {
		res.status(404).json({
			status: 'failed',
			message: 'Document not found'
		});
	} else {
		res.status(200).json({
			status: 'success',
			data: {
				query
			}
		});
	}
}