import { equals, head, last } from "ramda";

import { areFiltersEqual, createFilter } from "./filter";

export const INCLUDE_KEY = "include";
export const LIMIT_KEY = "limit";
export const OFFSET_KEY = "offset";
export const PAGE_KEY = "page";
export const SEARCH_KEY = "search";
export const SORT_KEY = "sort";
export const WELL_KNOWN_KEYS = [
  INCLUDE_KEY,
  LIMIT_KEY,
  OFFSET_KEY,
  PAGE_KEY,
  SEARCH_KEY,
  SORT_KEY
];

export const createPredicate = (name, value) => [name, value];

export const getPredicateName = head;

export const getPredicateValue = last;

export const createFilterPredicate = (name, ...opeartors) =>
  createPredicate(name, createFilter(...opeartors));

export const isFilterPredicateName = predicateName =>
  !WELL_KNOWN_KEYS.includes(predicateName);

export const isFilterPredicate = predicate => {
  const predicateName = getPredicateName(predicate);

  return isFilterPredicateName(predicateName);
};

export const arePredicateNamesEqual = (predicate, otherPredicate) =>
  getPredicateName(predicate) === getPredicateName(otherPredicate);

export const arePredicateValuesEqual = (predicate, otherPredicate) => {
  const predicateIsFilter = isFilterPredicate(predicate);
  const otherPredicateIsFilter = isFilterPredicate(otherPredicate);

  if (predicateIsFilter && otherPredicateIsFilter) {
    return areFiltersEqual(
      getPredicateValue(predicate),
      getPredicateValue(otherPredicate)
    );
  } else if (!predicateIsFilter && !otherPredicateIsFilter) {
    return equals(
      getPredicateValue(predicate),
      getPredicateValue(otherPredicate)
    );
  }

  return false;
};

export const arePredicatesEqual = (predicate, otherPredicate) =>
  arePredicateNamesEqual(predicate, otherPredicate) &&
  arePredicateValuesEqual(predicate, otherPredicate);
