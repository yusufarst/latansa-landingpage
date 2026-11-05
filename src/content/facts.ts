import { PUBLISHABLE_STATUSES, type Fact } from "./types";

/** True when a fact has a value and a status that allows public display. */
export function isPublishable<T>(fact: Fact<T>): fact is Fact<T> & { value: T } {
  return fact.value !== null && PUBLISHABLE_STATUSES.includes(fact.status);
}
