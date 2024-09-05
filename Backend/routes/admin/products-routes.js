const express = require("express");
const { upload } = require("../../helpers/cloudinary");
const {
  handleImageUpload,
  addProduct,
  editproduct,
  deleteProduct,
  showAllProducts,
} = require("../../controllers/admin/products-controllers");
const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.put("/edit/:id", editproduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", showAllProducts);

module.exports = router;
