import mongoose from 'mongoose';
import logger from '../config/winston';
import { MONGODB_URI } from '../config';

export const connectDB = async (): Promise<void> => {
  try {
    console.log(MONGODB_URI);
    mongoose.set('strictQuery', true);
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB is connected');
  } catch (error) {
    logger.error('>>>> Error a la hora de inicializar BD <<<<', error);
  }
};
