export default next => ({
  parse: stringOrArray =>
    (Array.isArray(stringOrArray)
      ? stringOrArray
      : stringOrArray.split(",")
    ).map(item => next.parse(item)),
  serialize: array => array.map(item => next.serialize(item))
});
