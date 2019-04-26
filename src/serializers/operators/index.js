import { applySpec } from "ramda";

import {
  CONTAINS,
  EMPTY,
  EQ,
  GTE,
  ILIKE,
  IN,
  LTE
} from "../../structs/operator";
import containsOperator from "./contains";
import emptyOperator from "./empty";
import eqOperator from "./eq";
import gteOperator from "./gte";
import iLikeOperator from "./ilike";
import inOperator from "./in";
import lteOperator from "./lte";

const mapping = {
  [EMPTY]: emptyOperator,
  [EQ]: eqOperator,
  [GTE]: gteOperator,
  [IN]: inOperator,
  [LTE]: lteOperator,
  [ILIKE]: iLikeOperator,
  [CONTAINS]: containsOperator
};

export default serializer => {
  const operatorSerializers = applySpec(mapping)(serializer);

  const parse = (key, operator, value) =>
    operatorSerializers[operator].parse(key, value);

  const serialize = (key, operator, value) =>
    operatorSerializers[operator].serialize(key, value);

  return { parse, serialize };
};
