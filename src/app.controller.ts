import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello(); 
  }
    @Get('health')
  getHealth(): string {
    return 'OK';
  }
@Get('info')
getInfo() {
  return {
    app: 'my-first-nest-app',
    version: '0.0.1',
    status: 'running',
  };
}
}
