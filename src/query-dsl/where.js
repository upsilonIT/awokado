import { createFilterPredicate } from "../structs/predicate";

export default (key, ...operators) => createFilterPredicate(key, ...operators);
