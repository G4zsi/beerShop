import logger from '../../utils/logger';

export {
	handleValidationError,
	handleSuccessfulValidation,
	handleValidationWarning
};

function handleValidationError(error: string) {
	logger.error(`Validation error: ${error}`);
	return error;
}

function handleValidationWarning(error: string) {
	logger.warn(`Validation error: ${error}`);
	return error;
}

function handleSuccessfulValidation(message = 'Validation successful.') {
	logger.info(message);
	return 'validated';
}