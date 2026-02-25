import { findUserById } from "../db/repositories/team_repository";
import {
  findTeamById,
  findTeamByManagerId,
  getTeamMembership,
  addUserToTeam,
} from "../db/repositories/team_repository";

export async function addMemberService(
  requesterId: number,
  targetUserId: number,
  teamId: number
) {
  const requester = await findUserById(requesterId);
  const target = await findUserById(targetUserId);

  if (!requester || !target) {
    throw new Error("User not found");
  }

  if (target.role !== "employee") {
    throw new Error("Only employees can be added to team");
  }

  const team = await findTeamById(teamId);
  if (!team) {
    throw new Error("Team not found");
  }

  // Check if employee already in team
  const existingMembership = await getTeamMembership(target.id);
  if (existingMembership) {
    throw new Error("Employee already assigned to a team");
  }

  // Manager logic
  if (requester.role === "manager") {
    const managerTeam = await findTeamByManagerId(requester.id);

    if (!managerTeam) {
      throw new Error("Manager does not manage any team");
    }

    if (managerTeam.id !== teamId) {
      throw new Error("Manager can only add to their own team");
    }
  }

  // Employees cannot add
  if (requester.role === "employee") {
    throw new Error("Unauthorized");
  }

  await addUserToTeam(target.id, teamId);
}