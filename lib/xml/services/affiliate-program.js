const Types = require('../types')

/**
 * The Affiliate Program Service allows access to some of features in the Referral Partner Center.
 */
class AffiliateProgramService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  /**
   * Retrieve All Programs
   *
   * Retrieves a list of all of the Affiliate Programs that are in the application.
   */
  async getAffiliatePrograms () {
    return this._api.request('AffiliateProgramService.getAffiliatePrograms')
  }

  /**
   * Retrieve a Program's Affiliates
   *
   * Retrieves a list of all of the affiliates with their contact data for the specified program.
   * This includes all of the custom fields defined for the contact and affiliate records that are retrieved.
   *
   * @param {number} programId The Referral Partner Commission Program ID
   */
  async getAffiliatesByProgram (programId) {
    return this._api.request('AffiliateProgramService.getAffiliatesByProgram', [
      Types.Integer(programId, true)
    ])
  }

  /**
   * Retrieve an Affiliate's Programs
   *
   * Retrieves a list of all of the Affiliate Programs for the Affiliate specified.
   *
   * @param {number} affiliateId The affiliate you want to get the programs for
   */
  async getProgramsForAffiliate (affiliateId) {
    return this._api.request('AffiliateProgramService.getProgramsForAffiliate', [
      Types.Integer(affiliateId, true)
    ])
  }

  /**
   * Retrieve Program Resources
   *
   * Retrieves a list of all of the resources that are associated to the Affiliate Program specified.
   *
   * @param {number} programId The commission program you want resources from
   */
  async getResourcesForAffiliateProgram (programId) {
    return this._api.request('AffiliateProgramService.getResourcesForAffiliateProgram', [
      Types.Integer(programId, true)
    ])
  }
}

module.exports = AffiliateProgramService
