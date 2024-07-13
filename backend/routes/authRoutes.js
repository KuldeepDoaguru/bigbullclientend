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
  getUserViaId,
  updateUsers,
  deleteUser,
  getUserViaEmail,
} = require("../controllers/authController.js");

// router object
const router = express.Router();

router.get("/getUserViaEmail", getUserViaEmail);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "profilePicture/");
  },
  filename: function (req, file, cb) {
    const fileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });
router.put(
  "/update-users-details/:id",
  upload.single("profilePicture"),
  updateUsers
);
router.get("/getUserViaId/:id", getUserViaId);

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
router.post("/updatePassword", updatePassword);
router.get("/contactInquiry", contactInquiry);
router.get("/getBoughtCourseDetails", getBoughtCourseDetails);
router.post("/contactRequest", contactRequest);
router.get("/getBoughtCourseViaId/:uid", getBoughtCourseViaId);
router.post("/verifyOtp", verifyOtp);
router.delete("/deleteUser/:userId", deleteUser);

module.exports = router;
