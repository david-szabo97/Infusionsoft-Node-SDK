const errors = require('../../errors')

class InfusionsoftOAuth2Error extends errors.InfusionsoftNodeSdkError {}

class TokenExpiredError extends InfusionsoftOAuth2Error {
  constructor (message) {
    super(message || 'OAuth2 Token Expired')
  }
};

class XmlRpcApiError extends InfusionsoftOAuth2Error {
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

class RestApiError extends InfusionsoftOAuth2Error {
  constructor (message) {
    super((message) ? `REST API Error: ${message}` : 'Rest API Error')
  }
}

module.exports = {
  InfusionsoftOAuth2Error,
  TokenExpiredError,
  XmlRpcApiError,
  RestApiError
}
