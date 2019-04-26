import { type } from "ramda";

const isString = value => type(value) === "String";

export const encode = value =>
  isString(value) ? encodeURIComponent(value) : value;

export const decode = value =>
  isString(value) ? decodeURIComponent(value) : value;
