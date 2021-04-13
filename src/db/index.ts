import mongoose from 'mongoose';
import { dbURI } from '../config/db-config';

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

export default mongoose;
