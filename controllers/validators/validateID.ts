import mongoose from 'mongoose';
import logger from '../../utils/logger';

export {
	validateID
};

async function validateID(id: string) {
	const isValidId = mongoose.Types.ObjectId.isValid(id);
	if(!isValidId) {
		logger.error(`Validation error: Invalid ID format - ${id}`);
	}

	return isValidId;
}