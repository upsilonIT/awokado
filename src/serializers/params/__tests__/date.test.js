import createDateParam from "../date";

const dateParam = createDateParam();

test("should parse into Date", () => {
  expect(dateParam.parse("2010-04-05")).toEqual(new Date("2010-04-05"));
});

test("should serialize into YYYY-MM-DD format string", () => {
  expect(dateParam.serialize(new Date("2010-04-05"))).toEqual("2010-04-05");
  expect(dateParam.serialize(new Date("2018-12-31"))).toEqual("2018-12-31");
});
