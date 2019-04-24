import {
  all,
  curry,
  equals,
  identity,
  length,
  pipe,
  sortBy,
  zipWith
} from "ramda";

import { getOperatorName } from "./operator";

export const createFilter = (...operators) => new Map(operators);

export const getFilterOperatorValue = curry((operatorName, filter) => {
  if (!filter || !filter.has(operatorName)) {
    return undefined;
  }

  return filter.get(operatorName);
});

export const getFilterOperators = filter => [...filter.entries()];

export const getSortedFilterOperators = filter => {
  const operators = getFilterOperators(filter);

  return sortBy(getOperatorName, operators);
};

export const areFiltersEqual = (filter, otherFilter) => {
  const operators = getSortedFilterOperators(filter);
  const otherOperators = getSortedFilterOperators(otherFilter);

  if (length(operators) !== length(otherOperators)) {
    return false;
  }

  const compareOperators = pipe(
    zipWith(equals),
    all(identity)
  );

  return compareOperators(operators, otherOperators);
};

export const mutablySetFilterOperator = (filter, operatorName, operatorValue) =>
  filter.set(operatorName, operatorValue);
