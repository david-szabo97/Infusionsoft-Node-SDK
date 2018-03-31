const Types = require('../types')

class AffiliateProgramService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  async getAffiliatesByProgram (programId) {
    return this._api.request('AffiliateProgramService.getAffiliatesByProgram', [Types.Integer(programId, true)])
  }

  async getProgramsForAffiliate (affiliateId) {
    return this._api.request('AffiliateProgramService.getProgramsForAffiliate', [Types.Integer(affiliateId, true)])
  }

  async getResourcesForAffiliateProgram (programId) {
    return this._api.request('AffiliateProgramService.getResourcesForAffiliateProgram', [Types.Integer(programId, true)])
  }
}

module.exports = AffiliateProgramService
