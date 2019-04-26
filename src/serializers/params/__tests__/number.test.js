import createNumberParam from "../number";

const numberParam = createNumberParam();

test("should parse into number", () => {
  expect(numberParam.parse("42")).toEqual(42);
});

test("should serialize into number", () => {
  expect(numberParam.serialize(42)).toEqual(42);
});
