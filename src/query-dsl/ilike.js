import { ILIKE, createOperator } from "../structs/operator";

export default value => createOperator(ILIKE, value);
