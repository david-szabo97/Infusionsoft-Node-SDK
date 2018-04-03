const XmlApi = require('../api/xml')
const path = require('path')
const fs = require('fs')
const errors = require('./errors')

class InfusionsoftLegacy {
  constructor ({ appName, privateKey }) {
    if (typeof appName !== 'string' || typeof privateKey !== 'string') {
      throw new errors.InfusionsoftLegacyError('appName and privateKey must be a string')
    }

    this.appName = appName
    this.privateKey = privateKey

    this._initXmlApi()
  }

  _initXmlApi () {
    this.xml = new XmlApi({
      xmlrpc: {
        clientOptions: {
          url: 'https://' + this.appName + '.infusionsoft.com/api/xmlrpc',
          ca: fs.readFileSync(path.join(__dirname, '../', '../', 'is-cacert.pem'))
        },
        methodCallMutators: [
          ([ method, params ]) => ([ method, [ this.privateKey, ...params ] ])
        ]
      }
    })

    const originalRequest = this.xml.request
    this.xml.request = (...args) => {
      return originalRequest.apply(this.xml, args).catch(err => {
        if (err.faultString && err.faultString.includes('[InvalidKey]')) {
          return new errors.InvalidKeyError(err)
        }

        if (err.message.includes('XML-RPC fault')) {
          return new errors.XmlRpcApiError(err)
        }

        return err
      })
    }
  }
}

module.exports = InfusionsoftLegacy
