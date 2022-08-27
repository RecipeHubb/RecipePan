(import express from "express").config()
import dotenv  from "dotenv";
import fs from "fs";
import multer from "multer";
import path from "path";

const app = express();
const port = process.env.PORT || 8000;
const upload = multer({ storage: storage });

const storage = multer.diskStorage({
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

// makes all images public
app.use("/static", express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => {
  res.send("RecipePan 3rd Party");
});

// if was sending images individually per file name
// app.get("/image", (req, res) => {
//   res.sendFile(path.resolve("./images/wp.jpg"));
// });

app.post("/saveImage", upload.single("file"), function (req, res) {
  // may want to send file cb to a function module
  console.log("storage location is ", req.hostname + "/" + req.file.path);
  return res.send(req.file);
});

app.listen(port);
