import { keys } from "ramda";

import { WELL_KNOWN_KEYS } from "../../structs/predicate";
import {
  descending,
  equals,
  gte,
  include,
  limit,
  lte,
  page,
  query as newQuery,
  sortBy,
  where
} from "../../query-dsl";
import createQuerySerializer, {
  defaultAnnotations
} from "../createQuerySerializer";
import { number, string } from "../params";

const serializer = createQuerySerializer({
  count: number(),
  name: string()
});

describe("queryParams", () => {
  test("should serialize all well-known params", () => {
    const query = newQuery(
      limit(10),
      page(5),
      sortBy(descending("name")),
      include(["store", "location"])
    );
    const urlSearchParams = serializer.serialize(query);

    expect(urlSearchParams).toEqual(
      new URLSearchParams({
        include: "store,location",
        limit: "10",
        sort: "-name",
        offset: "50"
      })
    );
  });

  test("should serialize all defined filters", () => {
    const query = newQuery(
      where("name", equals("alice")),
      where("count", gte(5), lte(10))
    );
    const urlSearchParams = serializer.serialize(query);

    expect(urlSearchParams).toEqual(
      new URLSearchParams({
        "name[eq]": "alice",
        "count[gte]": "5",
        "count[lte]": "10"
      })
    );
  });
});

test("defaultAnnotations must describe all well knows params", () => {
  expect(keys(defaultAnnotations)).toEqual(
    expect.arrayContaining(WELL_KNOWN_KEYS)
  );
});
