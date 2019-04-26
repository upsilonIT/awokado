import {
  INCLUDE_KEY,
  LIMIT_KEY,
  OFFSET_KEY,
  PAGE_KEY,
  SEARCH_KEY,
  SORT_KEY,
  WELL_KNOWN_KEYS
} from "../structs/predicate";
import createFilters from "./middlewares/filters";
import createTransformPageToOffset from "./middlewares/transformPageToOffset";
import createWellKnownParams from "./middlewares/wellKnownParams";
import createOperators from "./operators";
import { createUrlParamsSerializer, number, sort, string } from "./params";
import applyMiddleware from "./applyMiddleware";

export const defaultAnnotations = {
  [INCLUDE_KEY]: string(),
  [LIMIT_KEY]: number(),
  [OFFSET_KEY]: number(),
  [PAGE_KEY]: number(),
  [SEARCH_KEY]: string(),
  [SORT_KEY]: sort()
};

export default function createQuerySerializer(userAnnotations) {
  const annotations = {
    ...defaultAnnotations,
    ...userAnnotations
  };

  const params = createUrlParamsSerializer(annotations);
  const operators = createOperators(params);
  const filters = createFilters(operators);
  const wellKnownParams = createWellKnownParams(WELL_KNOWN_KEYS, params);
  const transformPageToOffset = createTransformPageToOffset();

  const middlewares = [wellKnownParams, filters, transformPageToOffset];

  return applyMiddleware(middlewares);
}
