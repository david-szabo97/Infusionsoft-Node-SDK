const Types = require('../types')

class ProductService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  async getInventory (productId) {
    return this._api.request('ProductService.getInventory', [Types.Integer(productId, true)])
  }

  async incrementInventory (productId) {
    return this._api.request('ProductService.incrementInventory', [Types.Integer(productId, true)])
  }

  async decrementInventory (productId) {
    return this._api.request('ProductService.decrementInventory', [Types.String(productId, true)])
  }

  async increaseInventory (productId, quantity) {
    return this._api.request('ProductService.increaseInventory', [Types.Integer(productId, true), Types.Integer(quantity, true)])
  }

  async decreaseInventory (productId, quantity) {
    return this._api.request('ProductService.decreaseInventory', [Types.Integer(productId, true), Types.Integer(quantity, true)])
  }

  async deactivateCreditCard (cardId) {
    return this._api.request('ProductService.deactivateCreditCard', [Types.Integer(cardId, true)])
  }
}

module.exports = ProductService
