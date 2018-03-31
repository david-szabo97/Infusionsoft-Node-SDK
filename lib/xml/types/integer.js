module.exports = (raw, required) => {
  if (required && typeof raw === 'undefined') {
    throw TypeError('Parameter is required')
  }

  const integer = Number.parseInt(raw)
  if (Number.isNaN(integer)) {
    throw TypeError('Parameter is not Integer')
  }

  return integer
}
