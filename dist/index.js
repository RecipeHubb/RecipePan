"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { Express, Request, Response } from "express";
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const fs = __importStar(require("fs"));
const multer_1 = __importDefault(require("multer"));
const path = __importStar(require("path"));
const storage_1 = require("./utility/storage");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const upload = (0, multer_1.default)({ storage: (0, storage_1.storage)() });
// makes all images public
app.use("/static", express_1.default.static(path.join(__dirname, "../images")));
app.get("/", (req, res) => {
    res.send("RecipePan 3rd Party");
});
// if was sending images individually per file name
app.get("/images", (req, res) => {
    fs.readdir(path.join(__dirname, "images"), (err, files) => {
        if (err) {
            throw err;
        }
        res.send({
            files,
        });
    });
});
app.post("/saveImage", upload.single("file"), function (req, res) {
    var _a;
    if (!req.file)
        res.send({ status: 400 });
    const { name, userId } = req.body;
    fs.renameSync(
    // TODO: do not cast to string
    (_a = req.file) === null || _a === void 0 ? void 0 : _a.path, `images/${userId}-${name}.jpg`);
    return res.send({ status: 200, file: req.file });
});
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
