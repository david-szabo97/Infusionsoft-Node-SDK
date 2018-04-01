class Infusionsoft {
  constructor ({ clientId, clientSecret, redirectUri }) {
    if (typeof clientId !== 'string' ||
        typeof clientSecret !== 'string' ||
        typeof redirectUri !== 'string') {
      throw TypeError('clientId, clientSecret and redirectUri must be a string')
    }

    this._config = { clientId, clientSecret, redirectUri }
  }
}

module.exports = Infusionsoft
