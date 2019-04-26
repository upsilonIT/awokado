import { limit, page, query } from "../../../query-dsl";
import applyMiddleware from "../../applyMiddleware";
import createTransform from "../transformPageToOffset";

test("should get offset from limit and page", () => {
  const middleware = createTransform();
  const serializer = applyMiddleware([middleware]);
  const parsedParams = query(limit(10), page(5));
  const urlSearchParams = serializer.serialize(parsedParams);

  expect(urlSearchParams).toEqual(
    new URLSearchParams({
      offset: "50"
    })
  );
});

test("should call next on parse", () => {
  const watchNext = {
    serialize: jest.fn()
  };
  const middleware = createTransform()(watchNext);
  const parsedParams = query();
  const urlSearchParams = new URLSearchParams();

  expect(watchNext.serialize).toHaveBeenCalledTimes(0);

  middleware.serialize(parsedParams, urlSearchParams);

  expect(watchNext.serialize).toHaveBeenCalledTimes(1);
});
