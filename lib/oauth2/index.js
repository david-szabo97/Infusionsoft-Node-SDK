const fs = require('fs')
const path = require('path')
const qs = require('querystring')
const axios = require('axios')
const Token = require('./token')
const XmlApi = require('../api/xml')
const RestApi = require('../api/rest')

/**
 * @property {XmlApi} xml
 * @property {RestApi} rest
 */
class Infusionsoft {
  constructor ({ clientId, clientSecret, redirectUri, token }) {
    if (typeof clientId !== 'string' ||
        typeof clientSecret !== 'string' ||
        typeof redirectUri !== 'string') {
      throw TypeError('clientId, clientSecret and redirectUri must be a string')
    }

    this.clientId = clientId
    this.clientSecret = clientSecret
    this.redirectUri = redirectUri
    this.token = token

    this._checkTokenExpiryInterceptor = this._checkTokenExpiryInterceptor.bind(this)
  }

  set token (value) {
    this._token = value
    this._initClients()
    this._initApis()
  }

  get token () {
    return this._token
  }

  getAuthorizationUrl (state = null) {
    const params = {
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: 'code',
      scope: 'full'
    }

    if (state) {
      params.state = state
    }

    return `https://signin.infusionsoft.com/app/oauth/authorize?${qs.stringify(params)}`
  }

  async requestAccessToken (code) {
    const data = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      redirect_uri: this.redirectUri,
      code,
      grant_type: 'authorization_code'
    }

    const response = await this._clients.token.post('', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    const token = Token.fromResponse(response)

    this.token = token

    return token
  }

  async refreshToken () {
    const data = {
      grant_type: 'refresh_token',
      refresh_token: this.token.refreshToken
    }

    const response = await this._clients.token.post('', qs.stringify(data), {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    const token = Token.fromResponse(response)

    this.token = token

    return token
  }

  _initClients () {
    this._clients = {}

    this._clients.token = axios.create({
      baseURL: 'https://api.infusionsoft.com/token'
    })

    if (!this.token) {
      return
    }

    this._clients.rest = axios.create({
      baseURL: 'https://api.infusionsoft.com/crm/rest/v1',
      params: {
        access_token: this.token.accessToken
      }
    })

    this._clients.rest.interceptors.request.use(this._checkTokenExpiryInterceptor)
  }

  _checkTokenExpiryInterceptor (config) {
    if (!this.token || this.token.isExpired()) {
      return Promise.reject(Error('Token expired'))
    }

    return config
  }

  _initApis () {
    if (this.token) {
      this.xml = new XmlApi({
        xmlrpc: {
          clientOptions: {
            host: 'api.infusionsoft.com',
            path: `/crm/xmlrpc/v1?access_token=${this.token.accessToken}`,
            ca: fs.readFileSync(path.join(__dirname, '../', '../', 'is-cacert.pem'))
          },
          methodCallMutators: [
            ([ method, params ]) => {
              if (!this.token || this.token.isExpired()) {
                return Promise.reject(Error('Token expired'))
              }

              return [ method, [ '', ...params ] ]
            }
          ]
        }
      })
    }
    this.rest = new RestApi({client: this._clients.rest})
  }
}

module.exports = Infusionsoft
