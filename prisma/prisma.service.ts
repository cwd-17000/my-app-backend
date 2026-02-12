import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
const { PrismaClient } = require('@prisma/client');

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  // allow dynamic property access for model delegates (e.g. prisma.user)
  [key: string]: any;

  private readonly prisma: any;

  constructor() {
    this.prisma = new PrismaClient();

    // forward runtime client properties (models + methods) onto this service
    Object.assign(this, this.prisma);
  }

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }

  get client() {
    return this.prisma;
  }
}
