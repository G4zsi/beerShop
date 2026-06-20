/**
 * Error base for API
 */

export {
	AppError
};

class AppError extends Error {
	constructor(message: string, statusCode: number) {
		super(message);

		(this as any).statusCode = statusCode; // eslint-disable-line
		(this as any).status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // eslint-disable-line
		(this as any).isOperational = true; // eslint-disable-line

		Error.captureStackTrace(this, this.constructor);
	}
}

