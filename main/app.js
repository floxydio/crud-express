const express = require("express")
const app = express()
const port = 3000
const bodyparser = require("body-parser")
const cors = require("cors")
const product = require("../controllers/Product")
const auth = require("../controllers/Auth")

const path = require('path')

  app.use(cors())

  app.use(bodyparser.urlencoded({extended: false}))

  app.use("/img", express.static(path.join(__dirname, '../uploads')))
  app.get("/", (req,res) => res.send("Pala Kau Hello World!"))

  // Product
  app.get("/product", product.findProduct)
  app.post("/product",product.createProduct)
  app.put("/product/:id", product.editProductByID)
  app.delete("/product/:id", product.deleteProductById)

  //Auth
  app.post("/signup", auth.signUp)
  app.post("/signin", auth.login)

app.listen(port, () => console.log(`Running on ${port}`))