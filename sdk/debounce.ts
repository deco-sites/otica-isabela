// deno-lint-ignore-file no-explicit-any
export default function (fn: (...args: any) => void, s: number) {
  let timeout: number;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, s, ...args);
  };
}
