import { cloneQuery } from "../structs/query";
import { query } from "../query-dsl";

import combineMiddlewares from "./combineMiddlewares";

export default function applyMiddlware(middlewares) {
  const serializer = combineMiddlewares(middlewares);

  const parse = urlSearchParams => {
    const parsedParams = query();

    serializer.parse(urlSearchParams, parsedParams);

    return parsedParams;
  };

  const serialize = parsedParams => {
    const clonedQuery = cloneQuery(parsedParams);
    const urlSearchParams = new URLSearchParams();

    serializer.serialize(clonedQuery, urlSearchParams);

    return urlSearchParams;
  };

  return { parse, serialize };
}
