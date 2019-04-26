export default function combineMiddlewares(middlewares) {
  const emptyMiddleware = {
    parse: (urlSearchParams, parsedParams) => parsedParams,
    serialize: (parsedParams, urlSearchParams) => urlSearchParams
  };

  return middlewares.reduceRight(
    (prevMiddleware, creator) => creator(prevMiddleware),
    emptyMiddleware
  );
}
