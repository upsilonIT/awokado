import createEqOperator from "../eq";

const key = "name";
const serializer = {
  parse: (_, part) => part,
  serialize: (_, part) => part
};
const eqOperator = createEqOperator(serializer);

test("should parse value", () => {
  const stringValue = "esentai";

  expect(eqOperator.parse(key, stringValue)).toEqual("esentai");
});

test("should serialize into string joined with comma", () => {
  const value = "esentai";

  expect(eqOperator.serialize(key, value)).toEqual("esentai");
});
