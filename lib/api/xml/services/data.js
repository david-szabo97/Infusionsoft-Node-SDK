const Types = require('../types')

/**
 * The Data service is used to manipulate most data in Infusionsoft.
 * It permits you to work on any available tables and has a wide range of uses.
 * To manage affiliate information (i.e. Name, Phone, etc.) you will need to use the Data service.
 */
class DataService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  /**
   * Create a Record
   *
   * Creates a new record in the specified Infusionsoft data table.
   *
   * Returns an integer representing the ID of the new record.
   *
   * @param {string} table The Infusionsoft database table name
   * @param {object} values An associative array of data you would like stored in this new row in the table
   */
  async add (table, values) {
    return this._api.request('DataService.add', [
      Types.String(table, true),
      Types.Struct(null, values, true)
    ])
  }

  /**
   * Retrieve a Record
   *
   * Loads the requested fields from a specified record.
   *
   * The specified fields for the given record.
   *
   * @typedef loadParams
   * @property {string} table Infusionsoft database table name from which you want to load a record
   * @property {number} recordId The unique Id number for the record you would like to load
   * @property {string[]} fields The fields you would like returned from this row in the database
   */
  async load (
    /** @type loadParams */
    { table, recordId, fields }
  ) {
    return this._api.request('DataService.load', [
      Types.String(table, true),
      Types.Integer(recordId, true),
      Types.Array(Types.String, fields, true)
    ])
  }

  /**
   * Find a Record by Matching a Specific Field
   *
   * Retrieves all records in a table that match the given term on a specific field.
   *
   * Returns one object per result found.
   * The result will contain all fields specified in the request along with their corresponding value.
   *
   * @typedef findByFieldParams
   * @property {string} table The Infusionsoft database table name
   * @property {number} limit The number of records you would like returned. The maximum possible is 1000.
   * @property {number} page The page of results you would like returned. The first page is page 0 (loop through pages to get more than 1000 records).
   * @property {string} fieldName The name of the field to search on
   * @property {string} fieldValue The value stored in the field you would like to search on
   * @property {string[]} returnFields The fields you would like returned from the table you are searching on
   */
  async findByField (
    /** @type findByFieldParams */
    { table, limit, page, fieldName, fieldValue, returnFields }
  ) {
    return this._api.request('DataService.findByField', [
      Types.String(table, true),
      Types.Integer(limit, true),
      Types.Integer(page, true),
      Types.String(fieldName, true),
      Types.String(fieldValue, true),
      Types.Array(Types.String, returnFields, true)
    ])
  }

  /**
   * Query a Data Table
   *
   * Performs a query across the given table based on the query data.
   *
   * Returns an array of objects, one per result found by the query.
   * The object will contain all fields specified by the selected fields along with their corresponding values.
   *
   * @typedef queryParams
   * @property {string} table The table to query on
   * @property {number} limit The number of records to retrieve, a maximum of 1000
   * @property {number} page Page of data to request (in case there are more than 1000 records).Paging starts with 0.
   * @property {object} queryData A struct containing query data. The key is the field to search on, and the value is the data to look for. % is the wild card operator and all searches are case insensitive. Below is a list of operations you can do.
   *                              1. Greater Than ex: LastUpdated => '~>~ 2017-01-01 00:00:00'
   *                              2. Greater Than or Equal to ex: LastUpdated => '~>=~ 2017-01-01 00:00:00'
   *                              3. Less Than ex: LastUpdated => '~<~ 2017-01-01 00:00:00'
   *                              4. Less Than or Equal to ex: LastUpdated => '~<=~ 2017-01-01 00:00:00'
   *                              5. Not Equal to ex: Id => '~<>~123'
   *                              6. Is Null ex: FirstName => '~null~'
   *                              7. IN statement ex: Id => [1,2,3,4]**
   *                              *The raw xml, will need be html encoded for '>' and '<'
   *                              **IN statements only work on Id fields and are limited to 1000 ids
   * @property {string[]} selectedFields Fields the query should return
   * @property {string} orderBy The field which the results should be sorted by
   * @property {boolean} ascending Changes the order of results to ascending instead of descending Defaults to false
   */
  async query (
    /** @type queryParams */
    { table, limit, page, queryData, selectedFields, orderBy, ascending }
  ) {
    return this._api.request('DataService.query', [
      Types.String(table, true),
      Types.Integer(limit, true),
      Types.Integer(page, true),
      Types.Struct(null, queryData, true),
      Types.Array(Types.String, selectedFields, true),
      Types.String(orderBy, true),
      Types.Boolean(ascending, true)
    ])
  }

  /**
   * Update a Record
   *
   * Updates a specific record in the specified Infusionsoft data table.
   *
   * Returns an ID of the successfully updated record.
   *
   * @typedef updateParams
   * @property {string} table The Infusionsoft database table name
   * @property {number} recordId The ID of the record to update
   * @property {object} values An associative array of data to update
   */
  async update (
    /** @type updateParams */
    { table, recordId, values }
  ) {
    return this._api.request('DataService.update', [
      Types.String(table, true),
      Types.Integer(recordId, true),
      Types.Struct(null, values, true)
    ])
  }

  /**
   * Delete a Record
   *
   * Deletes the specified record in the given table from the database
   *
   * Returns a boolean true if successful; false otherwise.
   *
   * @param {string} table The table you would like to delete the record from
   * @param {number} id The ID of the record to delete
   */
  async delete (table, id) {
    return this._api.request('DataService.delete', [
      Types.String(table, true),
      Types.Integer(id, true)
    ])
  }

  /**
   * Count a Data Table's Records
   *
   * Performs a query across the given table based on the query data and returns the count of records.
   *
   * Returns an integer count of the number of records that match the query.
   *
   * @param {string} table The table to count the records on
   * @param {object} queryData A struct containing query data. The key is the field to search on, and the value is the data to look for. % is the wild card operator and all searches are case insensitive. If you would like to query for an empty(null) field, use ~null~ in your query parameter, such as ‘FirstName' => ‘~null~'
   */
  async count (table, queryData) {
    return this._api.request('DataService.count', [
      Types.String(table, true),
      Types.Struct(null, queryData, true)
    ])
  }

  /**
   * Create a Custom Field
   *
   * Creates a new custom field
   *
   * Returns the ID of the new field
   *
   * @typedef addCustomFieldParams
   * @property {string} customFieldType Where the custom field will be used inside Infusionsoft. Options include Contact, Company, Affiliate, ContactAction (used for Task/Appt/Note), Order, Subscription, or Opportunity
   * @property {string} displayName The label/name of this new custom field
   * @property {string} dataType What type of data this field will support. Text, Select (Used for Dropdown), TextArea, etc.
   * @property {number} headerId The ID of the custom field header you want this field to appear under. Customer headers are located on custom tabs.
   */
  async addCustomField (
    /** @type addCustomFieldParams */
    { customFieldType, displayName, dataType, headerId }
  ) {
    return this._api.request('DataService.addCustomField', [
      Types.String(customFieldType, true),
      Types.String(displayName, true),
      Types.String(dataType, true),
      Types.Integer(headerId, true)
    ])
  }

  /**
   * Update a Custom Field
   *
   * Updates the value of a custom field. Every field can have it's display name and group id changed,
   * but only certain data types will allow you to actually change values (dropdown, listbox, radio, etc).
   *
   * Returns a boolean true if successfully updated.
   *
   * @param {number} customFieldId ID number of the custom field you would like to update
   * @param {object} values The values for the given custom field
   */
  async updateCustomField (customFieldId, values) {
    return this._api.request('DataService.updateCustomField', [
      Types.Integer(customFieldId, true),
      Types.Struct(null, values, true)
    ])
  }

  /**
   * Retrieve an Appointment's iCalendar File
   *
   * Retrieves the iCalendar file for the specified appointment
   *
   * @param {number} appointmentId The ID of the appointment to retrieve an iCalendar file for
   */
  async getAppointmentICal (appointmentId) {
    return this._api.request('DataService.getAppointmentICal', [
      Types.Integer(appointmentId, true)
    ])
  }

  /**
  * Retrieve Application Setting
  *
  * Retrieves the value of a given setting in the current application.
  * In order to find the module and option names,
  * view the HTML field name within the Infusionsoft settings.
  * You will see something such as name="Contact_WebModule0optiontypes".
  * The portion before the underscore is the module name.
  * "Contact" in this example. The portion after the 0 is the setting name, "optiontypes" in this example.
  *
   * @param {string} module The application module this setting belongs to
   * @param {string} setting The database name of the setting to retrieve
   */
  async getAppSetting (module, setting) {
    return this._api.request('DataService.getAppSetting', [
      Types.String(module, true),
      Types.String(setting, true)
    ])
  }

  /**
   * Validate a User's Credentials
   *
   * Validates an Infusionsoft username and password (as an MD5 hash).
   *
   * @param {string} username The username of the user to validate
   * @param {string} passwordHash An MD5 hash of the Infusionsoft user's password
   */
  async authenticateUser (username, passwordHash) {
    return this._api.request('DataService.authenticateUser', [
      Types.String(username, true),
      Types.String(passwordHash, true)
    ])
  }
}

module.exports = DataService
