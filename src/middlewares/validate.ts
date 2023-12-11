import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { pick } from "../utils/pick";

/**
 * Middleware function to validate incoming request data using Joi schema.
 * @param {object} schema - Joi schema for validation.
 * @returns {function} - Express middleware function.
 */
export const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  // Extracts valid schema keys for validation (params, query, body).
  const validSchema = pick(schema, ['params', 'query', 'body']);

  // Picks relevant properties from the request object for validation.
  const object = pick(req, Object.keys(validSchema));

  // Validates the object against the schema using Joi.
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  // If there's an error, sends a Bad Request response with error details.
  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return res.status(400).json({ fieldsError: errorMessage });
  }

  // Assigns validated values to the request object and proceeds to the next middleware.
  Object.assign(req, value);
  return next();
};
