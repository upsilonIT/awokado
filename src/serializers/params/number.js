export default options => ({
  options,
  parse: string => Number(string),
  serialize: number => Number(number)
});
