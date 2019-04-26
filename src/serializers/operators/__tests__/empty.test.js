import createEmptyOperator from "../empty";

const key = "name";
const serializer = {
  parse: () => "",
  serialize: () => ""
};
const emptyOperator = createEmptyOperator(serializer);

test("should parse value as a boolean", () => {
  expect(emptyOperator.parse(key, "true")).toEqual(true);
  expect(emptyOperator.parse(key, "false")).toEqual(false);
});

test("should serialize into a boolean", () => {
  expect(emptyOperator.serialize(key, true)).toEqual(true);
  expect(emptyOperator.serialize(key, false)).toEqual(false);
});
