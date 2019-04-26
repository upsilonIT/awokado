import createBoolParam from "../bool";

const boolParam = createBoolParam();

test("should parse into boolean", () => {
  expect(boolParam.parse("true")).toEqual(true);
  expect(boolParam.parse("false")).toEqual(false);
});

test("should serialize into boolean", () => {
  expect(boolParam.serialize(false)).toEqual(false);
});
