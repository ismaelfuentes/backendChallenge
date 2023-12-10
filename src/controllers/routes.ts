import { Express } from 'express';

import userRoutes from './users';

export const initRoutes = (app: Express) => {
    app.use('/users', userRoutes);
};
