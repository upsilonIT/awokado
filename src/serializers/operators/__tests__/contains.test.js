import createArray from "../../params/array";
import createString from "../../params/string";
import createContainsOperator from "../contains";

const key = "list";

const arrayStrings = createArray(createString());
const serializer = {
  parse: (_, part) => arrayStrings.parse(part),
  serialize: (_, part) => arrayStrings.serialize(part)
};

const containsOperator = createContainsOperator(serializer);

test("should parse list", () => {
  const stringValue = "1,2,3,4";

  expect(containsOperator.parse(key, stringValue)).toEqual([
    "1",
    "2",
    "3",
    "4"
  ]);
});

test("should serialize into string joined with comma", () => {
  const value = ["1", "2", "3", "4"];

  expect(containsOperator.serialize(key, value)).toEqual(["1", "2", "3", "4"]);
});
