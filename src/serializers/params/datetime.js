export default options => ({
  options,
  parse: string => new Date(string),
  serialize: date => date.toISOString()
});
