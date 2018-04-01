const Types = require('../types')

/**
 * The Affiliate Service is used to pull commission data and activities for affiliates.
 * With this service, you have access to Clawbacks, Commissions, Payouts, Running Totals, and the Activity Summary.
 * The methods in the Affiliate Service mirror the reports produced inside Infusionsoft.
 * To manage affiliate information (ie Name, Phone, etc.) you will need to use the DataService.
 */
class AffiliateService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  /**
   * Retrieve Clawbacks
   *
   * Retrieves all clawed back commissions for a particular affiliate.
   * Claw backs typically occur when an order has been refunded to the customer.
   *
   * @typedef getClawbacksParams
   * @property {number} affiliateId The Id number for the affiliate record you would like the claw backs for
   * @property {Date} filterStartDate The starting date for the date range which you would like affiliate claw backs for
   * @property {Date} filterEndDate The ending date for the date range which you would like the affiliate claw backs for
   */
  async getClawbacks (
    /** @type getClawbacksParams */
    { affiliateId, filterStartDate, filterEndDate }
  ) {
    return this._api.request('APIAffiliateService.affClawbacks', [
      Types.Integer(affiliateId, true),
      Types.DateTime(filterStartDate, true),
      Types.DateTime(filterEndDate, true)
    ])
  }

  /**
   * Retrieve Commissions
   *
   * Retrieves all commissions for a specific affiliate within a date range.
   *
   * @typedef getCommissionsParams
   * @property {number} affiliateId The Id number for the affiliate record you would like the commissions for
   * @property {Date} filterStartDate The starting date for the date range which you would like affiliate commissions for
   * @property {Date} filterEndDate The ending date for the date range which you would like the affiliate commissions for
   */
  async getCommissions (
    /** @type getCommissionsParams */
    { affiliateId, filterStartDate, filterEndDate }
  ) {
    return this._api.request('APIAffiliateService.affCommissions', [
      Types.Integer(affiliateId, true),
      Types.DateTime(filterStartDate, true),
      Types.DateTime(filterEndDate, true)
    ])
  }

  /**
   * Retrieve Payments
   *
   * Retrieves all payments for a specific affiliate within a date range
   *
   * @typedef getPayoutsParams
   * @property {number} affiliateId The Id number for the affiliate record you would like the claw backs for
   * @property {Date} filterStartDate The starting date for the date range which you would like affiliate payments for
   * @property {Date} filterEndDate The ending date for the date range which you would like the affiliate payments for
   */
  async getPayouts (
    /** @type getPayoutsParams */
    { affiliateId, filterStartDate, filterEndDate }
  ) {
    return this._api.request('APIAffiliateService.affPayouts', [
      Types.Integer(affiliateId, true),
      Types.DateTime(filterStartDate, true),
      Types.DateTime(filterEndDate, true)
    ])
  }

  /**
   * Retrieve Redirect Links
   *
   * Retrieves a list of the redirect links for the specified Affiliate.
   *
   * @param {number} affiliateId The Id number for the affiliate record you would like the redirect links for
   */
  async getRedirectLinksForAffiliate (affiliateId) {
    return this._api.request('AffiliateService.getRedirectLinksForAffiliate', [
      Types.Integer(affiliateId, true)
    ])
  }

  /**
   * Retrieve a Summary of Affiliate Statistics
   *
   * Retrieves a summary of statistics for a list of affiliates.
   *
   * @typedef getSummaryParams
   * @property {number[]} affiliateId An integer array of Affiliate ID numbers you would like stats for
   * @property {Date} filterStartDate The starting date for the date range which you would like affiliate stats for
   * @property {Date} filterEndDate The ending date for the date range which you would like the affiliate stats for
   */
  async getSummary (
    /** @type getSummaryParams */
    { affiliateIds, filterStartDate, filterEndDate }
  ) {
    return this._api.request('APIAffiliateService.affSummary', [
      Types.Array(Types.Integer, affiliateIds, true),
      Types.DateTime(filterStartDate, true),
      Types.DateTime(filterEndDate, true)
    ])
  }

  /**
   * Retrieve Running Totals
   *
   * Retrieves the current balances for Amount Earned, Clawbacks, and Running Balance.
   *
   * @param {number[]} affiliateIds An integer array of the Affiliate ID numbers that you would like balances for
   */
  async getRunningTotals (affiliateIds) {
    return this._api.request('APIAffiliateService.affRunningTotals', [
      Types.Array(Types.Integer, affiliateIds, true)
    ])
  }
}

module.exports = AffiliateService
