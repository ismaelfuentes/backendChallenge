import * as dotenv from 'dotenv';
import { connectToDatabase } from './lib/database';
import { buildServer } from './server';

const DEFAULT_PORT = 3111;

(async () => {

    dotenv.config();
    await connectToDatabase();

    const app = await buildServer();
    const port = process.env.PORT || DEFAULT_PORT;
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
})();
