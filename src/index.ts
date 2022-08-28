import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import multer from "multer";
import path from "path";
import { storage } from "./utility/storage";

const app: Express = express();
const port = process.env.PORT || 8000;

const upload = multer({ storage: storage() });

// makes all images public
app.use("/static", express.static(path.join(__dirname, "images")));

app.get("/", (req: Request, res: Response) => {
  res.send("RecipePan 3rd Party");
});

// if was sending images individually per file name
app.get("/images", (req: Request, res: Response) => {
  fs.readdir(path.join(__dirname, "images"), (err, files) => {
    if (err) {
      throw err;
    }

    res.send({
      files,
    });
  });
});

app.post(
  "/saveImage",
  upload.single("file"),
  function (req: Request, res: Response) {
    if (!req.file) res.send({ status: 400 });
    const { name, userId } = req.body;
    fs.renameSync(
      // TODO: do not cast to string
      req.file?.path as string,
      `images/${userId}-${name}`,
    );
    return res.send({ status: 200, file: req.file });
  },
);

console.log("Running with port", port);
app.listen(port);
