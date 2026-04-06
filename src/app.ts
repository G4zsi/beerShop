import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { userRouter } from '../routers/userRoutes';
import { productRouter } from '../routers/productRoutes';
import { reviewRouter } from '../routers/reviewRoutes';
import { couponRouter } from '../routers/couponRoutes';
import { purchaseRouter } from '../routers/purchaseRoutes';

export {
	app
};

const app: Express = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.status(200).json({ status: 'OK' });
});

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/reviews', reviewRouter);
app.use('/purchases', purchaseRouter);
app.use('/coupons', couponRouter);
