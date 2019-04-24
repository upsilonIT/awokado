import { CONTAINS, createOperator } from "../structs/operator";

export default value => createOperator(CONTAINS, value);
