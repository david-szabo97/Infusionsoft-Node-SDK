const isObject = require('isobject')

module.exports = (type, raw, required) => {
  if (required && typeof raw === 'undefined') {
    throw TypeError('Parameter is required')
  }

  if (!isObject) {
    throw TypeError('Parameter is not Struct')
  }

  const obj = { ...raw }
  for (const key of Object.keys(obj)) {
    obj[key] = type(obj[key])
  }

  return obj
}
