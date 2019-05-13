import 'reflect-metadata';
import { Api } from './Api';
import CONFIG from './config/dotenv';

const app = new Api().express;

app.listen(
  CONFIG.portaAPI,
  (err: Error): void => {
    if (err) {
      return console.log(err);
    }
    return console.log(`server is listening on ${CONFIG.portaAPI}`);
  },
);
