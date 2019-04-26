import createLteOperator from "../gte";

const key = "name";
const serializer = {
  parse: (_, part) => part,
  serialize: (_, part) => part
};
const lteOperator = createLteOperator(serializer);

test("should parse value", () => {
  const stringValue = "esentai";

  expect(lteOperator.parse(key, stringValue)).toEqual("esentai");
});

test("should serialize into string joined with comma", () => {
  const value = "esentai";

  expect(lteOperator.serialize(key, value)).toEqual("esentai");
});
