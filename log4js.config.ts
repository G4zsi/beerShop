import path from 'path';
import { Configuration } from 'log4js';

//TODO implement logging levels and categories, maybe also log rotation and compression
const config: Configuration = {
	appenders: {
		console: {
			type: 'console'
		},

		appFile: {
			type: 'file',
			filename: path.join(__dirname, 'logs/app.log'),
			maxLogSize: 10 * 1024 * 1024, // 10 MB
			backups: 5,
			compress: true
		},

		errorFile: {
			type: 'file',
			filename: path.join(__dirname, 'logs/error.log')
		},

		errors: {
			type: 'logLevelFilter',
			level: 'error',
			appender: 'errorFile'
		}
	},

	categories: {
		default: {
			appenders: ['console', 'appFile', 'errors'],
			level: 'info'
		}
	}
};

export default config;