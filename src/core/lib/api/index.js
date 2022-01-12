import axios from "axios";

const apiClient = axios.create({
  baseURL: 'https://api.coincap.io/v2',
  headers: { "Content-Type": "application/json" }
})

export const transformResponse = (transformer, formattedResponse = true) =>
  axios.defaults.transformResponse.concat(data => {
    const getResponse = res =>
      Array.isArray(res) ? res.map(item => transformer.call(this, item)) : transformer.call(this, res)

    if (!data.data && formattedResponse) return data
    return !formattedResponse ? getResponse(data) : { ...data, data: getResponse(data.data) }
  })

export default apiClient