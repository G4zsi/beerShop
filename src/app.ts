import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { userRouter } from '../routers/userRoutes';
import { productRouter } from '../routers/productRoutes';

export {
	app
};

const app: Express = express();

app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/products', productRouter);

