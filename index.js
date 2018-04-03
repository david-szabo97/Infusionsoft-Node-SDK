const Infusionsoft = require('./lib/oauth2')
const InfusionsoftLegacy = require('./lib/legacy')

module.exports = () => {
  return {
    OAuth2: Infusionsoft,
    Legacy: InfusionsoftLegacy
  }
}
