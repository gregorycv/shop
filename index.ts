import express from 'express';
import connectDB from './src/db/database';

connectDB();

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Here we goooo!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
