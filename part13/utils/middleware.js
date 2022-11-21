const jwt = require("jsonwebtoken");
const { SECRET } = require("./config.js");

const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "SequelizeDatabaseError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "InvalidLikesProperty") {
    return res.status(400).json({ error: error.message });
  } else {
    next();
  }
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (e) {
      console.error(e);
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
};
