const CustomType = require('xmlrpc').CustomType

class Double extends CustomType {
  constructor (raw, required) {
    if (required && typeof raw === 'undefined') {
      throw TypeError('Parameter is required')
    }

    const double = Number.parseFloat(raw)
    if (Number.isNaN(double)) {
      throw TypeError('Parameter is not Double')
    }

    super(raw)
  }

  serialize (xml) {
    xml.ele('double').txt(this.raw)
  }
}

module.exports = (raw, required) => new Double(raw, required)
