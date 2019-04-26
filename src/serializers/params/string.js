import { identity } from "ramda";

export default options => ({
  options,
  parse: identity,
  serialize: identity
});
