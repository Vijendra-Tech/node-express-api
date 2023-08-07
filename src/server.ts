import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createUser, signin } from "./handlers/user";

const app = express();

// const port = 8080;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res, next) => {
  res.status(200);
  res.json({ message: "Hello" });
  //Async Error handler
  // setTimeout(() => {
  //   next(new Error("hello"));
  // }, 1);
});

app.use("/api", protect, router);
app.post("/user", createUser);
app.post("/signin", signin);

app.use((err, req, res, next) => {
  if (err.type === "input") {
    res.status(400).json({ message: "inavalid input" });
  } else {
    res.status(500).json({ message: "oops,something went wrong!" });
  }
});

export default app;
