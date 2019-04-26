import createJSONParam from "../json";

const dateParam = createJSONParam();

test("should parse into JSON", () => {
  expect(dateParam.parse('{"payload":{"name":"Ann"}}')).toEqual({
    payload: {
      name: "Ann"
    }
  });
});

test("should serialize into string", () => {
  expect(
    dateParam.serialize({
      payload: {
        name: "Ann"
      }
    })
  ).toEqual('{"payload":{"name":"Ann"}}');
});
