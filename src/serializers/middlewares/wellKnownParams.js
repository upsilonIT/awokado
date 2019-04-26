export default (keys, paramsSerializer) => next => {
  const parse = (urlSearchParams, parsedParams) => {
    for (const key of keys) {
      if (urlSearchParams.has(key)) {
        const value = urlSearchParams.get(key);
        const parsedValue = paramsSerializer.parse(key, value);

        parsedParams.set(key, parsedValue);
      }
    }

    return next.parse(urlSearchParams, parsedParams);
  };

  const serialize = (parsedParams, urlSearchParams) => {
    for (const key of keys) {
      if (parsedParams.has(key)) {
        const value = parsedParams.get(key);
        const serializedValue = paramsSerializer.serialize(key, value);

        urlSearchParams.set(key, serializedValue);
      }
    }

    return next.serialize(parsedParams, urlSearchParams);
  };

  return { parse, serialize };
};
