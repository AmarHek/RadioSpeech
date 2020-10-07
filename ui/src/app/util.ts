export function assertNever(n: never): never {
  throw new Error(JSON.stringify(n) + " should never be a value");
}

export function flatMap<X, Y>(xs: X[], f: (x: X) => Y[]): Y[] {
  let ret: Y[] = [];

  for (let x of xs) {
    ret = ret.concat(f(x));
  }

  return ret;
}

export function refreshPage() {
  window.location.reload();
}

