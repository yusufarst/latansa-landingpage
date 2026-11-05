import { PUBLISHABLE_STATUSES, type Fact } from "./types";

/** True when a fact has a value and a status that allows public display. */
export function isPublishable<T>(fact: Fact<T>): fact is Fact<T> & { value: T } {
  return fact.value !== null && PUBLISHABLE_STATUSES.includes(fact.status);
}

/**
 * The fact's value when publishable, otherwise `null`. Use this for every
 * non-"required" fact in UI code and render nothing when it returns `null`:
 *
 *   const hours = publishedValue(company.officeHours);
 *   {hours && <p>{hours}</p>}
 *
 * `content:check` rejects direct `company.<optional fact>.value` access in
 * src/app and src/components.
 */
export function publishedValue<T>(fact: Fact<T>): T | null {
  return isPublishable(fact) ? fact.value : null;
}
