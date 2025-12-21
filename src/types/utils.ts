type Without<T, U> = {
  [P in Exclude<keyof T, keyof U>]: undefined;
};

export type XOR<T, U> = (T & Without<U, T>) | (U & Without<T, U>);
