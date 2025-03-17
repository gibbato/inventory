import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// This prevents the Prisma Client from being instantiated multiple times when hot reloading
if (process.env.NODE_ENV === 'development') {
  global.prisma = global.prisma || prisma;
}

export default prisma;
