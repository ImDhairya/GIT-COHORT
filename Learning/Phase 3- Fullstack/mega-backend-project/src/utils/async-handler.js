function asyncHandler(requestHandler) {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch(function (err) {
      next(err);
    });
  };
}

export { asyncHandler };

// Other way of creating  an async handler for try-catch blocks

const asyncTryCatchHandler = (reqfn) => async (req, res, next) => {
  try {
    await reqfn(req, res, next)
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
