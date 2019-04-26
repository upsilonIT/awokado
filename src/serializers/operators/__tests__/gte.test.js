import createGteOperator from "../gte";

const key = "name";
const serializer = {
  parse: (_, part) => part,
  serialize: (_, part) => part
};
const gteOperator = createGteOperator(serializer);

test("should parse value", () => {
  const stringValue = "esentai";

  expect(gteOperator.parse(key, stringValue)).toEqual("esentai");
});

test("should serialize into string joined with comma", () => {
  const value = "esentai";

  expect(gteOperator.serialize(key, value)).toEqual("esentai");
});
