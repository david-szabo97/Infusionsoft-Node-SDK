module.exports = (type, raw, required) => {
  if (required && typeof raw === 'undefined') {
    throw TypeError('Parameter is required')
  }

  if (!Array.isArray(raw)) {
    throw TypeError('Parameter is not Array')
  }

  const parsed = raw.map(type)

  return parsed
}
