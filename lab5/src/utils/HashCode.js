export const hashCode = function (s) {
  let h = 0, i = s.length;
  while (i > 0) {
    h = (h << 5) - h + s.charCodeAt(--i) | 0;
  }
  return h;
};