import { decode, encode } from "../utils";

test("should decode value", () => {
  expect(decode("%2B42")).toBe("+42");
});

test("should not decode value when passed not string", () => {
  expect(decode(42)).toBe(42);
});

test("should encode value", () => {
  expect(encode("+42")).toBe("%2B42");
});

test("should not encode value when passed not string", () => {
  expect(encode(42)).toBe(42);
});
