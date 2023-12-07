
import jwt from 'jsonwebtoken';
import jwtConfig from './jwtConfig';
import redisClient from './redisClient';

class JwtService {
  async generateToken(payload: string) {
    const token = jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
    await redisClient.set(token, JSON.stringify(payload), 3600);
    return token;
  }

  async verifyToken(token: string) {
    try {
      const payload = await redisClient.get(token);
      if (!payload) {
        throw new Error('Token not found in Redis');
      }

      return jwt.verify(token, jwtConfig.secret);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async invalidateToken(token: string) {
    try {
      await redisClient.delete(token);
    } catch (err) {
      console.error(err);
    }
  }

  async decodeToken(token: string) {
    return jwt.decode(token);
  }
}

module.exports = new JwtService();