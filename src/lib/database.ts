import { Db, MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

// NOTE: Let's assume root user with no password and default mongo settings to just go fast
dotenv.config();
const mongoUrl = process.env.MONGO_URL;

// NOTE: Let's use closures for fast code (for production having a singleton would be better and also easier to escalate the database module)
export let databaseConnection: Db;

export const connectToDatabase = async () => {
    const client = await MongoClient.connect(mongoUrl, {});
    databaseConnection = client.db('PERSPECTIVE');
};
