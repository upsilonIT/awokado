import {
  IN,
  createOperator,
  getOperatorName,
  getOperatorValue
} from "../operator";

describe("getOperatorName", () => {
  test("should return the operator name", () => {
    const operator = createOperator(IN, [3]);

    expect(getOperatorName(operator)).toEqual(IN);
  });
});

describe("getOperatorValue", () => {
  test("should return the operator value", () => {
    const operator = createOperator(IN, [3]);

    expect(getOperatorValue(operator)).toEqual([3]);
  });
});
