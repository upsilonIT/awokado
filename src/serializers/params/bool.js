const mapping = {
  false: false,
  true: true
};

export default options => ({
  options,
  parse: string => mapping[string],
  serialize: payload => payload
});
