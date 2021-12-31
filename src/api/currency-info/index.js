
class Currency {
  async getCurrencyByPage(page = 1) {
    try {
      const response = await fetch(`https://api.coincap.io/v2/assets?limit=${page * 10}`)
      const { data } = await response.json()

      return data.slice((page - 1) * 10, page * 10)
    } catch (e) {
      console.log(e)
    }
  }

  async getCurrencies() {
    try {
      const response = await fetch('https://api.coincap.io/v2/assets?limit=50')
      const { data } = await response.json()

      return data
    } catch (e) {
      console.log(e)
    }
  }

  async getCurrency(id) {
    try {
      const response = await fetch('https://api.coincap.io/v2/assets/' + id)
      const { data } = await response.json()

      return data
    } catch (e) {
      console.log(e)
    }
  }

  async getPopularCurrency() {
    try {
      const response = await fetch('https://api.coincap.io/v2/assets?limit=3')
      const { data } = await response.json()

      return data
    } catch (e) {
      console.log(e)
    }
  }

  async getCurrencyHistory(id) {
    try {
      const response = await fetch(`https://api.coincap.io/v2/assets/${id}/history?interval=d1`)
      const { data } = await response.json()

      return data
    } catch (e) {
      console.log(e)
    }
  }
}

export const currency =  new Currency()