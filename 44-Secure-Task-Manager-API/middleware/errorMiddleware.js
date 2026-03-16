// module.exports = (err,req,res,next)=>{

//   err.statusCode = err.statusCode || 500;

//   res.status(err.statusCode).json({
//     status:err.status,
//     message:err.message
//   });

// };
const fs = require("fs");
const path = require("path");

// Optional: log errors to a file for debugging
const logFile = path.join(__dirname, "../logs/error.log");

module.exports = (err, req, res, next) => {
  // Set defaults
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Log error to console
  console.error(err);

  // Log to file for debugging
  const logMessage = `[${new Date().toISOString()}] ${err.statusCode} ${err.message} \n`;
  fs.appendFile(logFile, logMessage, (error) => {
    if (error) console.error("Failed to write error log:", error);
  });

  // Send JSON response
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // optional stack in dev
  });
};