export default () => next => {
  const serialize = (parsedParams, searchParams) => {
    const limit = parsedParams.get("limit");
    const page = parsedParams.get("page");

    if (page && limit) {
      searchParams.set("offset", limit * page);
    }

    searchParams.delete("page");

    return next.serialize(parsedParams, searchParams);
  };

  return { parse: next.parse, serialize };
};
