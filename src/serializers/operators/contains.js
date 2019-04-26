export default serializer => ({
  parse: (key, value) => serializer.parse(key, value),
  serialize: (key, value) => serializer.serialize(key, value)
});
