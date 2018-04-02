const Types = require('../types')

/**
 * The Shipping Service is used to retrieve available shipping options.
 */
class ShippingService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  /**
   * Retrieve Available Shipping Options
   *
   * Retrieves all shipping options available in the specified Infusionsoft account
   */
  async getAllShippingOptions () {
    return this._api.request('ShippingService.getAllShippingOptions')
  }

  /**
   * Retrieve Weight-Based Shipping Options
   *
   * Returns the options and values of the requested weight based shipping option.
   *
   * @param {number} optionId ID of the shipping option
   */
  async getWeightBasedShippingOption (optionId) {
    return this._api.request('ShippingService.getWeightBasedShippingOption', [
      Types.Integer(optionId, true)
    ])
  }

  /**
   * Retrieve Flat Rate Shipping Options
   *
   * @param {number} optionId ID of the requested shipping option
   */
  async getFlatRateShippingOption (optionId) {
    return this._api.request('ShippingService.getFlatRateShippingOption', [
      Types.String(optionId, true)
    ])
  }

  /**
   * Retrieve Product Shipping Options
   *
   * Returns an array of shipping options and values for the requested product shipping option.
   *
   * @param {number} optionId ID of the requested shipping option
   */
  async getProductBasedShippingOption (optionId) {
    return this._api.request('ShippingService.getProductBasedShippingOption', [
      Types.Integer(optionId, true)
    ])
  }

  /**
   * Retrieve Order Shipping Options
   *
   * Returns an array of options and values for order shipping option.
   *
   * @param {number} optionId ID of the requested shipping option
   */
  async getOrderTotalShippingOption (optionId) {
    return this._api.request('ShippingService.getOrderTotalShippingOption', [
      Types.Integer(optionId, true)
    ])
  }

  /**
   * Retrieve Order Quantity Shipping Options
   *
   * Returns the options and values of the order quantity shipping option provided
   *
   * @param {number} optionId ID of the requested shipping option
   */
  async getOrderQuantityShippingOption (optionId) {
    return this._api.request('ShippingService.getOrderQuantityShippingOption', [
      Types.Integer(optionId, true)
    ])
  }

  /**
   * Retrieve Order Shipping Ranges
   *
   * Returns the available values for order shipping ranges based on the requested shipping option.
   *
   * @param {number} optionId ID of the requested shipping option
   */
  async getOrderTotalShippingRanges (optionId) {
    return this._api.request('ShippingService.getOrderTotalShippingRanges', [
      Types.Integer(optionId, true)
    ])
  }

  /**
   * Retrieve UPS Shipping Option
   *
   * Returns the options and values of the requested UPS shipping option.
   *
   * @param {number} optionId ID of the requested shipping option
   */
  async getUpsShippingOption (optionId) {
    return this._api.request('ShippingService.getUpsShippingOption', [
      Types.Integer(optionId, true)
    ])
  }
}

module.exports = ShippingService
