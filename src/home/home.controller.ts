import { Controller, Get, Headers, UnauthorizedException, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('home')
export class HomeController {
  @Get()
  getHome(@Headers('authorization') authorization?: string) {
    if (!authorization) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const [scheme, token] = authorization.split(' ');

    if (scheme !== 'Bearer' || !token || token !== 'fake-token-123') {
      throw new UnauthorizedException('Invalid or missing token');
    }

    return {
      message: 'Welcome to the home page!',
      data: {
        someValue: 42,
      },
    };
  }
}