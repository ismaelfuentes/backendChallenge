import express, { Request, Response } from 'express';
import { ValidationChain, body } from 'express-validator';
import { User } from '../../common/types';
import { ERRORS } from '../../common/errors';
import { createUser } from '../../services/user/create';

export const createUserValidation = (): ValidationChain[] => {
    return [
        body('email').exists().notEmpty().normalizeEmail().trim().isEmail(),
        body('name').exists().notEmpty().trim(),
    ];
};

export const createUserHandler = async (req: Request<{}, {}, Partial<User>>, res: Response) => {
    try {
        const { email, name } = req.body;
        await createUser({ email, name });
        // NOTE: Not sure if it was expected to return anything or just empty, i think the id would be nice
        // but as the requisite didn't say anything i left it empty response
        res.status(201).send(); 
    } catch (error) {
        // NOTE just quick error handler
        switch (error.message) {
            case ERRORS.EMAIL_IN_USE:
                res.status(409).send({
                    errorCode: ERRORS.EMAIL_IN_USE,
                    msg: 'Email already in use',
                });
                break;
            default:
                //NOTE: In a real app it's not a good practice to let the error keep going but for this test... we can talk about it
                throw error;
        }
    }
};
