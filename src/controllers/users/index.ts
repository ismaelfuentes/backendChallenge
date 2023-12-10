import express from 'express';
import { createUserHandler, createUserValidation } from './create';
import { getAllUsers, getAllUsersValidation } from './getAll';
import { checkValidationErrors } from '../../common/utils';

const router = express.Router();

router.post('', createUserValidation(), checkValidationErrors, createUserHandler);
router.get('', getAllUsersValidation(), checkValidationErrors, getAllUsers);

export default router;
