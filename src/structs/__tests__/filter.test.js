import {
  areFiltersEqual,
  createFilter,
  getFilterOperatorValue
} from "../filter";
import { EQ, IN, createOperator } from "../operator";

describe("areFiltersEqual", () => {
  test("should be equal if content match", () => {
    const filter = createFilter(createOperator(EQ, 0), createOperator(IN, [4]));
    const cloneFilter = createFilter(
      createOperator(IN, [4]),
      createOperator(EQ, 0)
    );
    const differentFilter = createFilter(
      createOperator(EQ, 0),
      createOperator(IN, [4, 5])
    );
    const oneMoreDifferentFilter = createFilter(
      createOperator(EQ, 1),
      createOperator(IN, [4, 5])
    );

    expect(areFiltersEqual(filter, cloneFilter)).toEqual(true);
    expect(areFiltersEqual(filter, differentFilter)).toEqual(false);
    expect(areFiltersEqual(filter, oneMoreDifferentFilter)).toEqual(false);
  });

  test("should return false if just names match", () => {
    const filter = createFilter(createOperator(IN, 4));
    const differentFilter = createFilter(createOperator(EQ, 4));

    expect(areFiltersEqual(filter, differentFilter)).toEqual(false);
  });
});

describe("getFilterOperatorValue", () => {
  const filter = createFilter(createOperator(EQ, 0), createOperator(IN, [4]));

  test("should return value if operator exists", () => {
    expect(getFilterOperatorValue(EQ, filter)).toEqual(0);
    expect(getFilterOperatorValue(IN, filter)).toEqual([4]);
  });

  test("should return null if operator does not exists", () => {
    expect(getFilterOperatorValue("unknown", filter)).toBeUndefined();
  });
});
