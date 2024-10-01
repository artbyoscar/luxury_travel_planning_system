// src/middleware/validation.ts
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validatePreferences = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    preferences: Joi.array().items(Joi.string()).min(1).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateItineraryRequest = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    destination: Joi.string().required(),
    lengthOfStay: Joi.number().integer().min(1).max(14).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};