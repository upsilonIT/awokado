import createILikeOperator from "../ilike";

const key = "name";
const serializer = {
  parse: (_, part) => part,
  serialize: (_, part) => part
};
const iLikeOperator = createILikeOperator(serializer);

test("should parse value", () => {
  const stringValue = "esentai";

  expect(iLikeOperator.parse(key, stringValue)).toEqual("esentai");
});

test("should serialize into string joined with comma", () => {
  const value = "esentai";

  expect(iLikeOperator.serialize(key, value)).toEqual("esentai");
});
