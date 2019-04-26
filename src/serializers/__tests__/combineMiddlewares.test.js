import combineMiddlewares from "../combineMiddlewares";

test("should correctly compose middlewares", () => {
  expect.assertions(3);

  const value1 = "value1";
  const value2 = "value2";
  const value3 = "value3";

  const middlewares = [
    next => {
      expect(next).toEqual(value2);

      return value3;
    },
    next => {
      expect(next).toEqual(value1);

      return value2;
    },
    () => value1
  ];

  expect(combineMiddlewares(middlewares)).toEqual(value3);
});
