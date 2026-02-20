import { Router } from "express";
import { deleteTeam } from "../services/team_service";
import { authMiddleware } from "../middleware/auth-middleware";

const router = Router();

router.delete("/:teamId", authMiddleware, async (req, res) => {
  try {
    const teamId = Number(req.params.teamId);

    const result = await deleteTeam(teamId);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;