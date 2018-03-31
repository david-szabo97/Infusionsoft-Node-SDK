const Types = require('../types')

class ContactService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  async add (data) {
    return this._api.request('ContactService.add', [Types.Struct(null, data, true)])
  }

  async addWithDupCheck (data, dupCheckType) {
    return this._api.request('ContactService.addWithDupCheck', [Types.Struct(null, data, true), Types.String(dupCheckType, true)])
  }

  async load (contactId, selectedFields) {
    return this._api.request('ContactService.load', [Types.Integer(contactId, true), Types.Array(Types.String, selectedFields, true)])
  }

  async update (contactId, data) {
    return this._api.request('ContactService.update', [Types.Integer(contactId, true), Types.Struct(null, data, true)])
  }

  async merge (contactId, duplicateContactId) {
    return this._api.request('ContactService.merge', [Types.Integer(contactId, true), Types.Integer(duplicateContactId, true)])
  }

  async findByEmail (email, selectedFields) {
    return this._api.request('ContactService.findByEmail', [Types.String(email, true), Types.Array(Types.String, selectedFields, true)])
  }

  async addToGroup (contactId, tagId) {
    return this._api.request('ContactService.addToGroup', [Types.Integer(contactId, true), Types.Integer(tagId, true)])
  }

  async removeFromGroup (contactId, tagId) {
    return this._api.request('ContactService.removeFromGroup', [Types.Integer(contactId, true), Types.Integer(tagId, true)])
  }

  async addToCampaign (contactId, campaignId) {
    return this._api.request('ContactService.addToCampaign', [Types.Integer(contactId, true), Types.Integer(campaignId, true)])
  }

  async getNextCampaignStep (contactId, followUpSequenceId) {
    return this._api.request('ContactService.getNextCampaignStep', [Types.Integer(contactId, true), Types.Integer(followUpSequenceId, true)])
  }

  async rescheduleCampaignStep (contactIds, sequenceStepId) {
    return this._api.request('ContactService.rescheduleCampaignStep', [Types.Array(Types.Integer, contactIds, true), Types.Integer(sequenceStepId, true)])
  }

  async pauseCampaign (contactId, sequenceId) {
    return this._api.request('ContactService.pauseCampaign', [Types.Integer(contactId, true), Types.Integer(sequenceId, true)])
  }

  async resumeCampaignForContact (contactId, seqId) {
    return this._api.request('ContactService.resumeCampaignForContact', [Types.Integer(contactId, true), Types.Integer(seqId, true)])
  }

  async removeFromCampaign (contactId, followUpSequenceId) {
    return this._api.request('ContactService.removeFromCampaign', [Types.Integer(contactId, true), Types.Integer(followUpSequenceId, true)])
  }

  async linkContacts ({ contactId1, contactId2, linkTypeId }) {
    return this._api.request('ContactService.linkContacts', [Types.Integer(contactId1, true), Types.Integer(contactId2, true), Types.Integer(linkTypeId, true)])
  }

  async unlinkContacts ({ contactId1, contactId2, linkTypeId }) {
    return this._api.request('ContactService.unlinkContacts', [Types.Integer(contactId1, true), Types.Integer(contactId2, true), Types.Integer(linkTypeId, true)])
  }

  async listLinkedContacts (contactId) {
    return this._api.request('ContactService.listLinkedContacts', [Types.Integer(contactId, true)])
  }

  async runActionSequence (contactId, actionSetId) {
    return this._api.request('ContactService.runActionSequence', [Types.Integer(contactId, true), Types.Integer(actionSetId, true)])
  }
}

module.exports = ContactService
