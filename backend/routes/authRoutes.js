const express = require("express");
const multer = require("multer");
const path = require("path");
const { fileURLToPath } = require("url");
const { dirname } = require("path");
const {
  loginController,
  profilePictureView,
  registerController,
  sendOtp,
  updatePassword,
  contactInquiry,
  getBoughtCourseDetails,
  verifyOtp,
  handleContactForm,
  sendOtpAdminRegistration,
} = require("../controllers/authController.js");
const {
  addCourseVideos,
  addToCart,
  coursePage,
  createCourse,
  deleteCourse,
  editCourse,
  getAllCourses,
  thumbnail,
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

router.post("/add-course", upload.single("thumbnails"), createCourse);

// routing
// REGISTER || METHOD POST
router.post("/register", upload.single("profilePicture"), registerController);
router.post("/login", loginController);
router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.post("/updatePassword", updatePassword);
router.post("/add-to-cart", addToCart);
router.get("/getAllCourses", getAllCourses);
router.get("/thumbnail/:courseId", thumbnail);
router.get("/coursePage/:courseId", coursePage);
router.put("/editCourse/:courseId", upload.single("thumbnails"), editCourse);
router.delete("/deleteCourse/:courseId", deleteCourse);
router.post("/sendMail", handleContactForm);

const Videostorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "videoCourse/"); // Specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  },
});

const Videoupload = multer({ storage: Videostorage });

router.post(
  "/courses/:courseId/videos",
  Videoupload.single("videoFile"),
  addCourseVideos
);

router.get(`/videoListViaCourseId/:courseId`, videoListViaCourseId);
router.get("/profilePictureView/:userId", profilePictureView);
router.get("/contactInquiry", contactInquiry);
router.get("/getBoughtCourseDetails", getBoughtCourseDetails);

// router.post("/sendOtpAdminRegistration", sendOtpAdminRegistration);

module.exports = router;
