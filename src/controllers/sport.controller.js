import Sport from "../models/Sport.model";

export async function getSports(req, res) {
  try {
    const sports = await Sport.findAll();
    res.json({
      data: sports,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot get sports",
      data: {},
    });
  }
}