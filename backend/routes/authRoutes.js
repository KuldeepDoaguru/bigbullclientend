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

const profilePicturestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "profilePicture/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const profilePictureupload = multer({ storage: profilePicturestorage });

// routing
// REGISTER || METHOD POST
router.post(
  "/register",
  profilePictureupload.single("profilePicture"),
  registerController
);
router.post("/login", loginController);
router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.post("/updatePassword", updatePassword);
router.post("/add-to-cart/:user_id/:item_id", addToCart);
router.get("/getAllCourses", getAllCourses);
router.get("/coursePage/:courseId", coursePage);
router.get(`/videoListViaCourseId/:courseId/:chid`, videoListViaCourseId);
router.get("/contactInquiry", contactInquiry);
router.get("/getBoughtCourseDetails", getBoughtCourseDetails);
router.post("/contactRequest", contactRequest);
router.get("/getBoughtCourseViaId/:uid", getBoughtCourseViaId);

module.exports = router;
