"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
const express_1 = __importDefault(require("express"));
const recipeController_1 = require("../controllers/recipeController");
const router = express_1.default.Router();
/**
 * App Routes
 */
router.get("/", recipeController_1.homePage);
module.exports = router;
