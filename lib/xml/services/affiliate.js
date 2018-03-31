const Types = require('../types')

class AffiliateService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  async getClawbacks ({ affiliateId, filterStartDate, filterEndDate }) {
    return this._api.request('APIAffiliateService.affClawbacks', [Types.Integer(affiliateId, true), Types.DateTime(filterStartDate, true), Types.DateTime(filterEndDate, true)])
  }

  async getCommissions ({ affiliateId, filterStartDate, filterEndDate }) {
    return this._api.request('APIAffiliateService.affCommissions', [Types.Integer(affiliateId, true), Types.DateTime(filterStartDate, true), Types.DateTime(filterEndDate, true)])
  }

  async getPayouts ({ affiliateId, filterStartDate, filterEndDate }) {
    return this._api.request('APIAffiliateService.affPayouts', [Types.Integer(affiliateId, true), Types.DateTime(filterStartDate, true), Types.DateTime(filterEndDate, true)])
  }

  async getRedirectLinksForAffiliate (affiliateId) {
    return this._api.request('AffiliateService.getRedirectLinksForAffiliate', [Types.Integer(affiliateId, true)])
  }

  async getSummary ({ affiliateId, filterStartDate, filterEndDate }) {
    return this._api.request('APIAffiliateService.affSummary', [Types.Integer(affiliateId, true), Types.DateTime(filterStartDate, true), Types.DateTime(filterEndDate, true)])
  }

  async getRunningTotals (affiliateIds) {
    return this._api.request('APIAffiliateService.affRunningTotals', [Types.Array(Types.Integer, affiliateIds, true)])
  }
}

module.exports = AffiliateService
