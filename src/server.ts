import express, { Express } from 'express';
import cors from 'cors';
import { initRoutes } from './controllers/routes';

export const buildServer = (): Express => {
    const app = express();
    app.use(cors()).use(express.json()).options('*', cors());

    initRoutes(app);

    return app;
};
