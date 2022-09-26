import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './Handlers/user.Handler';
import productRoutes from './Handlers/product.Handler';
import orderRoutes from './Handlers/order.Handler';
const app: express.Application = express();
const address: number = process.env.BACK_END_PORT as unknown as number;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});
userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.listen(address, function () {
  console.log(`starting app on localhost: ${address}`);
});

export default app;
