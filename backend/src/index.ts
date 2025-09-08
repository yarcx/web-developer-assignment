import express, { Application } from "express";
import config from "config";
import cors from "cors";
import postsRouter from "./routes/posts";
import usersRouter from "./routes/users";
import bodyParser from 'body-parser'
const port = config.get("port") as number;

const app: Application = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
