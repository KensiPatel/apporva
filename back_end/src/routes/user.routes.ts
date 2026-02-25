import { Router, Request, Response } from "express";
import { z, ZodError } from "zod";
import { authMiddleware } from "../middleware/auth-middleware";
import { updateProfile } from "../services/userService";
import { removeMemberService } from "../services/removeMemberService";

const router = Router();
router.get("/", authMiddleware(), (req: Request, res: Response) => {
  const user = req.user;

  return res.status(200).json({
    success: true,
    user,
  });
});

router.delete(
  "/remove/:id",
  authMiddleware(),
  async (req, res) => {
    try {
      const targetId = Number(req.params.id);
      const { newManagerId } = req.body || {};

      if (isNaN(targetId)) {
        return res.status(400).json({ message: "Invalid user id" });
      }

      await removeMemberService(
        req.user.id,
        targetId,
        newManagerId
      );

      return res.status(200).json({
        message: "Member removed successfully",
      });
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        return res.status(403).json({ message: err.message });
      }

      return res.status(400).json({
        message: err.message,
      });
    }
  }
);

const updateSchema = z.object({
  fullName: z.string().min(1).optional(),
  email: z
    .string()
    .email()
    .refine(
      (val) => val.endsWith("@projectapprova.com"),
      { message: "Email must be a @projectapprova.com address" }
    )
    .optional(),
  password: z.string().min(8).optional(),
});

router.patch(
  "/profile",
  authMiddleware(),
  async (req: Request, res: Response) => {
    try {
      const data = updateSchema.parse(req.body);

      const user = (req as any).user;

      const updated = await updateProfile(user.id, data);

      if (!updated) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      return res.status(200).json({
        message: "Profile updated successfully",
      });
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: "Invalid input",
          errors: err.issues,
        });
      }

      if (err.message === "No fields provided for update") {
        return res.status(400).json({
          message: err.message,
        });
      }

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);

export default router;