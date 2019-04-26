import createMaybe from "../maybe";

const nextSerializer = {
  parse: x => `parsed: ${x}`,
  serialize: x => `serialized: ${x}`
};
const serializer = createMaybe(nextSerializer);

test("should parse null as null", () => {
  expect(serializer.parse(null)).toEqual(null);
});

test("should parse any other value with the next middleware", () => {
  expect(serializer.parse("")).toEqual(nextSerializer.parse(""));
  expect(serializer.parse(0)).toEqual(nextSerializer.parse(0));
  expect(serializer.parse(42)).toEqual(nextSerializer.parse(42));
});

test("should serialize null as null", () => {
  expect(serializer.serialize(null)).toEqual(null);
});

test("should serialize any other value with the next middleware", () => {
  expect(serializer.serialize("")).toEqual(nextSerializer.serialize(""));
  expect(serializer.serialize(0)).toEqual(nextSerializer.serialize(0));
  expect(serializer.serialize(42)).toEqual(nextSerializer.serialize(42));
});
