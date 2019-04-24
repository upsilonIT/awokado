import { LIMIT_KEY, createPredicate } from "../structs/predicate";

export default value => createPredicate(LIMIT_KEY, value);
