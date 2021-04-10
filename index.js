import express from 'express';
import db from './db';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Here we go!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});