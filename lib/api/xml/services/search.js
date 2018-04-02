const Types = require('../types')

/**
 * The Search Service allows you to retrieve the results of saved searches and reports that have been saved within Infusionsoft.
 * Saved searches/reports are tied to the User that created them.
 * This service also allows you to utilize the quick search function found in the upper right hand corner of your
 * Infusionsoft application. To retrieve the ID for a saved search, you will need to utilize the DataService.query method to
 * query the SavedFilter table based with the ID of the user that created the saved search.
 *
 * Also note that UserId field on the SavedFilter table can contain multiple userId's separated by a comma,
 * so if you are querying for a report created by userId 6,
 * I recommend appending the wildcard to the end of the userId.
 * Something like $query = array( 'UserId' => '6%' );
 */
class SearchService {
  constructor (xmlApi) {
    this._api = xmlApi
  }

  /**
   * Retrieve a Report's Available Fields
   *
   * Returns an array of the fields available on a saved search/report.
   *
   * @param {number} savedSearchId ID of the saved search to retrieve columns for
   * @param {number} userId ID of the user that created the saved search
   */
  async getAllReportColumns (savedSearchId, userId) {
    return this._api.request('SearchService.getAllReportColumns', [
      Types.Integer(savedSearchId, true),
      Types.Integer(userId, true)
    ])
  }

  /**
   * Retrieve a Complete Report from a Saved Search
   *
   * Returns a struct with all available fields in a saved search
   *
   * @typedef getSavedSearchResultsAllFieldsParams
   * @property {number} savedSearchId ID of the saved search to retrieve
   * @property {number} userId ID of the user that created the saved search
   * @property {number} pageNumber A zero-indexed page of results to return
   */
  async getSavedSearchResultsAllFields (/** @type params */{ savedSearchId, userId, pageNumber }
  ) {
    return this._api.request('SearchService.getSavedSearchResultsAllFields', [
      Types.Integer(savedSearchId, true),
      Types.Integer(userId, true),
      Types.Integer(pageNumber, true)
    ])
  }

  /**
   * Retrieve a Partial Report from a Saved Search
   *
   * Returns a struct with the specified fields from a saved search
   *
   * @typedef getSavedSearchResultsParams
   * @property {number} savedSearchId ID of the saved search to retrieve
   * @property {number} userId ID of the user that created the saved search
   * @property {number} pageNumber A zero-indexed page of results to return
   * @property {string[]} returnFields An array of field names to return with the report
   */
  async getSavedSearchResults (
    /** @type getSavedSearchResultsParams */
    { savedSearchId, userId, pageNumber, returnFields }
  ) {
    return this._api.request('SearchService.getSavedSearchResults', [
      Types.Integer(savedSearchId, true),
      Types.Integer(userId, true),
      Types.Integer(pageNumber, true),
      Types.Array(Types.String, returnFields, true)
    ])
  }

  /**
   * Retrieve Available Quick Searches
   *
   * Returns a struct of the requesting user's available quick searches.
   *
   * @param {number} userId ID of the requesting user
   */
  async getAvailableQuickSearches (userId) {
    return this._api.request('SearchService.getAvailableQuickSearches', [
      Types.Integer(userId, true)
    ])
  }

  /**
   * Retrieve the Default Quick Search
   *
   * Retrieves the requested user's default quick search type
   *
   * @param {number} userId ID of the user to retrieve the default search for
   */
  async getDefaultQuickSearch (userId) {
    return this._api.request('SearchService.getDefaultQuickSearch', [
      Types.Integer(userId, true)
    ])
  }

  /**
   * Retrieve a Quick Search Report
   *
   * Returns a quick search, equivalent to using the search box in the Infusionsoft application.
   *
   * @typedef quickSearchParams
   * @property {string} searchType The type of search you are running. FindPerson, FindOrder, FindOpportunity, FindCompany, FindTask, FindSubscription, or FindAffiliate
   * @property {number} userId ID of the user running the search. Results are returned based upon the specified user's permissions.
   * @property {string} searchData Search query
   * @property {number} page A zero-indexed page of results to return
   * @property {number} limit Number of results to return; maximum of 1000
   */
  async quickSearch (
    /** @type quickSearchParams */
    { searchType, userId, searchData, page, limit }
  ) {
    return this._api.request('SearchService.quickSearch', [
      Types.String(searchType, true),
      Types.Integer(userId, true),
      Types.String(searchData, true),
      Types.Integer(page, true),
      Types.Integer(limit, true)
    ])
  }
}

module.exports = SearchService
