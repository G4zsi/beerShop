import path from 'path';
import { Configuration } from 'log4js';
import * as dotenv from 'dotenv';

dotenv.config();


//TODO implement logging levels and categories, maybe also log rotation and compression
const config: Configuration = {
	appenders: {
		console: {
			type: 'console'
		},

		out: {
			type: 'stdout'
		},

		appFile: {
			type: 'file',
			filename: path.join(__dirname, 'logs/app.log'),
			maxLogSize: 10 * 1024 * 1024, // 10 MB
			backups: 5,
			compress: true,
			layout: {
				type: 'basic'
			}
		},

		errorFile: {
			type: 'file',
			filename: path.join(__dirname, 'logs/error.log'),
			layout: {
				type: 'basic'
			}
		},

		errors: {
			type: 'logLevelFilter',
			level: 'error',
			appender: 'errorFile'
		}
	},

	categories: {
		default: {
			appenders: ['console', 'out', 'appFile', 'errors'],
			level: process.env.LOG_LEVEL || 'info'
		}
	}
};

export default config;