import { all, curry, identity, length, pipe, sortBy, zipWith } from "ramda";

import {
  arePredicatesEqual,
  createPredicate,
  getPredicateName,
  isFilterPredicate,
  isFilterPredicateName
} from "./predicate";

const getQueryNonFilterPredicates = query =>
  [...query.entries()].filter(
    predicate => getPredicateName(predicate) !== "filters"
  );

export const getQueryFilterPredicates = query => [
  ...query.get("filters").entries()
];

export const getQuerySort = query => query.get("sort");

export const createQuery = (...predicates) => {
  const queries = [];
  const filters = [];

  for (const predicate of predicates) {
    if (isFilterPredicate(predicate)) {
      filters.push(predicate);
    } else {
      queries.push(predicate);
    }
  }

  return new Map([...queries, createPredicate("filters", new Map(filters))]);
};

export const hasQueryFilter = curry((filterName, query) => {
  const filters = query.get("filters");

  return filters.has(filterName);
});

export const getQueryFilter = curry((filterName, query) => {
  const filters = query.get("filters");

  return filters.get(filterName);
});

export const getQueryPredicates = query => {
  const predicates = getQueryNonFilterPredicates(query);
  const filterPredicates = getQueryFilterPredicates(query);

  return [...predicates, ...filterPredicates];
};

export const getSortedQueryPredicates = query => {
  const predicates = getQueryPredicates(query);

  return sortBy(getPredicateName, predicates);
};

export const getQueryPredicate = (predicateName, query) => {
  if (isFilterPredicateName(predicateName)) {
    return getQueryFilter(predicateName, query);
  }

  return query.get(predicateName);
};

export const hasQueryPredicate = (predicateName, query) => {
  if (isFilterPredicateName(predicateName)) {
    return hasQueryFilter(predicateName, query);
  }

  return query.has(predicateName);
};

export const cloneQuery = query => {
  const predicates = getQueryPredicates(query);

  return createQuery(...predicates);
};

export const areQueriesEqual = (query, anotherQuery) => {
  const predicates = getSortedQueryPredicates(query);
  const otherPredicates = getSortedQueryPredicates(anotherQuery);

  if (length(predicates) !== length(otherPredicates)) {
    return false;
  }

  const comparePredicates = pipe(
    zipWith(arePredicatesEqual),
    all(identity)
  );

  return comparePredicates(predicates, otherPredicates);
};

export const mergeQueriesRight = (leftQuery, rightQuery) => {
  const predicates = [
    ...getQueryPredicates(leftQuery),
    ...getQueryPredicates(rightQuery)
  ];

  return createQuery(...predicates);
};

export const mutablySetQueryFilter = (query, filterName, filterValue) =>
  query.get("filters").set(filterName, filterValue);

export const mutablyDefaultQueryTo = (defaultQuery, newQuery) => {
  const mergedQuery = mergeQueriesRight(defaultQuery, newQuery);

  newQuery.clear();

  mergedQuery.forEach((value, key) => newQuery.set(key, value));
};

export const mutablyOmitQueryPredicate = (query, predicateName) => {
  if (isFilterPredicateName(predicateName)) {
    query.get("filters").delete(predicateName);
  } else {
    query.delete(predicateName);
  }
};
