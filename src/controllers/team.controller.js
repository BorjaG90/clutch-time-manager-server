import Team from '../models/Team.model';

export async function getTeams(req, res) {
  try {
    const teams = await Team.findAll({
      attributes: ['id', "name", "city", "user_id"],
      order: [['id','DESC']] 
    });
    res.json({
      data: teams,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot get teams",
      data: {},
    });
  }
};

export async function createTeam(req, res) {
  try {
    const { city, name, user_id  } = req.body;
    let newTeam = await Team.create(
      {
        name,
        city,
        user_id,
      },
      {
        fields: ["name", "city", "user_id"],
      }
    );
    if (newTeam) {
      return res.json({
        message: "Team created successfully",
        data: newTeam,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Team not created, something goes wrong",
      data: {},
    });
  }
};

export async function getOneTeam(req, res) {
  try {
    const { id } = req.params;
    const team = await Team.findOne({
      where: {
        id,
      },
    });
    res.json({
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot get that team",
      data: {},
    });
  }
};

export async function deleteTeam(req, res) {
  try {
    const deleteRowCount = await Team.destroy({
      where: { id },
    });
    res.json({
      message: 'Team deleted succesfully',
      count: deleteRowCount
    })
  } catch (error) {
    res.status(500).json({
      message: "Cannot delete that team",
      data: {},
    });
  }
};

export async function updateTeam(req, res) {
  try {
    const { id } = req.params;
    const { city, name, user_id  } = req.body;
    const teams = await Team.findAll({
      attributes: ['id', "name", "city", "user_id"],
      where: { id }
    });

    if (teams.length > 0){
      teams.map(async team => {
        await team.update({
          name,
          city,
          user_id
        });
      });
    }

    return res.json({
      message: 'Teams updated succesfully',
      data: teams
    })
  } catch (error) {
    res.status(500).json({
      message: "Cannot update that team",
      data: {},
    });
  }
};

export async function getTeamByUser(req, res) {
  try {
    const teams = await Team.findAll({
      attributes: ['id', "name", "city", "user_id"],
      where: {user_id: req.params.id},
      order: [['id','DESC']] 
    });

    res.json({
      data: teams,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Cannot get teams of that user",
      data: {},
    });
  }
};