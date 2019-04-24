import { SEARCH_KEY, createPredicate } from "../structs/predicate";

export default value => createPredicate(SEARCH_KEY, value);
