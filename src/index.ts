import 'reflect-metadata';
import { App } from './App';
import CONFIG from './config/dotenv';

const app = new App().express;

app.listen(
  CONFIG.portaAPI,
  (err: Error): void => {
    if (err) {
      return console.log(err);
    }
    return console.log(`server is listening on ${CONFIG.portaAPI}`);
  },
);
