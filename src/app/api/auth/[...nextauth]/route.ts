import NextAuth from "next-auth";
import crypto from "node:crypto";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { createClient } from "@supabase/supabase-js";
import type { NextAuthOptions } from "next-auth";

const nextAuthSecret = process.env.NEXTAUTH_SECRET ?? crypto.randomUUID();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAuth = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  : null;

const adapter = supabaseUrl && supabaseServiceKey
  ? SupabaseAdapter({ url: supabaseUrl, secret: supabaseServiceKey })
  : undefined;

export const authOptions: NextAuthOptions = {
  ...(adapter ? { adapter } : {}),
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;
        if (!email || !password || !supabaseAuth) return null;

        const { data, error } = await supabaseAuth.auth.signInWithPassword({
          email,
          password,
        });
        if (error || !data.user?.id || !data.user.email) return null;

        return {
          id: data.user.id,
          name: data.user.user_metadata?.full_name ?? email.split("@")[0],
          email: data.user.email,
        };
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.sub = user.id;
      return token;
    },
  },
  secret: nextAuthSecret,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

