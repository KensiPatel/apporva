import { getCommentsByExpenseId,createComment } from "src/db/repositories/comments_repository";
import { findExpenseById } from "../services/expense.service";
import { role } from "../types/user.type";
import type { Role } from "../types/user.type";

export async function addCommentService(
  expenseId: number,
  userId: number,
  userRole: Role,
  content: string
): Promise<void> {
  const expense = await findExpenseById(expenseId);

  if (!expense) {throw new Error("Expense not found");}

  if (userRole === role.employee) {
    if (expense.userId !== userId) {throw new Error("Access denied");}
  }

  if (expense.status === "draft") {throw new Error("Cannot comment on draft expense");}

  await createComment({
    expenseId,
    userId,
    content,
  });

  return;
}

export async function getCommentsService(
  expenseId: number,
  userId: number,
  userRole: Role
): Promise<
  {
    id: number;
    expenseId: number;
    userId: number;
    content: string;
    createdAt: Date;
  }[]
> {

  const expense = await findExpenseById(expenseId);

  if (!expense) {throw new Error("Expense not found");}

  if (userRole === role.employee) {
    if (expense.userId !== userId) {throw new Error("Access denied");}
  }
  
  return await getCommentsByExpenseId(expenseId);
}