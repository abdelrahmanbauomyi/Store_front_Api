import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './Handlers/user.Handler';
import productRoutes from './Handlers/product.Handler';
import orderRoutes from './Handlers/order.Handler';
const app: express.Application = express();
const address = '0.0.0.0:3000';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});
userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
