require("../models/database");
import path from "path";
import express, { Request, Response } from "express";

const Category = require("../models/Category");
const Recipe = require("../models/Recipe");

/**
 * GET /
 * Home page
 */

export const homePage = async (req: Request, res: Response): Promise<void> => {
  try {
    const limitNumber: number = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    const american = await Recipe.find({ category: "American" }).limit(
      limitNumber
    );
    const food = {
      latest,
      american,
    };

    res.render("index", {
      title: "Cooking Blog - Home",
      categories,
      food,
    });
  } catch (error) {
    res.status(500).send({ message: "Error occurred" });
  }
};

/**
 * GET /categories
 * Home page
 */

export const exploreCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const limitNumber: number = 20;
    const categories = await Category.find({}).limit(limitNumber);
    res.render("categories", {
      title: "Cooking Blog - Categories",
      categories,
    });
  } catch (error) {
    res.status(500).send({ message: "Error occurred" });
  }
};

/**
 * GET /categories/:id
 * Home page
 */

export const exploreCategoriesById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categoryId = req.params.id;

    const limitNumber: number = 20;
    const categoryById = await Recipe.find({ category: categoryId }).limit(
      limitNumber
    );
    res.render("categories", {
      title: "Cooking Blog - Categories",
      categoryById,
    });
  } catch (error) {
    res.status(500).send({ message: "Error occurred" });
  }
};

/**
 * GET /recipe/:id
 * Home page
 */

export const exploreRecipe = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);

    res.render("recipe", {
      title: "Cooking Blog - Recipe",
      recipe,
    });
  } catch (error) {
    res.status(500).send({ message: "Error occurred" });
  }
};

/**
 * POST /search
 * Search
 */

export const searchRecipe = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let searchTerm = req.body.searchTerm;

    let recipe = await Recipe.find({
      $text: { $search: searchTerm, $diacriticSensitive: true },
    });

    res.render("search", {
      title: "Cooking Blog - Search",
      recipe,
    });
  } catch (error) {
    res.status(500).send({ message: "Error occurred" });
  }
};

/**
 * GET /explore latest
 * Explore Latest page
 */

export const exploreLatest = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const limitNumber: number = 20;
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);

    res.render("explore-latest", {
      title: "Cooking Blog - Explore Latest",
      recipe,
    });
  } catch (error) {
    res.status(500).send({ message: "Error occurred" });
  }
};

//

/**
 * GET /explore random
 * Explore Random page
 */

export const exploreRandom = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const count = await Recipe.find().countDocuments();

    const random = Math.floor(Math.random() * count);
    const recipe = await Recipe.findOne().skip(random).exec();

    res.render("explore-random", {
      title: "Cooking Blog - Explore Random",
      recipe,
    });
  } catch (error) {
    res.status(500).send({ message: "Error occurred" });
  }
};

//

/**
 * GET /submitRecipe
 * Explore Random page
 */

export const submitRecipe = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const infoErrorsObj = req.flash("infoError");
    const infoSubmitObj = req.flash("infoSubmit");

    res.render("submit-recipe", {
      title: "Cooking Blog - Submit Recipe",
      infoErrorsObj,
      infoSubmitObj,
    });
  } catch (error) {
    res.status(500).send({ message: "Error occurred" });
  }
};

/**
 * POSt /submitRecipeOnPost
 * Submit page
 */

export const submitRecipeOnPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if (!req.files) {
      console.log("No File Where Uplaod");
    } else {
      imageUploadFile = JSON.parse(JSON.stringify(req.files)).image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = path.resolve("./") + "/public/uploads/" + newImageName;
      imageUploadFile.mv(uploadPath, function (err: any) {
        if (err) return res.status(500).send(err);
      });
    }

    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredient: req.body.ingredient,
      category: req.body.category,
      image: newImageName,
    });

    await newRecipe.save();

    req.flash("infoSubmit", "Recipe has been added");
    res.redirect("/submit-recipe");
  } catch (error) {
    req.flash("infoError", `${error}`);
    res.redirect("/submit-recipe");
  }
};
