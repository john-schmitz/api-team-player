import app from './App'
import CONFIG from './config/dotenv';

app.listen(CONFIG.portaAPI, (err:any) => {
  if (err) {
    return console.log(err)
  }
  return console.log(`server is listening on ${CONFIG.portaAPI}`)
});