"use server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface User {
  id: number;
  username: string | null;
  createdAt: Date;
}

export async function getUserInfo(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      createdAt: true,
      username: true,
      image: true, 
    },
  });
  return {
    username: user?.username,
    createdAt: user?.createdAt,
    Image: user?.image
  };
}

export async function getAllUsersData(partialUsername: string) {
  const results: User[] = await prisma.user.findMany({
    where: {
      username: {
        contains: partialUsername,
        mode: 'insensitive', // Remove mode if case-sensitive search is required
      },
    },
    select: {
      id: true,
      createdAt: true,
      username: true, 
    },
  });
  return results;
}

