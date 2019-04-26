import { EQ, GTE, IN, LTE } from "../../../structs/operator";
import createEqOperator from "../eq";
import createGteOperator from "../gte";
import createInOperator from "../in";
import createLteOperator from "../lte";
import createOperatorSerializer from "..";

const serializer = {
  parse: (_, value) => value,
  serialize: (_, value) => value
};
const operatorSerializer = createOperatorSerializer(serializer);
const eqOperator = createEqOperator(serializer);
const gteOperator = createGteOperator(serializer);
const lteOperator = createLteOperator(serializer);
const inOperator = createInOperator(serializer);

test("should parse key[eq] as equality operator", () => {
  expect(operatorSerializer.parse("key", EQ, "123")).toEqual(
    eqOperator.parse("key", "123")
  );
});

test("should parse key[gte] as greater than or equal operator", () => {
  expect(operatorSerializer.parse("key", GTE, "123")).toEqual(
    gteOperator.parse("key", "123")
  );
});

test("should parse key[lte] as less than or equal operator", () => {
  expect(operatorSerializer.parse("key", LTE, "123")).toEqual(
    lteOperator.parse("key", "123")
  );
});

test("should parse key[in] as includes operator", () => {
  expect(operatorSerializer.parse("key", IN, "1,2,3,4")).toEqual(
    inOperator.parse("key", "1,2,3,4")
  );
});

test("should serialize key[eq] as equality operator", () => {
  expect(operatorSerializer.serialize("key", EQ, "123")).toEqual(
    eqOperator.serialize("key", "123")
  );
});

test("should serialize key[gte] as greater than or equal operator", () => {
  expect(operatorSerializer.serialize("key", GTE, "123")).toEqual(
    gteOperator.serialize("key", "123")
  );
});

test("should serialize key[lte] as less than or equal operator", () => {
  expect(operatorSerializer.serialize("key", LTE, "123")).toEqual(
    lteOperator.serialize("key", "123")
  );
});

test("should serialize key[in] as includes operator", () => {
  expect(operatorSerializer.serialize("key", IN, ["1", "2", "3"])).toEqual(
    inOperator.serialize("key", ["1", "2", "3"])
  );
});
