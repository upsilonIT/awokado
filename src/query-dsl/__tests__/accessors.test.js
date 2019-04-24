import { createQuery } from "../../structs/query";
import { createFilterPredicate } from "../../structs/predicate";
import { createFilter } from "../../structs/filter";
import { EQ, createOperator } from "../../structs/operator";
import { hasFilter, readEquals, readFilter } from "..";

describe("hasFilter", () => {
  test("should return true if filter is defined", () => {
    const query = createQuery(
      createFilterPredicate("name", createOperator(EQ, 3))
    );

    expect(hasFilter("name", query)).toEqual(true);
  });

  test("should return false if filter is not defined", () => {
    const query = createQuery();

    expect(hasFilter("name", query)).toEqual(false);
  });
});

describe("readFilter", () => {
  test("should return filter if it is defined", () => {
    const query = createQuery(
      createFilterPredicate("name", createOperator(EQ, "any"))
    );

    expect(readFilter("name", query)).toEqual(
      createFilter(createOperator(EQ, "any"))
    );
  });

  test("should return undefined if filter is not defined", () => {
    const query = createQuery();

    expect(readFilter("name", query)).toBeUndefined();
  });
});

describe("readEquals", () => {
  test("should return equals filter if it is defined", () => {
    const filter = createFilter(createOperator(EQ, "any"));

    expect(readEquals(filter)).toEqual("any");
  });

  test("should return null if equals filter is not defined", () => {
    const filter = createFilter();

    expect(readEquals(filter)).toBeUndefined();
  });

  test("should return null if filter is not defined", () => {
    const filter = null;

    expect(readEquals(filter)).toBeUndefined();
  });
});
