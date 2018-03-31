const Types = require('../types')

class Service {
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

module.exports = Service
