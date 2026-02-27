import {
  findUserById,
  findTeamById,
  findTeamByManagerId,
  getTeamMembership,
  addUserToTeam,
} from "../db/repositories/team_repository";

export async function addMemberService(
  requesterId: number,
  targetUserId: number,
  teamId: number
): Promise <void> {
  const requester = await findUserById(requesterId);
  const target = await findUserById(targetUserId);

  if (!requester || !target) {
    throw new Error("User not found");
  }

  if (requester.role === "employee") {
    throw new Error("Unauthorized");
  }

  if (target.role !== "employee") {
    throw new Error("Only employees can be added to a team");
  }

  const team = await findTeamById(teamId);
  if (!team) {
    throw new Error("Team not found");
  }

  const existing = await getTeamMembership(target.id);
  if (existing) {
    throw new Error("Employee already assigned to a team");
  }

  if (requester.role === "manager") {
    const managerTeam = await findTeamByManagerId(requester.id);

    if (!managerTeam || managerTeam.id !== teamId) {
      throw new Error("Manager can only add to their own team");
    }
  }

  await addUserToTeam(target.id, teamId);
}