import createBoolSerializer from "../params/bool";

export default () => {
  const boolSerializer = createBoolSerializer();

  return {
    parse: (_, value) => boolSerializer.parse(value),
    serialize: (_, value) => boolSerializer.serialize(value)
  };
};
