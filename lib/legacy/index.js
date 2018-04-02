const XmlApi = require('../api/xml')
const path = require('path')
const fs = require('fs')

class InfusionsoftLegacy {
  constructor ({ appName, privateKey }) {
    if (typeof appName !== 'string' || typeof privateKey !== 'string') {
      throw TypeError('appName and privateKey must be a string')
    }

    this._appName = appName
    this._privateKey = privateKey

    this._initXmlApi()
  }

  _initXmlApi () {
    this.xml = new XmlApi({
      xmlrpc: {
        clientOptions: {
          url: 'https://' + this._appName + '.infusionsoft.com/api/xmlrpc',
          ca: fs.readFileSync(path.join(__dirname, 'is-cacert.pem'))
        },
        methodCallMutators: [
          ([ method, params ]) => ([ method, [ this._privateKey, ...params ] ])
        ]
      }
    })
  }
}

module.exports = InfusionsoftLegacy
