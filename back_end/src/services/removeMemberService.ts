import {
  findUserById,
  findTeamByManagerId,
  isUserInTeam,
  removeUserFromTeam,
  updateTeamManager,
} from "../db/repositories/team_repository";

export async function removeMemberService(
  requesterId: number,
  targetUserId: number
): Promise <void> {
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

  // Manager removing employee
  if (requester.role === "manager") {
    if (target.role !== "employee") {
      throw new Error("Managers can only remove employees");
    }

    const team = await findTeamByManagerId(requester.id);
    if (!team) {
      throw new Error("Manager does not manage any team");
    }

    const belongsToTeam = await isUserInTeam(target.id, team.id);
    if (!belongsToTeam) {
      throw new Error("User is not in your team");
    }

    await removeUserFromTeam(target.id);
    return;
  }

  // Admin removing manager
  if (target.role === "manager") {
    const team = await findTeamByManagerId(target.id);

    if (!team) {
      throw new Error("Manager does not manage any team");
    }

    // just unassign manager
    await updateTeamManager(team.id, null as any);
    return;
  }

  // Admin removing employee
  await removeUserFromTeam(target.id);
}