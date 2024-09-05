const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

//Add new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newProduct.save();
    console.log(newProduct);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error occured in !" });
  }
};

//Show All Products
const showAllProducts = async (req, res) => {
  try {
    const listOfAllProducts = await Product.find({});
    res.status(200).json({ success: true, data: listOfAllProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error occured !" });
  }
};

//Edit a Products
let editproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const findProduct = await Product.findById(id);
    if (!findProduct)
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice == "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();
    res.status(200).json({ success: true, data: findProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error occured !" });
  }
};
//Delete a products

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully !" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error occured !" });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  editproduct,
  showAllProducts,
  deleteProduct,
};
