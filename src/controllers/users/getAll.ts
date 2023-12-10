import { Request, Response } from 'express';
import { ValidationChain, query } from 'express-validator';

import { getAll } from '../../services/user/getAll';
import { User } from '../../common/types';

export const getAllUsersValidation = (): ValidationChain[] => {
    return [query('created').optional().isInt().isIn([-1, 1])];
};

export const getAllUsers = async (req: Request, res: Response<User[] | any>) => {
    try {
        const created = parseInt(req.query.created as string) || 1;
        const users = await getAll(created == 1);
        res.status(200).send(users);
    } catch (error) {
        //NOTE: just fast way to log and not expose server errors information to the client, not the real production way
        console.error(error);
        res.status(500).send({
            msg: 'server error, contact fastAndShortCodingChallenge@ismaelFuentes.com for support',
        });
    }
};
