import { getRecipe } from "models/repositories/recipe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  const id = Number(req.query["id"]);
  if (!isFinite(id)) {
    res.status(400).json({ error: `Invalid recipe id ${req.query["id"]}` });
    return;
  }
  const recipe = await getRecipe(id);
  if (recipe === undefined) {
    res.status(404).json({ error: `Recipe not found: ${id}` });
    return;
  }
  res.status(200).json({ data: recipe });
}
