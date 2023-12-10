import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const checkValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  var err = validationResult(req);
  if (!err.isEmpty()) {
      res.status(400).send(err.mapped());
  } else {
      next();
  }
};