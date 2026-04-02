import { db } from "../db.client";
import { comment } from "../schema/comment";
import { eq, asc } from "drizzle-orm";

export interface CreateCommentInput {
  expenseId: number;
  userId: number;
  content: string;
}

export async function createComment(data: CreateCommentInput): Promise<void> {
  await db().insert(comment).values({
    expenseId: data.expenseId,
    userId: data.userId,
    content: data.content,
  });
}

export async function getCommentsByExpenseId(expenseId: number): Promise<
  {
    id: number;
    expenseId: number;
    userId: number;
    content: string;
    createdAt: Date;
  }[]
> {
  const result = await db()
    .select()
    .from(comment)
    .where(eq(comment.expenseId, expenseId))
    .orderBy(asc(comment.createdAt));

  return result;
}