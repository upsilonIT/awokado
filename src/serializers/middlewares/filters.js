import {
  createFilter,
  getFilterOperators,
  mutablySetFilterOperator
} from "../../structs/filter";
import { getOperatorName, getOperatorValue } from "../../structs/operator";
import {
  getPredicateName,
  getPredicateValue,
  isFilterPredicate
} from "../../structs/predicate";
import {
  getQueryFilter,
  getQueryPredicates,
  mutablySetQueryFilter
} from "../../structs/query";

const filterPattern = /(\w+)\[(\w+)\]/;

export default operatorsSerializer => next => {
  const parse = (urlSearchParams, parsedParams) => {
    for (const [key, value] of urlSearchParams.entries()) {
      if (filterPattern.test(key)) {
        const [, filterName, operator] = key.match(filterPattern);
        const parsedValue = operatorsSerializer.parse(
          filterName,
          operator,
          value
        );

        const filter =
          getQueryFilter(filterName, parsedParams) || createFilter();

        mutablySetFilterOperator(filter, operator, parsedValue);
        mutablySetQueryFilter(parsedParams, filterName, filter);
      }
    }

    return next.parse(urlSearchParams, parsedParams);
  };

  const serialize = (parsedParams, urlSearchParams) => {
    const predicates = getQueryPredicates(parsedParams);
    const filterPredicates = predicates.filter(predicate =>
      isFilterPredicate(predicate)
    );

    filterPredicates.forEach(predicate => {
      const filterName = getPredicateName(predicate);
      const filter = getPredicateValue(predicate);
      const operators = getFilterOperators(filter);

      operators.forEach(operator => {
        const operatorName = getOperatorName(operator);
        const operatorValue = getOperatorValue(operator);
        const serializedValue = operatorsSerializer.serialize(
          filterName,
          operatorName,
          operatorValue
        );

        urlSearchParams.set(`${filterName}[${operatorName}]`, serializedValue);
      });
    });

    return next.serialize(parsedParams, urlSearchParams);
  };

  return { parse, serialize };
};
