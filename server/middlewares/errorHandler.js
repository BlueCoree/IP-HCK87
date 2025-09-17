const errorHandle = ((err, _req, res, _next) => {
  // console.log(err)
  switch (err.name) {
    case "SequelizeValidationError":
      res.status(400).json({message: err.errors.map(error => error.message)})
      break;
    case "NotFound":
      res.status(404).json({message: "Data not found!"})
      break;
    case "SequelizeUniqueConstraintError":
      res.status(400).json({message: err.errors.map(error => error.message)})
      break;
    case "Unauthentication":
      res.status(401).json({message: "Invalid email or password!"})
    case "isEmail":
      res.status(400).json({message: "Email is required!"})
      break;
    case "isPassword":
      res.status(400).json({message: "Password is required!"})
      break;
    case "invalidToken":
      res.status(401).json({message: "Invalid Token!"})
      break;
    case "JsonWebTokenError":
      res.status(401).json({message: "Invalid Token!"})
      break;
    case "Forbidden":
      res.status(403).json({message: "Forbidden!"})
      break;
    case "isImage":
      res.status(400).json({message: err.message})
    default:
      res.status(500).json({message: "Internal Server Error"})
      break;
  }
})


module.exports = errorHandle
