import { compose, join, map, split } from "ramda";

const parseSorting = string => {
  const field = string.replace("-", "");
  const direction = string[0] === "-" ? "desc" : "asc";

  return { field, direction };
};

const serializeSorting = sort => {
  const { field, direction } = sort;

  return `${direction === "desc" ? "-" : ""}${field}`;
};

export default options => ({
  options,
  parse: compose(
    map(parseSorting),
    split(",")
  ),
  serialize: compose(
    join(","),
    map(serializeSorting)
  )
});
