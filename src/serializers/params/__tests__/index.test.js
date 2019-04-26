import { createUrlParamsSerializer } from "..";

const param1 = {
  parse: x => x,
  serialize: x => x
};

const param2 = {
  parse: x => x,
  serialize: x => x
};

const paramSerializer = createUrlParamsSerializer({ param1, param2 });

test("should parse params", () => {
  expect(paramSerializer.parse("param1", "1")).toEqual(param1.parse("1"));
  expect(paramSerializer.parse("param2", "2")).toEqual(param2.parse("2"));
});

test("should unescape special characters", () => {
  expect(paramSerializer.parse("param1", "%2B42")).toEqual(param1.parse("+42"));
});

test("should serialize params", () => {
  expect(paramSerializer.serialize("param1", "1")).toEqual(
    param1.serialize("1")
  );
  expect(paramSerializer.serialize("param2", "2")).toEqual(
    param2.serialize("2")
  );
});

test("should throw if unknown param is passed", () => {
  expect(paramSerializer.serialize.bind(null, "param3", "3")).toThrow(Error);
});

test("should escape special characters", () => {
  expect(paramSerializer.serialize("param1", "+42")).toEqual(
    param1.serialize("%2B42")
  );
});
