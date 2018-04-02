const Types = require('../types')

/**
 * The Order Service is used to create and charge an order.
 */
class OrderService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  /**
   * Create an Order
   *
   * Returns the result of order placement along with IDs of the order and invoice
   * that were created and the status of a credit card charge (if applicable).
   *
   * @typedef placeOrderParams
   * @property {number} contactId ID of the order's Contact (0 is not a valid contact id)
   * @property {number} cardId ID of the credit card to charge. To skip charging a card, set to "0"
   * @property {number} [planId] ID of the payment plan to use when creating the order. If not specified, the default plan is used
   * @property {number[]} productIds A list of integers representing the products to be added to the order. This cannot be empty if a subscription is not specified.
   * @property {number[]} subscriptionIds A list of integers representing the subscription(s) to be added to the order. This cannot be empty if a productID is not specified.
   * @property {boolean} processSpecials Whether or not the order should consider discounts that would normally be applied if this order was being placed through the shopping cart.
   * @property {string[]} promoCodes Promo codes to add to the cart; only used if processing of specials is turned on
   * @property {number} leadAffiliateId ID of the lead affiliate
   * @property {number} saleAffiliateId ID of the sale affiliate
   */
  async placeOrder (
    /** @type placeOrderParams */
    {
      contactId, cardId, planId, productIds, subscriptionIds,
      processSpecials, promoCodes, leadAffiliateId, saleAffiliateId
    }
  ) {
    return this._api.request('OrderService.placeOrder', [
      Types.Integer(contactId, true),
      Types.Integer(cardId, true),
      Types.Integer(planId),
      Types.Array(Types.Integer, productIds, true),
      Types.Array(Types.Integer, subscriptionIds, true),
      Types.Boolean(processSpecials, true),
      Types.Array(Types.String, promoCodes, true),
      Types.Integer(leadAffiliateId, true),
      Types.Integer(saleAffiliateId, true)
    ])
  }
}

module.exports = OrderService
