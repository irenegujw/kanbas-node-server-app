import express from 'express';
import Hello from './hello.js';
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from './modules/routes.js';
import "dotenv/config";
// import session from "express-session";


import cors from "cors";
const app = express()
app.use(
  cors({
    credentials: true,
    origin: "https://a5--stellar-gumdrop-f909ef.netlify.app"
  })
);

app.use(express.json());
Hello(app)
CourseRoutes(app);
ModuleRoutes(app);
Lab5(app)
app.listen(process.env.PORT || 4000);
// app.listen(4000)