const Types = require('../types')

/**
 * The Invoice Service allows you to manage Infusionsoft eCommerce transactions.
 */
class InvoiceService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  /**
   * Create an Invoice
   *
   * Creates a blank invoice with no line items that has not yet been paid.
   *
   * @typedef createBlankOrderParams
   * @property {number} contactId The ID of the contact to be invoiced (0 is not a valid contact id)
   * @property {string} name The name of the invoice, also used as the link within the Infusionsoft order interface
   * @property {Date} orderDate Date and time of the invoice
   * @property {number} leadAffiliateId ID of the lead affiliate
   * @property {number} saleAffiliateId ID of the sale affiliate
   *
   * @returns {Promise<number>} an ID representing the newly created invoice.
   */
  async createBlankOrder (
    /** @type createBlankOrderParams */
    { contactId, name, orderDate, leadAffiliateId, saleAffiliateId }
  ) {
    return this._api.request('InvoiceService.createBlankOrder', [
      Types.Integer(contactId, true),
      Types.String(name, true),
      Types.DateTime(orderDate, true),
      Types.Integer(leadAffiliateId, true),
      Types.Integer(saleAffiliateId, true)
    ])
  }

  /**
   * Pay an Invoice
   *
   * Charges the specified card the amount currently due on the invoice.
   *
   * Returns a struct containing payment details.
   *  - Successful: a boolean value as to whether the charge was successful
   *  - Code: The approval code: APPROVED, DECLINED, ERROR, SKIPPED (there was no balance to charge)
   *  - RefNum: If charge was successful, this is the reference number passed back by the merchant account
   *  - Message: Error message for the transaction, if applicable
   *
   * @typedef chargeInvoiceParams
   * @property {number} invoiceId
   * @property {string} notes
   * @property {number} creditCardId
   * @property {number} merchantAccountId
   * @property {boolean} bypassComissions
   *
   * @typedef chargeInvoiceResult
   * @property {boolean} Successful
   * @property {string} Code
   * @property {number} RefNum
   * @property {string} Message
   *
   * @returns {chargeInvoiceResult}
   */
  async chargeInvoice (
    /** @type chargeInvoiceParams */
    { invoiceId, notes, creditCardId, merchantAccountId, bypassComissions }
  ) {
    return this._api.request('InvoiceService.chargeInvoice', [
      Types.Integer(invoiceId, true),
      Types.String(notes, true),
      Types.Integer(creditCardId, true),
      Types.Integer(merchantAccountId, true),
      Types.Boolean(bypassComissions, true)
    ])
  }

  /**
   * Retrieve Invoice Payments
   *
   * @param {number} invoiceId ID of the invoice to retrieve payments for
   */
  async getPayments (invoiceId) {
    return this._api.request('InvoiceService.getPayments', [
      Types.Integer(invoiceId, true)
    ])
  }

  /**
   * Retrieve Invoice Amount Due
   *
   * Retrieves the outstanding amount of an invoice
   *
   * @param {number} invoiceId ID of the invoice to retrieve the amount due on
   */
  async calculateAmountOwed (invoiceId) {
    return this._api.request('InvoiceService.calculateAmountOwed', [
      Types.Integer(invoiceId, true)
    ])
  }

  /**
   * Add an Item to an Invoice
   *
   * Adds a line item to an invoice.
   *
   * @typedef addOrderItemParams
   * @property {number} invoiceId The ID of the invoice this line item is to be added to
   * @property {number} productId The ID of the product to add to the Invoice. For a non-product, set the value to 0.
   * @property {InvoiceType} type The invoice item type
   * @property {number} price The price of the invoice item
   * @property {number} quantity The quantity of invoice items to be added
   * @property {string} description A description of the item
   * @property {string} notes Notes about the item
   *
   * @returns {Promise<boolean>} true upon success
   */
  async addOrderItem (
    /** @type addOrderItemParams */
    { invoiceId, productId, type, price, quantity, description, notes }
  ) {
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

  /**
   * Add a Payment to an Invoice
   *
   * Adds a payment to an invoice without actually processing a charge through a merchant.
   * This is useful if you accept cash/check, or handle payments outside of Infusionsoft.
   *
   * @typedef addManualPaymentParams
   * @property {number} invoiceId ID of the invoice to add the payment to
   * @property {number} amount Amount of payment to add to the invoice
   * @property {Date} date Date the payment is made
   * @property {string} paymentType What payment type. Example: Credit Card or PayPal
   * @property {string} description Description of the payment
   * @property {boolean} bypassCommissions Whether this payment should count towards affiliate commissions.
   *
   * @returns {Promise<boolean>} true upon successs
   */
  async addManualPayment (
    /** @type addManualPaymentParams */
    { invoiceId, amount, date, paymentType, description, bypassCommissions }
  ) {
    return this._api.request('InvoiceService.addManualPayment', [
      Types.Integer(invoiceId, true),
      Types.Double(amount, true),
      Types.DateTime(date, true),
      Types.String(paymentType, true),
      Types.String(description, true),
      Types.Boolean(bypassCommissions, true)
    ])
  }

  /**
   * Add a Commission to an Invoice
   *
   * Adds a commission to an existing invoice
   *
   * @typedef addOrderCommissionOverrideParams
   * @property {number} invoiceId ID of the invoice to add the commission to
   * @property {number} affiliateId ID of the affiliate to send the commission to
   * @property {number} productId ID of the product the commission is for
   * @property {number} percent The percentage paid for the product being sold
   * @property {number} amount The amount of the commission
   * @property {integer} payoutType An ID defining how the commission should be earned. A value of "4" will pay the commission up front, and a value of "5" will pay the commission after the customer payment is received.
   * @property {string} description Description of the commission
   * @property {Date} date Date the commission was generated
   *
   * @returns {Promise<boolean>} true upon success
   */
  async addOrderCommissionOverride (
    /** @type addOrderCommissionOverrideParams */
    { invoiceId, affiliateId, productId, percent, amount, payoutType, description, date }
  ) {
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

  /**
   * Calculate Invoice Tax
   *
   * Calculates tax based on the line items of the invoice, and adds the amount to the invoice.
   *   *
   * @param {number} invoiceId ID of the invoice to calculate tax on
   *
   * @returns {Promise<boolean>} true upon success
   */
  async recalculateTax (invoiceId) {
    return this._api.request('InvoiceService.recalculateTax', [
      Types.Integer(invoiceId, true)
    ])
  }

  /**
   * Delete an Invoice
   *
   * Deletes an invoice. Also deletes the order within the Job table tied to the invoice.
   *
   * @param {number} invoiceId ID of the invoice to delete
   *
   * @returns {Promise<boolean>} true upon successful deletion.
   * @throws {Error} when invoice doesn't exist
   * @throws {Error} when invoiceId is invalid
   */
  async deleteInvoice (invoiceId) {
    return this._api.request('InvoiceService.deleteInvoice', [
      Types.Integer(invoiceId, true)
    ])
  }

  /**
   * Create a Contact Subscription
   *
   * Creates a subscription for a contact. Subscriptions are billed automatically by Infusionsoft within six hours of creation.
   * If you want to bill immediately you will need to then callthe
   * InvoiceService.createInvoiceForRecurring and InvoiceService.chargeInvoice methods.
   *
   * Returns the ID of the newly created subscription.
   *
   * @typedef addRecurringOrderParams
   * @property {number} contactId ID of the contact the subscription will be attached to
   * @property {boolean} allowDuplicate Allows a duplicate subscription or not
   * @property {number} subscriptionId ID of the subscription to attach to the Contact
   * @property {number} quantity Quantity of the subscription to add to the contact
   * @property {number} price Price to charge for the subscription
   * @property {boolean} taxable Whether or not to charge tax on the subscription
   * @property {number} merchantAccountId ID of the merchant account to use to charge the subscription
   * @property {number} creditCardId ID of the card to charge the subscription to
   * @property {number} affiliateId ID of the sale affiliate. Set to "0" if there is no affiliate on the order.
   * @property {number} trialPeriod Number of days the subscription will trial
   */
  async addRecurringOrder (
    /** @type addRecurringOrderParams */
    {
      contactId, allowDuplicate, subscriptionId, quantity, price,
      taxable, merchantAccountId, creditCardId, affiliateId, trialPeriod
    }
  ) {
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

  /**
   * Create a Subscription Invoice
   *
   * Creates an invoice for all charges due on a subscription.
   * If the subscription has multiple billing cycles due, it will create a single invoice with charges for all charges due.
   *
   * Returns the ID of the newly created invoice. Returns 0 if no invoices were generated.
   *
   * @param {number} subscriptionId ID of the subscription to create an invoice for
   */
  async createInvoiceForRecurring (subscriptionId) {
    return this._api.request('InvoiceService.createInvoiceForRecurring', [
      Types.Integer(subscriptionId, true)
    ])
  }

  /**
   * Update Subscription Billing Date
   *
   * Changes the next date a subscription is paid
   *
   * @param {number} subscriptionId ID of the subscription to update
   * @param {Date} nextBillDate New billing date
   */
  async updateJobRecurringNextBillDate (subscriptionId, nextBillDate) {
    return this._api.request('InvoiceService.updateJobRecurringNextBillDate', [
      Types.Integer(subscriptionId, true),
      Types.Date(nextBillDate, true)
    ])
  }

  /**
   * Delete a Subscription
   *
   * Deletes the specified subscription, as well as all invoices tied to the subscription.
   *
   * Returns true upon success.
   *
   * @param {number} subscriptionId ID of the subscription to delete
   */
  async deleteSubscription (subscriptionId) {
    return this._api.request('InvoiceService.deleteSubscription', [
      Types.String(subscriptionId, true)
    ])
  }

  /**
   * Validate a New Credit Card
   *
   * @typedef validateCreditCardParams
   * @property {string} cardType Credit card type (Visa, American Express, etc)
   * @property {number} contactId ID of the contact to own the credit card
   * @property {string} cardNumber The card account number
   * @property {string} expirationMonth Two digit card expiration month
   * @property {string} expirationYear Four digit card expiration year
   * @property {string} securityCode Card security code
   */
  async validateCreditCard (
    /** @type validateCreditCardParams */
    { cardType, contactId, cardNumber, expirationMonth, expirationYear, securityCode }
  ) {
    return this._api.request('InvoiceService.validateCreditCard', [
      Types.String(cardType, true),
      Types.Integer(contactId, true),
      Types.String(cardNumber, true),
      Types.String(expirationMonth, true),
      Types.String(expirationYear, true),
      Types.String(securityCode, true)
    ])
  }

  /**
   * Validate an Existing Credit Card
   *
   * @param {number} cardId ID of the credit card to validate
   */
  async validateCreditCardById (cardId) {
    return this._api.request('InvoiceService.validateCreditCard', [
      Types.Integer(cardId, true)
    ])
  }

  /**
   * Retrieve Credit Card
   *
   * Retrieves a credit card for the specified contact
   *
   * Returns the credit card ID on success; 0 upon failure.
   *
   * @param {number} contactId Contact ID to retrieve the credit card for
   * @param {string} lastFour Last 4 digits of the card to retrieve
   */
  async locateExistingCard (contactId, lastFour) {
    return this._api.request('InvoiceService.locateExistingCard', [
      Types.Integer(contactId, true),
      Types.String(lastFour, true)
    ])
  }

  /**
   * Retrieve Available Shipping Options
   *
   * Retrieves all shipping options available in the specified Infusionsoft account
   *
   */
  async getAllShippingOptions () {
    return this._api.request('InvoiceService.getAllShippingOptions')
  }

  /**
   * Retrieve Available Payment Options
   *
   * Retrieves all payment types available within the requested Infusionsoft account
   *
   */
  async getAllPaymentOptions () {
    return this._api.request('InvoiceService.getAllPaymentOptions')
  }

  /**
   * Create a Custom Recurring Payment
   *
   * Creates a custom recurring payment for an invoice.
   *
   * @typedef addPaymentPlanParams
   * @property {number} invoiceId ID of the invoice to apply the payment plan to
   * @property {boolean} autoCharge Whether or not the payment plan should automatically charge or not
   * @property {number} creditCardId ID of the card to charge
   * @property {number} merchantAccountId ID of the merchant account used to process the payment
   * @property {number} daysUntilRetry Number of days to wait before re-attempting a failed payment
   * @property {number} maxRetry Maximum number of attempts to retry a failed payment
   * @property {number} initialPaymentAmount Amount of the first charge on the payment plan
   * @property {Date} initialPaymentDate Date the first charge should occur
   * @property {Date} planStartDate Date the second, and subsequent, charge should occur. Note this does not include the first payment.
   * @property {number} numberOfPayments The number of payments in the plan, not including the first payment
   * @property {number} daysBetweenPayments Number of days between payments, starting with the second payment
   */
  async addPaymentPlan (
    /** @type addPaymentPlanParams */
    {
      invoiceId, autoCharge, creditCardId, merchantAccountId,
      daysUntilRetry, maxRetry, initialPaymentAmount,
      initialPaymentDate, planStartDate, numberOfPayments, daysBetweenPayments
    }
  ) {
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

/**
 * @enum {number}
 */
const InvoiceType = {
  Shipping: 1,
  Tax: 2,
  /** Service & Misc */
  ServiceAndMisc: 3,
  Product: 4,
  /**  Upsell Product */
  UpsellProduct: 5,
  /** Finance Charge */
  FinanceCharge: 6,
  Special: 7,
  Program: 8,
  /** Subscription Plan */
  SubscriptionPlan: 9,
  /** Special: Free Trial Days */
  SpecialFreeTrialDays: 10,
  /** Special: Order Total */
  SpecialOrderTotal: 11,
  /** Special: Product: 12, */
  SpecialProduct: 12,
  /** Special: Category */
  SpecialCategory: 13,
  /** Special: Shipping */
  SpecialShipping: 14
}

InvoiceService.InvoiceType = InvoiceType

module.exports = InvoiceService
