/** Uのプロパティをすべてundefinedにした型 */
type Without<T, U> = {
  [P in Exclude<keyof T, keyof U>]: undefined;
};

/** TかUのどちらか一方のみを許容する型 */
export type XOR<T, U> = (T & Without<U, T>) | (U & Without<T, U>);
