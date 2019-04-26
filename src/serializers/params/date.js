const twoDigitsOf = number => `0${number}`.slice(-2);

export default options => ({
  options,
  parse: string => new Date(string),
  serialize: date => {
    const fullYear = date.getFullYear();
    const month = twoDigitsOf(date.getMonth() + 1);
    const day = twoDigitsOf(date.getDate());

    return `${fullYear}-${month}-${day}`;
  }
});
