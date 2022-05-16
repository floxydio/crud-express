const connection = require("../database/mysql")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


exports.signUp = function(req,res) {
  req.body.password = bcrypt.hashSync(req.body.password, 10)
  connection.query("INSERT INTO users SET ?", req.body, function (err, results) {
    if (err) throw err;
    res.json({
      message: "Successfully Sign Up",
      data: req.body,
    })
  })
}

exports.login = function(req,res) {
  connection.query("SELECT * FROM users WHERE email = ?", req.body.email, function (err, results) {
    if (err) throw err;
    if(results.length === 0) {
      res.status(400).json({
        message: "Email Not Found"
      })
    } else {
      if(bcrypt.compareSync(req.body.password.toString(), results[0].password)) {
        const token = jwt.sign({
          email: results[0].email,
        },'secret_key',{expiresIn: 60})

        res.status(200).json({
          token: token,
          message: "Successfully Login",
          data: results[0]
        })
      } else {
        res.status(400).json({
          message: "Wrong Password"
        })
      }
    }
  })
}