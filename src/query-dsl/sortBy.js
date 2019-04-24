import { flatten } from "ramda";

import { SORT_KEY, createPredicate } from "../structs/predicate";

export default (...sortings) => createPredicate(SORT_KEY, flatten(sortings));
