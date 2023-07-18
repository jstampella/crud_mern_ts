import mongoose from 'mongoose';
import logger from '../config/winston';
import { MONGODB_URI } from '../config';
import { loadJson } from '../common/loadJson';

export const connectDB = async (): Promise<void> => {
  try {
    console.log(MONGODB_URI);
    mongoose.set('strictQuery', true);
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB is connected');
    await loadJson();
  } catch (error) {
    logger.error('>>>> Error a la hora de inicializar BD <<<<', error);
  }
};
