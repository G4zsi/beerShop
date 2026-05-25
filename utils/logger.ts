import {configure, getLogger} from 'log4js';
import config from '../log4js.config';

configure(config);

const logger = getLogger();

export default logger;