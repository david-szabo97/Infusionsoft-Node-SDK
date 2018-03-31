const xmlrpc = require('xmlrpc')
const util = require('util')
const mutablifyArgs = require('mutablify-args')

class XmlApi {
  constructor (options) {
    this._options = options
    this._client = createXmlRpcClient(options.xmlrpc)
  }

  async request (method, params) {
    return this._client.methodCall(method, params)
  }
}

function createXmlRpcClient (options) {
  const client = xmlrpc.createSecureClient(options.clientOptions)

  replaceMethodCall(client, options.methodCallMutators || [])

  return client
}

function replaceMethodCall (client, mutators) {
  const originalMethodCall = client.methodCall
  const promisifiedMethodCall = util.promisify(originalMethodCall)
  const mutablePromisifiedMethodCall = mutablifyArgs(promisifiedMethodCall)
  client.methodCall = mutablePromisifiedMethodCall.bind(client, mutators)
}

module.exports = XmlApi
