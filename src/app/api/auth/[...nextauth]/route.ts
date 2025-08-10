
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import db from '@/app/db';
import bcrypt from 'bcrypt';


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
             
          const res = await db.query('SELECT * FROM users WHERE email = $1', [credentials?.email]);

          const user = res.rows[0];

          if (!user) throw new Error("User not found");


          const match = await bcrypt.compare(credentials?.password || '', user.password);

          if (!match) throw new Error("Invalid password");

          return { id: user.id, name: user.name, email: user.email };
        
      }
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    jwt({ token, user }) {
    if (user) {
      token.id = user.id;
    }
    return token;
  },
    async session({ session, token }) {
    if (token?.id) {
      session.user.id = token.id;
    }
    return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
    function done(arg0: null, arg1: boolean, arg2: { message: string; }): import("next-auth").User | PromiseLike<import("next-auth").User | null> | null {
        throw new Error('Function not implemented.');
    }

