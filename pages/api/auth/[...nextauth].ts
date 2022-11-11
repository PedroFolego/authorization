// @ts-nocheck
import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from "next-auth/providers/github";
import users from '../../../database/users.json';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize({ email, password }, req) {
        try {
          //const { data } = await api.post('/login', { email, password });
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
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.user = user;
        // console.log('entrou: ', user);
      }
      
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      const { user: {email} } = session
      if (token) {
        const data =  users.find((u) => u.email === email)
        
        const { role } = data
        session.user = {
          role,
          ...session.user,
        }
        // console.log('session:', session, 'token:', token);

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