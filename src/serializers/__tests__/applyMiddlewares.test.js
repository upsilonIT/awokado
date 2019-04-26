import { createPredicate } from "../../structs/predicate";
import { limit, page, query, sortBy } from "../../query-dsl";
import applyMiddleware from "../applyMiddleware";

const createSimpleMiddleware = key => next => ({
  parse: (urlSearchParams, parsedParams) => {
    parsedParams.set(key, urlSearchParams.get(key));

    next.parse(urlSearchParams, parsedParams);
  },
  serialize: (parsedParams, urlSearchParams) => {
    urlSearchParams.set(key, parsedParams.get(key));

    next.serialize(parsedParams, urlSearchParams);
  }
});

const pageMiddleware = createSimpleMiddleware("page");
const limitMiddleware = createSimpleMiddleware("limit");
const sortMiddleware = createSimpleMiddleware("sort");

test("should call all middlewares during parsing", () => {
  const serializer = applyMiddleware([
    pageMiddleware,
    limitMiddleware,
    sortMiddleware
  ]);
  const urlSearchParams = new URLSearchParams("?page=5&limit=10&sort=name");
  const parsedParams = serializer.parse(urlSearchParams);

  expect(parsedParams).toEqual(
    query(
      createPredicate("page", "5"),
      createPredicate("limit", "10"),
      createPredicate("sort", "name")
    )
  );
});

test("should call all middlewares during serializing", () => {
  const serializer = applyMiddleware([
    pageMiddleware,
    limitMiddleware,
    sortMiddleware
  ]);
  const parsedParams = query(page(5), limit(10), sortBy("name"));
  const urlSearchParams = serializer.serialize(parsedParams);

  expect(urlSearchParams).toEqual(
    new URLSearchParams([["page", "5"], ["limit", "10"], ["sort", "name"]])
  );
});
