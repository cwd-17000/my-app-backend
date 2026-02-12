import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
const { PrismaClient } = require('@prisma/client');

let PrismaPgAdapter: any
try {
  // adapter factory exported by @prisma/adapter-pg
  PrismaPgAdapter = require('@prisma/adapter-pg').PrismaPg || require('@prisma/adapter-pg')
} catch (e) {
  PrismaPgAdapter = undefined
}

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  // allow dynamic property access for model delegates (e.g. prisma.user)
  [key: string]: any;

  private readonly prisma: any;

  constructor() {
    // Prisma v7 requires either an adapter or accelerateUrl.
    // Use the Postgres driver adapter when available and DATABASE_URL is set.
    const clientOptions: any = {}
    if (process.env.DATABASE_URL && PrismaPgAdapter) {
      try {
        clientOptions.adapter = new PrismaPgAdapter({ connectionString: process.env.DATABASE_URL })
      } catch (e) {
        // if adapter construction fails, fall back to default (will throw later if invalid)
      }
    }

    this.prisma = new PrismaClient(Object.keys(clientOptions).length ? clientOptions : undefined);

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
