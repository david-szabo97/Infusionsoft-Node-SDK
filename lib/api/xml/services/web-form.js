const Types = require('../types')

/**
 * The Webform Service is used to retrieve available web forms created within Infusionsoft.
 */
class WebFormService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  /**
   * Retrieve a Form's HTML
   *
   * The Webform Service is used to retrieve available web forms created within Infusionsoft.
   *
   * @param {number} formId ID of the webform to retrieve
   */
  async getHTML (formId) {
    return this._api.request('WebFormService.getHTML', [
      Types.Integer(formId, true)
    ])
  }

  /**
   * Retrieve Webform IDs
   *
   * Returns all of the available webform name and ID pairs.
   */
  async getMap () {
    return this._api.request('WebFormService.getMap')
  }
}

module.exports = WebFormService
