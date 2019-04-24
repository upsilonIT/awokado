import { head, last } from "ramda";

export const CONTAINS = "contains";
export const EMPTY = "empty";
export const EQ = "eq";
export const GTE = "gte";
export const ILIKE = "ilike";
export const IN = "in";
export const LTE = "lte";

export const createOperator = (name, value) => [name, value];

export const getOperatorName = head;

export const getOperatorValue = last;
