import express from "express";
import {
  homePage,
  exploreCategories,
  exploreCategoriesById,
  exploreRecipe,
  searchRecipe,
  exploreLatest,
  exploreRandom,
  submitRecipe,
  submitRecipeOnPost,
} from "../controllers/recipeController";

const router: express.Router = express.Router();

/**
 * App Routes
 */

router.get("/", homePage);
router.get("/recipe/:id", exploreRecipe);
router.get("/categories", exploreCategories);
router.get("/categories/:id", exploreCategoriesById);
router.post("/search", searchRecipe);

router.get("/explore-latest", exploreLatest);
router.get("/explore-random", exploreRandom);

router.get("/submit-recipe", submitRecipe);
router.post("/submit-recipe", submitRecipeOnPost);

export = router;
