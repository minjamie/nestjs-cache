import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

// @UseInterceptors(CacheInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    return this.appService.getHello();
  }
  @Get('redis')
  getValueFromRedis(@Query('key') key: string) {
    return this.appService.getValueFromRedis(key);
  }

  @Post('redis')
  setValueToRedis(@Body() { key, value }: { key: string; value: string }) {
    return this.appService.setValueToRedis(key, value);
  }
}
