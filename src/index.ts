import 'dotenv/config';
import app from './app';
import { connectDB } from './database/connection';

import { PORT } from './config';

async function main(): Promise<void> {
  try {
    await connectDB();
    app.listen(PORT);
    console.log(`Listening on port http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
  } catch (error) {
    console.error(error);
  }
}

main();
