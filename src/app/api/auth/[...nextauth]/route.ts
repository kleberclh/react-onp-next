import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch("http://localhost:5050/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          if (!res.ok) return null;

          const user = await res.json();
          if (!user?.token || !user?.userId) return null;

          return {
            id: user.userId,
            uuid: user.user_uuid,
            name: user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            accessToken: user.token,
          };
        } catch {
          return null;
        }
      },
    }),
  ],

  pages: { signIn: "/auth/login" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) Object.assign(token, user);
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) Object.assign(session.user, token);
      return session;
    },
  },
});

export { handler as GET, handler as POST };
