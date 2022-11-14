import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import users from "../../../database/users.json";
import { IUserSession } from "../../../interfaces";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        try {
          const data = users.find(
            (u) =>
              u.email === credentials?.email &&
              u.password === credentials?.password
          );

          if (!data) {
            return null;
          }

          return data;
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      const { user } = session;
      if (token) {
        const data = users.find((u) => u.email === user?.email) as IUserSession;

        const { role } = data;
        session.user = {
          role,
          ...session.user,
        } as IUserSession;
      }
      return session;
    },
  },
  session: {
    maxAge: 60 * 60 * 24,
  },
  secret: "1234batata",
  jwt: {
    secret: "1234batata",
  },
});
