const express = require("express")
const app = express()
const port = 3000
const bodyparser = require("body-parser")
const cors = require("cors")
const product = require("../controllers/Product")

  app.use(cors())


  app.use(bodyparser.urlencoded({extended: false}))

  app.get("/", (res) => res.send("Pala Kau Hello World!"))
  app.get("/product", product.findProduct)
  app.post("/product",product.createProduct)
  app.put("/product/:id", product.editProductByID)
  app.delete("/product/:id", product.deleteProductById)


app.listen(port, () => console.log(`Running on ${port}`))