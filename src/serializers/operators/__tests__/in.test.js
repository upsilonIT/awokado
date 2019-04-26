import createInOperator from "../in";

const key = "list";
const serializer = {
  parse: (_, part) => part,
  serialize: (_, part) => part
};
const inOperator = createInOperator(serializer);

test("should parse list", () => {
  const stringValue = "1,2,3,4";

  expect(inOperator.parse(key, stringValue)).toEqual(["1", "2", "3", "4"]);
});

test("should serialize into string joined with comma", () => {
  const value = ["1", "2", "3", "4"];

  expect(inOperator.serialize(key, value)).toEqual("1,2,3,4");
});
