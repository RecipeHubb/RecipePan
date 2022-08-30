import * as multer from "multer";

export function storage() {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./images");
    },
  });
}
