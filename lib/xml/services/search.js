const Types = require('../types')

class SearchService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  async getAllReportColumns (savedSearchId, userId) {
    return this._api.request('SearchService.getAllReportColumns', [
      Types.Integer(savedSearchId, true),
      Types.Integer(userId, true)
    ])
  }

  async getSavedSearchResultsAllFields ({ savedSearchId, userId, pageNumber }) {
    return this._api.request('SearchService.getSavedSearchResultsAllFields', [
      Types.Integer(savedSearchId, true),
      Types.Integer(userId, true),
      Types.Integer(pageNumber, true)
    ])
  }

  async getSavedSearchResults ({ savedSearchId, userId, pageNumber, returnFields }) {
    return this._api.request('SearchService.getSavedSearchResults', [
      Types.Integer(savedSearchId, true),
      Types.Integer(userId, true),
      Types.Integer(pageNumber, true),
      Types.Array(Types.String, returnFields, true)
    ])
  }

  async getAvailableQuickSearches (userId) {
    return this._api.request('SearchService.getAvailableQuickSearches', [
      Types.Integer(userId, true)
    ])
  }

  async getDefaultQuickSearch (userId) {
    return this._api.request('SearchService.getDefaultQuickSearch', [
      Types.Integer(userId, true)
    ])
  }

  async quickSearch ({ searchType, userId, searchData, page, limit }) {
    return this._api.request('SearchService.quickSearch', [
      Types.Integer(searchType, true),
      Types.Integer(userId, true),
      Types.String(searchData, true),
      Types.Integer(page, true),
      Types.Integer(limit, true)
    ])
  }
}

module.exports = SearchService
