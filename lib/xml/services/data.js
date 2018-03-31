const Types = require('../types')

class DataService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  async add (table, values) {
    return this._client.methodCall('DataService.add', [
      Types.String(table, true),
      Types.Struct(null, values, true)
    ])
  }

  async load ({ table, recordId, fields }) {
    return this._client.methodCall('DataService.load', [
      Types.String(table, true),
      Types.Integer(recordId, true),
      Types.Array(Types.String, fields, true)
    ])
  }

  async findByField ({ table, limit, page, fieldName, fieldValue, returnFields }) {
    return this._client.methodCall('DataService.findByField', [
      Types.String(table, true),
      Types.Integer(limit, true),
      Types.Integer(page, true),
      Types.String(fieldName, true),
      Types.String(fieldValue, true),
      Types.Array(Types.String, returnFields, true)
    ])
  }

  async query ({ table, limit, page, queryData, selectedFields, orderBy, ascending }) {
    return this._client.methodCall('DataService.query', [
      Types.String(table, true),
      Types.Integer(limit, true),
      Types.Integer(page, true),
      Types.Struct(null, queryData, true),
      Types.Array(Types.String, selectedFields, true),
      Types.String(orderBy, true),
      Types.Boolean(ascending, true)
    ])
  }

  async update ({ table, recordId, values }) {
    return this._client.methodCall('DataService.update', [
      Types.String(table, true),
      Types.Integer(recordId, true),
      Types.Struct(null, values, true)
    ])
  }

  async delete (table, id) {
    return this._client.methodCall('DataService.delete', [
      Types.String(table, true),
      Types.Integer(id, true)
    ])
  }

  async count (table, queryData) {
    return this._client.methodCall('DataService.count', [
      Types.String(table, true),
      Types.Struct(null, queryData, true)
    ])
  }

  async addCustomField ({ customFieldType, displayName, dataType, headerId }) {
    return this._client.methodCall('DataService.addCustomField', [
      Types.String(customFieldType, true),
      Types.String(displayName, true),
      Types.String(dataType, true),
      Types.Integer(headerId, true)
    ])
  }

  async updateCustomField (customFieldId, values) {
    return this._client.methodCall('DataService.updateCustomField', [
      Types.Integer(customFieldId, true),
      Types.Struct(null, values, true)
    ])
  }

  async getAppointmentICal (appointmentId) {
    return this._client.methodCall('DataService.getAppointmentICal', [
      Types.Integer(appointmentId, true)
    ])
  }

  async getAppSetting (module, setting) {
    return this._client.methodCall('DataService.getAppSetting', [
      Types.String(module, true),
      Types.String(setting, true)
    ])
  }

  async authenticateUser (username, passwordHash) {
    return this._client.methodCall('DataService.authenticateUser', [
      Types.String(username, true),
      Types.String(passwordHash, true)
    ])
  }
}

module.exports = DataService
