import redis from "redis";

class RedisClient {
  client = redis.createClient({
    url: process.env.REDIS_URL,
  });

  constructor() {
    this.client = redis.createClient({
      url: process.env.REDIS_URL,
    });

    this.client.on("error", (err: any) =>
      console.log("Redis Client Error", err)
    );
    this.client.connect();
  }

  async get(key: string) {
    try {
      return await this.client.get(key);
    } catch (err) {
      console.error(err);
    }
  }

  async set(key: string, value: string, expiry = 3600) {
    try {
      await this.client.set(key, value, {
        EX: expiry,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async del(key: string) {
    try {
      await this.client.del(key);
    } catch (err) {
      console.error(err);
    }
  }
}

export default new RedisClient();
