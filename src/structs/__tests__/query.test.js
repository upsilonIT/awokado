import { createFilter } from "../filter";
import { createOperator } from "../operator";
import {
  LIMIT_KEY,
  PAGE_KEY,
  SORT_KEY,
  createFilterPredicate,
  createPredicate
} from "../predicate";
import {
  areQueriesEqual,
  cloneQuery,
  createQuery,
  getQueryFilterPredicates,
  getQueryPredicate,
  getQueryPredicates,
  getQuerySort,
  hasQueryPredicate,
  mergeQueriesRight,
  mutablyDefaultQueryTo,
  mutablyOmitQueryPredicate
} from "../query";

describe("areQueriesEqual", () => {
  test("should be equal if all predicates match", () => {
    const query = createQuery(
      createPredicate(LIMIT_KEY, 10),
      createPredicate(SORT_KEY, "name"),
      createFilterPredicate("age", createOperator("eq", 1)),
      createFilterPredicate("size", createOperator("eq", 1)),
      createFilterPredicate("color", createOperator("eq", 1))
    );
    const anotherQuery = createQuery(
      createPredicate(LIMIT_KEY, 10),
      createPredicate(SORT_KEY, "name"),
      createFilterPredicate("age", createOperator("eq", 1)),
      createFilterPredicate("size", createOperator("eq", 1)),
      createFilterPredicate("color", createOperator("eq", 1))
    );

    expect(areQueriesEqual(query, anotherQuery)).toEqual(true);
  });

  test("should return false if just names match", () => {
    const query = createQuery(createPredicate(LIMIT_KEY, 10));
    const anotherQuery = createQuery(createPredicate(SORT_KEY, 10));

    expect(areQueriesEqual(query, anotherQuery)).toEqual(false);
  });

  test("should return false if just filter names match", () => {
    const query = createQuery(
      createFilterPredicate("age", createOperator("eq", 1))
    );
    const anotherQuery = createQuery(
      createFilterPredicate("count", createOperator("eq", 1))
    );

    expect(areQueriesEqual(query, anotherQuery)).toEqual(false);
  });

  test("should return false otherwise", () => {
    const query = createQuery(
      createPredicate(LIMIT_KEY, 10),
      createPredicate(SORT_KEY, "name"),
      createFilterPredicate("age", createOperator("eq", 1)),
      createFilterPredicate("size", createOperator("eq", 1)),
      createFilterPredicate("color", createOperator("eq", 1))
    );
    const anotherQuery = createQuery(
      createPredicate(SORT_KEY, "name"),
      createFilterPredicate("age", createOperator("gte", 1)),
      createFilterPredicate("size", createOperator("eq", 1)),
      createFilterPredicate("color", createOperator("eq", 1))
    );

    expect(areQueriesEqual(query, anotherQuery)).toEqual(false);
  });
});

describe("cloneQuery", () => {
  test("should create a shallow copy of a query", () => {
    const query = createQuery(
      createPredicate(LIMIT_KEY, 10),
      createPredicate(SORT_KEY, "name"),
      createFilterPredicate("age", createOperator("eq", 1)),
      createFilterPredicate("size", createOperator("eq", 1)),
      createFilterPredicate("color", createOperator("eq", 1))
    );

    expect(cloneQuery(query)).toEqual(query);
    expect(cloneQuery(query)).not.toBe(query);
  });
});

describe("getQueryPredicates", () => {
  test("should enlist a flatten list of all predicates", () => {
    const query = createQuery(
      createPredicate(LIMIT_KEY, 10),
      createPredicate(SORT_KEY, "name"),
      createFilterPredicate("age", createOperator("eq", 1)),
      createFilterPredicate("size", createOperator("eq", 1)),
      createFilterPredicate("color", createOperator("eq", 1))
    );

    expect(getQueryPredicates(query)).toEqual([
      createPredicate(LIMIT_KEY, 10),
      createPredicate(SORT_KEY, "name"),
      createFilterPredicate("age", createOperator("eq", 1)),
      createFilterPredicate("size", createOperator("eq", 1)),
      createFilterPredicate("color", createOperator("eq", 1))
    ]);
  });
});

describe("hasQueryPredicate", () => {
  test("should check if query contains a predicate with a given name", () => {
    const query = createQuery(
      createPredicate(LIMIT_KEY, 10),
      createFilterPredicate("age", createOperator("eq", 1)),
      createFilterPredicate("color", createOperator("eq", "red"))
    );

    expect(hasQueryPredicate(LIMIT_KEY, query)).toEqual(true);
    expect(hasQueryPredicate("age", query)).toEqual(true);
    expect(hasQueryPredicate("some", query)).toEqual(false);
  });
});

