export const apiDTOMapper = (data, mapper) => {
  const result = {}
  if (!data) return result

  Object.keys(mapper).forEach(key => {
    const apiMapper = mapper[key]
    const setterValue = (value, data) =>
      Object.prototype.hasOwnProperty.call(apiMapper, "setter") ? apiMapper.setter.call(this, value, data) : value

    if (Object.prototype.hasOwnProperty.call(data, key) || apiMapper.defaultValue !== undefined)
      Object.assign(result, {
        [apiMapper.key]: data[key] !== undefined && data[key] !== null ? setterValue(data[key], data) : apiMapper.defaultValue
      })
  })

  return result
}