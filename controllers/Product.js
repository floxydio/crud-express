const connection = require("../database/mysql")


exports.findProduct = function(req,res) {
  connection.query("SELECT * FROM products", function(err, results) {
    if(err) throw err;
    res.json({
      data: results
    })
  })
}

exports.createProduct = function(req,res) {
  connection.query("INSERT INTO products SET ?", req.body, function(err, results) {
    if(err) throw err;
    res.json({
      message: "Successfully Create Product"
    })
  })
}

exports.editProductByID =  function(req,res) {
  connection.query("UPDATE products SET ? WHERE id = ?", [req.body, req.params.id], function(err, results) {
    if(err) throw err;
    res.json("Successfully Update Product")
  })
}

exports.deleteProductById = function(req,res) {
  connection.query("DELETE FROM products WHERE id = ?", req.params.id, function(err, results) {
    if(err) throw err;
    res.json("Successfully Delete Product")
  })
}