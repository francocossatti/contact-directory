import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '@/app/libs/db'
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'Email'},
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) return null; // Verificación para evitar 'credentials' undefined

                const userFound = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!userFound || !userFound.password) throw new Error('No user found');

                const matchPassword = await bcrypt.compare(credentials.password, userFound.password);

                if (!matchPassword) throw new Error('Wrong password');

                return {
                    id: userFound.id.toString(),
                    name: userFound.username, 
                    email: userFound.email
                };
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,  
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async session({ session }: any) {
            return session
        }, 
        async signIn({ user }: any) {
          const userFound = await prisma.user.findUnique({
            where: {
              email: user.email
            }
          });
        
          if (!userFound) {
            try {
              const newUser = await prisma.user.create({
                data: {
                  username: user.name,
                  email: user.email,
                  image: user.image,
                }
              });
            } catch (error: any) {
              console.error(
                NextResponse.json(
                  {
                    message: error.message
                  },
                  {
                    status: 500
                  }
                )
              );
            }
          }
          return true;
        }
    }
};
    

export const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}