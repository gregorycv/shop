import { config } from '../config/config';
import { ConnectOptions, connect } from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const dbURI = config.dbURI;
    const options: ConnectOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await connect(dbURI, options);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.log(err.message);
    // exiting process with failure
    process.exit(1);
  }
}

export default connectDB;
