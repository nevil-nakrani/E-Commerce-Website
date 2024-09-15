const Product = require("../../models/Product.js");

const getFilteredProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error in filter products",
    });
  }
};

module.exports = { getFilteredProducts };
