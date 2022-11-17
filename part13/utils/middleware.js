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

module.exports = {
  errorHandler,
};
