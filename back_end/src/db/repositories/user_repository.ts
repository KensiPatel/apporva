import { db } from "../db.client";
import { users } from "../schema/user";
import { eq } from "drizzle-orm";
import type { UserRole } from "../schema/user";
import { Role } from "src/types/user.type";

export async function findUserByEmail(email: string): Promise<
  | {
    id: number;
    email: string;
    password: string;
    role: Role;
  }
  | null
> {
  const result = await db()
    .select({
      id: users.id,
      email: users.email,
      password: users.password,
      role: users.role,
    })
    .from(users)
    .where(eq(users.email, email));

  return result[0] ?? null;
}

export async function createUser(data: {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
}): Promise<void> {
  try {
    await db()
      .insert(users)
      .values({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        role: data.role,
      })
      .returning();
  } catch (error: any) {
    throw new Error(
      `[Database Error] Failed to create user: ${error.message}`
    );
  }
}

export async function updateUserById(
  id: number,
  data: {
    fullName?: string;
    email?: string;
    password?: string;
  }
): Promise<boolean> {
  try {
    const result = await db()
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();

    return result.length > 0;
  } catch (error: any) {
    throw new Error(
      `[Database Error] Failed to update user: ${error.message}`
    );
  }
}