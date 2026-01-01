const multer = require("multer");

// Store file in memory (we send it directly to Cloudinary)
const storage = multer.memoryStorage();

const upload = multer({
  storage
});

module.exports = upload;
