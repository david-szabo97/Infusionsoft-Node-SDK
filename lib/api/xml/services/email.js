const Types = require('../types')

/**
 * The Email service allows you to email your contacts as well as attaching emails sent elsewhere
 * (this lets you send email from multiple services and still see all communications inside of Infusionsoft).
 */
class EmailService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  /**
   * Opt-in an Email Address
   *
   * Opts-in an email address. This method only works the first time an email address opts-in.
   *
   * Returns a boolean true upon successful opt-in.
   *
   * @param {string} email The email address to opt-in
   * @param {string} optInReason Why/how this email was opted-in
   */
  async optIn (email, optInReason) {
    return this._api.request('APIEmailService.optIn', [
      Types.String(email, true),
      Types.String(optInReason, true)
    ])
  }

  /**
   * Opt-out an Email Address
   *
   * Opts-out an email address. Once an address is opt-out, the API cannot opt it back in.
   *
   * @param {string} email The email address to opt-out
   * @param {string} optOutReason Reason the address is being opt-out
   */
  async optOut (email, optOutReason) {
    return this._api.request('APIEmailService.optOut', [
      Types.String(email, true),
      Types.String(optOutReason, true)
    ])
  }

  /**
   * Retrieve an Email's Opt-in Status
   *
   * Returns an integer value of
   *  - 0 for opt out/non-marketable/soft bounce/hard bounce
   *  - 1 for single opt-in
   *  - 2 for double opt-in
   *
   * @param {string} email The email address you wish to retrieve the status of
   */
  async getOptStatus (email) {
    return this._api.request('APIEmailService.getOptStatus', [
      Types.String(email, true)
    ])
  }

  /**
   * Create an Email Template
   *
   * Creates a new email template that can be used when sending emails.
   *
   * Returns an ID of the created template.
   *
   * @typedef addEmailTemplateParams
   * @property {string} templateName The name of the template. This will be displayed within the Infusionsoft template library.
   * @property {string} categories The category to assign this template to
   * @property {string} fromAddress The email address the email should be sent as
   * @property {string} toAddress The email address this template sends to. In most circumstances, you'll want to set this to "~Contact.Email~" so that the template delivers to the specified contact upon sending.
   * @property {string} ccAddress Any email addresses to CC when an email from this template is sent
   * @property {string} bccAddress Any email addresses to BCC when an email from this template is sent
   * @property {string} subject The subject line of the email template
   * @property {string} textBody The content you would like sent in the body of the plain text version of this email template
   * @property {string} htmlBody The content you would like sent in the body of the HTML version of this email template
   * @property {string} contentType One of three options - HTML, Text, or Multipart
   * @property {string} mergeContext One of four options - Contact, Opportunity, Invoice, or CreditCard
   */
  async addEmailTemplate (
    /** @type addEmailTemplateParams */
    {
      templateName, categories, fromAddress, toAddress, ccAddress,
      bccAddress, subject, textBody, htmlBody, contentType, mergeContext
    }
  ) {
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

  /**
   * Retrieve an Email Template
   *
   * @param {number} templateId The ID number for the template you wish to retrieve details about
   */
  async getEmailTemplate (templateId) {
    return this._api.request('APIEmailService.getEmailTemplate', [
      Types.Integer(templateId, true)
    ])
  }

  /**
   * Update an Email Template
   *
   * Updates an email template that can be used when sending emails.
   *
   * @typedef updateEmailTemplateParams
   * @property {number} templateId The ID number for the template you wish to update
   * @property {string} templateName The name of the template. This will be displayed within the Infusionsoft template library.
   * @property {string} categories The category to assign this template to
   * @property {string} fromAddress The email address the email should be sent as
   * @property {string} toAddress The email address this template sends to. In most circumstances, you'll want to set this to "~Contact.Email~" so that the template delivers to the specified contact upon sending.
   * @property {string} ccAddress Any email addresses to CC when an email from this template is sent
   * @property {string} bccAddress Any email addresses to BCC when an email from this template is sent
   * @property {string} subject The subject line of the email template
   * @property {string} textBody The content you would like sent in the body of the plain text version of this email template
   * @property {string} htmlBody The content you would like sent in the body of the HTML version of this email template
   * @property {string} contentType One of three options - HTML, Text, or Multipart
   * @property {string} mergeContext One of four options - Contact, Opportunity, Invoice, or CreditCard
   */
  async updateEmailTemplate (
    /** @type updateEmailTemplateParams */
    {
      templateId, templateName, categories, fromAddress, toAddress, ccAddress,
      bccAddress, subject, textBody, htmlBody, contentType, mergeContext
    }
  ) {
    return this._api.request('APIEmailService.updateEmailTemplate', [
      Types.Integer(templateId, true),
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

  /**
   * Send an Email from a Template
   *
   * @param {number[]} contactList An integer array of Contact Id numbers you would like to send this email to
   * @param {number} templateId The ID of the template to send
   */
  async sendEmailTemplate (contactList, templateId) {
    return this._api.request('APIEmailService.sendEmail', [
      Types.Array(Types.Integer, contactList, true),
      Types.Integer(templateId, true)
    ])
  }

  /**
   * Send an Email
   *
   * Send an email to a list of contacts, as well as records the email in each contacts' email history.
   *
   * Returns boolean true if the email has been successfully sent.
   *
   * @typedef sendEmailParams
   * @property {number[]} contactList An array of Contact IDs to send this email to
   * @property {string} fromAddress The address the email will be sent from
   * @property {string} toAddress The address this email will be sent to. This typically should be the merge field "~Contact.Email~"
   * @property {string} ccAddresses A comma-separated string of email addresses to CC
   * @property {string} bccAddresses A comma-separated string of email addresses to BCC
   * @property {string} contentType HTML, Text, or Multipart (case sensitive)
   * @property {string} subject The subject line of the email
   * @property {string} htmlBody The HTML body of the email
   * @property {string} textBody The plain text body of the email
   */
  async sendEmail (
    /** @type sendEmailParams */
    {
      contactList, fromAddress, toAddress, ccAddresses,
      bccAddresses, contentType, subject, htmlBody, textBody
    }
  ) {
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

  /**
   * Manually Log a Sent Email
   *
   * This will create an item in the email history for a contact.
   * This does not actually send the email, it only places an item into the email history.
   * Using the API to instruct Infusionsoft to send an email will handle this automatically.
   *
   * Returns a boolean true upon success.
   *
   * @typedef attachEmailParams
   * @property {number} contactId The ID of the contact to add this email history to
   * @property {string} fromName The name of the email sender
   * @property {string} fromAddress The address the email was sent from
   * @property {string} toAddress The address the email was sent to
   * @property {string} ccAddresses The addresses the email was CC'd to
   * @property {string} bccAddresses The addresses the email was BCC'd to
   * @property {string} contentType The content type of the email (Text, HTML, or Multipart)
   * @property {string} subject The subject line of the email
   * @property {string} htmlBody The HTML body of the email
   * @property {string} textBody The plain text body of the email
   * @property {string} header The email header information
   * @property {string} receivedDate The date this email was received. This value determines where the email displays in comparison to other sent messages.
   * @property {string} sentDate The date the email was sent
   * @property {number} emailSentType A boolean integer value of 1 is used for marking the email as sent inside the contact history and 0 is used for marking the email as received
   */
  async attachEmail (
    /** @type attachEmailParams */
    {
      contactId, fromName, fromAddress, toAddress, ccAddresses,
      bccAddresses, contentType, subject, htmlBody, textBody,
      header, receivedDate, sentDate, emailSentType
    }
  ) {
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
