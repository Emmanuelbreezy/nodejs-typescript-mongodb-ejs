"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const dotenv_1 = __importDefault(require("dotenv"));
const recipeRoutes_1 = __importDefault(require("./server/routes/recipeRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(express_ejs_layouts_1.default);
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
app.set("layout", "./layouts/main");
dotenv_1.default.config();
const port = process.env.PORT || 3001;
app.use("/", recipeRoutes_1.default);
app.listen(port, () => {
    console.log("Server Running!");
});
