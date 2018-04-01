const xmlrpc = require('xmlrpc')
const util = require('util')
const mutablifyArgs = require('mutablify-args')
const Services = require('./services')

class XmlApi {
  constructor (options) {
    this._options = options
    this._client = createXmlRpcClient(options.xmlrpc)

    this.affiliateProgram = new Services.AffiliateProgram(this)
    this.affiliate = new Services.Affiliate(this)
    this.contact = new Services.Contact(this)
    this.data = new Services.Data(this)
    this.discount = new Services.Discount(this)
    this.email = new Services.Email(this)
    this.file = new Services.File(this)
    this.funnel = new Services.Funnel(this)
    this.invoice = new Services.Invoice(this)
    this.order = new Services.Order(this)
    this.product = new Services.Product(this)
    this.search = new Services.Search(this)
    this.shipping = new Services.Shipping(this)
    this.webForm = new Services.WebForm(this)
  }

  async request (method, params = []) {
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
