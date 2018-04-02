module.exports = (raw, required) => {
  if (required && typeof raw === 'undefined') {
    throw TypeError('Parameter is required')
  }

  const double = Number.parseFloat(raw)
  if (Number.isNaN(double)) {
    throw TypeError('Parameter is not Double')
  }

  return (Number.isInteger(double)) ? double.toFixed(2) : double
}
