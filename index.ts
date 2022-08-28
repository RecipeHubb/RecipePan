import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import fs from "fs";
import multer from "multer";
import path from "path";

const app: Express = express();
const port = process.env.PORT || 8000;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      // hash the file name - the same as what is currently being done for s3
      file.fieldname + "-" + Date.now() + path.extname(file.originalname),
    );
  },
});

const upload = multer({ storage: storage });

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
    console.log("testing");
    // may want to send file cb to a function module
    // console.log("storage location is ", req.hostname + "/" + req.file.path);
    return res.send(req.file);
  },
);

console.log("Running with port", port);
app.listen(port);
