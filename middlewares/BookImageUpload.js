import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // console.log(__dirname);
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  const BookImageUpload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        console.log("Only .png, .jpg and .jpeg format allowed!");
        return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
      }
    },
    limits: {
      fileSize: 1024 * 1024 * 2,
    },
  });
  
  export default BookImageUpload;
  