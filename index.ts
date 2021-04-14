import express from 'express';
import mongoose from 'mongoose';
import { dbURI } from './src/config/db-config';

const app = express();
const port = 3000;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Here we goooo!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
