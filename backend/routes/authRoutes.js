const express = require("express");
const multer = require("multer");
const path = require("path");
const { fileURLToPath } = require("url");
const { dirname } = require("path");
const {
  loginController,
  registerController,
  sendOtp,
  updatePassword,
  contactInquiry,
  getBoughtCourseDetails,
  verifyOtp,
  contactRequest,
  getBoughtCourseViaId,
} = require("../controllers/authController.js");
const {
  addToCart,
  coursePage,
  getAllCourses,
  videoListViaCourseId,
} = require("../controllers/ItemController.js");

// router object
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "thumbnails/");
  },
  filename: function (req, file, cb) {
    const fileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

// routing
// REGISTER || METHOD POST
router.post("/register", upload.single("profilePicture"), registerController);
router.post("/login", loginController);
router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.post("/updatePassword", updatePassword);
router.post("/add-to-cart/:user_id/:item_id", addToCart);
router.get("/getAllCourses", getAllCourses);
router.get("/coursePage/:courseId", coursePage);
router.get(`/videoListViaCourseId/:courseId`, videoListViaCourseId);
router.get("/contactInquiry", contactInquiry);
router.get("/getBoughtCourseDetails", getBoughtCourseDetails);
router.post("/contactRequest", contactRequest);
router.get("/getBoughtCourseViaId/:uid", getBoughtCourseViaId);

module.exports = router;
