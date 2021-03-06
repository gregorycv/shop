import 'dotenv/config';
import App from './app';
import AuthenticationController from './src/controllers/authentication-controller';
import ProductTypeController from './src/controllers/product-type-controller';
import ProductController from './src/controllers/product-controller';
import OrderController from './src/controllers/order-controller';

const app = new App([
  new AuthenticationController(),
  new ProductTypeController(),
  new ProductController(),
  new OrderController(),
]);

app.listen();
