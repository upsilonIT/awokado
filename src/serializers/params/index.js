import { decode, encode } from "./utils";

export { default as bool } from "./bool";

export { default as date } from "./date";

export { default as datetime } from "./datetime";

export { default as json } from "./json";

export { default as maybe } from "./maybe";

export { default as number } from "./number";

export { default as sort } from "./sort";

export { default as string } from "./string";

export { default as array } from "./array";

export const createParamsSerializer = annotations => {
  const parse = (key, value) => annotations[key].parse(value);

  const serialize = (key, value) => {
    if (!annotations[key]) {
      throw Error(`Serializer for field '${key}' is not defined`);
    }

    return annotations[key].serialize(value);
  };

  return { parse, serialize };
};

export const createUrlParamsSerializer = annotations => {
  const { parse, serialize } = createParamsSerializer(annotations);

  return {
    parse: (key, value) => parse(key, decode(value)),
    serialize: (key, value) => serialize(key, encode(value))
  };
};

export default createUrlParamsSerializer;
