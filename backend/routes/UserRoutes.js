const express = require("express");
const multer = require("multer");
const path = require("path");
const { fileURLToPath } = require("url");
const { dirname } = require("path");
const {
  getUserViaId,
  updateUsers,
  verifyOtp,
  deleteUser,
  getUserViaEmail,
} = require("../controllers/authController.js");
const {
  getCartItems,
  getChapterViaId,
  getVideoViaVideoID,
  updateCourseVideoDetails,
  getChapterDataViaChid,
  subscriptionPlan,
  subscriptionController,
  getSubscriptionPlans,
  removeCartItem,
  deleteInvoice,
  updateInvoice,
  getInvoiceById,
  getAllInvoices,
  createInvoice,
  boughtCourse,
  clearCart,
} = require("../controllers/ItemController.js");
const invoiceController = require("../controllers/ItemController.js"); //import all invoice function through this
const router = express.Router();

router.get("/getUserViaEmail", getUserViaEmail);
router.put("/users/:id", updateUsers);
router.get("/getUserViaId/:id", getUserViaId);
router.get("/getCartItems/:userId", getCartItems);
router.post("/verifyOtp", verifyOtp);
router.delete("/deleteUser/:userId", deleteUser);
router.post("/subscriptionPlan", subscriptionPlan);
router.post("/subscriptionController", subscriptionController);
router.get("/getSubscriptionPlans", getSubscriptionPlans);

// Routes for invoices
router.post("/createInvoice", createInvoice);
router.get("/getAllInvoice", getAllInvoices);
router.get("/getByIdInvoice/:id", getInvoiceById);
router.put("/updateInvoice/:id", updateInvoice);
router.delete("/deleteInvoice/:id", deleteInvoice);
router.get("/getChapterViaId/:cid", getChapterViaId);
router.get("/getVideoViaVideoID/:vid", getVideoViaVideoID);
router.get("/getChapterDataViaChid/:chid", getChapterDataViaChid);
router.delete("/removeCartItem/:cit", removeCartItem);
router.post("/boughtCourse", boughtCourse);
router.delete("/clearCart/:uid", clearCart);

module.exports = router;
