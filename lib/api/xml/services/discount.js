const Types = require('../types')

/**
 * The Discount service is used to manage products.
 * You can add, update and find products in addition to managing follow up sequences, tags and action sets.
 */
class DiscountService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  /**
   * Create an Order Discount
   *
   * @typedef addOrderTotalDiscountParams
   * @property {string} name Description for commission
   * @property {number} applyDiscountToCommission Boolean of whether to apply the discount to the commission
   * @property {number} percentOrAmt A value of 1 is for percentage, whereas a value of 0 is for an amount
   * @property {string} payType Value of either "gross" or "net" determines how to apply the discount
   */
  async addOrderTotalDiscount (
    /** @type addOrderTotalDiscountParams */
    { name, applyDiscountToCommission, percentOrAmt, payType }
  ) {
    return this._api.request('DiscountService.addOrderTotalDiscount', [
      Types.String(name, true),
      Types.Integer(applyDiscountToCommission, true),
      Types.Integer(percentOrAmt, true),
      Types.String(payType, true)
    ])
  }

  /**
   * Retrieve an Order's Total Discount
   *
   * @param {number} id The ID of the discount to retrieve
   */
  async getOrderTotalDiscount (id) {
    return this._api.request('DiscountService.getOrderTotalDiscount', [
      Types.Integer(id, true)
    ])
  }

  /**
   * Create a Free Trial on a Subscription
   *
   * Returns a boolean "true" if successful
   *
   * @typedef addFreeTrialParams
   * @property {string} name The name of the free trial
   * @property {string} description The description for free trial
   * @property {number} freeTrialDays The number of days free trial last
   * @property {number} hidePrice The option to show or hide price
   * @property {number} subscriptionPlanId The ID of the subscription to add the free trial to
   */
  async addFreeTrial (
    /** @type addFreeTrialParams */
    { name, description, freeTrialDays, hidePrice, subscriptionPlanId }
  ) {
    return this._api.request('DiscountService.addFreeTrial', [
      Types.String(name, true),
      Types.String(description, true),
      Types.Integer(freeTrialDays, true),
      Types.Integer(hidePrice, true),
      Types.Integer(subscriptionPlanId, true)
    ])
  }

  /**
   * Retrieve a Subscription's Free Trial
   *
   * @param {number} trialId ID of the free trial to retrieve
   */
  async getFreeTrial (trialId) {
    return this._api.request('DiscountService.getFreeTrial', [
      Types.Integer(trialId, true)
    ])
  }

  /**
   * Create a Shipping Discount
   *
   * @typedef addShippingTotalDiscountParams
   * @property {string} name Name of the discount
   * @property {string} description Description of the shipping discount
   * @property {number} applyDiscountToCommission Integer value of 1 for true and 0 for false
   * @property {number} percentOrAmt Integer value of 1 for percent and 0 for amount
   * @property {number} amt Amount of the discount
   */
  async addShippingTotalDiscount (
    /** @type addShippingTotalDiscountParams */
    { name, description, applyDiscountToCommission, percentOrAmt, amt }
  ) {
    return this._api.request('DiscountService.addShippingTotalDiscount', [
      Types.String(name, true),
      Types.String(description, true),
      Types.Integer(applyDiscountToCommission, true),
      Types.Integer(percentOrAmt, true),
      Types.Double(amt, true)
    ])
  }

  /**
   * Retrieve a Shipping Discount
   *
   * @param {number} shippingDiscountId ID of the shipping discount to retrieve
   */
  async getShippingTotalDiscount (shippingDiscountId) {
    return this._api.request('DiscountService.getShippingTotalDiscount', [
      Types.Integer(shippingDiscountId, true)
    ])
  }

  /**
   * Create a Product Discount
   *
   * @typedef addProductTotalDiscountParams
   * @property {string} name The name of the discount
   * @property {string} description A description of the discount
   * @property {number} applyDiscountToCommission Boolean whether to apply the discount to any commission on the product
   * @property {number} productId The ID of the product to assign the discount to
   * @property {number} percentOrAmt Integer defining whether to handle the discount as a percent (1) or flat amount (0)
   * @property {number} amt An integer amount of the discount
   */
  async addProductTotalDiscount (
    /** @type addProductTotalDiscountParams */
    { name, description, applyDiscountToCommission, productId, percentOrAmt, amt }
  ) {
    return this._api.request('DiscountService.addProductTotalDiscount', [
      Types.String(name, true),
      Types.String(description, true),
      Types.Integer(applyDiscountToCommission, true),
      Types.Integer(productId, true),
      Types.Integer(percentOrAmt, true),
      Types.Double(amt, true)
    ])
  }

  /**
   * Retrieve a Product Total Discount
   *
   * @param {number} productDiscountId ID of the product discount
   */
  async getProductTotalDiscount (productDiscountId) {
    return this._api.request('DiscountService.getProductTotalDiscount', [
      Types.String(productDiscountId, true)
    ])
  }

  /**
   * Create a Category Discount
   *
   * @typedef addCategoryDiscountParams
   * @property {string} name
   * @property {string} description
   * @property {number} applyDiscountToCommission
   * @property {number} amt
   */
  async addCategoryDiscount (
    /** @type addCategoryDiscountParams */
    { name, description, applyDiscountToCommission, amt }
  ) {
    return this._api.request('DiscountService.addCategoryDiscount', [
      Types.String(name, true),
      Types.String(description, true),
      Types.Integer(applyDiscountToCommission, true),
      Types.Integer(amt, true)
    ])
  }

  /**
   * Retrieve a Category Discount
   *
   * Returns the options and values of the specified category discount ID.
   *
   * @param {number} id The ID of the category discount to retrieve
   */
  async getCategoryDiscount (id) {
    return this._api.request('DiscountService.getCategoryDiscount', [
      Types.Integer(id, true)
    ])
  }

  /**
   * Retrieve a Category Discount's Category Assignments
   *
   * Retrieves the options and values of the category assignment for category discount passed.
   *
   * @param {number} id ID of the category discount
   */
  async getCategoryAssignmentsForCategoryDiscount (id) {
    return this._api.request('DiscountService.getCategoryAssignmentsForCategoryDiscount', [
      Types.Integer(id, true)
    ])
  }

  /**
   * Assign a Product to a Category Discount
   *
   * @param {number} id The ID of the category discount
   * @param {number} productId The ID of the product to assign the discount to
   */
  async addCategoryAssignmentToCategoryDiscount (id, productId) {
    return this._api.request('DiscountService.addCategoryAssignmentToCategoryDiscount', [
      Types.Integer(id, true),
      Types.Integer(productId, true)
    ])
  }
}

module.exports = DiscountService
