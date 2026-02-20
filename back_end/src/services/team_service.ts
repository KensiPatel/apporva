import * as teamRepo from "../db/repositories/team_repository";

export const deleteTeam = async (teamId: number) => {
  const team = await teamRepo.findTeamById(teamId);

  if (!team.length) {
    throw new Error("Team not found");
  }

  await teamRepo.deleteTeamById(teamId);

  return { message: "Team deleted successfully" };
};