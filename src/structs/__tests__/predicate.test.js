import { IN, createOperator } from "../operator";
import {
  LIMIT_KEY,
  arePredicatesEqual,
  createFilterPredicate,
  createPredicate,
  getPredicateName,
  getPredicateValue,
  isFilterPredicate
} from "../predicate";

describe("arePredicatesEqual", () => {
  test("should be equal if content match", () => {
    const predicate = createPredicate(LIMIT_KEY, 10);
    const clonePredicate = createPredicate(LIMIT_KEY, 10);
    const differentPredicate = createPredicate(LIMIT_KEY, 11);

    expect(arePredicatesEqual(predicate, clonePredicate)).toEqual(true);
    expect(arePredicatesEqual(predicate, differentPredicate)).toEqual(false);
  });

  test("should be equal if filter content match", () => {
    const predicate = createFilterPredicate("age", createOperator(IN, [3]));
    const clonePredicate = createFilterPredicate(
      "age",
      createOperator(IN, [3])
    );
    const differentPredicate = createFilterPredicate(
      "age",
      createOperator(IN, [4])
    );

    expect(arePredicatesEqual(predicate, clonePredicate)).toEqual(true);
    expect(arePredicatesEqual(predicate, differentPredicate)).toEqual(false);
  });

  test("should not be equal if just filter names match", () => {
    const predicate = createFilterPredicate("age", createOperator(IN, [3]));
    const differentPredicate = createFilterPredicate(
      "counts",
      createOperator(IN, [3])
    );

    expect(arePredicatesEqual(predicate, differentPredicate)).toEqual(false);
  });
});

describe("getPredicateName", () => {
  test("should return the predicate name", () => {
    const predicate = createPredicate(LIMIT_KEY, 10);

    expect(getPredicateName(predicate)).toEqual(LIMIT_KEY);
  });
});

describe("getPredicateValue", () => {
  test("should return the predicate values", () => {
    const predicate = createPredicate(LIMIT_KEY, 10);

    expect(getPredicateValue(predicate)).toEqual(10);
  });
});

describe("isFilterPredicate", () => {
  test("should check if predicate name is a well-known name", () => {
    const filterPredicate = createFilterPredicate("age");
    const predicate = createPredicate(LIMIT_KEY, null);

    expect(isFilterPredicate(filterPredicate)).toEqual(true);
    expect(isFilterPredicate(predicate)).toEqual(false);
  });
});
