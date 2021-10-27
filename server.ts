import 'dotenv/config';
import App from './app';
import AuthenticationController from './src/controllers/authentication.controller';

const app = new App([new AuthenticationController()]);

app.listen();