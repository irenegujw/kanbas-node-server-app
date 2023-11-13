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
    origin: process.env.FRONTEND_URL
  })
);

app.use(express.json());
Hello(app)
CourseRoutes(app);
ModuleRoutes(app);
Lab5(app)
app.listen(process.env.PORT || 4000);
// app.listen(4000)