/* 
  A utility is a generic function that accomplishes an abstract task, and is 
  not project-specific. 

  for project-specific utility functions, see /src/helpers/*
*/

export function callAll(...fns: any) {
  return function (...args: any) {
    return fns.forEach((fn: any) => fn?.(...args));
  };
}

export function sampleOne(arr: any[]): any {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getCustomPropertyValue(property: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(property);
}

export function setCustomPropertyValue(property: string, value: string) {
  document.documentElement.style.setProperty(property, value);
}

/* 
  vw units define the viewport width excluding the scrollbar. to use vw units
  without potential layout shift, we calculate the scrollbar width at the 
  earliest opportunity & save it as a custom property to deduct from vw units.
  
  example usage:   --full-width: calc(100vw - var(--scrollbar-width));

  this prevents ugly side-scrolling behaviour seen on *many* websites.
*/
export function setScrollbarWidthAsCustomProperty() {
  const viewportWidth = window.innerWidth;
  const viewportWidthWithoutScrollbar = document.documentElement.clientWidth;
  const scrollbarWidth = viewportWidth - viewportWidthWithoutScrollbar;

  document.documentElement.style.setProperty(
    '--scrollbar-width',
    `${scrollbarWidth}px`,
  );
}

export function getPrefersReducedMotion() {
  const mediaQueryList = window.matchMedia(
    '(prefers-reduced-motion: no-preference)',
  );
  const prefersReducedMotion = !mediaQueryList.matches;

  return prefersReducedMotion;
}

// Error handling credit to Kent: https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

export async function getDataWithFetch<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    return data;
  } catch (e) {
    const message = getErrorMessage(e);
    throw new Error(`error fetching data from ${endpoint}: ${message}`);
  }
}
