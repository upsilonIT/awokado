import createDatetimeParam from "../datetime";

const param = createDatetimeParam();

test("should parse into Date", () => {
  expect(param.parse("2018-09-13T10:18:30.090Z")).toEqual(
    new Date("2018-09-13T10:18:30.090Z")
  );
});

test("should serialize into ISO date format string", () => {
  expect(param.serialize(new Date("2018-09-13T10:18:30.090Z"))).toEqual(
    "2018-09-13T10:18:30.090Z"
  );
});
