import { apiDTOMapper } from '../../../core/lib/mapper'

const currency = {
  changePercent24Hr: {
    key: "changePercent24Hr",
    setter: value => +value,
    defaultValue: null,
  },

  id: {
    key: "id",
    defaultValue: 'asd',
  },

  supply: {
    key: "supply",
    setter: value => +value,
    defaultValue: null,
  },

  rank: {
    key: "rank",
    defaultValue: null,
  },

  priceUsd: {
    key: "priceUsd",
    setter: value => +value,
    defaultValue: null,
  },

  name: {
    key: "name",
    defaultValue: null,
  },

  symbol: {
    key: "symbol",
    defaultValue: null,
  },
}

export const CurrencyAPIMapper = data => apiDTOMapper(data, currency)