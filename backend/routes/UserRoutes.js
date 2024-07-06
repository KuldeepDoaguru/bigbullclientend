const express = require("express");
const multer = require("multer");
const path = require("path");
const { fileURLToPath } = require("url");
const { dirname } = require("path");
const {
  AdminRegister,
  adminLoginUser,
  getUserViaId,
  manageUsers,
  sendOtpAdmin,
  updateAdminPassword,
  updatePassword,
  updateProfilePicture,
  updateUsers,
  verifyOtp,
  deleteUser, 
  getUserViaEmail,
} = require("../controllers/authController.js");
const {
  addToWishlist,
  addtocartBack,
  getCartItems,
  getWishlistItems,
  LeaderBoardData,
  addChapterData,
  addCourseVideos,
  getChapterViaId,
  getVideoViaVideoID,
  updateCourseVideoDetails,
  getChapterDataViaChid,
  updateChapterDataViaChid,
  deleteChapterDataViaChid,
  deleteVideoViaVid,
  subscriptionPlan,
  subscriptionController,
  getSubscriptionPlans,
 
} = require("../controllers/ItemController.js");
const  invoiceController =require("../controllers/ItemController.js"); //import all invoice function through this
const router = express.Router();

router.get('/getUserViaEmail',getUserViaEmail);
router.get("/usersList", manageUsers);
router.put("/users/:id", updateUsers);
router.get("/getUserViaId/:id", getUserViaId);
router.post("/addToWishlist/:userId/:productId", addToWishlist);
router.get("/getWishlistItems/:userId", getWishlistItems);
router.post("/addtocart/:userId/:productId", addtocartBack);
router.get("/getCartItems/:userId", getCartItems);
router.post("/AdminRegister", AdminRegister);
router.post("/adminLoginUser", adminLoginUser);
// router.post("/sendOtpAdmin", sendOtpAdmin);
router.post("/verifyOtp", verifyOtp);
router.put("/updateAdminPassword", updateAdminPassword);
router.delete("/deleteUser/:userId", deleteUser);
router.post('/subscriptionPlan',subscriptionPlan);
router.post('/subscriptionController',subscriptionController);
router.get('/getSubscriptionPlans',getSubscriptionPlans);

// Routes for invoices
router.post('/createInvoice', invoiceController.createInvoice);
router.get('/getAllInvoice', invoiceController.getAllInvoices);
router.get('/getByIdInvoice/:id', invoiceController.getInvoiceById);
router.put('/updateInvoice/:id', invoiceController.updateInvoice);
router.delete('/deleteInvoice/:id', invoiceController.deleteInvoice);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "profilePicture/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.put(
  "/update-profile-picture/:userId",
  upload.single("profilePicture"),
  updateProfilePicture
);
router.get("/LeaderBoardData", LeaderBoardData);

// question paper sheet multer
const queStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "questionSheet/");
  },   
  filename: function (req, file, cb) {
    const fileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const queUpload = multer({ storage: queStorage });

router.post(
  "/addChapterData/:cid",
  queUpload.single("questionSheet"),
  addChapterData
);

const Videostorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "videoCourse/"); // Specify the upload directory
  },
  filename: function (req, file, cb) {
    const fileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const Videoupload = multer({ storage: Videostorage });

router.post(
  "/courses/:courseId/videos",
  Videoupload.single("videoFile"),
  addCourseVideos
);

router.get("/getChapterViaId/:cid", getChapterViaId);
router.get("/getVideoViaVideoID/:vid", getVideoViaVideoID);
router.put(
  "/updateCourseVideoDetails/:vid",
  Videoupload.single("videoFile"),
  updateCourseVideoDetails
);

router.get("/getChapterDataViaChid/:chid", getChapterDataViaChid);
router.put(
  "/updateChapterDataViaChid/:cid/:chid",
  queUpload.single("questionSheet"),
  updateChapterDataViaChid
);

router.delete("/deleteChapterDataViaChid/:chid", deleteChapterDataViaChid);
router.delete("/deleteVideoViaVid/:vid", deleteVideoViaVid);

module.exports = router;
