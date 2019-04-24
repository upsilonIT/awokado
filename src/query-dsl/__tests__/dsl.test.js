import { createQuery } from "../../structs/query";
import { createFilter } from "../../structs/filter";
import {
  INCLUDE_KEY,
  LIMIT_KEY,
  PAGE_KEY,
  SEARCH_KEY,
  SORT_KEY,
  createPredicate,
  createFilterPredicate
} from "../../structs/predicate";
import {
  CONTAINS,
  EMPTY,
  EQ,
  GTE,
  ILIKE,
  IN,
  LTE,
  createOperator
} from "../../structs/operator";
import {
  anyOf,
  ascending,
  contains,
  descending,
  empty,
  equals,
  filter,
  gte,
  ilike,
  include,
  limit,
  lte,
  notEmpty,
  page,
  query,
  search,
  sortBy,
  where
} from "..";

test("should generate correct query", () => {
  const queryObject = query(
    where("categories", contains(["men"])),
    where("categories2", contains(["women", "children"])),
    where("age", gte(18), lte(21)),
    where("name", ilike("marilyn")),
    where("gender", equals("female")),
    where("status", anyOf(["black", "white"])),
    where("life", empty()),
    where("pocket", notEmpty()),
    limit(20),
    page(2),
    include("key1", "key2"),
    sortBy(ascending("name"), descending("register_date")),
    search("Kniga")
  );

  expect(queryObject).toEqual(
    createQuery(
      createFilterPredicate("categories", createOperator(CONTAINS, ["men"])),
      createFilterPredicate(
        "categories2",
        createOperator(CONTAINS, ["women", "children"])
      ),
      createFilterPredicate(
        "age",
        createOperator(GTE, 18),
        createOperator(LTE, 21)
      ),
      createFilterPredicate("name", createOperator(ILIKE, "marilyn")),
      createFilterPredicate("gender", createOperator(EQ, "female")),
      createFilterPredicate("status", createOperator(IN, ["black", "white"])),
      createFilterPredicate("life", createOperator(EMPTY, true)),
      createFilterPredicate("pocket", createOperator(EMPTY, false)),
      createPredicate(INCLUDE_KEY, ["key1", "key2"]),
      createPredicate(LIMIT_KEY, 20),
      createPredicate(PAGE_KEY, 2),
      createPredicate(SEARCH_KEY, "Kniga"),
      createPredicate(SORT_KEY, [
        { field: "name", direction: "asc" },
        { field: "register_date", direction: "desc" }
      ])
    )
  );
});

test("should generate correct filter", () => {
  const queryObject = filter(gte(18), lte(21));

  expect(queryObject).toEqual(
    createFilter(createOperator(GTE, 18), createOperator(LTE, 21))
  );
});
