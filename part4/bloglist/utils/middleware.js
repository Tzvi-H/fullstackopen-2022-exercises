const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");
const logger = require("./logger");
const User = require("../models/user");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "MongoServerError") {
    return response.status(400).json({ error: "username must be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: "invalid mongo id" });
  }

  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const token = authorization.substring(7);
    const decodedToken = jwt.verify(token, SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    req.token = decodedToken;
  } else if (!authorization) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  next();
};

const userExtractor = async (req, res, next) => {
  const user = await User.findById(req.token.id);

  if (!user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  req.user = user;
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
