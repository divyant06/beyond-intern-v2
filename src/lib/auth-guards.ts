import "server-only";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export type AuthenticatedUser = {
  id: string;
  email: string;
  name?: string | null;
};

function configuredAdminEmails() {
  return new Set(
    (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  );
}

export async function requireUser(): Promise<AuthenticatedUser> {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.trim().toLowerCase();
  const id = session?.user?.id;

  if (!email || !id) {
    throw new Error("Unauthorized");
  }

  return { id, email, name: session.user.name };
}

export async function requireAdmin(): Promise<AuthenticatedUser> {
  const user = await requireUser();
  if (!configuredAdminEmails().has(user.email)) {
    throw new Error("Forbidden");
  }
  return user;
}

export function isAuthError(error: unknown) {
  return error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden");
}
