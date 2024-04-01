import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RedisRepository } from './app.repository';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly redisRepository: RedisRepository,
  ) {}

  async getHello() {
    await this.cacheManager.set('cached_item', { key: 32 });
    const cachedItem = await this.cacheManager.get('cached_item');
    console.log(cachedItem);
    return 'Hello World!';
  }

  async getValueFromRedis(key: string) {
    return this.redisRepository.get(key);
  }

  async setValueToRedis(key: string, value: string) {
    return this.redisRepository.set(key, value);
  }
}
