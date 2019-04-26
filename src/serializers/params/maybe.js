import { isNil } from "ramda";

export default next => ({
  parse: value => (isNil(value) ? null : next.parse(value)),
  serialize: value => (isNil(value) ? null : next.serialize(value))
});
