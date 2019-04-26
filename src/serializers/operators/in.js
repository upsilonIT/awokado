export default serializer => ({
  parse: (key, value) =>
    value.split(",").map(part => serializer.parse(key, part)),
  serialize: (key, value) =>
    value.map(item => serializer.serialize(key, item)).join(",")
});
