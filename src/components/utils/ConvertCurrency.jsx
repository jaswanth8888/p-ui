let currencyData = fetch("https://api.exchangeratesapi.io/latest")
  .then((response) => response.json())
  .then((data) => {
    currencyData = data
  })

export default function convertCurrency(from, to, amt) {
  if (from !== "EUR")
    return `${(parseFloat(amt) / parseFloat(currencyData.rates[from])).toFixed(
      3
    )} €`
  return `${(parseFloat(amt) / parseFloat(currencyData.rates[from])).toFixed(
    3
  )} €`
}
