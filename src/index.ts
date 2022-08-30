import express from "express";
// import { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();
import * as fs from "fs";
import multer from "multer";
import * as path from "path";
import { storage } from "./utility/storage";

const app = express();
const port = process.env.PORT || 8000;

const upload = multer({ storage: storage() });

// makes all images public
app.use("/static", express.static(path.join(__dirname, "../images")));

app.get("/", (req: any, res: any) => {
  res.send("RecipePan 3rd Party");
});

// if was sending images individually per file name
app.get("/images", (req: any, res: any) => {
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
  function (req: any, res: any) {
    if (!req.file) res.send({ status: 400 });
    const { name, userId } = req.body;
    fs.renameSync(
      // TODO: do not cast to string
      req.file?.path as string,
      `images/${userId}-${name}.jpg`,
    );
    return res.send({ status: 200, file: req.file });
  },
);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
