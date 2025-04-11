const express = require("express");
const { signup } = require("../controllers/admin/auth/signup");
const { login } = require("../controllers/admin/auth/login");
const { adminAuthenticate } = require("../controllers/admin/auth/adminAuthenticate");
const fileUploader = require("../middleware/fileUploader");
const { createSearchIndex } = require("../models/vendor");
const { createCategory } = require("../controllers/admin/categoryController/createCategory");
const { getVendor } = require("../controllers/admin/vendorController/getVendor");
const { getVendorDetails } = require("../controllers/admin/vendorController/getVendorDetails");
const { vendorBlock } = require("../controllers/admin/vendorController/vendorBlock");
const { vendorApprove } = require("../controllers/admin/vendorController/vendorApprove");
const { getCategory } = require("../controllers/admin/categoryController/getCategory");
const { updateCategoryStatus } = require("../controllers/admin/categoryController/updateCategoryStatus");
const { deleteCategory } = require("../controllers/admin/categoryController/deleteCategory");
const { updateCategory } = require("../controllers/admin/categoryController/updateCategory");
const { getSubCategory } = require("../controllers/admin/categoryController/getSubCategory");
const { getAllSubCategory } = require("../controllers/admin/categoryController/getAllSubCategory");
const router = express.Router()

router.get("/test/admin", (req, res) => {
    res.status(200).json({ message: "Admin Route Working" });
})

router.post('/signup', signup)
router.post('/login', login)

//------------------------------------------------
// category
//------------------------------------------------
router.post('/category/create', adminAuthenticate, fileUploader("category", [{ name: "image", maxCount: 1 }]), createCategory)
router.get('/category/list', adminAuthenticate, getCategory)
router.patch('/category/:id', adminAuthenticate, updateCategoryStatus)
router.patch('/category/update/:id', adminAuthenticate, fileUploader("category", [{ name: "image", maxCount: 1 }]), updateCategory)
router.delete('/category/delete/:id', adminAuthenticate, deleteCategory)

router.get("/subcategory/list", adminAuthenticate, getAllSubCategory)
router.get("/subcategory/:id", adminAuthenticate, getSubCategory)


//------------------------------------------------
// vendor
//------------------------------------------------
router.get("/vendor/list", getVendor)
router.get("/vendor/:id", getVendorDetails)
router.patch("/vendor/block/:id", vendorBlock)
router.patch("/vendor/approve/:id", vendorApprove);



module.exports = router;