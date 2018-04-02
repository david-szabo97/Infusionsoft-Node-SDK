const Types = require('../types')

/**
 * The FileService methods allow you to create and modify files inside of Infusionsoft.
 */
class FunnelService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  /**
   * Upload a File
   *
   * Uploads a file to Infusionsoft. The optional contactID parameter is used to place the file in a specific contact's filebox.
   *
   * @typedef uploadFileParams
   * @property {number} contactId ID of the Contact to associate the file with
   * @property {string} fileName The name of the file to be uploaded
   * @property {string} base64EncodedData A base64 encoded string of the file data
   */
  async uploadFile (
    /** @type uploadFileParams */
    { contactId, fileName, base64EncodedData }
  ) {
    return this._api.request('FileService.uploadFile', [
      Types.Integer(contactId, true),
      Types.String(fileName, true),
      Types.String(base64EncodedData, true)
    ])
  }

  /**
   * Retrieve a File
  * Retrieves the file data for the specified file ID.
   * @param {number} fileId The ID of the file to return
   */
  async getFile (fileId) {
    return this._api.request('FileService.getFile', [
      Types.Integer(fileId, true)
    ])
  }

  /**
   * Retrieve a File Download URL
   *
   * @param {number} fileId The ID of the file url to be returned
   */
  async getDownloadUrl (fileId) {
    return this._api.request('FileService.getDownloadUrl', [
      Types.String(fileId, true)
    ])
  }

  /**
   * Replace a File
   *
   * Replaces a file's data
   *
   * @param {number} fileName The name of the file to be uploaded
   * @param {string} base64EncodedData A base64 encoded string of the file data
   */
  async replaceFile (fileName, base64EncodedData) {
    return this._api.request('FileService.replaceFile', [
      Types.String(fileName, true),
      Types.String(base64EncodedData, true)
    ])
  }

  /**
   * Rename a File
   *
   * @param {number} fileId ID of the file to be renamed
   * @param {string} fileName New file name
   */
  async renameFile (fileId, fileName) {
    return this._api.request('FileService.renameFile', [
      Types.String(fileId, true),
      Types.String(fileName, true)
    ])
  }
}

module.exports = FunnelService
