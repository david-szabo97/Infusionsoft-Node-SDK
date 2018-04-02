const Types = require('../types')

/**
 * The Product Service is used to manage products stored in Infusionsoft.
 * You can add, update and find products in addition to managing follow up sequences, tags and action sets.
 */
class ProductService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  /**
   * Retrieve Available Product Inventory
   *
   * Returns the available inventory for the requested product as an integer.
   *
   * @param {number} productId The ID of the product to retrieve inventory levels for
   */
  async getInventory (productId) {
    return this._api.request('ProductService.getInventory', [
      Types.Integer(productId, true)
    ])
  }

  /**
   * Increment Available Product Inventory
   *
   * Increments the specified product's inventory by one unit.
   *
   * Returns a boolean true on success.
   *
   * @param {number} productId ID of the product to increment inventory on
   */
  async incrementInventory (productId) {
    return this._api.request('ProductService.incrementInventory', [
      Types.Integer(productId, true)
    ])
  }

  /**
   * Decrement Available Product Inventory
   *
   * Decrements the specified product's inventory by one unit.
   *
   * @param {number} productId ID of the product to decrement inventory on
   */
  async decrementInventory (productId) {
    return this._api.request('ProductService.decrementInventory', [
      Types.String(productId, true)
    ])
  }

  /**
   * Increase a Product's Available Inventory
   *
   * Increases the available inventory for the specified product.
   *
   * @param {number} productId ID of the product to modify inventory of
   * @param {number} quantity The amount to increase the product's inventory by
   */
  async increaseInventory (productId, quantity) {
    return this._api.request('ProductService.increaseInventory', [
      Types.Integer(productId, true),
      Types.Integer(quantity, true)
    ])
  }

  /**
   * Decrease a Product's Available Inventory
   *
   * Decreases the available inventory for the specified product.
   *
   * @param {number} productId ID of the product to modify inventory of
   * @param {number} quantity The amount to decrease the product's inventory by
   */
  async decreaseInventory (productId, quantity) {
    return this._api.request('ProductService.decreaseInventory', [
      Types.Integer(productId, true),
      Types.Integer(quantity, true)
    ])
  }

  /**
   * Deactivate a Credit Card
   *
   * Returns boolean true if the card is successfully deactivated.
   *
   * @param {number} cardId ID of the credit card to deactivate
   */
  async deactivateCreditCard (cardId) {
    return this._api.request('ProductService.deactivateCreditCard', [
      Types.Integer(cardId, true)
    ])
  }
}

module.exports = ProductService
