// Custom error handler middleware
export const errorHandler = (err, req, res, next) => {
  // Set status code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Send JSON response
  res.status(statusCode).json({
    message: err.message, // Human-readable error
    stack: process.env.NODE_ENV === "production" ? null : err.stack, // Only show stack in dev
  });
};

// Example usage in controller:
// throw new Error("Something went wrong");
// res.status(400);
// next(error);
