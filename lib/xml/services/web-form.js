const Types = require('../types')

class WebFormService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  async getHTML (formId) {
    return this._api.request('WebFormService.getHTML', [
      Types.Integer(formId, true)
    ])
  }

  async getMap () {
    return this._api.request('WebFormService.getMap')
  }
}

module.exports = WebFormService
