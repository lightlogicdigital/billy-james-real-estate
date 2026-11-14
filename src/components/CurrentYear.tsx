"use client";

import { useSyncExternalStore } from "react";

/** Prerendered HTML uses the build year; the browser swaps in the real current year. */
const BUILD_YEAR = 2026;
const subscribe = () => () => {};

export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => BUILD_YEAR,
  );
  return <>{year}</>;
}
