import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisRepository } from './app.repository';

const cacheModule = CacheModule.register({
  useFactory: async () => ({
    store: redisStore,
    host: 'localhost',
    port: 6379,
    ttl: 1000,
  }),
});

@Module({
  imports: [cacheModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    RedisRepository,
  ],
})
export class AppModule {}
