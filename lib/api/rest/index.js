class RestApi {
  constructor ({ client }) {
    this._client = client
  }

  async request (method, url, data, config) {
    return this._client.request({
      url,
      method,
      data,
      ...config
    })
  }
}

module.exports = RestApi
