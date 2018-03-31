const Types = require('../types')

class FunnelService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  async achieveGoal ({ integration, callName, contactId }) {
    return this._api.request('FunnelService.achieveGoal', [
      Types.String(integration, true),
      Types.String(callName, true),
      Types.Integer(contactId, true)
    ])
  }
}

module.exports = FunnelService
