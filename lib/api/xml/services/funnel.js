const Types = require('../types')

/**
 * The Funnel Service is used to add contacts to marketing sequences.
 */
class FunnelService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  /**
   * Achieve a Goal
   *
   * Returns the result of a goal being achieved.
   *
   * @typedef achieveGoalParams
   * @property {string} integration The integration name of the goal
   * @property {string} callName The call name of the goal
   * @property {number} contactId ID of the applicable contact
   */
  async achieveGoal (
    /** @type achieveGoalParams */
    { integration, callName, contactId }
  ) {
    return this._api.request('FunnelService.achieveGoal', [
      Types.String(integration, true),
      Types.String(callName, true),
      Types.Integer(contactId, true)
    ])
  }
}

module.exports = FunnelService
