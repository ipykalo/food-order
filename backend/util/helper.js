module.exports.logError = (err, method) => {
  const error = new Error(err);
  console.log(`------${method}------`, err);
  return error;
}