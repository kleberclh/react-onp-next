// types/next-auth.d.ts
import NextAuth from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      uuid: string;
      name: string;
      isAdmin: boolean;
      accessToken: string;
    };
  }

  interface User {
    id: number;
    uuid: string;
    name: string;
    isAdmin: boolean;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: number | string
    uuid: string;
    name: string;
    isAdmin: boolean;
    accessToken: string;
  }
}
