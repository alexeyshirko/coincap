import {
  getCurrency,
  getCurrencyByPage,
  getCurrencyHistory,
  getPopularCurrency
} from "../api"

export const popularCurrency = async () => {
  const response = await getPopularCurrency()
  return response.data
}

export const currencyList = async (page = 1) => {
  const response = await getCurrencyByPage({ limit: page * 10 })
  return response.data
}

export const currencyItem = async (id) => {
  const response = await getCurrency(id)
  return response.data
}

export const currencyHistory = async (id) => {
  const response = await getCurrencyHistory(id)
  return response.data
}