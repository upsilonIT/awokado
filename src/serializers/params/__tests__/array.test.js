import createArray from "../array";
import createBoolean from "../bool";
import createNumber from "../number";
import createString from "../string";

const serializerArrayStrings = createArray(createString());
const serializerArrayNumbers = createArray(createNumber());
const serializerArrayBooleans = createArray(createBoolean());

test("should raises an error when trying to parse not string or array", () => {
  expect(() => {
    serializerArrayStrings.parse(null);
  }).toThrow();
});

test("should parse array correctly", () => {
  expect(serializerArrayStrings.parse(["1", "2"])).toEqual(["1", "2"]);
  expect(serializerArrayNumbers.parse(["1", "2"])).toEqual([1, 2]);
  expect(serializerArrayBooleans.parse(["false", "true"])).toEqual([
    false,
    true
  ]);
});

test("should parse string correctly", () => {
  expect(serializerArrayStrings.parse("1,2")).toEqual(["1", "2"]);
  expect(serializerArrayNumbers.parse("1,2")).toEqual([1, 2]);
  expect(serializerArrayBooleans.parse("false,true")).toEqual([false, true]);
});

test("should serialize correctly", () => {
  expect(serializerArrayStrings.serialize(["1", "2"])).toEqual(["1", "2"]);
  expect(serializerArrayNumbers.serialize([1, 2])).toEqual([1, 2]);
  expect(serializerArrayBooleans.serialize([false, true])).toEqual([
    false,
    true
  ]);
});
