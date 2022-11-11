// @ts-nocheck
import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import users from '../../../database/users.json';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize({ email, password }, req) {
        try {
          const data =  users.find((u) => u.email === email && u.password === password)
          
          if (!data) {
            return null;
          }

          return data;
        } catch(err) {
          console.log(err);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      
      return token
    },
    async session({ session, token }) {
      const { user: {email} } = session
      if (token) {
        const data =  users.find((u) => u.email === email)
        
        const { role } = data
        session.user = {
          role,
          ...session.user,
        }
      }
      return session
    }
  },
  session: {
    maxAge: 60 * 60 * 24,
  },
  secret: "1234batata",
  jwt: {
    secret: "1234batata",
  },
}
export default NextAuth(authOptions)