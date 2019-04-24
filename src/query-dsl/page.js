import { PAGE_KEY, createPredicate } from "../structs/predicate";

export default value => createPredicate(PAGE_KEY, value);
