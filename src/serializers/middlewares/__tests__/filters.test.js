import { equals, limit, query, where } from "../../../query-dsl";
import applyMiddleware from "../../applyMiddleware";
import createFiltersMiddleware from "../filters";

const operatorsSerializer = {
  parse: (key, operator, value) => `${key}+${operator}+${value}`,
  serialize: (key, operator, value) => value.split("+")[2]
};

test("should parse filter params", () => {
  const middleware = createFiltersMiddleware(operatorsSerializer);
  const serializer = applyMiddleware([middleware]);
  const urlSearchParams = new URLSearchParams(
    "?name1[eq]=value&name2[eq]=another_value"
  );
  const parsedParams = serializer.parse(urlSearchParams);

  expect(parsedParams).toEqual(
    query(
      where("name1", equals("name1+eq+value")),
      where("name2", equals("name2+eq+another_value"))
    )
  );
});

test("should ignore non-filters when parsing", () => {
  const middleware = createFiltersMiddleware(operatorsSerializer);
  const serializer = applyMiddleware([middleware]);
  const urlSearchParams = new URLSearchParams("?limit=5&name1[eq]=value");
  const parsedParams = serializer.parse(urlSearchParams);

  expect(parsedParams).toEqual(query(where("name1", equals("name1+eq+value"))));
});

test("should serialize filter params", () => {
  const middleware = createFiltersMiddleware(operatorsSerializer);
  const serializer = applyMiddleware([middleware]);
  const parsedParams = query(
    where("name1", equals("name1+eq+value")),
    where("name2", equals("name2+eq+another_value"))
  );
  const urlSearchParams = serializer.serialize(parsedParams);

  expect(urlSearchParams).toEqual(
    new URLSearchParams({
      "name1[eq]": "value",
      "name2[eq]": "another_value"
    })
  );
});

test("should ignore non-filters when serializing", () => {
  const middleware = createFiltersMiddleware(operatorsSerializer);
  const serializer = applyMiddleware([middleware]);
  const parsedParams = query(
    limit(5),
    where("name1", equals("name1+eq+value"))
  );
  const urlSearchParams = serializer.serialize(parsedParams);

  expect(urlSearchParams).toEqual(
    new URLSearchParams({
      "name1[eq]": "value"
    })
  );
});

test("should call next on parse", () => {
  const parse = jest.fn();
  const watchNext = { parse };
  const middleware = createFiltersMiddleware(operatorsSerializer)(watchNext);
  const parsedParams = query();
  const urlSearchParams = new URLSearchParams();

  expect(parse).toHaveBeenCalledTimes(0);

  middleware.parse(urlSearchParams, parsedParams);

  expect(parse).toHaveBeenCalledTimes(1);
});

test("should call next on serialize", () => {
  const serialize = jest.fn();
  const watchNext = { serialize };
  const middleware = createFiltersMiddleware(operatorsSerializer)(watchNext);
  const parsedParams = query();
  const urlSearchParams = new URLSearchParams();

  expect(serialize).toHaveBeenCalledTimes(0);

  middleware.serialize(parsedParams, urlSearchParams);

  expect(serialize).toHaveBeenCalledTimes(1);
});
