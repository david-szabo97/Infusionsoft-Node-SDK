const Types = require('../types')

class EmailService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  async optIn (email, optInReason) {
    return this._api.request('APIEmailService.optIn', [
      Types.String(email, true),
      Types.String(optInReason, true)
    ])
  }

  async optOut (email, optOutReason) {
    return this._api.request('APIEmailService.optOut', [
      Types.String(email, true),
      Types.String(optOutReason, true)
    ])
  }

  async getOptStatus (email) {
    return this._api.request('APIEmailService.getOptStatus', [
      Types.String(email, true)
    ])
  }

  async addEmailTemplate ({ templateName, categories, fromAddress, toAddress, ccAddress, bccAddress, subject, textBody, htmlBody, contentType, mergeContext }) {
    return this._api.request('APIEmailService.addEmailTemplate', [
      Types.String(templateName, true),
      Types.String(categories, true),
      Types.String(fromAddress, true),
      Types.String(toAddress, true),
      Types.String(ccAddress, true),
      Types.String(bccAddress, true),
      Types.String(subject, true),
      Types.String(textBody, true),
      Types.String(htmlBody, true),
      Types.String(contentType, true),
      Types.String(mergeContext, true)
    ])
  }

  async getEmailTemplate (templateId) {
    return this._api.request('APIEmailService.getEmailTemplate', [
      Types.String(templateId, true)
    ])
  }

  async updateEmailTemplate ({ templateId, templateName, categories, fromAddress, toAddress, ccAddress, bccAddress, subject, textBody, htmlBody, contentType, mergeContext }) {
    return this._api.request('APIEmailService.updateEmailTemplate', [
      Types.String(templateId, true),
      Types.String(templateName, true),
      Types.String(categories, true),
      Types.String(fromAddress, true),
      Types.String(toAddress, true),
      Types.String(ccAddress, true),
      Types.String(bccAddress, true),
      Types.String(subject, true),
      Types.String(textBody, true),
      Types.String(htmlBody, true),
      Types.String(contentType, true),
      Types.String(mergeContext, true)
    ])
  }

  async sendEmailTemplate (contactList, templateId) {
    return this._api.request('APIEmailService.sendEmail', [
      Types.Array(Types.Integer, contactList, true),
      Types.String(templateId, true)
    ])
  }

  async sendEmail ({ contactList, fromAddress, toAddress, ccAddresses, bccAddresses, contentType, subject, htmlBody, textBody }) {
    return this._api.request('APIEmailService.sendEmail', [
      Types.Array(Types.Integer, contactList, true),
      Types.String(fromAddress, true),
      Types.String(toAddress, true),
      Types.String(ccAddresses, true),
      Types.String(bccAddresses, true),
      Types.String(contentType, true),
      Types.String(subject, true),
      Types.String(htmlBody, true),
      Types.String(textBody, true)
    ])
  }

  async attachEmail ({ contactId, fromName, fromAddress, toAddress, ccAddresses, bccAddresses, contentType, subject, htmlBody, textBody, header, receivedDate, sentDate, emailSentType }) {
    return this._api.request('APIEmailService.attachEmail', [
      Types.Integer(contactId, true),
      Types.String(fromName, true),
      Types.String(fromAddress, true),
      Types.String(toAddress, true),
      Types.String(ccAddresses, true),
      Types.String(bccAddresses, true),
      Types.String(contentType, true),
      Types.String(subject, true),
      Types.String(htmlBody, true),
      Types.String(textBody, true),
      Types.String(header, true),
      Types.String(receivedDate, true),
      Types.String(sentDate, true),
      Types.Integer(emailSentType, true)
    ])
  }
}

module.exports = EmailService
