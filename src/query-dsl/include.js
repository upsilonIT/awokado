import { INCLUDE_KEY, createPredicate } from "../structs/predicate";

export default (...values) => createPredicate(INCLUDE_KEY, values);
