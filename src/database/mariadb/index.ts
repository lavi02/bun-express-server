import { PrismaClient } from '@prisma/client';

class PrismaClientInstance {
  constructor() {
    this.prisma = new PrismaClient();
  }
}

module.exports = new PrismaClientInstance().prisma;