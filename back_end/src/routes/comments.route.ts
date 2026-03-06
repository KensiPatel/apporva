import { Router, type Response } from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { z } from "zod";
import { addCommentService, getCommentsService } from "src/services/commentsService";

const router = Router();
const commentBodySchema = z.object({
  content: z.string().min(1, "Comment cannot be empty").max(500),
});

const expenseParamSchema = z.object({
  id: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: "Expense id must be a positive integer",
    }),
});

router.post("/expenses/:id/comments",authMiddleware(),async (req, res: Response): Promise<void> => {
  try {
    const parsedParams = expenseParamSchema.safeParse(req.params);
    if (!parsedParams.success) {
      res.status(400).json({ message: "Invalid expense id" });
      return;
    }
    
    const parsedBody = commentBodySchema.safeParse(req.body);
    if (!parsedBody.success) {
      res.status(400).json({ message: "Invalid input" });
      return;
    }
    
    const expenseId = parsedParams.data.id;
    const { content } = parsedBody.data;
    
    await addCommentService(
      expenseId,
      req.user.id,
      req.user.role,
      content
    );
    
    res.status(201).json({ message: "Comment added successfully" });
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === "Expense not found") {
        res.status(404).json({ message: error.message });
        return;
      }
      
      if (error.message === "Access denied") {
        res.status(403).json({ message: error.message });
        return;
      }
      
      if (error.message === "Cannot comment on draft expense") {
        res.status(400).json({ message: error.message });
        return;
      }
      
      return;
    }
    
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/expenses/:id/comments",authMiddleware(),async (req, res: Response): Promise<void> => {
  try {
    const parsedParams = expenseParamSchema.safeParse(req.params);
    if (!parsedParams.success) {
      res.status(400).json({ message: "Invalid expense id" });
      return;
    }
    
    const expenseId = parsedParams.data.id;
    const result = await getCommentsService(
      expenseId,
      req.user.id,
      req.user.role,
    );
    
    res.status(200).json({ data: result });
  } 
  catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === "Expense not found") {
        res.status(404).json({ message: error.message });
        return;
      }
      if (error.message === "Access denied") {
        res.status(403).json({ message: error.message });
        return;
      }
      res.status(400).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;