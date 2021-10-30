// File with useful functions to import

export function roundTwoDecimals(num) {
  return Math.round(num * 100) / 100;
}

export function toMinutes(ms) {
  return ms / (60 * 1000);
}
