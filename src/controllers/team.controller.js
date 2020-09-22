import Team from '../models/Team.model';

export async function getTeams(req, res) {
  const teams = await Team.findAll();
  res.json({
    data: teams
  });
};

export async function createTeam(req, res) {

};

