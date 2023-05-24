const errorHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((error) => {
    console.log(error)
    if (error && error.code && error.message) {
      return res
        .status(error.code)
        .json({ message: error.message, result: error.data })
    } else {
      return res.status(500).json({
        message: 'Error ' + error,
        result: null,
      })
    }
  })

module.exports = { errorHandler }