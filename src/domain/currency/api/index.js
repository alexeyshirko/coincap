import api, { transformResponse } from '../../../core/lib/api/index'
import {CurrencyAPIMapper} from "../mappper";

export const getPopularCurrency = async () => {
  return await api.get('/assets', {
    params: {
      limit: 3,
    },
    transformResponse: transformResponse(({ ...attributes }) => CurrencyAPIMapper({ ...attributes })),
  })
}

export const getCurrencyByPage = async (page) => {
  return await api.get('/assets', {
    params: { page },
    transformResponse: transformResponse(({ ...attributes }) => CurrencyAPIMapper({ ...attributes })),
  })
}

export const getCurrency = async (id) => {
  return await api.get('/assets/' + id, {
    transformResponse: transformResponse(({ ...attributes }) => CurrencyAPIMapper({ ...attributes })),
  })
}

export const getCurrencyHistory = async (id) => {
  return await api.get(`/assets/${id}/history?interval=d1`)
}