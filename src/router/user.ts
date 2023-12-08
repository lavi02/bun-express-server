import express from 'express';
import userService from '@/service/user';
import authMiddleware from '@/service/middleware';
import JwtService from '@/service/jwt';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const newUser = await userService.createUser(email, password, name);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.validateUser(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = await JwtService.generateToken(email);
    res.status(200).json({ message: 'Logged in successfully', token: token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/test', authMiddleware, (req, res) => {
  res.json({ message: 'You have accessed a protected route', user: req.headers.authorization });
});

module.exports = router;
