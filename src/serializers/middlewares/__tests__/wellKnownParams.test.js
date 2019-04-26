import { createQuery } from "../../../structs/query";
import { createPredicate } from "../../../structs/predicate";
import { limit, query } from "../../../query-dsl";
import applyMiddleware from "../../applyMiddleware";
import createWellKnownParams from "../wellKnownParams";

const paramsSerializer = {
  parse: (key, value) => value,
  serialize: (key, value) => value
};
const wellKnownParams = ["limit", "offset"];

test("should parse well known params", () => {
  const middleware = createWellKnownParams(wellKnownParams, paramsSerializer);
  const serializer = applyMiddleware([middleware]);
  const urlSearchParams = new URLSearchParams(
    "?limit=50&offset=30&nonWellKnown=true"
  );
  const parsedParams = serializer.parse(urlSearchParams);

  expect(parsedParams).toEqual(
    createQuery(createPredicate("limit", "50"), createPredicate("offset", "30"))
  );
});

test("should serialize filter params", () => {
  const middleware = createWellKnownParams(wellKnownParams, paramsSerializer);
  const serializer = applyMiddleware([middleware]);
  const parsedParams = query(limit("50"), createPredicate("offset", "30"));
  const urlSearchParams = serializer.serialize(parsedParams);

  expect(urlSearchParams).toEqual(
    new URLSearchParams({
      limit: "50",
      offset: "30"
    })
  );
});

test("should call next on parse", () => {
  const parse = jest.fn();
  const watchNext = { parse };
  const middleware = createWellKnownParams(wellKnownParams, paramsSerializer)(
    watchNext
  );
  const parsedParams = query();
  const urlSearchParams = new URLSearchParams();

  expect(parse).toHaveBeenCalledTimes(0);

  middleware.parse(urlSearchParams, parsedParams);

  expect(parse).toHaveBeenCalledTimes(1);
});

test("should call next on serialize", () => {
  const serialize = jest.fn();
  const watchNext = { serialize };
  const middleware = createWellKnownParams(wellKnownParams, paramsSerializer)(
    watchNext
  );
  const parsedParams = query();
  const urlSearchParams = new URLSearchParams();

  expect(serialize).toHaveBeenCalledTimes(0);

  middleware.serialize(parsedParams, urlSearchParams);

  expect(serialize).toHaveBeenCalledTimes(1);
});
