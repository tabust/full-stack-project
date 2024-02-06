import express from 'express';
import mongoose from 'mongoose';
import { registerValidation, loginValidation, postCreateValidation } from './validations.js';
import checkAuth from './utils/checkAuth.js';
import { register, getMe, login } from './controllers/UserController.js';
import { create, getAll, getOne, remove } from './controllers/PostController.js';

mongoose
  .connect(
    'mongodb+srv://stormspirit100k:41gamer5@cluster0.v5o0x11.mongodb.net/blog?retryWrites=true&w=majority',
  )
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error:', err));

const app = express();

app.use(express.json());

app.post('/auth/login', loginValidation, login);
app.post('/auth/register', registerValidation, register);
app.get('/auth/me', checkAuth, getMe);

app.get('/posts', getAll);
app.get('/posts/:id', getOne);
app.post('/posts', checkAuth, postCreateValidation, create);
app.delete('/posts/:id', checkAuth, remove);
// app.patch('/posts', update);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('OK');
});
