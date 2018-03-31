const Types = require('../types')

class FunnelService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  async uploadFile ({ contactId, fileName, base64EncodedData }) {
    return this._api.request('FileService.uploadFile', [
      Types.Integer(contactId, true),
      Types.String(fileName, true),
      Types.String(base64EncodedData, true)
    ])
  }

  async getFile (fileId) {
    return this._api.request('FileService.getFile', [
      Types.Integer(fileId, true)
    ])
  }

  async getDownloadUrl (fileId) {
    return this._api.request('FileService.getDownloadUrl', [
      Types.String(fileId, true)
    ])
  }

  async replaceFile (fileName, base64EncodedData) {
    return this._api.request('FileService.replaceFile', [
      Types.String(fileName, true),
      Types.String(base64EncodedData, true)
    ])
  }

  async renameFile (fileId, fileName) {
    return this._api.request('FileService.renameFile', [
      Types.String(fileId, true),
      Types.String(fileName, true)
    ])
  }
}

module.exports = FunnelService
