import express from 'express';
import userService from '@/service/user';
import authMiddleware from '@/service/middleware';

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
    // 로그인 로직 구현 (예: JWT 발급)
    res.status(200).json({ message: 'Logged in successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/test', authMiddleware, (req, res) => {
  res.json({ message: 'You have accessed a protected route', user: req.user });
});

module.exports = router;
