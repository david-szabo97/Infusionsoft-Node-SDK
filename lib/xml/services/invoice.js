const Types = require('../types')

class InvoiceService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  async createBlankOrder ({ contactId, name, orderDate, leadAffiliateId, saleAffiliateId }) {
    return this._api.request('InvoiceService.createBlankOrder', [
      Types.Integer(contactId, true),
      Types.String(name, true),
      Types.DateTime(orderDate, true),
      Types.Integer(leadAffiliateId, true),
      Types.Integer(saleAffiliateId, true)
    ])
  }

  async chargeInvoice ({ invoiceId, notes, creditCardId, merchantAccountId, bypassComissions }) {
    return this._api.request('InvoiceService.chargeInvoice', [
      Types.Integer(invoiceId, true),
      Types.String(notes, true),
      Types.Integer(creditCardId, true),
      Types.Integer(merchantAccountId, true),
      Types.Boolean(bypassComissions, true)
    ])
  }

  async getPayments (invoiceId) {
    return this._api.request('InvoiceService.getPayments', [
      Types.Integer(invoiceId, true)
    ])
  }

  async calculateAmountOwed (invoiceId) {
    return this._api.request('InvoiceService.calculateAmountOwed', [
      Types.Integer(invoiceId, true)
    ])
  }

  async addOrderItem ({ invoiceId, productId, type, price, quantity, description, notes }) {
    return this._api.request('InvoiceService.addOrderItem', [
      Types.Integer(invoiceId, true),
      Types.Integer(productId, true),
      Types.Integer(type, true),
      Types.Double(price, true),
      Types.Integer(quantity, true),
      Types.String(description, true),
      Types.String(notes, true)
    ])
  }

  async addManualPayment ({ invoiceId, amount, date, paymentType, description, bypassCommissions }) {
    return this._api.request('InvoiceService.addManualPayment', [
      Types.Integer(invoiceId, true),
      Types.Double(amount, true),
      Types.DateTime(date, true),
      Types.String(paymentType, true),
      Types.String(description, true),
      Types.Boolean(bypassCommissions, true)
    ])
  }

  async addOrderCommissionOverride ({ invoiceId, affiliateId, productId, percent, amount, payoutType, description, date }) {
    return this._api.request('InvoiceService.addOrderCommissionOverride', [
      Types.Integer(invoiceId, true),
      Types.Integer(affiliateId, true),
      Types.Integer(productId, true),
      Types.Integer(percent, true),
      Types.Double(amount, true),
      Types.Integer(payoutType, true),
      Types.String(description, true),
      Types.DateTime(date, true)
    ])
  }

  async recalculateTax (invoiceId) {
    return this._api.request('InvoiceService.recalculateTax', [
      Types.Integer(invoiceId, true)
    ])
  }

  async deleteInvoice (invoiceId) {
    return this._api.request('InvoiceService.deleteInvoice', [
      Types.String(invoiceId, true)
    ])
  }

  async addRecurringOrder ({ contactId, allowDuplicate, subscriptionId, quantity, price, taxable, merchantAccountId, creditCardId, affiliateId, trialPeriod }) {
    return this._api.request('InvoiceService.addRecurringOrder', [
      Types.Integer(contactId, true),
      Types.Boolean(allowDuplicate, true),
      Types.Integer(subscriptionId, true),
      Types.Integer(quantity, true),
      Types.Double(price, true),
      Types.Boolean(taxable, true),
      Types.Integer(merchantAccountId, true),
      Types.Integer(creditCardId, true),
      Types.Integer(affiliateId, true),
      Types.Integer(trialPeriod, true)
    ])
  }

  async createInvoiceForRecurring (subscriptionId) {
    return this._api.request('InvoiceService.createInvoiceForRecurring', [
      Types.Integer(subscriptionId, true)
    ])
  }

  async updateJobRecurringNextBillDate (subscriptionId, nextBillDate) {
    return this._api.request('InvoiceService.updateJobRecurringNextBillDate', [
      Types.Integer(subscriptionId, true),
      Types.Date(nextBillDate, true)
    ])
  }

  async deleteSubscription (subscriptionId) {
    return this._api.request('InvoiceService.deleteSubscription', [
      Types.String(subscriptionId, true)
    ])
  }

  async validateCreditCard ({ cardType, contactId, cardNumber, expirationMonth, expirationYear, securityCode }) {
    return this._api.request('InvoiceService.validateCreditCard', [
      Types.String(cardType, true),
      Types.Integer(contactId, true),
      Types.String(cardNumber, true),
      Types.String(expirationMonth, true),
      Types.String(expirationYear, true),
      Types.String(securityCode, true)
    ])
  }

  async validateCreditCardById (cardId) {
    return this._api.request('InvoiceService.validateCreditCard', [
      Types.Integer(cardId, true)
    ])
  }

  async locateExistingCard (contactId, lastFour) {
    return this._api.request('InvoiceService.locateExistingCard', [
      Types.Integer(contactId, true),
      Types.String(lastFour, true)
    ])
  }

  async getAllShippingOptions () {
    return this._api.request('InvoiceService.getAllShippingOptions', [])
  }

  async getAllPaymentOptions () {
    return this._api.request('InvoiceService.getAllPaymentOptions', [])
  }

  async addPaymentPlan ({ invoiceId, autoCharge, creditCardId, merchantAccountId, daysUntilRetry, maxRetry, initialPaymentAmount, initialPaymentDate, planStartDate, numberOfPayments, daysBetweenPayments }) {
    return this._api.request('InvoiceService.addPaymentPlan', [
      Types.Integer(invoiceId, true),
      Types.Boolean(autoCharge, true),
      Types.Integer(creditCardId, true),
      Types.Integer(merchantAccountId, true),
      Types.Integer(daysUntilRetry, true),
      Types.Integer(maxRetry, true),
      Types.Double(initialPaymentAmount, true),
      Types.DateTime(initialPaymentDate, true),
      Types.DateTime(planStartDate, true),
      Types.Integer(numberOfPayments, true),
      Types.Integer(daysBetweenPayments, true)
    ])
  }
}

module.exports = InvoiceService
