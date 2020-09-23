import Season from "../models/Season.model";

/**
 * Automatiza la creación de las estructuras de la temporada
 */
export async function createSeason(
  seasonYear,
  seasonNumber,
  initDate,
  endDate,
  actual
) {
  let season = await Season.findOne({
    where: {
      [Op.and]: [
        { active: true },
        { season_year: seasonYear },
        { season_number: seasonNumber },
      ],
    },
  });

  if (season) {
    // Si la temporada ya existe
    throw new errorTypes.InfoError("Season already exist");
  } else {
    let newSeason = await Season.create(
      {
        season_year: seasonYear,
        season_number: seasonNumber,
        init_date: initDate,
        end_date: endDate,
        actual,
        created_at: literal("CURRENT_TIMESTAMP"),
        active: true,
      },
      {
        fields: [
          season_year,
          season_number,
          init_date,
          end_date,
          actual,
          created_at,
          active,
        ],
      }
    );
    if (newSeason) {
      return res.json({
        message: "Season created successfully",
        data: newSeason,
      });
    } else {
      next(new errorTypes.Error403("Season not created, something goes wrong"));
    }
  }
  try {
  } catch (error) {
    next(error);
  }
}
