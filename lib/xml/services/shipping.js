const Types = require('../types')

class ShippingService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  async getAllShippingOptions () {
    return this._api.request('ShippingService.getAllShippingOptions', [])
  }

  async getWeightBasedShippingOption (optionId) {
    return this._api.request('ShippingService.getWeightBasedShippingOption', [Types.Integer(optionId, true)])
  }

  async getFlatRateShippingOption (optionId) {
    return this._api.request('ShippingService.getFlatRateShippingOption', [Types.String(optionId, true)])
  }

  async getProductBasedShippingOption (optionId) {
    return this._api.request('ShippingService.getProductBasedShippingOption', [Types.Integer(optionId, true)])
  }

  async getOrderTotalShippingOption (optionId) {
    return this._api.request('ShippingService.getOrderTotalShippingOption', [Types.Integer(optionId, true)])
  }

  async getOrderQuantityShippingOption (optionId) {
    return this._api.request('ShippingService.getOrderQuantityShippingOption', [Types.Integer(optionId, true)])
  }

  async getOrderTotalShippingRanges (optionId) {
    return this._api.request('ShippingService.getOrderTotalShippingRanges', [Types.Integer(optionId, true)])
  }

  async getUpsShippingOption (optionId) {
    return this._api.request('ShippingService.getUpsShippingOption', [Types.Integer(optionId, true)])
  }
}

module.exports = ShippingService
