const connection = require("../database/mysql")
const multer = require("multer")

const upload = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  }, filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const storage = multer({ storage: upload,limits:{fileSize: 50000}})

exports.findProduct = function (req, res) {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    res.json({
      data: results
    })
  })
}

exports.createProduct = function (req, res) {
  storage.single("upload")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).json({
        message: err.message
      })
    } else if (err) {
    }
    else {
      req.body.upload = req.file.originalname
      connection.query("INSERT INTO products SET ?", req.body, function (err, results) {
        if (err) throw err;
        res.json({
          message: "Successfully Create Product"
        })
      })
    }
  })
}

exports.editProductByID = function (req, res) {
  connection.query("UPDATE products SET ? WHERE id = ?", [req.body, req.params.id], function (err, results) {
    if (err) throw err;
    res.json("Successfully Update Product")
  })
}

exports.deleteProductById = function (req, res) {
  connection.query("DELETE FROM products WHERE id = ?", req.params.id, function (err, results) {
    if (err) throw err;
    res.json("Successfully Delete Product")
  })
}