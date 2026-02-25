import { findUserById } from "../db/repositories/team_repository";
import {
  findTeamByManagerId,
  isUserInTeam,
  removeUserFromTeam,
  updateTeamManager,
} from "../db/repositories/team_repository";

export async function removeMemberService(
  requesterId: number,
  targetUserId: number,
  newManagerId?: number
) {
  const requester = await findUserById(requesterId);
  const target = await findUserById(targetUserId);

  if (!requester || !target) {
    throw new Error("User not found");
  }

  if (requester.role === "employee") {
    throw new Error("Unauthorized");
  }

  if (requester.id === target.id) {
    throw new Error("You cannot remove yourself");
  }

  // 🔹 Manager logic
  if (requester.role === "manager") {
    if (target.role !== "employee") {
      throw new Error("Managers can only remove employees");
    }

    const team = await findTeamByManagerId(requester.id);
    if (!team) {
      throw new Error("Manager does not manage any team");
    }

    const isMember = await isUserInTeam(target.id, team.id);
    if (!isMember) {
      throw new Error("User is not in your team");
    }

    await removeUserFromTeam(target.id);
    return;
  }

  // 🔹 Admin removing manager
  if (requester.role === "admin" && target.role === "manager") {
    if (!newManagerId) {
      throw new Error("New manager must be provided");
    }

    const team = await findTeamByManagerId(target.id);
    if (!team) {
      throw new Error("Manager does not manage any team");
    }

    const newManager = await findUserById(newManagerId);
    if (!newManager || newManager.role !== "manager") {
      throw new Error("Invalid new manager");
    }

    const alreadyManaging = await findTeamByManagerId(newManagerId);
    if (alreadyManaging) {
      throw new Error("New manager is already assigned to another team");
    }

    await updateTeamManager(team.id, newManagerId);

    return;
  }

  // 🔹 Admin removing employee
  await removeUserFromTeam(target.id);
}