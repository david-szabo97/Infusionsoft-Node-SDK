module.exports = (raw, required) => {
  if (required && typeof raw === 'undefined') {
    throw TypeError('Parameter is required')
  }

  if (!(raw instanceof Date)) {
    throw TypeError('Parameter is not Date')
  }

  return raw
}
