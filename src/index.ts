import path from "path";
import express from "express";
import expressLayout from "express-ejs-layouts";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";

import routeRecipe from "./server/routes/recipeRoutes";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayout);

app.use(cookieParser("CookingBlogSecure"));
app.use(
  session({
    secret: "Cooking-secure-session",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());
app.use(fileUpload());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "./layouts/main");

dotenv.config();
const port = process.env.PORT || 3001;

app.use("/", routeRecipe);

app.listen(port, (): void => {
  console.log("Server Running!");
});
