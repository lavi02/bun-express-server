import { PrismaClient } from '@prisma/client';

class PrismaClientInstance {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
}

export default new PrismaClientInstance().prisma;