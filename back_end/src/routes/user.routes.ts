import { Router } from "express";
import { z } from "zod";
import { authMiddleware } from "../middleware/auth-middleware";
import { updateProfile } from "../services/userService";
import { Request, Response } from "express";

const router = Router();

const updateSchema = z.object({
  fullName: z.string().min(1).optional(),
  password: z.string().min(8).optional(),
});

router.patch(
  "/profile",
  authMiddleware(),
  async (req: Request, res:Response) => {
    try {
      const data = updateSchema.parse(req.body);

      await updateProfile(req.user.id, data);

      return res.status(200).json({
        message: "Profile updated successfully",
      });

    } catch (err) {
      return res.status(400).json({
        message: "Invalid input",
      });
    }
  }
);

export default router;
