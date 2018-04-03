const errors = require('../../errors')

class InfusionsoftLegacyError extends errors.InfusionsoftNodeSdkError {}

class XmlRpcApiError extends InfusionsoftLegacyError {
  constructor (message) {
    if (typeof message === 'string') {
      super(`XML-RPC API Error: ${message}`)
    } else if (message && message instanceof Error) {
      const err = message
      super(`XML-RPC API Error: ${err.message}`)
      Object.defineProperty(this, 'req', { value: err.req })
      Object.defineProperty(this, 'res', { value: err.res })
      Object.defineProperty(this, 'body', { value: err.body })
      this.code = err.code
      this.faultCode = err.faultCode
      this.faultString = err.faultString
      this.stack += `\nCaused By:\n${err.stack}`
    } else {
      super('XML-RPC API Error')
    }
  }
}

class InvalidKeyError extends XmlRpcApiError {}

module.exports = {
  InfusionsoftLegacyError,
  XmlRpcApiError,
  InvalidKeyError
}
