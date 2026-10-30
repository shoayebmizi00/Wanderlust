import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const mql = React.useMemo(
    () => (typeof window === "undefined" ? null : window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)),
    [],
  )

  React.useSyncExternalStore(
    React.useCallback(
      (onChange: () => void) => {
        mql?.addEventListener("change", onChange)
        return () => mql?.removeEventListener("change", onChange)
      },
      [mql],
    ),
    React.useCallback(() => Boolean(mql && !mql.matches), [mql]),
    () => false,
  )

  return !mql?.matches
}
