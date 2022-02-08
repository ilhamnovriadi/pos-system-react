export function formatUang(num) {
  var p = num.toFixed().split(".");
  return (
    "Rp" +
    p[0]
      .split("")
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num + (num !== "-" && i && !(i % 3) ? "," : "") + acc;
      }, "")
  );
}
