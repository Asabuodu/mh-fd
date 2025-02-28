import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

// Extend the Session interface to include "id"
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Simulated user object (replace with actual authentication logic)
        const user = { id: "1", name: "User", email: credentials.email };

        console.log("Authorized User:", user); // Debugging

        return user; // Return user object
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      console.log("Before JWT Callback:", token);

      if (user) {
        token.id = user.id; // Ensure ID is stored in token
        token.email = user.email;
        token.name = user.name;
      }
      console.log("After JWT Callback:", token);

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // session.user = {
      //   ...session.user,
      //   id: token.id as string, // Ensure TypeScript recognizes the id property
      // };
      console.log("Before Session Callback:", session);
      if (token?.id) {
        // session.user = {
        //   ...session.user,
        //   id: token.id as string,
        // };
        session.user.id = token.id as string; // Attach user ID
      }
      console.log("Session User:", session.user); // Debugging);
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
console.log("NextAuth API is running...");

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
