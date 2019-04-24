import { GTE, createOperator } from "../structs/operator";

export default value => createOperator(GTE, value);
