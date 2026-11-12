// ui/dom.js: recovered from the verified GOLDEN HOUR release.

var elementById = (o) => document.getElementById(o);
var createElement = (o, t, e) => {
  let s = document.createElement(o);
  return (t && (s.className = t), e !== void 0 && (s.innerHTML = e), s);
};
var lr = (o) => Math.round(o).toLocaleString("en-US");
var P2 =
  typeof matchMedia == "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;
if (P2 && typeof Element < "u") {
  let o = Element.prototype.animate,
    t = (e) =>
      e.map((s) => {
        let n = {};
        for (let i in s)
          i !== "transform" &&
            i !== "filter" &&
            i !== "letterSpacing" &&
            i !== "width" &&
            i !== "height" &&
            (n[i] = s[i]);
        return n;
      });
  Element.prototype.animate = function (e, s) {
    return o.call(this, Array.isArray(e) ? t(e) : e, s);
  };
}
var escapeHTML = (o) =>
  String(o).replace(
    /[&<>"]/g,
    (t) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
      })[t],
  );

export { P2, createElement, elementById, escapeHTML, lr };
