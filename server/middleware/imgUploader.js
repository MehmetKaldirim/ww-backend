const multer = require("multer");
const moment = require("moment");
const path = require("path");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, process.cwd() + "/server/uploads/");
  },
  filename(req, file, cb) {
    const date = moment().format("DDDMMYYYY-HHmmss_SSS");
    cb(null, `${date}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5,
};

module.exports = multer({
  storage,
  fileFilter,
  limits,
});