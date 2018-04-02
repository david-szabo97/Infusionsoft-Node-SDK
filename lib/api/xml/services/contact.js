const Types = require('../types')

/**
 * The Contact service is used to manage contacts.
 * You can add, update and find contacts in addition to managing follow up sequences, tags and action sets.
 */
class ContactService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  /**
   * Contact
   *
   * The Contact service is used to manage contacts.
   * You can add, update and find contacts in addition to managing follow up sequences, tags and action sets.
   *
   * @param {object} data An associative array of the data for this new contact record. The array key is the field name to store the value within
   */
  async add (data) {
    return this._api.request('ContactService.add', [
      Types.Struct(null, data, true)
    ])
  }

  /**
   * Create a Contact and Check for Duplicates
   *
   * Adds or updates a contact record based on matching data
   *
   * @param {object} data An associative array of the data for this new contact record. The array key is the field name to store the value within.
   * @param {string} dupCheckType Determines how to consider a duplicate record. Options are: 'Email', 'EmailAndName', or 'EmailAndNameAndCompany'
   */
  async addWithDupCheck (data, dupCheckType) {
    return this._api.request('ContactService.addWithDupCheck', [
      Types.Struct(null, data, true),
      Types.String(dupCheckType, true)
    ])
  }

  /**
   * Retrieve a Contact
   *
   * @param {number} contactId The Id number of the contact you would like to load data from
   * @param {string[]} selectedFields An array of strings where each string is the database field name of the field you would like sent back
   */
  async load (contactId, selectedFields) {
    return this._api.request('ContactService.load', [
      Types.Integer(contactId, true),
      Types.Array(Types.String, selectedFields, true)
    ])
  }

  /**
   * Update a Contact
   *
   * Updates a contact's information
   *
   * @param {number} contactId The ID of the contact you wish to update
   * @param {object} data An associate array of the data for this contact. The array keys should be the field names you wish to update.
   */
  async update (contactId, data) {
    return this._api.request('ContactService.update', [
      Types.Integer(contactId, true),
      Types.Struct(null, data, true)
    ])
  }

  /**
   * Merge Two Contacts
   *
   * Merges two contacts into a single record.
   *
   * @param {number} contactId The contact ID number you want to merge into
   * @param {number} duplicateContactId The contact ID of the duplicate contact you would like to merge
   */
  async merge (contactId, duplicateContactId) {
    return this._api.request('ContactService.merge', [
      Types.Integer(contactId, true),
      Types.Integer(duplicateContactId, true)
    ])
  }

  /**
   * Search for a Contact by an Email Address
   *
   * Retrieves all contacts with the given email address.
   * This searches the Email, Email 2, and Email 3 fields
   *
   * @param {string} email The email address to search with
   * @param {string[]} selectedFields The contact fields you would like returned
   */
  async findByEmail (email, selectedFields) {
    return this._api.request('ContactService.findByEmail', [
      Types.String(email, true),
      Types.Array(Types.String, selectedFields, true)
    ])
  }

  /**
   * Add a Tag to a Contact
   *
   * Adds a tag to a contact record (tags were originally called "groups").
   *
   * @param {number} contactId The ID of the contact you would like to add to a group
   * @param {number} tagId The ID of the tag to add to the contact
   */
  async addToGroup (contactId, tagId) {
    return this._api.request('ContactService.addToGroup', [
      Types.Integer(contactId, true),
      Types.Integer(tagId, true)
    ])
  }

  /**
   * Remove a Tag from a Contact
   *
   * Removes a tag from a contact (tags were originally called groups)
   *
   * @param {number} contactId The Id number of the contact you would like to remove the tag from
   * @param {number} tagId The tag ID. This is found on the Setup > Tags menu
   */
  async removeFromGroup (contactId, tagId) {
    return this._api.request('ContactService.removeFromGroup', [
      Types.Integer(contactId, true),
      Types.Integer(tagId, true)
    ])
  }

  /**
   * Add a Contact to a Follow-up Sequence
   *
   * Adds a contact to a follow-up sequence (campaigns were the original name of follow-up sequences).
   *
   * @param {number} contactId The ID of the contact you would like to start the follow-up sequence for.
   * @param {number} campaignId The ID of the follow-up sequence to start the contact on.
   */
  async addToCampaign (contactId, campaignId) {
    return this._api.request('ContactService.addToCampaign', [
      Types.Integer(contactId, true), Types.Integer(campaignId, true)
    ])
  }

  /**
   * Retrieve a Contact's Next Follow-up Sequence Step
   *
   * Returns the Id number of the next follow-up sequence step for the given contact
   *
   * @param {number} contactId The Id number of the contact record you would like to get the next sequence step for
   * @param {number} followUpSequenceId The follow-up sequence Id number you would like to get the next step for the given contact
   */
  async getNextCampaignStep (contactId, followUpSequenceId) {
    return this._api.request('ContactService.getNextCampaignStep', [
      Types.Integer(contactId, true),
      Types.Integer(followUpSequenceId, true)
    ])
  }

  /**
   * Immediately Execute a Follow-up Sequence Step for Multiple Contacts
   *
   * Immediately performs the given follow-up sequence step for the given contacts.
   *
   * @param {number[]} contactIds An array of contact Id numbers you would like to reschedule the step for
   * @param {number} sequenceStepId The ID of the particular sequence step you would like to reschedule
   */
  async rescheduleCampaignStep (contactIds, sequenceStepId) {
    return this._api.request('ContactService.rescheduleCampaignStep', [
      Types.Array(Types.Integer, contactIds, true),
      Types.Integer(sequenceStepId, true)
    ])
  }

  /**
   * Pause a Follow-up Sequence for a Contact
   *
   * Pauses a follow-up sequence for the given contact record
   *
   * @param {number} contactId The Id number of the contact record you are pausing the sequence on
   * @param {number} sequenceId The follow-up sequence Id number
   */
  async pauseCampaign (contactId, sequenceId) {
    return this._api.request('ContactService.pauseCampaign', [
      Types.Integer(contactId, true),
      Types.Integer(sequenceId, true)
    ])
  }

  /**
   * Resume a Follow-up Sequence for a Contact
   *
   * Resumes a follow-up sequence that has been stopped/paused for a given contact.
   *
   * @param {number} contactId The ID of the contact you would like to resume the campaign for
   * @param {number} seqId The ID of the follow-up sequence to resume
   */
  async resumeCampaignForContact (contactId, seqId) {
    return this._api.request('ContactService.resumeCampaignForContact', [
      Types.Integer(contactId, true),
      Types.Integer(seqId, true)
    ])
  }

  /**
   * Remove a Contact from a Follow-up Sequence
   *
   * Removes a follow-up sequence from a contact record.
   *
   * @param {number} contactId The Id number of the contact you want to remove the sequence from
   * @param {number} followUpSequenceId The ID number of the campaign sequence you would like to remove the contact from
   */
  async removeFromCampaign (contactId, followUpSequenceId) {
    return this._api.request('ContactService.removeFromCampaign', [
      Types.Integer(contactId, true),
      Types.Integer(followUpSequenceId, true)
    ])
  }

  /**
   * Link Contacts
   *
   * This will link 2 contacts together using the specified link type.
   *
   * @typedef linkContactsParams
   * @property {number} contactId1 The first contact id to link
   * @property {number} contactId2 The second contact id to link
   * @property {number} linkTypeId The link type
   */
  async linkContacts (
    /** @type linkContactsParams */
    { contactId1, contactId2, linkTypeId }
  ) {
    return this._api.request('ContactService.linkContacts', [
      Types.Integer(contactId1, true),
      Types.Integer(contactId2, true),
      Types.Integer(linkTypeId, true)
    ])
  }

  /**
   * Unlink Contacts
   *
   * Unlink contacts with a specific link type
   *
   * @typedef unlinkContactsParams
   * @property {number} contactId1 The first contact id you want to unlink
   * @property {number} contactId2 The second contact id you want to unlink
   * @property {number} linkTypeId The Link type id
   */
  async unlinkContacts (
    /** @type unlinkContactsParams */
    { contactId1, contactId2, linkTypeId }
  ) {
    return this._api.request('ContactService.unlinkContacts', [
      Types.Integer(contactId1, true),
      Types.Integer(contactId2, true),
      Types.Integer(linkTypeId, true)
    ])
  }

  /**
   * List Linked Contacts
   *
   * This will list all linked contacts to the given contact id.
   *
   * @param {number} contactId The contact id you want to list all linked contacts for
   */
  async listLinkedContacts (contactId) {
    return this._api.request('ContactService.listLinkedContacts', [
      Types.Integer(contactId, true)
    ])
  }

  /**
   * Run an Action Set for a Contact
   *
   * Runs an action sequence on a given contact record
   *
   * @param {number} contactId The ID of the contact record you want to run the action set on
   * @param {number} actionSetId The Id number of the action set you would like to run. This is found on the Setup > Action Sets menu
   */
  async runActionSequence (contactId, actionSetId) {
    return this._api.request('ContactService.runActionSequence', [
      Types.Integer(contactId, true),
      Types.Integer(actionSetId, true)
    ])
  }
}

module.exports = ContactService
