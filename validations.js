import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Incorrect email').isEmail(),
  body('password', 'The password must contain at least 5 characters').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'Incorrect email').isEmail(),
  body('password', 'The password must contain at least 5 characters').isLength({ min: 5 }),
  body('fullName', 'Enter your name').isLength({ min: 2 }),
  body('avatarUrl', 'Incorrect Url').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'Enter article title').isLength({ min: 3 }).isString(),
  body('text', 'Enter article text').isLength({ min: 3 }).isString(),
  body('tags', 'incorrect tag format').optional().isString(),
  body('imageUrl', 'Incorrect URL image').optional().isString(),
];
