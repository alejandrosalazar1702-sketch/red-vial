/* Funciones matemáticas puras del proyecto: regresión lineal y cuadrática. */
(function (root) {
  function mean(a) { return a.reduce(function (s, x) { return s + x; }, 0) / a.length; }

  /* Recta y = m·x + b por mínimos cuadrados. */
  function linfit(xs, ys) {
    var n = xs.length;
    if (n < 2) return null;
    var mx = mean(xs), my = mean(ys), sxx = 0, sxy = 0, i;
    for (i = 0; i < n; i++) { sxx += (xs[i] - mx) * (xs[i] - mx); sxy += (xs[i] - mx) * (ys[i] - my); }
    if (sxx < 1e-12) return null;
    var m = sxy / sxx, b = my - m * mx, sst = 0, ssr = 0;
    for (i = 0; i < n; i++) { var e = ys[i] - (m * xs[i] + b); ssr += e * e; sst += (ys[i] - my) * (ys[i] - my); }
    return { m: m, b: b, r2: sst < 1e-12 ? 1 : 1 - ssr / sst, n: n };
  }

  /* Parábola y = c0 + c1·u + c2·u², con u = x − promedio(x), por mínimos cuadrados. */
  function quadfit(xs, ys) {
    var n = xs.length;
    if (n < 3) return null;
    var hb = mean(xs), u = xs.map(function (x) { return x - hb; }), i, j, k;
    var S = [n, 0, 0, 0, 0], T = [0, 0, 0];
    for (i = 0; i < n; i++) {
      var p = 1;
      for (j = 1; j <= 4; j++) { p *= u[i]; S[j] += p; }
      T[0] += ys[i]; T[1] += u[i] * ys[i]; T[2] += u[i] * u[i] * ys[i];
    }
    var A = [[S[0], S[1], S[2], T[0]], [S[1], S[2], S[3], T[1]], [S[2], S[3], S[4], T[2]]];
    for (i = 0; i < 3; i++) {
      var piv = i;
      for (j = i + 1; j < 3; j++) if (Math.abs(A[j][i]) > Math.abs(A[piv][i])) piv = j;
      if (Math.abs(A[piv][i]) < 1e-12) return null;
      var tmp = A[i]; A[i] = A[piv]; A[piv] = tmp;
      for (j = i + 1; j < 3; j++) {
        var f = A[j][i] / A[i][i];
        for (k = i; k < 4; k++) A[j][k] -= f * A[i][k];
      }
    }
    var c = [0, 0, 0];
    for (i = 2; i >= 0; i--) {
      var s = A[i][3];
      for (j = i + 1; j < 3; j++) s -= A[i][j] * c[j];
      c[i] = s / A[i][i];
    }
    var my = mean(ys), sst = 0, ssr = 0;
    for (i = 0; i < n; i++) {
      var e = ys[i] - (c[0] + c[1] * u[i] + c[2] * u[i] * u[i]);
      ssr += e * e; sst += (ys[i] - my) * (ys[i] - my);
    }
    var out = { c0: c[0], c1: c[1], c2: c[2], hbar: hb, r2: sst < 1e-12 ? 1 : 1 - ssr / sst, n: n, concave: c[2] < 0 };
    if (out.concave) {
      out.hp = hb - c[1] / (2 * c[2]);
      out.kmax = c[0] - c[1] * c[1] / (4 * c[2]);
      out.al = -c[2];
    }
    return out;
  }

  var api = { linfit: linfit, quadfit: quadfit };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.RVfit = api;
})(typeof self !== 'undefined' ? self : this);
