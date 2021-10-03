import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { db } from './src/db';

const app = express();
const port = 3001;
const corsOptions = {
  origin: `http://localhost:${port}`
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connectToDB = async () => {
  try {
    // await db.sequelize.sync();
    await db.authenticate();
    console.log('OK');
  } catch (e) {
    console.log('ERROR');
  }
}

connectToDB();

// db.sequelize.sync();

app.get('/', (req, res) => {
  res.json({ message: 'Here we gooo!' });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
