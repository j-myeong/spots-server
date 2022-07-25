import { Router } from 'express';
import * as userService from '../services/user-service';
import * as tokenService from '../services/token-service';
import 'express-async-errors';
import { authUser } from '../utils/middleware/token-auth';

const router = Router();

router.post('/', async (req, res) => {
  const { email, password, name, nickname, bio } = req.body;
  const user = await userService.createUser({
    email, password, name, nickname, bio,
  });
  res.status(201).json({
    msg: 'created',
    userId: user._id,
    createdAt: user.createdAt,
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const token = await tokenService.createToken({ email, password });
  res.status(201).json({
    msg: 'created',
    token,
  });
});

router.get('/', authUser, (req, res) => {
  res.status(200).json({
    msg: 'success',
  });
});

export default router;
