module.exports = class AppError extends Error {
    constructor(message, code, data) {
      super(message)
  
      this.name = this.constructor.name
  
      this.code = code || 500
  
      this.data = data || null
    }
  }