describe("getQueryPredicate", () => {
  test("should get predicate value", () => {
    const query = createQuery(
      createPredicate(LIMIT_KEY, 10),
      createFilterPredicate("age", createOperator("eq", 1)),
      createFilterPredicate("color", createOperator("eq", "red"))
    );

    expect(getQueryPredicate(LIMIT_KEY, query)).toEqual(10);
    expect(getQueryPredicate("age", query)).toEqual(
      createFilter(createOperator("eq", 1))
    );
    expect(getQueryPredicate("some", query)).toBeUndefined();
  });
});

describe("mergeQueriesRight", () => {
  test("should enlist a flatten list of all predicates", () => {
    const leftQuery = createQuery(
      createPredicate(LIMIT_KEY, 10),
      createFilterPredicate("age", createOperator("eq", 1))
    );
    const rightQuery = createQuery(
      createPredicate(LIMIT_KEY, 20),
      createPredicate(SORT_KEY, "name"),
      createFilterPredicate("age", createOperator("in", [1, 2, 3])),
      createFilterPredicate("size", createOperator("eq", 1))
    );

    expect(mergeQueriesRight(leftQuery, rightQuery)).toEqual(
      createQuery(
        createPredicate(LIMIT_KEY, 20),
        createPredicate(SORT_KEY, "name"),
        createFilterPredicate("age", createOperator("in", [1, 2, 3])),
        createFilterPredicate("size", createOperator("eq", 1))
      )
    );
    expect(mergeQueriesRight(leftQuery, rightQuery)).not.toBe(leftQuery);
    expect(mergeQueriesRight(leftQuery, rightQuery)).not.toBe(rightQuery);
  });
});

describe("mutablyDefaultQueryTo", () => {
  test("should enlist a flatten list of all predicates", () => {
    const leftQuery = createQuery(
      createPredicate(LIMIT_KEY, 10),
      createFilterPredicate("age", createOperator("eq", 1)),
      createFilterPredicate("color", createOperator("eq", "red"))
    );
    const rightQuery = createQuery(
      createPredicate(LIMIT_KEY, 20),
      createPredicate(SORT_KEY, "name"),
      createFilterPredicate("age", createOperator("in", [1, 2, 3])),
      createFilterPredicate("size", createOperator("eq", 1))
    );

    expect(mutablyDefaultQueryTo(leftQuery, rightQuery)).toBeUndefined();
    expect(rightQuery).toEqual(
      createQuery(
        createPredicate(LIMIT_KEY, 20),
        createPredicate(SORT_KEY, "name"),
        createFilterPredicate("age", createOperator("in", [1, 2, 3])),
        createFilterPredicate("size", createOperator("eq", 1)),
        createFilterPredicate("color", createOperator("eq", "red"))
      )
    );
    expect(leftQuery).not.toEqual(rightQuery);
  });
});

describe("mutablyOmitQueryPredicate", () => {
  test("should omit a filter if predicate is a filter", () => {
    const query = createQuery(
      createPredicate(LIMIT_KEY, 10),
      createFilterPredicate("age", createOperator("eq", 1)),
      createFilterPredicate("color", createOperator("eq", "red"))
    );

    mutablyOmitQueryPredicate(query, "age");

    expect(query).toEqual(
      createQuery(
        createPredicate(LIMIT_KEY, 10),
        createFilterPredicate("color", createOperator("eq", "red"))
      )
    );
  });

  test("should omit a predicate if predicate is a filter", () => {
    const query = createQuery(
      createPredicate(LIMIT_KEY, 10),
      createFilterPredicate("age", createOperator("eq", 1)),
      createFilterPredicate("color", createOperator("eq", "red"))
    );

    mutablyOmitQueryPredicate(query, LIMIT_KEY);

    expect(query).toEqual(
      createQuery(
        createFilterPredicate("age", createOperator("eq", 1)),
        createFilterPredicate("color", createOperator("eq", "red"))
      )
    );
  });
});

describe("getQueryFilterPredicates", () => {
  test("should omit only filters predicate", () => {
    const query = createQuery(
      createPredicate(SORT_KEY, ["name"]),
      createPredicate(PAGE_KEY, 5),
      createFilterPredicate("name", createOperator("eq", "Anon")),
      createFilterPredicate("gender", createOperator("eq", "?"))
    );

    expect(getQueryFilterPredicates(query)).toEqual([
      createFilterPredicate("name", createOperator("eq", "Anon")),
      createFilterPredicate("gender", createOperator("eq", "?"))
    ]);
  });
});

describe("getQuerySort", () => {
  test("should omit only sort predicate", () => {
    const query = createQuery(
      createPredicate(SORT_KEY, ["name"]),
      createPredicate(PAGE_KEY, 5),
      createFilterPredicate("name", createOperator("eq", "Anon")),
      createFilterPredicate("gender", createOperator("eq", "?"))
    );

    expect(getQuerySort(query)).toEqual(["name"]);
  });
});
