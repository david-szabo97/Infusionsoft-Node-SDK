const Types = require('../types')

class DiscountService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  async addOrderTotalDiscount ({ name, applyDiscountToCommission, percentOrAmt, payType }) {
    return this._api.request('DiscountService.addOrderTotalDiscount', [Types.String(name, true), Types.Integer(applyDiscountToCommission, true), Types.Integer(percentOrAmt, true), Types.String(payType, true)])
  }

  async getOrderTotalDiscount (id) {
    return this._api.request('DiscountService.getOrderTotalDiscount', [Types.Integer(id, true)])
  }

  async addFreeTrial ({ name, description, freeTrialDays, hidePrice, subscriptionPlanId }) {
    return this._api.request('DiscountService.addFreeTrial', [Types.String(name, true), Types.String(description, true), Types.Integer(freeTrialDays, true), Types.Integer(hidePrice, true), Types.Integer(subscriptionPlanId, true)])
  }

  async getFreeTrial (trialId) {
    return this._api.request('DiscountService.getFreeTrial', [Types.Integer(trialId, true)])
  }

  async addShippingTotalDiscount ({ name, description, applyDiscountToCommission, percentOrAmt, amt }) {
    return this._api.request('DiscountService.addShippingTotalDiscount', [Types.String(name, true), Types.String(description, true), Types.Integer(applyDiscountToCommission, true), Types.Integer(percentOrAmt, true), Types.Double(amt, true)])
  }

  async getShippingTotalDiscount (shippingDiscountId) {
    return this._api.request('DiscountService.getShippingTotalDiscount', [Types.Integer(shippingDiscountId, true)])
  }

  async addProductTotalDiscount ({ name, description, applyDiscountToCommission, productId, percentOrAmt, amt }) {
    return this._api.request('DiscountService.addProductTotalDiscount', [Types.String(name, true), Types.String(description, true), Types.Integer(applyDiscountToCommission, true), Types.Integer(productId, true), Types.Integer(percentOrAmt, true), Types.Double(amt, true)])
  }

  async getProductTotalDiscount (productDiscountId) {
    return this._api.request('DiscountService.getProductTotalDiscount', [Types.String(productDiscountId, true)])
  }

  async addCategoryDiscount ({ name, description, applyDiscountToCommission, amt }) {
    return this._api.request('DiscountService.addCategoryDiscount', [Types.String(name, true), Types.String(description, true), Types.Integer(applyDiscountToCommission, true), Types.Integer(amt, true)])
  }

  async getCategoryDiscount (id) {
    return this._api.request('DiscountService.getCategoryDiscount', [Types.Integer(id, true)])
  }

  async getCategoryAssignmentsForCategoryDiscount (id) {
    return this._api.request('DiscountService.getCategoryAssignmentsForCategoryDiscount', [Types.Integer(id, true)])
  }

  async addCategoryAssignmentToCategoryDiscount (id, productId) {
    return this._api.request('DiscountService.addCategoryAssignmentToCategoryDiscount', [Types.Integer(id, true), Types.Integer(productId, true)])
  }
}

module.exports = DiscountService
