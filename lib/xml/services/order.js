const Types = require('../types')

class OrderService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  async placeOrder ({ contactId, cardId, planId, productIds, subscriptionIds, processSpecials, promoCodes, leadAffiliateId, saleAffiliateId }) {
    return this._api.request('OrderService.placeOrder', [Types.Integer(contactId, true), Types.Integer(cardId, true), Types.Integer(planId, true), Types.Array(Types.Integer, productIds, true), Types.Array(Types.Integer, subscriptionIds, true), Types.Boolean(processSpecials, true), Types.Array(Types.String, promoCodes, true), Types.Integer(leadAffiliateId, true), Types.Integer(saleAffiliateId, true)])
  }
}

module.exports = OrderService
