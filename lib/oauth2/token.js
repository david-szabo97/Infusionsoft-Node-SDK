class Token {
  constructor ({ accessToken, refreshToken, expiresIn, expiresAt, extra }) {
    this.accessToken = accessToken || ''
    this.refreshToken = refreshToken || ''
    this.expiresIn = expiresIn || ''

    if (!expiresAt) {
      this.expiresAt = Date.now() + expiresIn * 1000
    }

    this.extra = extra || false
  }

  isExpired () {
    return this.expiresAt < Date.now()
  }

  toJson () {
    return JSON.stringify(this)
  }

  static fromJson (json) {
    return Token.fromObject(JSON.parse(json))
  }

  static fromResponse (response) {
    const { access_token: accessToken, refresh_token: refreshToken, expires_in: expiresIn, ...extra } = response
    return new Token({
      accessToken,
      refreshToken,
      expiresIn,
      extra
    })
  }

  static fromObject (object) {
    return new Token(object)
  }
}

module.exports = Token
