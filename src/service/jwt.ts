
import jwt from 'jsonwebtoken';
import CONFIG from '@/config/index';
import redisClient from '@/database/redis/index';

class JwtService {
  async generateToken(payload: string) {
    const token = jwt.sign(payload, CONFIG.secret, { expiresIn: CONFIG.expiresIn });
    await redisClient.set(token, JSON.stringify(payload), 3600);
    return token;
  }

  async verifyToken(token: string) {
    try {
      const payload = await redisClient.get(token);
      if (!payload) {
        throw new Error('Token not found in Redis');
      }

      return jwt.verify(token, CONFIG.secret);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async invalidateToken(token: string) {
    try {
      await redisClient.del(token);
    } catch (err) {
      console.error(err);
    }
  }

  async decodeToken(token: string) {
    return jwt.decode(token);
  }
}

export default new JwtService();