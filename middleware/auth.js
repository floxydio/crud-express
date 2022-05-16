const jwt = require("jsonwebtoken")



exports.checkAuth = function (req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).json({
    message: "User Unauthorized"
  })

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) return res.status(401).json({
      message: "User Unauthorized"
    })

    next()
  })
}