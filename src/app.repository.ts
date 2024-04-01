import Redis from 'ioredis';
import { Injectable } from '@nestjs/common';
export const redisConfig = {
  host: 'localhost',
  port: 6379, // env에서 정의함
};
@Injectable()
export class RedisRepository {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis(redisConfig);
  }

  async get(key: string) {
    return await this.redisClient.get(key);
  }

  async set(key: string, value: string) {
    return await this.redisClient.set(key, value);
  }
}
