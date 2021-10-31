import 'dotenv/config';
import App from './app';
import AuthenticationController from './src/controllers/authentication-controller';
import ProductTypeController from './src/controllers/product-type-controller';

const app = new App([
  new AuthenticationController(),
  new ProductTypeController()
]);

app.listen();