var Tt = Object.defineProperty;
var _t = (l, e, r) => e in l ? Tt(l, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : l[e] = r;
var le = (l, e, r) => _t(l, typeof e != "symbol" ? e + "" : e, r);
import n, { useRef as Ut, useCallback as At } from "react";
import ne, { Toaster as $t } from "react-hot-toast";
import { Info as Pt, AlertCircle as It, XCircle as Dt, CheckCircle as Ot, Loader2 as zt, Save as Mt, X as Lt, EyeOff as Ft, Eye as Nt, Settings as Wt, LogOut as Vt } from "lucide-react";
import { motion as ie, AnimatePresence as Bt } from "framer-motion";
var Ae = { exports: {} }, fe = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ke;
function qt() {
  if (Ke) return fe;
  Ke = 1;
  var l = n, e = Symbol.for("react.element"), r = Symbol.for("react.fragment"), o = Object.prototype.hasOwnProperty, c = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, u = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(m, f, d) {
    var g, b = {}, $ = null, S = null;
    d !== void 0 && ($ = "" + d), f.key !== void 0 && ($ = "" + f.key), f.ref !== void 0 && (S = f.ref);
    for (g in f) o.call(f, g) && !u.hasOwnProperty(g) && (b[g] = f[g]);
    if (m && m.defaultProps) for (g in f = m.defaultProps, f) b[g] === void 0 && (b[g] = f[g]);
    return { $$typeof: e, type: m, key: $, ref: S, props: b, _owner: c.current };
  }
  return fe.Fragment = r, fe.jsx = s, fe.jsxs = s, fe;
}
var pe = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Je;
function Ht() {
  return Je || (Je = 1, process.env.NODE_ENV !== "production" && function() {
    var l = n, e = Symbol.for("react.element"), r = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), s = Symbol.for("react.provider"), m = Symbol.for("react.context"), f = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), g = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), $ = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), P = Symbol.iterator, W = "@@iterator";
    function I(t) {
      if (t === null || typeof t != "object")
        return null;
      var a = P && t[P] || t[W];
      return typeof a == "function" ? a : null;
    }
    var O = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function v(t) {
      {
        for (var a = arguments.length, p = new Array(a > 1 ? a - 1 : 0), R = 1; R < a; R++)
          p[R - 1] = arguments[R];
        N("error", t, p);
      }
    }
    function N(t, a, p) {
      {
        var R = O.ReactDebugCurrentFrame, M = R.getStackAddendum();
        M !== "" && (a += "%s", p = p.concat([M]));
        var F = p.map(function(U) {
          return String(U);
        });
        F.unshift("Warning: " + a), Function.prototype.apply.call(console[t], console, F);
      }
    }
    var A = !1, J = !1, G = !1, E = !1, y = !1, D;
    D = Symbol.for("react.module.reference");
    function x(t) {
      return !!(typeof t == "string" || typeof t == "function" || t === o || t === u || y || t === c || t === d || t === g || E || t === S || A || J || G || typeof t == "object" && t !== null && (t.$$typeof === $ || t.$$typeof === b || t.$$typeof === s || t.$$typeof === m || t.$$typeof === f || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      t.$$typeof === D || t.getModuleId !== void 0));
    }
    function w(t, a, p) {
      var R = t.displayName;
      if (R)
        return R;
      var M = a.displayName || a.name || "";
      return M !== "" ? p + "(" + M + ")" : p;
    }
    function j(t) {
      return t.displayName || "Context";
    }
    function h(t) {
      if (t == null)
        return null;
      if (typeof t.tag == "number" && v("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof t == "function")
        return t.displayName || t.name || null;
      if (typeof t == "string")
        return t;
      switch (t) {
        case o:
          return "Fragment";
        case r:
          return "Portal";
        case u:
          return "Profiler";
        case c:
          return "StrictMode";
        case d:
          return "Suspense";
        case g:
          return "SuspenseList";
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case m:
            var a = t;
            return j(a) + ".Consumer";
          case s:
            var p = t;
            return j(p._context) + ".Provider";
          case f:
            return w(t, t.render, "ForwardRef");
          case b:
            var R = t.displayName || null;
            return R !== null ? R : h(t.type) || "Memo";
          case $: {
            var M = t, F = M._payload, U = M._init;
            try {
              return h(U(F));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var L = Object.assign, C = 0, q, z, _, V, X, k, B;
    function ee() {
    }
    ee.__reactDisabledLog = !0;
    function $e() {
      {
        if (C === 0) {
          q = console.log, z = console.info, _ = console.warn, V = console.error, X = console.group, k = console.groupCollapsed, B = console.groupEnd;
          var t = {
            configurable: !0,
            enumerable: !0,
            value: ee,
            writable: !0
          };
          Object.defineProperties(console, {
            info: t,
            log: t,
            warn: t,
            error: t,
            group: t,
            groupCollapsed: t,
            groupEnd: t
          });
        }
        C++;
      }
    }
    function rt() {
      {
        if (C--, C === 0) {
          var t = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: L({}, t, {
              value: q
            }),
            info: L({}, t, {
              value: z
            }),
            warn: L({}, t, {
              value: _
            }),
            error: L({}, t, {
              value: V
            }),
            group: L({}, t, {
              value: X
            }),
            groupCollapsed: L({}, t, {
              value: k
            }),
            groupEnd: L({}, t, {
              value: B
            })
          });
        }
        C < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ee = O.ReactCurrentDispatcher, Ce;
    function ge(t, a, p) {
      {
        if (Ce === void 0)
          try {
            throw Error();
          } catch (M) {
            var R = M.stack.trim().match(/\n( *(at )?)/);
            Ce = R && R[1] || "";
          }
        return `
` + Ce + t;
      }
    }
    var ke = !1, he;
    {
      var nt = typeof WeakMap == "function" ? WeakMap : Map;
      he = new nt();
    }
    function Pe(t, a) {
      if (!t || ke)
        return "";
      {
        var p = he.get(t);
        if (p !== void 0)
          return p;
      }
      var R;
      ke = !0;
      var M = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var F;
      F = Ee.current, Ee.current = null, $e();
      try {
        if (a) {
          var U = function() {
            throw Error();
          };
          if (Object.defineProperty(U.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(U, []);
            } catch (Q) {
              R = Q;
            }
            Reflect.construct(t, [], U);
          } else {
            try {
              U.call();
            } catch (Q) {
              R = Q;
            }
            t.call(U.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Q) {
            R = Q;
          }
          t();
        }
      } catch (Q) {
        if (Q && R && typeof Q.stack == "string") {
          for (var T = Q.stack.split(`
`), Z = R.stack.split(`
`), H = T.length - 1, Y = Z.length - 1; H >= 1 && Y >= 0 && T[H] !== Z[Y]; )
            Y--;
          for (; H >= 1 && Y >= 0; H--, Y--)
            if (T[H] !== Z[Y]) {
              if (H !== 1 || Y !== 1)
                do
                  if (H--, Y--, Y < 0 || T[H] !== Z[Y]) {
                    var te = `
` + T[H].replace(" at new ", " at ");
                    return t.displayName && te.includes("<anonymous>") && (te = te.replace("<anonymous>", t.displayName)), typeof t == "function" && he.set(t, te), te;
                  }
                while (H >= 1 && Y >= 0);
              break;
            }
        }
      } finally {
        ke = !1, Ee.current = F, rt(), Error.prepareStackTrace = M;
      }
      var se = t ? t.displayName || t.name : "", oe = se ? ge(se) : "";
      return typeof t == "function" && he.set(t, oe), oe;
    }
    function ot(t, a, p) {
      return Pe(t, !1);
    }
    function it(t) {
      var a = t.prototype;
      return !!(a && a.isReactComponent);
    }
    function me(t, a, p) {
      if (t == null)
        return "";
      if (typeof t == "function")
        return Pe(t, it(t));
      if (typeof t == "string")
        return ge(t);
      switch (t) {
        case d:
          return ge("Suspense");
        case g:
          return ge("SuspenseList");
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case f:
            return ot(t.render);
          case b:
            return me(t.type, a, p);
          case $: {
            var R = t, M = R._payload, F = R._init;
            try {
              return me(F(M), a, p);
            } catch {
            }
          }
        }
      return "";
    }
    var de = Object.prototype.hasOwnProperty, Ie = {}, De = O.ReactDebugCurrentFrame;
    function be(t) {
      if (t) {
        var a = t._owner, p = me(t.type, t._source, a ? a.type : null);
        De.setExtraStackFrame(p);
      } else
        De.setExtraStackFrame(null);
    }
    function at(t, a, p, R, M) {
      {
        var F = Function.call.bind(de);
        for (var U in t)
          if (F(t, U)) {
            var T = void 0;
            try {
              if (typeof t[U] != "function") {
                var Z = Error((R || "React class") + ": " + p + " type `" + U + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof t[U] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Z.name = "Invariant Violation", Z;
              }
              T = t[U](a, U, R, p, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (H) {
              T = H;
            }
            T && !(T instanceof Error) && (be(M), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", R || "React class", p, U, typeof T), be(null)), T instanceof Error && !(T.message in Ie) && (Ie[T.message] = !0, be(M), v("Failed %s type: %s", p, T.message), be(null));
          }
      }
    }
    var st = Array.isArray;
    function Se(t) {
      return st(t);
    }
    function lt(t) {
      {
        var a = typeof Symbol == "function" && Symbol.toStringTag, p = a && t[Symbol.toStringTag] || t.constructor.name || "Object";
        return p;
      }
    }
    function ct(t) {
      try {
        return Oe(t), !1;
      } catch {
        return !0;
      }
    }
    function Oe(t) {
      return "" + t;
    }
    function ze(t) {
      if (ct(t))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", lt(t)), Oe(t);
    }
    var Me = O.ReactCurrentOwner, ut = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Le, Fe;
    function dt(t) {
      if (de.call(t, "ref")) {
        var a = Object.getOwnPropertyDescriptor(t, "ref").get;
        if (a && a.isReactWarning)
          return !1;
      }
      return t.ref !== void 0;
    }
    function ft(t) {
      if (de.call(t, "key")) {
        var a = Object.getOwnPropertyDescriptor(t, "key").get;
        if (a && a.isReactWarning)
          return !1;
      }
      return t.key !== void 0;
    }
    function pt(t, a) {
      typeof t.ref == "string" && Me.current;
    }
    function gt(t, a) {
      {
        var p = function() {
          Le || (Le = !0, v("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", a));
        };
        p.isReactWarning = !0, Object.defineProperty(t, "key", {
          get: p,
          configurable: !0
        });
      }
    }
    function ht(t, a) {
      {
        var p = function() {
          Fe || (Fe = !0, v("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", a));
        };
        p.isReactWarning = !0, Object.defineProperty(t, "ref", {
          get: p,
          configurable: !0
        });
      }
    }
    var mt = function(t, a, p, R, M, F, U) {
      var T = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: t,
        key: a,
        ref: p,
        props: U,
        // Record the component responsible for creating this element.
        _owner: F
      };
      return T._store = {}, Object.defineProperty(T._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(T, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: R
      }), Object.defineProperty(T, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: M
      }), Object.freeze && (Object.freeze(T.props), Object.freeze(T)), T;
    };
    function bt(t, a, p, R, M) {
      {
        var F, U = {}, T = null, Z = null;
        p !== void 0 && (ze(p), T = "" + p), ft(a) && (ze(a.key), T = "" + a.key), dt(a) && (Z = a.ref, pt(a, M));
        for (F in a)
          de.call(a, F) && !ut.hasOwnProperty(F) && (U[F] = a[F]);
        if (t && t.defaultProps) {
          var H = t.defaultProps;
          for (F in H)
            U[F] === void 0 && (U[F] = H[F]);
        }
        if (T || Z) {
          var Y = typeof t == "function" ? t.displayName || t.name || "Unknown" : t;
          T && gt(U, Y), Z && ht(U, Y);
        }
        return mt(t, T, Z, M, R, Me.current, U);
      }
    }
    var Re = O.ReactCurrentOwner, Ne = O.ReactDebugCurrentFrame;
    function ae(t) {
      if (t) {
        var a = t._owner, p = me(t.type, t._source, a ? a.type : null);
        Ne.setExtraStackFrame(p);
      } else
        Ne.setExtraStackFrame(null);
    }
    var je;
    je = !1;
    function Te(t) {
      return typeof t == "object" && t !== null && t.$$typeof === e;
    }
    function We() {
      {
        if (Re.current) {
          var t = h(Re.current.type);
          if (t)
            return `

Check the render method of \`` + t + "`.";
        }
        return "";
      }
    }
    function vt(t) {
      return "";
    }
    var Ve = {};
    function xt(t) {
      {
        var a = We();
        if (!a) {
          var p = typeof t == "string" ? t : t.displayName || t.name;
          p && (a = `

Check the top-level render call using <` + p + ">.");
        }
        return a;
      }
    }
    function Be(t, a) {
      {
        if (!t._store || t._store.validated || t.key != null)
          return;
        t._store.validated = !0;
        var p = xt(a);
        if (Ve[p])
          return;
        Ve[p] = !0;
        var R = "";
        t && t._owner && t._owner !== Re.current && (R = " It was passed a child from " + h(t._owner.type) + "."), ae(t), v('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', p, R), ae(null);
      }
    }
    function qe(t, a) {
      {
        if (typeof t != "object")
          return;
        if (Se(t))
          for (var p = 0; p < t.length; p++) {
            var R = t[p];
            Te(R) && Be(R, a);
          }
        else if (Te(t))
          t._store && (t._store.validated = !0);
        else if (t) {
          var M = I(t);
          if (typeof M == "function" && M !== t.entries)
            for (var F = M.call(t), U; !(U = F.next()).done; )
              Te(U.value) && Be(U.value, a);
        }
      }
    }
    function yt(t) {
      {
        var a = t.type;
        if (a == null || typeof a == "string")
          return;
        var p;
        if (typeof a == "function")
          p = a.propTypes;
        else if (typeof a == "object" && (a.$$typeof === f || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        a.$$typeof === b))
          p = a.propTypes;
        else
          return;
        if (p) {
          var R = h(a);
          at(p, t.props, "prop", R, t);
        } else if (a.PropTypes !== void 0 && !je) {
          je = !0;
          var M = h(a);
          v("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", M || "Unknown");
        }
        typeof a.getDefaultProps == "function" && !a.getDefaultProps.isReactClassApproved && v("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function wt(t) {
      {
        for (var a = Object.keys(t.props), p = 0; p < a.length; p++) {
          var R = a[p];
          if (R !== "children" && R !== "key") {
            ae(t), v("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", R), ae(null);
            break;
          }
        }
        t.ref !== null && (ae(t), v("Invalid attribute `ref` supplied to `React.Fragment`."), ae(null));
      }
    }
    var He = {};
    function Ye(t, a, p, R, M, F) {
      {
        var U = x(t);
        if (!U) {
          var T = "";
          (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (T += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Z = vt();
          Z ? T += Z : T += We();
          var H;
          t === null ? H = "null" : Se(t) ? H = "array" : t !== void 0 && t.$$typeof === e ? (H = "<" + (h(t.type) || "Unknown") + " />", T = " Did you accidentally export a JSX literal instead of a component?") : H = typeof t, v("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", H, T);
        }
        var Y = bt(t, a, p, M, F);
        if (Y == null)
          return Y;
        if (U) {
          var te = a.children;
          if (te !== void 0)
            if (R)
              if (Se(te)) {
                for (var se = 0; se < te.length; se++)
                  qe(te[se], t);
                Object.freeze && Object.freeze(te);
              } else
                v("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              qe(te, t);
        }
        if (de.call(a, "key")) {
          var oe = h(t), Q = Object.keys(a).filter(function(jt) {
            return jt !== "key";
          }), _e = Q.length > 0 ? "{key: someKey, " + Q.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!He[oe + _e]) {
            var Rt = Q.length > 0 ? "{" + Q.join(": ..., ") + ": ...}" : "{}";
            v(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, _e, oe, Rt, oe), He[oe + _e] = !0;
          }
        }
        return t === o ? wt(Y) : yt(Y), Y;
      }
    }
    function Et(t, a, p) {
      return Ye(t, a, p, !0);
    }
    function Ct(t, a, p) {
      return Ye(t, a, p, !1);
    }
    var kt = Ct, St = Et;
    pe.Fragment = o, pe.jsx = kt, pe.jsxs = St;
  }()), pe;
}
process.env.NODE_ENV === "production" ? Ae.exports = qt() : Ae.exports = Ht();
var i = Ae.exports;
class re {
  /**
   * Détecte et sauvegarde le magic token depuis l'URL
   */
  static detect() {
    const e = this.getFromUrl();
    if (e)
      return this.save(e), this.cleanUrl(), console.info("[MagicToken] Token detected in URL and saved."), e;
    const r = this.get();
    return r ? console.info("[MagicToken] Token loaded from localStorage.") : console.warn("[MagicToken] No token found in URL or localStorage."), r;
  }
  /**
   * Récupère le token depuis l'URL
   */
  static getFromUrl() {
    const r = new URLSearchParams(window.location.search).get(this.URL_PARAM);
    return r && this.isValidFormat(r) ? (console.debug("[MagicToken] Token found in URL param."), r) : (r && console.warn("[MagicToken] Token in URL param is not a valid JWT format."), null);
  }
  /**
   * Nettoie l'URL du paramètre magic_token
   */
  static cleanUrl() {
    const e = new URL(window.location.href);
    e.searchParams.has(this.URL_PARAM) && (e.searchParams.delete(this.URL_PARAM), window.history.replaceState({}, "", e.toString()), console.debug("[MagicToken] magic_token param removed from URL."));
  }
  /**
   * Valide le format JWT basique
   */
  static isValidFormat(e) {
    const r = e.split(".").length === 3;
    return r || console.error("[MagicToken] Invalid token format (not JWT-like)."), r;
  }
  /**
   * Sauvegarde le token
   */
  static save(e) {
    if (!this.isValidFormat(e)) {
      console.error("[MagicToken] Refused to save invalid token.");
      return;
    }
    localStorage.setItem(this.STORAGE_KEY, e), console.info("[MagicToken] Token saved in localStorage.");
  }
  /**
   * Récupère le token stocké
   */
  static get() {
    const e = localStorage.getItem(this.STORAGE_KEY);
    return console.debug(e ? "[MagicToken] get() -> token found." : "[MagicToken] get() -> no token found."), e;
  }
  /**
   * Supprime le token
   */
  static clear() {
    localStorage.removeItem(this.STORAGE_KEY), console.info("[MagicToken] Token cleared from localStorage.");
  }
  /**
   * Vérifie si un token est présent
   */
  static exists() {
    const e = !!this.get();
    return console.debug(`[MagicToken] exists() -> ${e}`), e;
  }
  /**
   * Parse le payload JWT (sans validation crypto)
   */
  static parsePayload(e) {
    try {
      const [, r] = e.split("."), o = JSON.parse(atob(r));
      return console.debug("[MagicToken] Payload parsed:", o), o;
    } catch (r) {
      return console.error("[MagicToken] Failed to parse payload:", r), null;
    }
  }
  /**
   * Vérifie si le token est expiré
   */
  static isExpired(e) {
    const r = this.parsePayload(e);
    if (!(r != null && r.exp))
      return console.warn("[MagicToken] No exp claim in token, treating as expired."), !0;
    const o = Date.now() >= r.exp * 1e3;
    return o ? console.warn("[MagicToken] Token is expired.") : console.debug("[MagicToken] Token is valid (not expired)."), o;
  }
}
le(re, "STORAGE_KEY", "inline_editor_token"), le(re, "URL_PARAM", "magic_token");
const Xe = n.createContext(null), ue = () => {
  const l = n.useContext(Xe);
  if (!l)
    throw new Error("useAuth must be used within AuthProvider");
  return l;
}, Yt = ({ children: l }) => {
  const [e, r] = n.useState(!1), [o, c] = n.useState(null), u = "https://api.example.com";
  n.useEffect(() => {
    (async () => {
      console.group("[AuthProvider] Init auth");
      const g = re.detect();
      if (!g) {
        console.warn("[AuthProvider] No token detected. User is not authenticated."), r(!1), c(null), console.groupEnd();
        return;
      }
      if (re.isExpired(g)) {
        console.warn("[AuthProvider] Token is expired. Clearing..."), re.clear(), r(!1), c(null), console.groupEnd();
        return;
      }
      try {
        console.info("[AuthProvider] Token is valid. Fetching user info...");
        const b = await m(g);
        b ? (r(!0), c(b), console.info("[AuthProvider] User authenticated:", b)) : (r(!1), c(null), console.warn("[AuthProvider] Token valid but user fetch failed."));
      } catch (b) {
        r(!1), c(null), console.error("[AuthProvider] Error fetching user:", b);
      }
      console.groupEnd();
    })();
  }, []);
  const s = () => {
    re.clear(), r(!1), c(null), console.info("[AuthProvider] User logged out.");
  }, m = async (d) => {
    try {
      const g = await fetch(`${u}/wp-json/wp/v2/users/me`, {
        headers: {
          Authorization: `Bearer ${d}`
        }
      });
      if (!g.ok)
        return console.warn("[AuthProvider] fetchUser: API responded", g.status), null;
      const b = await g.json();
      return console.debug("[AuthProvider] fetchUser: API returned", b), b;
    } catch (g) {
      return console.error("[AuthProvider] fetchUser: Error", g), null;
    }
  }, f = {
    isAuthenticated: e,
    user: o,
    logout: s
  };
  return /* @__PURE__ */ i.jsx(Xe.Provider, { value: f, children: l });
}, Ze = n.createContext(null), xe = () => {
  const l = n.useContext(Ze);
  if (!l)
    throw new Error("useNotifications must be used within NotificationProvider");
  return l;
}, ve = ({
  type: l,
  message: e,
  icon: r
}) => /* @__PURE__ */ i.jsxs("div", { className: `
    flex items-center gap-3 p-4 rounded-xl shadow-lg backdrop-blur-md border
    ${l === "success" ? "bg-emerald-50/90 border-emerald-200 text-emerald-800" : ""}
    ${l === "error" ? "bg-red-50/90 border-red-200 text-red-800" : ""}
    ${l === "warning" ? "bg-amber-50/90 border-amber-200 text-amber-800" : ""}
    ${l === "info" ? "bg-blue-50/90 border-blue-200 text-blue-800" : ""}
    transition-all duration-300 ease-out
  `, children: [
  /* @__PURE__ */ i.jsx(r, { size: 20, className: `
      ${l === "success" ? "text-emerald-600" : ""}
      ${l === "error" ? "text-red-600" : ""}
      ${l === "warning" ? "text-amber-600" : ""}
      ${l === "info" ? "text-blue-600" : ""}
    ` }),
  /* @__PURE__ */ i.jsx("span", { className: "font-medium text-sm", children: e })
] }), Kt = ({ children: l }) => {
  const f = {
    success: (d, g) => {
      ne.custom(
        /* @__PURE__ */ i.jsx(ve, { type: "success", message: d, icon: Ot }),
        {
          duration: 4e3,
          position: "top-right",
          ...g
        }
      );
    },
    error: (d, g) => {
      ne.custom(
        /* @__PURE__ */ i.jsx(ve, { type: "error", message: d, icon: Dt }),
        {
          duration: 6e3,
          position: "top-right",
          ...g
        }
      );
    },
    warning: (d, g) => {
      ne.custom(
        /* @__PURE__ */ i.jsx(ve, { type: "warning", message: d, icon: It }),
        {
          duration: 5e3,
          position: "top-right",
          ...g
        }
      );
    },
    info: (d, g) => {
      ne.custom(
        /* @__PURE__ */ i.jsx(ve, { type: "info", message: d, icon: Pt }),
        {
          duration: 4e3,
          position: "top-right",
          ...g
        }
      );
    },
    loading: (d, g) => ne.loading(d, {
      position: "top-right",
      style: {
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        color: "#374151",
        fontWeight: "500",
        fontSize: "14px"
      },
      ...g
    }),
    dismiss: (d) => {
      d ? ne.dismiss(d) : ne.dismiss();
    },
    promise: (d, g) => ne.promise(d, g, {
      position: "top-right",
      style: {
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        fontWeight: "500",
        fontSize: "14px"
      },
      success: {
        style: {
          background: "rgba(16, 185, 129, 0.1)",
          border: "1px solid rgba(16, 185, 129, 0.3)",
          color: "#065f46"
        }
      },
      error: {
        style: {
          background: "rgba(239, 68, 68, 0.1)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          color: "#991b1b"
        }
      }
    })
  };
  return /* @__PURE__ */ i.jsxs(Ze.Provider, { value: f, children: [
    l,
    /* @__PURE__ */ i.jsx(
      $t,
      {
        position: "top-right",
        gutter: 12,
        containerStyle: {
          top: 80,
          right: 20
        },
        toastOptions: {
          duration: 4e3,
          style: {
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
            color: "#374151",
            fontWeight: "500",
            fontSize: "14px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }
        }
      }
    )
  ] });
};
function Jt(l, e) {
  const r = Ut();
  return At(
    (...o) => {
      r.current && clearTimeout(r.current), r.current = window.setTimeout(() => {
        l(...o);
      }, e);
    },
    [l, e]
  );
}
class Ue {
  constructor(e) {
    le(this, "baseUrl");
    le(this, "config", {
      timeout: 3e4,
      maxRetries: 3,
      retryDelay: 1e3
    });
    this.baseUrl = (e || void 0 || "https://www.wow.cryptonic-drinks.com").replace(/\/+$/, ""), console.log("[ApiService] Initialized with base URL:", this.baseUrl);
  }
  /**
   * Récupère le token d'authentification
   */
  getAuthToken() {
    return localStorage.getItem("inline_editor_token");
  }
  /**
   * Prépare les headers pour les requêtes
   */
  getHeaders(e = !1) {
    const r = {
      "Content-Type": "application/json"
    };
    if (e) {
      const o = this.getAuthToken();
      o && (r.Authorization = `Bearer ${o}`);
    }
    return r;
  }
  /**
   * Exécute une requête avec timeout
   */
  async fetchWithTimeout(e, r) {
    const o = new AbortController(), c = setTimeout(() => o.abort(), this.config.timeout);
    try {
      const u = await fetch(e, {
        ...r,
        signal: o.signal
      });
      return clearTimeout(c), u;
    } catch (u) {
      throw clearTimeout(c), u instanceof Error && u.name === "AbortError" ? new Error("Request timeout") : u;
    }
  }
  /**
   * Exécute une requête avec retry automatique
   */
  async fetchWithRetry(e, r = {}, o = this.config.maxRetries) {
    let c = null;
    for (let u = 0; u < o; u++)
      try {
        const s = await this.fetchWithTimeout(e, {
          ...r,
          headers: {
            ...this.getHeaders(),
            ...r.headers
          }
        });
        if (!s.ok) {
          const f = new Error(`HTTP ${s.status}: ${s.statusText}`);
          if (f.status = s.status, s.status >= 400 && s.status < 500)
            throw f;
          c = f;
          continue;
        }
        return await s.json();
      } catch (s) {
        if (c = s, s instanceof SyntaxError || s instanceof Error && "status" in s && s.status >= 400 && s.status < 500)
          throw s;
        if (u < o - 1) {
          const m = this.config.retryDelay * Math.pow(2, u);
          console.log(`[ApiService] Retry attempt ${u + 1}/${o} after ${m}ms`), await new Promise((f) => setTimeout(f, m));
        }
      }
    throw c || new Error("Request failed after all retries");
  }
  /**
   * Charge tous les contenus (public ou authentifié selon le token)
   */
  async loadAllContents() {
    console.log("[ApiService] Loading all contents from:", `${this.baseUrl}/wp-json/api/editable-content`);
    try {
      const e = await this.fetchWithRetry(
        `${this.baseUrl}/wp-json/api/editable-content`,
        {
          headers: this.getHeaders(!0)
          // Inclure auth si disponible
        }
      );
      if (!Array.isArray(e))
        throw new Error("Invalid response format: expected array");
      const r = e.filter((o) => o.context && o.context_id).map((o) => ({
        editable_id: o.editable_id,
        content: o.content || "",
        context: o.context,
        context_id: o.context_id,
        version: o.version || 0,
        contentType: o.content_type || "text",
        lastModified: Date.now()
      }));
      return console.log(`[ApiService] Loaded ${r.length} contents`), r;
    } catch (e) {
      throw console.error("[ApiService] Failed to load contents:", e), this.handleApiError(e);
    }
  }
  /**
   * Sauvegarde un contenu (nécessite authentification)
   * FIXED: Always send the user's edited content, not the defaultContent
   */
  async saveContent(e, r) {
    if (console.log("[ApiService] Saving content to:", `${this.baseUrl}/wp-json/api/editable-content/save`), console.log("[ApiService] Content context_id:", e.context_id), console.log("[ApiService] User edited content:", e.content), console.log("[ApiService] Default content (for reference):", r), !this.getAuthToken())
      throw new Error("Authentication required for saving content");
    if (!e.context || !e.context_id)
      throw new Error("Context and context_id are required");
    const c = !e.editable_id && !e.version && r !== void 0, u = {
      content: e.content,
      // Always use the user's edited content
      context: e.context,
      context_id: e.context_id,
      content_type: e.contentType || "text"
    };
    e.version && (u.version = e.version), c && (u.isDefaultContent = !0, u.defaultContent = r), console.log("[ApiService] Request body:", u);
    try {
      const s = await this.fetchWithRetry(
        `${this.baseUrl}/wp-json/api/editable-content/save`,
        {
          method: "POST",
          headers: this.getHeaders(!0),
          body: JSON.stringify(u)
        }
      );
      switch (console.log("[ApiService] Save response:", s), s.status) {
        case "success":
        case "no_action":
        case "no_change":
          if (!s.data)
            throw new Error("No data returned from save operation");
          return {
            content: {
              ...e,
              editable_id: s.data.editable_id,
              content: s.data.content,
              version: s.data.version,
              contentType: s.data.content_type,
              lastModified: Date.now()
            },
            status: s.status,
            message: s.message
          };
        case "conflict":
          throw s.conflict ? Object.assign(
            new Error(s.message),
            {
              type: "VERSION_CONFLICT",
              conflict: s.conflict
            }
          ) : new Error("Conflict response missing conflict data");
        case "error":
        default:
          throw new Error(s.message || "Save operation failed");
      }
    } catch (s) {
      throw console.error("[ApiService] Save failed:", s), this.handleApiError(s);
    }
  }
  /**
   * Gestion centralisée des erreurs
   */
  handleApiError(e) {
    return e instanceof Error ? "type" in e && e.type === "VERSION_CONFLICT" ? e : e.message === "Request timeout" ? new Error("La requête a expiré. Vérifiez votre connexion internet.") : "status" in e && e.status === 401 ? new Error("Session expirée. Veuillez vous reconnecter.") : "status" in e && e.status === 403 ? new Error("Vous n'avez pas les permissions nécessaires.") : e : new Error("Une erreur inattendue s'est produite");
  }
  /**
   * Vérifie si l'utilisateur est authentifié
   */
  isAuthenticated() {
    return !!this.getAuthToken();
  }
  /**
   * Utilitaire pour tester la connexion API
   */
  async testConnection() {
    try {
      return await this.fetchWithRetry(
        `${this.baseUrl}/wp-json/api/editable-content`,
        { method: "HEAD" },
        1
        // Un seul essai pour le test
      ), !0;
    } catch {
      return !1;
    }
  }
  /**
   * Helper pour gérer les conflits de version
   */
  static isVersionConflictError(e) {
    return e instanceof Error && "type" in e && e.type === "VERSION_CONFLICT" && "conflict" in e;
  }
  /**
   * Helper pour extraire les informations de conflit
   */
  static getConflictInfo(e) {
    return this.isVersionConflictError(e) ? e.conflict : null;
  }
  /**
   * Récupère un contenu spécifique par context/context_id
   */
  async getContentByContext(e, r) {
    console.log("[ApiService] Getting content by context:", e, r);
    try {
      const o = new URLSearchParams({
        context: e,
        context_id: r
      }), c = await this.fetchWithRetry(
        `${this.baseUrl}/wp-json/api/editable-content/get?${o.toString()}`,
        {
          headers: this.getHeaders(!1)
          // Pas d'auth nécessaire pour la lecture
        }
      );
      return c.exists ? {
        editable_id: c.editable_id,
        content: c.content || "",
        context: c.context,
        context_id: c.context_id,
        version: c.version || 0,
        contentType: c.content_type || "text",
        lastModified: c.updated_at ? new Date(c.updated_at).getTime() : Date.now()
      } : null;
    } catch (o) {
      throw console.error("[ApiService] Failed to get content by context:", o), this.handleApiError(o);
    }
  }
  /**
   * Efface le cache du token (utile après déconnexion)
   */
  clearAuthToken() {
    console.log("[ApiService] Auth token cleared");
  }
  /**
   * Vérifie si une erreur est une erreur d'authentification
   */
  static isAuthError(e) {
    return e instanceof Error && "status" in e && e.status === 401;
  }
  /**
   * Vérifie si une erreur est une erreur de permission
   */
  static isPermissionError(e) {
    return e instanceof Error && "status" in e && e.status === 403;
  }
  /**
   * Statistiques de debug
   */
  getStats() {
    return {
      totalRequests: 0,
      failedRequests: 0,
      avgResponseTime: 0
    };
  }
  /**
   * Get current configuration for debugging
   */
  getConfig() {
    return {
      baseUrl: this.baseUrl,
      timeout: this.config.timeout,
      maxRetries: this.config.maxRetries
    };
  }
}
const Qe = n.createContext(null), ye = () => {
  const l = n.useContext(Qe);
  if (!l)
    throw new Error("useContent must be used within ContentProvider");
  return l;
}, Gt = ({
  children: l,
  apiBaseUrl: e,
  onVersionConflict: r
}) => {
  const { isAuthenticated: o } = ue(), { error: c, warning: u, promise: s } = xe(), [m, f] = n.useState(!0), [d, g] = n.useState({}), b = n.useRef(/* @__PURE__ */ new Map()), $ = 5 * 60 * 1e3, S = e || void 0, [P] = n.useState(() => new Ue(S)), W = Jt(async (x, w) => await A(x, w), 500), I = n.useCallback((x, w) => {
    if (!(x != null && x.trim()) || !(w != null && w.trim()))
      throw new Error("Context and contextId are required and cannot be empty");
    return `${x}#${w}`;
  }, []), O = n.useCallback((x) => {
    const w = b.current.get(x);
    return w && Date.now() - w.timestamp < $ ? w.content : (b.current.delete(x), null);
  }, []), v = n.useCallback((x, w) => {
    b.current.set(x, {
      content: w,
      timestamp: Date.now()
    });
  }, []), N = n.useCallback((x, w, j) => {
    if (!(x != null && x.trim()) || !(w != null && w.trim()))
      return console.warn("[ContentProvider] getContent called with empty context or contextId"), j;
    try {
      const h = I(x, w), L = O(h);
      if (L)
        return L.content;
      const C = d[h];
      return C ? (v(h, C), C.content) : j;
    } catch (h) {
      return console.error("[ContentProvider] Error in getContent:", h), j;
    }
  }, [d, I, O, v]), A = n.useCallback(async (x, w) => {
    var L, C;
    if (!((L = x.context) != null && L.trim()) || !((C = x.context_id) != null && C.trim()))
      return console.error("[ContentProvider] Cannot save: context and context_id are required"), c("Invalid content configuration"), !1;
    if (!o)
      return console.error("[ContentProvider] Cannot save: authentication required"), u("Please log in to save changes"), !1;
    const j = I(x.context, x.context_id), h = d[j];
    try {
      const q = { ...x, lastModified: Date.now() };
      g((V) => ({ ...V, [j]: q })), v(j, q);
      const z = {
        ...x,
        ...h && {
          editable_id: h.editable_id,
          version: h.version
        }
      }, _ = await P.saveContent(
        z,
        !h && w !== void 0 ? w : void 0
      );
      switch (_.status) {
        case "success":
        case "no_action":
          const V = _.content;
          return g((X) => ({ ...X, [j]: V })), v(j, V), !0;
        case "no_change":
          return u("No changes detected"), !0;
        default:
          throw new Error(`Unexpected status: ${_.status}`);
      }
    } catch (q) {
      if (console.error("[ContentProvider] Save failed:", q), g((z) => {
        const _ = { ...z };
        return h ? (_[j] = h, v(j, h)) : (delete _[j], b.current.delete(j)), _;
      }), Ue.isVersionConflictError(q)) {
        const z = Ue.getConflictInfo(q);
        if (z && r)
          switch (await r({
            clientVersion: z.client_version,
            serverVersion: z.server_version,
            serverContent: z.server_content,
            clientContent: x.content
          })) {
            case "overwrite":
              const V = {
                ...x,
                version: z.server_version,
                editable_id: z.editable_id
              };
              return A(V);
            case "keep_server":
              const X = {
                ...x,
                content: z.server_content,
                version: z.server_version,
                editable_id: z.editable_id,
                lastModified: Date.now()
              };
              return g((k) => ({ ...k, [j]: X })), v(j, X), u("Using server version of content"), !1;
            case "cancel":
            default:
              return u("Save cancelled"), !1;
          }
        else
          c("Content was modified by another user. Please refresh to get the latest version.");
      }
      return !1;
    }
  }, [o, I, P, d, r, c, u, v]), J = n.useCallback(async (x, w) => W(x, w), [W]), G = n.useCallback((x) => {
    const w = {};
    for (const j of x)
      if (j.context && j.context_id) {
        const h = I(j.context, j.context_id);
        w[h] = j;
      }
    return w;
  }, [I]), E = n.useCallback(async () => {
    try {
      const x = await P.loadAllContents(), w = G(x);
      g(w), Object.entries(w).forEach(([j, h]) => {
        v(j, h);
      }), Object.keys(w).length > 0 && o && console.log(`[ContentProvider] Successfully loaded ${Object.keys(w).length} editable contents`);
    } catch (x) {
      throw console.error("[ContentProvider] Failed to load contents:", x), c("Failed to load content. Please refresh the page."), x;
    }
  }, [P, G, c, o, v]);
  n.useEffect(() => {
    (async () => {
      f(!0);
      try {
        await E();
      } catch (w) {
        console.error("[ContentProvider] Initialization failed:", w);
      } finally {
        f(!1);
      }
    })();
  }, [o, E]);
  const y = n.useCallback(async () => {
    f(!0);
    try {
      await s(
        E(),
        {
          loading: "Refreshing content...",
          success: "Content refreshed successfully!",
          error: "Failed to refresh content"
        }
      );
    } finally {
      f(!1);
    }
  }, [E, s]), D = {
    isLoading: m,
    contents: d,
    getContent: N,
    saveContent: J,
    refreshContents: y
  };
  return /* @__PURE__ */ i.jsx(Qe.Provider, { value: D, children: l });
}, Xt = () => {
  const [l, e] = n.useState(!1);
  return null;
}, Zt = ({
  content: l,
  onSave: e,
  onCancel: r,
  config: o,
  className: c = "",
  style: u = {},
  as: s = "span"
}) => {
  const [m, f] = n.useState(!1), [d, g] = n.useState(!1), b = n.useRef(null), $ = n.useRef(l), { success: S, error: P, loading: W, dismiss: I } = xe();
  n.useEffect(() => {
    if (b.current) {
      b.current.focus();
      const E = document.createRange(), y = window.getSelection();
      E.selectNodeContents(b.current), E.collapse(!1), y == null || y.removeAllRanges(), y == null || y.addRange(E);
    }
  }, []);
  const O = n.useCallback(() => b.current && b.current.innerText || "", []), v = n.useCallback(() => {
    const E = O();
    g(E !== $.current);
  }, [O]), N = n.useCallback((E) => {
    E.key === "Escape" ? (E.preventDefault(), r()) : ((E.ctrlKey || E.metaKey) && E.key === "Enter" || (E.ctrlKey || E.metaKey) && E.key === "s") && (E.preventDefault(), A()), !o.multiline && E.key === "Enter" && E.preventDefault();
  }, [r, o.multiline]), A = n.useCallback(async () => {
    const E = O();
    if (m) return;
    if (E === $.current) {
      S("No changes to save"), r();
      return;
    }
    f(!0);
    const y = W("Saving changes...");
    try {
      const D = await e(E);
      I(y), D ? (S("Changes saved successfully"), $.current = E, g(!1)) : P("Failed to save changes");
    } catch (D) {
      I(y), P("An error occurred while saving"), console.error("[ModernInlineTextEditor] Save error:", D);
    } finally {
      f(!1);
    }
  }, [O, e, m, S, P, W, I, r]), J = n.useCallback((E) => {
    E.preventDefault();
    const y = E.clipboardData.getData("text/plain"), D = o.multiline ? y : y.replace(/\n/g, " ");
    document.execCommand("insertText", !1, D), v();
  }, [o.multiline, v]), G = n.useCallback((E) => {
    const y = E.relatedTarget;
    y != null && y.closest(".inline-editor-actions-modern") || d && !m && A();
  }, [d, m, A]);
  return /* @__PURE__ */ i.jsxs("div", { className: "inline-editor-container-modern", children: [
    /* @__PURE__ */ i.jsx(
      "div",
      {
        ref: b,
        contentEditable: !0,
        suppressContentEditableWarning: !0,
        onKeyDown: N,
        onPaste: J,
        onBlur: G,
        onInput: v,
        className: `inline-editor-content-modern ${c}`,
        style: {
          ...u,
          outline: "none",
          border: "none",
          background: "transparent",
          minHeight: "inherit",
          minWidth: "inherit",
          display: "inherit",
          fontFamily: "inherit",
          fontSize: "inherit",
          fontWeight: "inherit",
          lineHeight: "inherit",
          color: "inherit",
          textAlign: "inherit",
          textDecoration: "inherit",
          textTransform: "inherit",
          letterSpacing: "inherit",
          wordSpacing: "inherit",
          margin: "0",
          padding: "0"
        },
        "data-placeholder": o.placeholder || "Enter text...",
        role: "textbox",
        "aria-label": `Edit ${o.id}`,
        "aria-multiline": o.multiline,
        children: l
      }
    ),
    /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: "inline-editor-actions-modern",
        style: {
          position: "absolute",
          top: "-2.5rem",
          right: "0",
          display: "flex",
          gap: "0.25rem",
          zIndex: 1e3,
          opacity: d || m ? 1 : 0.7
        },
        children: [
          /* @__PURE__ */ i.jsx(
            "button",
            {
              onClick: A,
              disabled: m || !d,
              className: "inline-editor-btn-modern save",
              title: `Save changes ${o.multiline ? "(Ctrl+Enter)" : "(Enter)"}`,
              onMouseDown: (E) => E.preventDefault(),
              style: {
                width: "1.75rem",
                height: "1.75rem",
                background: d ? "#10b981" : "#6b7280",
                color: "white",
                border: "none",
                borderRadius: "0.375rem",
                cursor: m || !d ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                opacity: m || !d ? 0.6 : 1
              },
              "aria-label": "Save changes",
              children: m ? /* @__PURE__ */ i.jsx(zt, { size: 12, className: "animate-spin" }) : /* @__PURE__ */ i.jsx(Mt, { size: 12 })
            }
          ),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              onClick: r,
              disabled: m,
              className: "inline-editor-btn-modern cancel",
              title: "Cancel (Escape)",
              onMouseDown: (E) => E.preventDefault(),
              style: {
                width: "1.75rem",
                height: "1.75rem",
                background: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem"
              },
              "aria-label": "Cancel editing",
              children: /* @__PURE__ */ i.jsx(Lt, { size: 12 })
            }
          )
        ]
      }
    )
  ] });
}, Qt = n.memo(Zt);
function er(l) {
  const e = window.location.pathname;
  if (!l)
    return {
      path: e,
      sectionId: 0,
      sectionSelector: "body"
    };
  const r = tr(l);
  return {
    path: e,
    sectionId: r.id,
    sectionSelector: r.selector
  };
}
function tr(l) {
  var o;
  let e = l.parentElement;
  for (; e && e.tagName !== "BODY"; ) {
    if (e.id && Ge(e))
      return {
        id: rr(e.id),
        selector: `#${e.id}`
      };
    if (e.hasAttribute("data-section-id")) {
      const c = e.getAttribute("data-section-id");
      return {
        id: parseInt(c || "0", 10),
        selector: e.id ? `#${e.id}` : `[data-section-id="${c}"]`
      };
    }
    if (Ge(e)) {
      const c = Array.from(((o = e.parentElement) == null ? void 0 : o.children) || []).indexOf(e);
      return {
        id: c + 1,
        selector: `${e.tagName.toLowerCase()}:nth-child(${c + 1})`
      };
    }
    e = e.parentElement;
  }
  return document.querySelector("main") ? { id: 1, selector: "main" } : { id: 0, selector: "body" };
}
function Ge(l) {
  return ["SECTION", "ARTICLE", "MAIN", "HEADER", "FOOTER", "ASIDE"].includes(l.tagName) || l.hasAttribute("data-section") || l.classList.contains("section");
}
function rr(l) {
  let e = 0;
  for (let r = 0; r < l.length; r++) {
    const o = l.charCodeAt(r);
    e = (e << 5) - e + o, e = e & e;
  }
  return Math.abs(e);
}
function we(l) {
  const e = er(l);
  return `${e.path}#${e.sectionSelector}`;
}
const K = {
  colors: {
    primary: {
      50: "#eff6ff",
      100: "#dbeafe"
    },
    neutral: {
      100: "#f3f4f6",
      200: "#e5e7eb",
      800: "#1f2937"
    }
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem"
  },
  borderRadius: {
    sm: "0.375rem",
    md: "0.5rem"
  },
  shadows: {
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
  },
  typography: {
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }]
    },
    fontWeight: {
      medium: "500"
    }
  },
  animation: {
    duration: {
      fast: "150ms"
    },
    easing: {
      ease: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)"
    }
  }
}, nr = ({
  children: l,
  id: e,
  multiline: r = !0,
  maxLength: o,
  placeholder: c,
  className: u = "",
  as: s = "span",
  showEditableHighlights: m = !1
}) => {
  const { isAuthenticated: f } = ue(), { getContent: d, saveContent: g, isLoading: b } = ye(), { error: $, promise: S } = xe(), [P, W] = n.useState(!1), [I, O] = n.useState(!1), [v, N] = n.useState(""), [A, J] = n.useState(""), [G, E] = n.useState(""), [y, D] = n.useState(!1), x = n.useRef(null), w = n.useCallback((C) => typeof C == "string" ? C : typeof C == "number" ? C.toString() : C ? n.isValidElement(C) && C.props.children ? w(C.props.children) : Array.isArray(C) ? C.map(w).join("") : "" : "", []);
  n.useEffect(() => {
    if (b || !x.current) return;
    const C = w(l).trim();
    E(C);
    const q = we(x.current);
    N(q);
    const z = d(q, e, C);
    J(z), D(!0), console.log("[ModernEditableWrapper] Initialized:", {
      context: q,
      contextId: e,
      defaultContent: C,
      currentContent: z
    });
  }, [e, l, d, w, b]);
  const j = n.useCallback((C) => {
    C.stopPropagation(), f && !P && v && W(!0);
  }, [f, P, v]), h = n.useCallback(async (C) => {
    if (!v)
      return $("Cannot save: invalid configuration"), !1;
    const q = {
      content: C,
      context: v,
      context_id: e,
      contentType: "text",
      lastModified: Date.now()
    };
    try {
      const z = await S(
        g(q, G),
        {
          loading: "Saving changes...",
          success: "Changes saved successfully!",
          error: "Failed to save changes"
        }
      );
      return z && (J(C), W(!1)), z;
    } catch (z) {
      return console.error("[ModernEditableWrapper] Save error:", z), !1;
    }
  }, [v, e, g, G, $, S]), L = n.useCallback(() => {
    W(!1);
  }, []);
  return b || !y ? n.createElement(
    s,
    {
      ref: x,
      className: `modern-editable-skeleton ${u}`,
      style: {
        background: `linear-gradient(90deg, ${K.colors.neutral[200]} 25%, ${K.colors.neutral[100]} 50%, ${K.colors.neutral[200]} 75%)`,
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
        borderRadius: K.borderRadius.sm,
        minHeight: "1.25rem",
        minWidth: "4rem"
      }
    }
  ) : P && f ? /* @__PURE__ */ i.jsx(
    Qt,
    {
      content: A,
      onSave: h,
      onCancel: L,
      config: {
        id: e,
        multiline: r,
        maxLength: o,
        placeholder: c
      },
      className: u,
      as: s,
      preserveStyles: !0
    }
  ) : /* @__PURE__ */ i.jsxs(
    ie.div,
    {
      style: { position: "relative", display: "inline-block" },
      onHoverStart: () => O(!0),
      onHoverEnd: () => O(!1),
      children: [
        n.createElement(
          s,
          {
            ref: x,
            className: `modern-editable-wrapper ${f ? "is-authenticated" : ""} ${m ? "show-highlights" : ""} ${u}`,
            onClick: j,
            onKeyDown: f ? (C) => {
              (C.key === "Enter" || C.key === " ") && (C.preventDefault(), j(C));
            } : void 0,
            style: {
              position: "relative",
              cursor: f ? "pointer" : "default",
              outline: "none",
              borderRadius: K.borderRadius.sm,
              transition: `all ${K.animation.duration.fast} ${K.animation.easing.ease}`,
              ...f && {
                outline: "2px solid transparent",
                outlineOffset: "1px"
              },
              ...f && I && {
                outline: `2px solid ${K.colors.primary[100]}`,
                backgroundColor: `${K.colors.primary[50]}`
              },
              ...m && f && {
                outline: `2px dashed ${K.colors.primary[100]}`,
                backgroundColor: `${K.colors.primary[50]}`
              }
            },
            title: f ? "Click to edit" : void 0,
            "data-context": v,
            "data-context-id": e,
            role: f ? "button" : void 0,
            tabIndex: f ? 0 : void 0,
            "aria-label": f ? `Edit ${e}` : void 0
          },
          A
        ),
        /* @__PURE__ */ i.jsx(Bt, { children: f && I && !P && /* @__PURE__ */ i.jsxs(
          ie.div,
          {
            initial: { opacity: 0, scale: 0.8, y: -10 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.8, y: -10 },
            transition: { duration: 0.2, ease: K.animation.easing.easeOut },
            style: {
              position: "absolute",
              top: "-2rem",
              right: "0",
              background: K.colors.neutral[800],
              color: "white",
              padding: `${K.spacing.xs} ${K.spacing.sm}`,
              borderRadius: K.borderRadius.md,
              fontSize: K.typography.fontSize.xs[0],
              fontWeight: K.typography.fontWeight.medium,
              boxShadow: K.shadows.lg,
              zIndex: 1e3,
              pointerEvents: "none",
              whiteSpace: "nowrap"
            },
            children: [
              "✏️ Click to edit",
              /* @__PURE__ */ i.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    bottom: "-4px",
                    right: "8px",
                    width: "8px",
                    height: "8px",
                    background: K.colors.neutral[800],
                    transform: "rotate(45deg)"
                  }
                }
              )
            ]
          }
        ) })
      ]
    }
  );
}, pr = n.memo(nr), or = ({
  showEditableHighlights: l,
  toggleEditableHighlights: e
}) => {
  const { isAuthenticated: r, logout: o, user: c } = ue(), { success: u, info: s } = xe();
  if (!r)
    return null;
  const m = () => {
    o(), u("Successfully logged out");
  }, f = () => {
    e(), s(l ? "Edit highlights hidden" : "Edit highlights shown");
  };
  return /* @__PURE__ */ i.jsxs(
    ie.div,
    {
      className: "global-editor-toolbar-modern",
      initial: { opacity: 0, y: -20, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { duration: 0.3, ease: "easeOut" },
      children: [
        /* @__PURE__ */ i.jsxs(
          ie.div,
          {
            className: "flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200",
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.3, delay: 0.1 },
            children: [
              /* @__PURE__ */ i.jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }),
              /* @__PURE__ */ i.jsx("span", { className: "text-xs font-medium text-blue-800", children: (c == null ? void 0 : c.name) || "Editor" })
            ]
          }
        ),
        /* @__PURE__ */ i.jsx(
          ie.button,
          {
            onClick: f,
            className: `global-editor-toolbar-btn-modern ${l ? "active" : ""}`,
            title: l ? "Hide editable highlights" : "Show editable highlights",
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 },
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.3, delay: 0.2 },
            children: l ? /* @__PURE__ */ i.jsx(Ft, { size: 18 }) : /* @__PURE__ */ i.jsx(Nt, { size: 18 })
          }
        ),
        /* @__PURE__ */ i.jsx(
          ie.button,
          {
            className: "global-editor-toolbar-btn-modern",
            title: "Editor settings",
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 },
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.3, delay: 0.3 },
            onClick: () => s("Settings panel coming soon"),
            children: /* @__PURE__ */ i.jsx(Wt, { size: 18 })
          }
        ),
        /* @__PURE__ */ i.jsx(
          ie.button,
          {
            onClick: m,
            className: "global-editor-toolbar-btn-modern logout",
            title: "Logout",
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 },
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.3, delay: 0.4 },
            children: /* @__PURE__ */ i.jsx(Vt, { size: 18 })
          }
        )
      ]
    }
  );
};
class ce {
  constructor(e) {
    le(this, "baseUrl");
    this.baseUrl = (e || void 0 || "https://www.wow.cryptonic-drinks.com").replace(/\/+$/, ""), console.log("[MediaUploadService] Initialized with base URL:", this.baseUrl);
  }
  /**
   * Upload un fichier image local
   */
  async uploadFile(e, r) {
    console.log("[MediaUploadService] Uploading file:", e.name, e.type, e.size);
    const o = this.validateFile(e);
    if (!o.valid)
      return {
        success: !1,
        error: o.error
      };
    const c = re.get();
    if (!c)
      return {
        success: !1,
        error: "Authentication required"
      };
    const u = new FormData();
    u.append("file", e), u.append("title", e.name.replace(/\.[^/.]+$/, "")), u.append("alt", e.name.replace(/\.[^/.]+$/, ""));
    try {
      const s = new XMLHttpRequest(), m = new Promise((f, d) => {
        s.onload = () => {
          if (s.status >= 200 && s.status < 300)
            try {
              const g = JSON.parse(s.responseText);
              console.log("[MediaUploadService] Upload successful:", g), f(this.formatResponse(g));
            } catch {
              d(new Error("Invalid response format"));
            }
          else
            d(new Error(`Upload failed: ${s.status} ${s.statusText}`));
        }, s.onerror = () => d(new Error("Network error")), s.onabort = () => d(new Error("Upload cancelled"));
      });
      return r && (s.upload.onprogress = (f) => {
        f.lengthComputable && r({
          loaded: f.loaded,
          total: f.total,
          percentage: Math.round(f.loaded / f.total * 100)
        });
      }), s.open("POST", `${this.baseUrl}/wp-json/wp/v2/media`), s.setRequestHeader("Authorization", `Bearer ${c}`), s.send(u), await m;
    } catch (s) {
      return console.error("[MediaUploadService] Upload error:", s), {
        success: !1,
        error: s instanceof Error ? s.message : "Upload failed"
      };
    }
  }
  /**
   * Upload une image depuis une URL externe
   * L'URL sera téléchargée côté serveur et convertie en média WP
   */
  async uploadFromUrl(e, r) {
    console.log("[MediaUploadService] Uploading from URL:", e);
    const o = this.validateUrl(e);
    if (!o.valid)
      return {
        success: !1,
        error: o.error
      };
    const c = re.get();
    if (!c)
      return {
        success: !1,
        error: "Authentication required"
      };
    try {
      const u = await fetch(`${this.baseUrl}/wp-json/api/media/import-url`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${c}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          url: e,
          filename: r || this.extractFilenameFromUrl(e),
          title: (r == null ? void 0 : r.replace(/\.[^/.]+$/, "")) || "Imported image",
          alt: (r == null ? void 0 : r.replace(/\.[^/.]+$/, "")) || "Imported image"
        })
      });
      if (!u.ok) {
        const m = await u.text();
        throw new Error(`Import failed: ${u.status} - ${m}`);
      }
      const s = await u.json();
      return console.log("[MediaUploadService] URL import successful:", s), this.formatResponse(s);
    } catch (u) {
      return console.error("[MediaUploadService] URL import error:", u), {
        success: !1,
        error: u instanceof Error ? u.message : "Import failed"
      };
    }
  }
  /**
   * Supprime un média WordPress
   */
  async deleteMedia(e) {
    const r = re.get();
    if (!r)
      return console.error("[MediaUploadService] No token for deletion"), !1;
    try {
      return (await fetch(`${this.baseUrl}/wp-json/wp/v2/media/${e}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${r}`
        }
      })).ok;
    } catch (o) {
      return console.error("[MediaUploadService] Delete error:", o), !1;
    }
  }
  /**
   * Récupère les détails d'un média
   */
  async getMediaDetails(e) {
    try {
      const r = await fetch(`${this.baseUrl}/wp-json/wp/v2/media/${e}`);
      if (!r.ok) throw new Error("Media not found");
      return await r.json();
    } catch (r) {
      return console.error("[MediaUploadService] Get media error:", r), null;
    }
  }
  /**
   * Valide un fichier avant l'upload
   */
  validateFile(e) {
    const r = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    if (!r.includes(e.type))
      return {
        valid: !1,
        error: `Type de fichier non supporté. Formats acceptés: ${r.join(", ")}`
      };
    const o = 10 * 1024 * 1024;
    return e.size > o ? {
      valid: !1,
      error: `Fichier trop volumineux. Taille maximale: ${o / 1024 / 1024}MB`
    } : { valid: !0 };
  }
  /**
   * Valide une URL
   */
  validateUrl(e) {
    try {
      const r = new URL(e);
      if (!["http:", "https:"].includes(r.protocol))
        return {
          valid: !1,
          error: "URL invalide. Utilisez http:// ou https://"
        };
      const o = r.pathname.toLowerCase();
      return ![".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"].some((s) => o.endsWith(s)) && !o.includes("image") && console.warn("[MediaUploadService] URL might not be an image:", e), { valid: !0 };
    } catch {
      return {
        valid: !1,
        error: "URL invalide"
      };
    }
  }
  /**
   * Extrait un nom de fichier depuis une URL
   */
  extractFilenameFromUrl(e) {
    try {
      const o = new URL(e).pathname, c = o.substring(o.lastIndexOf("/") + 1);
      return !c || c === "" ? `image-${Date.now()}.jpg` : c.includes(".") ? c : `${c}.jpg`;
    } catch {
      return `image-${Date.now()}.jpg`;
    }
  }
  /**
   * Formate la réponse WordPress en format uniforme
   */
  formatResponse(e) {
    var c, u, s, m, f, d, g;
    if (!e || !e.id && !e.ID)
      return {
        success: !1,
        error: "Invalid response from server"
      };
    const r = e.id || e.ID, o = e.source_url || ((c = e.guid) == null ? void 0 : c.rendered) || e.url;
    return {
      success: !0,
      data: {
        id: r,
        url: o,
        alt: e.alt_text || "",
        title: ((u = e.title) == null ? void 0 : u.rendered) || e.title || "",
        sizes: (s = e.media_details) != null && s.sizes ? {
          thumbnail: (m = e.media_details.sizes.thumbnail) == null ? void 0 : m.source_url,
          medium: (f = e.media_details.sizes.medium) == null ? void 0 : f.source_url,
          large: (d = e.media_details.sizes.large) == null ? void 0 : d.source_url,
          full: ((g = e.media_details.sizes.full) == null ? void 0 : g.source_url) || o
        } : void 0
      }
    };
  }
  /**
   * Crée une URL de prévisualisation pour un fichier
   */
  static createPreviewUrl(e) {
    return URL.createObjectURL(e);
  }
  /**
   * Libère une URL de prévisualisation
   */
  static revokePreviewUrl(e) {
    URL.revokeObjectURL(e);
  }
  /**
   * Helper pour déterminer si une string est une URL
   */
  static isUrl(e) {
    try {
      return new URL(e), !0;
    } catch {
      return e.startsWith("/") || e.startsWith("./") || e.startsWith("../");
    }
  }
}
const et = ({
  isOpen: l,
  onClose: e,
  onImageSelected: r
}) => {
  const [o, c] = n.useState("file"), [u, s] = n.useState(!1), [m, f] = n.useState(null), [d, g] = n.useState(""), [b, $] = n.useState(""), [S, P] = n.useState(!1), [W, I] = n.useState(0), [O, v] = n.useState(""), N = n.useRef(null), A = n.useRef(new ce()).current;
  n.useEffect(() => () => {
    d && !ce.isUrl(d) && ce.revokePreviewUrl(d);
  }, [d]);
  const J = n.useCallback((h) => {
    h.preventDefault(), s(!0);
  }, []), G = n.useCallback((h) => {
    h.preventDefault(), s(!1);
  }, []), E = n.useCallback((h) => {
    h.preventDefault(), s(!1);
    const C = Array.from(h.dataTransfer.files).find((q) => q.type.startsWith("image/"));
    C ? y(C) : v("Veuillez déposer une image");
  }, []), y = n.useCallback((h) => {
    f(h), v(""), d && !ce.isUrl(d) && ce.revokePreviewUrl(d);
    const L = ce.createPreviewUrl(h);
    g(L);
  }, [d]), D = n.useCallback(async () => {
    if (!m) {
      v("Aucun fichier sélectionné");
      return;
    }
    P(!0), v(""), I(0);
    try {
      const h = await A.uploadFile(
        m,
        (L) => {
          I(L.percentage);
        }
      );
      h.success && h.data ? (r(h.data.url), e()) : v(h.error || "Échec de l'upload");
    } catch (h) {
      v("Erreur lors de l'upload"), console.error("[ImageUploadModal] Upload error:", h);
    } finally {
      P(!1), I(0);
    }
  }, [m, A, r, e]), x = n.useCallback(async () => {
    if (!b.trim()) {
      v("Veuillez entrer une URL");
      return;
    }
    P(!0), v("");
    try {
      const h = await A.uploadFromUrl(b);
      h.success && h.data ? (r(h.data.url), e()) : v(h.error || "Échec de l'import");
    } catch (h) {
      v("Erreur lors de l'import"), console.error("[ImageUploadModal] Import error:", h);
    } finally {
      P(!1);
    }
  }, [b, A, r, e]), w = n.useCallback(() => {
    if (!b.trim()) {
      v("Veuillez entrer une URL");
      return;
    }
    r(b), e();
  }, [b, r, e]), j = n.useCallback(() => {
    f(null), g(""), $(""), v(""), c("file"), e();
  }, [e]);
  return l ? /* @__PURE__ */ i.jsx(
    "div",
    {
      className: "image-upload-modal-overlay",
      onClick: j,
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1e4
      },
      children: /* @__PURE__ */ i.jsxs(
        "div",
        {
          className: "image-upload-modal",
          onClick: (h) => h.stopPropagation(),
          style: {
            background: "#1f2937",
            borderRadius: "12px",
            padding: "24px",
            maxWidth: "600px",
            width: "90%",
            maxHeight: "90vh",
            overflow: "auto",
            color: "white"
          },
          children: [
            /* @__PURE__ */ i.jsx("h2", { style: { margin: "0 0 20px 0", fontSize: "24px" }, children: "Modifier l'image" }),
            /* @__PURE__ */ i.jsxs("div", { style: { display: "flex", gap: "8px", marginBottom: "24px" }, children: [
              /* @__PURE__ */ i.jsx(
                "button",
                {
                  onClick: () => c("file"),
                  style: {
                    flex: 1,
                    padding: "12px",
                    background: o === "file" ? "#3b82f6" : "#374151",
                    border: "none",
                    borderRadius: "6px",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "16px",
                    transition: "background 0.2s"
                  },
                  children: "📤 Upload un fichier"
                }
              ),
              /* @__PURE__ */ i.jsx(
                "button",
                {
                  onClick: () => c("url"),
                  style: {
                    flex: 1,
                    padding: "12px",
                    background: o === "url" ? "#3b82f6" : "#374151",
                    border: "none",
                    borderRadius: "6px",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "16px",
                    transition: "background 0.2s"
                  },
                  children: "🔗 Depuis une URL"
                }
              )
            ] }),
            o === "file" && /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx(
                "div",
                {
                  onDragOver: J,
                  onDragLeave: G,
                  onDrop: E,
                  onClick: () => {
                    var h;
                    return (h = N.current) == null ? void 0 : h.click();
                  },
                  style: {
                    border: `2px dashed ${u ? "#3b82f6" : "#6b7280"}`,
                    borderRadius: "8px",
                    padding: "40px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: u ? "rgba(59, 130, 246, 0.1)" : "rgba(55, 65, 81, 0.5)",
                    transition: "all 0.2s"
                  },
                  children: m ? /* @__PURE__ */ i.jsxs("div", { children: [
                    d && /* @__PURE__ */ i.jsx(
                      "img",
                      {
                        src: d,
                        alt: "Preview",
                        style: {
                          maxWidth: "300px",
                          maxHeight: "200px",
                          objectFit: "contain",
                          margin: "0 auto 16px"
                        }
                      }
                    ),
                    /* @__PURE__ */ i.jsx("p", { style: { margin: "8px 0", fontSize: "14px" }, children: m.name }),
                    /* @__PURE__ */ i.jsxs("p", { style: { margin: "0", fontSize: "12px", color: "#9ca3af" }, children: [
                      (m.size / 1024 / 1024).toFixed(2),
                      " MB"
                    ] })
                  ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
                    /* @__PURE__ */ i.jsx("p", { style: { margin: "0 0 8px 0", fontSize: "18px" }, children: "📁 Glissez une image ici" }),
                    /* @__PURE__ */ i.jsx("p", { style: { margin: "0", fontSize: "14px", color: "#9ca3af" }, children: "ou cliquez pour sélectionner" })
                  ] })
                }
              ),
              /* @__PURE__ */ i.jsx(
                "input",
                {
                  ref: N,
                  type: "file",
                  accept: "image/*",
                  onChange: (h) => {
                    var C;
                    const L = (C = h.target.files) == null ? void 0 : C[0];
                    L && y(L);
                  },
                  style: { display: "none" }
                }
              ),
              S && W > 0 && /* @__PURE__ */ i.jsxs("div", { style: { marginTop: "16px" }, children: [
                /* @__PURE__ */ i.jsx("div", { style: {
                  background: "#374151",
                  borderRadius: "4px",
                  height: "8px",
                  overflow: "hidden"
                }, children: /* @__PURE__ */ i.jsx("div", { style: {
                  background: "#3b82f6",
                  height: "100%",
                  width: `${W}%`,
                  transition: "width 0.3s"
                } }) }),
                /* @__PURE__ */ i.jsxs("p", { style: {
                  textAlign: "center",
                  marginTop: "8px",
                  fontSize: "14px",
                  color: "#9ca3af"
                }, children: [
                  W,
                  "%"
                ] })
              ] })
            ] }),
            o === "url" && /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx(
                "input",
                {
                  type: "text",
                  value: b,
                  onChange: (h) => $(h.target.value),
                  placeholder: "https://example.com/image.jpg",
                  style: {
                    width: "100%",
                    padding: "12px",
                    background: "#374151",
                    border: "1px solid #6b7280",
                    borderRadius: "6px",
                    color: "white",
                    fontSize: "16px"
                  }
                }
              ),
              /* @__PURE__ */ i.jsxs("div", { style: {
                marginTop: "12px",
                padding: "12px",
                background: "rgba(59, 130, 246, 0.1)",
                borderRadius: "6px",
                fontSize: "14px"
              }, children: [
                /* @__PURE__ */ i.jsx("p", { style: { margin: "0 0 8px 0" }, children: "💡 Deux options disponibles :" }),
                /* @__PURE__ */ i.jsxs("ul", { style: { margin: "0", paddingLeft: "20px" }, children: [
                  /* @__PURE__ */ i.jsxs("li", { children: [
                    /* @__PURE__ */ i.jsx("strong", { children: "Importer dans WordPress" }),
                    " : L'image sera téléchargée et stockée dans votre médiathèque"
                  ] }),
                  /* @__PURE__ */ i.jsxs("li", { children: [
                    /* @__PURE__ */ i.jsx("strong", { children: "Utiliser l'URL directement" }),
                    " : L'image restera hébergée sur le site externe"
                  ] })
                ] })
              ] })
            ] }),
            O && /* @__PURE__ */ i.jsxs("div", { style: {
              marginTop: "16px",
              padding: "12px",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid #ef4444",
              borderRadius: "6px",
              color: "#ef4444",
              fontSize: "14px"
            }, children: [
              "⚠️ ",
              O
            ] }),
            /* @__PURE__ */ i.jsxs("div", { style: {
              display: "flex",
              gap: "12px",
              marginTop: "24px",
              justifyContent: "flex-end"
            }, children: [
              /* @__PURE__ */ i.jsx(
                "button",
                {
                  onClick: j,
                  disabled: S,
                  style: {
                    padding: "10px 20px",
                    background: "#6b7280",
                    border: "none",
                    borderRadius: "6px",
                    color: "white",
                    cursor: S ? "not-allowed" : "pointer",
                    fontSize: "16px",
                    opacity: S ? 0.5 : 1
                  },
                  children: "Annuler"
                }
              ),
              o === "file" && /* @__PURE__ */ i.jsx(
                "button",
                {
                  onClick: D,
                  disabled: !m || S,
                  style: {
                    padding: "10px 20px",
                    background: "#10b981",
                    border: "none",
                    borderRadius: "6px",
                    color: "white",
                    cursor: !m || S ? "not-allowed" : "pointer",
                    fontSize: "16px",
                    opacity: !m || S ? 0.5 : 1
                  },
                  children: S ? "Upload..." : "Uploader"
                }
              ),
              o === "url" && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
                /* @__PURE__ */ i.jsx(
                  "button",
                  {
                    onClick: w,
                    disabled: !b.trim() || S,
                    style: {
                      padding: "10px 20px",
                      background: "#3b82f6",
                      border: "none",
                      borderRadius: "6px",
                      color: "white",
                      cursor: !b.trim() || S ? "not-allowed" : "pointer",
                      fontSize: "16px",
                      opacity: !b.trim() || S ? 0.5 : 1
                    },
                    children: "Utiliser l'URL"
                  }
                ),
                /* @__PURE__ */ i.jsx(
                  "button",
                  {
                    onClick: x,
                    disabled: !b.trim() || S,
                    style: {
                      padding: "10px 20px",
                      background: "#10b981",
                      border: "none",
                      borderRadius: "6px",
                      color: "white",
                      cursor: !b.trim() || S ? "not-allowed" : "pointer",
                      fontSize: "16px",
                      opacity: !b.trim() || S ? 0.5 : 1
                    },
                    children: S ? "Import..." : "Importer dans WP"
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  ) : null;
}, ir = ({
  id: l,
  src: e,
  alt: r = "",
  className: o = "",
  style: c = {},
  width: u,
  height: s,
  loading: m = "lazy",
  showEditableHighlights: f = !1
}) => {
  const { isAuthenticated: d } = ue(), { getContent: g, saveContent: b, isLoading: $ } = ye(), [S, P] = n.useState(""), [W, I] = n.useState(""), [O, v] = n.useState(!1), [N, A] = n.useState(!1), J = n.useRef(null);
  n.useEffect(() => {
    if ($ || !J.current) return;
    const y = we(J.current);
    P(y);
    const D = g(y, l, e);
    I(D), v(!0), console.log("[ModernEditableImage] Initialized:", {
      context: y,
      contextId: l,
      defaultSrc: e,
      savedSrc: D
    });
  }, [l, e, g, $]);
  const G = n.useCallback(() => {
    d && S && A(!0);
  }, [d, S]), E = n.useCallback(async (y) => {
    if (S) {
      try {
        const D = {
          content: y,
          context: S,
          context_id: l,
          contentType: "text",
          lastModified: Date.now()
        };
        await b(D, e) ? (I(y), console.log(`[ModernEditableImage] Image source saved for ${l}`)) : console.error(`[ModernEditableImage] Failed to save image source for ${l}`);
      } catch (D) {
        console.error("[ModernEditableImage] Error saving image:", D);
      }
      A(!1);
    }
  }, [S, l, b, e]);
  return $ || !O ? /* @__PURE__ */ i.jsx(
    "div",
    {
      className: `editable-image-skeleton ${o}`,
      style: {
        ...c,
        width: u || "100%",
        height: s || "200px",
        background: "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
        borderRadius: "0.375rem"
      }
    }
  ) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsx(
      "img",
      {
        ref: J,
        src: W,
        alt: r,
        width: u,
        height: s,
        loading: m,
        className: `editable-image-seamless ${d ? "is-authenticated" : ""} ${f ? "editable-highlight" : ""} ${o}`,
        style: {
          ...c,
          cursor: d ? "pointer" : "default",
          transition: "outline-color 150ms ease",
          outline: "2px solid transparent",
          outlineOffset: "1px",
          ...d && {
            ":hover": {
              outlineColor: "rgba(59, 130, 246, 0.3)"
            }
          },
          ...f && d && {
            outlineColor: "rgba(59, 130, 246, 0.3)",
            outlineStyle: "dashed"
          }
        },
        onClick: G,
        title: d ? "Click to change image" : void 0,
        "data-context": S,
        "data-context-id": l,
        role: d ? "button" : void 0,
        tabIndex: d ? 0 : void 0,
        "aria-label": d ? `Edit image: ${r || l}` : r,
        onKeyDown: d ? (y) => {
          (y.key === "Enter" || y.key === " ") && (y.preventDefault(), G());
        } : void 0
      }
    ),
    /* @__PURE__ */ i.jsx(
      et,
      {
        isOpen: N,
        onClose: () => A(!1),
        onImageSelected: E
      }
    )
  ] });
}, gr = n.memo(ir), ar = ({
  children: l,
  backgroundImage: e,
  id: r,
  className: o = "",
  style: c = {},
  as: u = "div",
  showEditableHighlights: s = !1
}) => {
  const { isAuthenticated: m } = ue(), { getContent: f, saveContent: d, isLoading: g } = ye(), [b, $] = n.useState(!1), [S, P] = n.useState(""), [W, I] = n.useState(""), [O, v] = n.useState(""), [N, A] = n.useState(!1), [J, G] = n.useState(!1), [E, y] = n.useState(!1), D = n.useRef(null), x = n.useRef(null), w = n.useCallback((k) => {
    const B = k.match(/url\(['"]?([^'"]+)['"]?\)/);
    return B ? B[1] : k;
  }, []), j = n.useCallback((k) => !k || k === "none" ? "none" : `url('${k}')`, []);
  n.useEffect(() => {
    if (g || !D.current) return;
    const k = we(D.current);
    P(k);
    const B = w(e), ee = f(k, r, B);
    I(ee), G(!0), console.log("[EditableBackground] Initialized:", {
      context: k,
      contextId: r,
      defaultUrl: B,
      savedUrl: ee
    });
  }, [r, e, f, g, w]);
  const h = () => /* @__PURE__ */ i.jsx(
    "button",
    {
      onClick: L,
      className: "editable-background-edit-btn",
      style: {
        position: "absolute",
        top: "8px",
        right: "8px",
        width: "32px",
        height: "32px",
        background: "rgba(0, 0, 0, 0.8)",
        color: "white",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: "4px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px",
        zIndex: 10,
        transition: "all 0.2s ease",
        opacity: s ? 1 : 0
      },
      title: "Modifier l'image de fond",
      onMouseEnter: (k) => {
        k.currentTarget.style.opacity = "1";
      },
      onMouseLeave: (k) => {
        k.currentTarget.style.opacity = s ? "1" : "0";
      },
      children: "🖼️"
    }
  ), L = n.useCallback(() => {
    m && !b && S && ($(!0), v(W), y(!1), setTimeout(() => {
      var k, B;
      (k = x.current) == null || k.focus(), (B = x.current) == null || B.select();
    }, 0));
  }, [m, b, S, W]), C = n.useCallback((k) => {
    v(k), y(!1);
  }, []), q = n.useCallback(async (k) => !k || k === "none" ? !0 : new Promise((B) => {
    const ee = new Image();
    ee.onload = () => B(!0), ee.onerror = () => B(!1), ee.src = k;
  }), []), z = n.useCallback(async () => {
    if (!S || N) return;
    const k = O.trim() || "none";
    if (k !== "none") {
      try {
        new URL(k, window.location.href);
      } catch {
        if (!k.startsWith("/") && !k.startsWith("./") && !k.startsWith("../")) {
          alert('URL invalide. Utilisez une URL complète, un chemin relatif valide, ou "none".');
          return;
        }
      }
      if (!await q(k) && !window.confirm(
        "L'image ne semble pas se charger correctement. Voulez-vous quand même sauvegarder cette URL ?"
      ))
        return;
    }
    A(!0);
    try {
      const B = {
        content: k,
        context: S,
        context_id: r,
        contentType: "text",
        lastModified: Date.now()
      }, ee = w(e);
      await d(B, ee) ? (I(k), $(!1), console.log(`[EditableBackground] Background URL saved for ${r}`)) : console.error(`[EditableBackground] Failed to save background URL for ${r}`);
    } finally {
      A(!1);
    }
  }, [S, O, N, r, d, e, w, q]), _ = n.useCallback(() => {
    v(W), $(!1);
  }, [W]), V = n.useCallback((k) => {
    k.key === "Escape" ? (k.preventDefault(), _()) : k.key === "Enter" && (k.preventDefault(), z());
  }, [_, z]), X = {
    ...c,
    backgroundImage: j(b ? O : W),
    position: "relative",
    transition: "all 0.2s ease"
  };
  return g || !J ? n.createElement(
    u,
    {
      ref: D,
      className: o,
      style: { ...c, visibility: "hidden" }
    },
    l
  ) : n.createElement(
    u,
    {
      ref: D,
      className: `editable-background ${m ? "is-authenticated" : ""} ${s && m ? "editable-highlight" : ""} ${o}`,
      style: X,
      "data-context": S,
      "data-context-id": r,
      onMouseEnter: (k) => {
        if (m && !b) {
          const B = k.currentTarget.querySelector(".editable-background-edit-btn");
          B && (B.style.opacity = "1");
        }
      },
      onMouseLeave: (k) => {
        if (m && !b && !s) {
          const B = k.currentTarget.querySelector(".editable-background-edit-btn");
          B && (B.style.opacity = "0");
        }
      }
    },
    /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      l,
      m && !b && /* @__PURE__ */ i.jsx(h, {}),
      b && m && /* @__PURE__ */ i.jsxs(
        "div",
        {
          className: "editable-background-editor",
          style: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0, 0, 0, 0.95)",
            padding: "16px",
            borderRadius: "8px",
            minWidth: "300px",
            maxWidth: "90%",
            zIndex: 1e3,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)"
          },
          children: [
            /* @__PURE__ */ i.jsx("h4", { style: { margin: "0 0 12px 0", color: "white", fontSize: "16px" }, children: "Modifier l'image de fond" }),
            /* @__PURE__ */ i.jsxs("div", { style: { display: "flex", gap: "8px" }, children: [
              /* @__PURE__ */ i.jsx(
                "input",
                {
                  ref: x,
                  type: "text",
                  value: O,
                  onChange: (k) => v(k.target.value),
                  onKeyDown: V,
                  placeholder: "URL de l'image ou 'none'",
                  style: {
                    flex: 1,
                    padding: "8px 12px",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    borderRadius: "4px",
                    fontSize: "14px"
                  },
                  disabled: N
                }
              ),
              /* @__PURE__ */ i.jsx(
                "button",
                {
                  onClick: () => y(!0),
                  disabled: N,
                  style: {
                    padding: "8px 16px",
                    background: "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500"
                  },
                  title: "Uploader une image",
                  children: "📤"
                }
              ),
              /* @__PURE__ */ i.jsx(
                "button",
                {
                  onClick: z,
                  disabled: N,
                  style: {
                    padding: "8px 16px",
                    background: "#10b981",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: N ? "not-allowed" : "pointer",
                    opacity: N ? 0.6 : 1,
                    fontSize: "14px",
                    fontWeight: "500"
                  },
                  children: N ? "Saving..." : "Save"
                }
              ),
              /* @__PURE__ */ i.jsx(
                "button",
                {
                  onClick: _,
                  disabled: N,
                  style: {
                    padding: "8px 16px",
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500"
                  },
                  children: "Cancel"
                }
              )
            ] }),
            /* @__PURE__ */ i.jsx("div", { style: { marginTop: "8px", fontSize: "12px", color: "rgba(255, 255, 255, 0.6)" }, children: "Exemples : https://example.com/image.jpg, /images/hero.jpg, none" })
          ]
        }
      ),
      /* @__PURE__ */ i.jsx(
        et,
        {
          isOpen: E,
          onClose: () => y(!1),
          onImageSelected: C
        }
      )
    ] })
  );
}, hr = n.memo(ar), sr = ({
  children: l,
  id: e,
  attribute: r,
  defaultValue: o,
  validator: c,
  transformer: u,
  showEditableHighlights: s = !1,
  editLabel: m
}) => {
  const { isAuthenticated: f } = ue(), { getContent: d, saveContent: g, isLoading: b } = ye(), [$, S] = n.useState(!1), [P, W] = n.useState(""), [I, O] = n.useState(""), [v, N] = n.useState(""), [A, J] = n.useState(!1), [G, E] = n.useState(!1), [y, D] = n.useState(""), x = n.useRef(null), w = n.useRef(null);
  n.useEffect(() => {
    if (b || !x.current) return;
    const _ = we(x.current);
    W(_);
    const V = `${e}-${r}`, X = d(_, V, o);
    O(X), E(!0), console.log("[EditableAttribute] Initialized:", {
      context: _,
      contextId: V,
      attribute: r,
      defaultValue: o,
      savedValue: X
    });
  }, [e, r, o, d, b]);
  const j = n.useCallback((_) => {
    _.preventDefault(), _.stopPropagation(), f && !$ && P && (S(!0), N(I), D(""), setTimeout(() => {
      var V, X;
      (V = w.current) == null || V.focus(), (X = w.current) == null || X.select();
    }, 0));
  }, [f, $, P, I]), h = n.useCallback((_) => {
    if (!c) return !0;
    const V = c(_);
    return typeof V == "string" ? (D(V), !1) : (D(""), V);
  }, [c]), L = n.useCallback(async () => {
    if (!P || A || !h(v))
      return;
    const _ = u ? u(v) : v;
    J(!0);
    try {
      const V = `${e}-${r}`, X = {
        content: _,
        context: P,
        context_id: V,
        contentType: "text",
        lastModified: Date.now()
      };
      await g(X, o) ? (O(_), S(!1), console.log(`[EditableAttribute] Attribute ${r} saved for ${e}`)) : console.error(`[EditableAttribute] Failed to save attribute ${r} for ${e}`);
    } finally {
      J(!1);
    }
  }, [P, v, A, e, r, g, o, h, u]), C = n.useCallback(() => {
    N(I), S(!1), D("");
  }, [I]), q = n.useCallback((_) => {
    _.key === "Escape" ? (_.preventDefault(), C()) : _.key === "Enter" && (_.preventDefault(), L());
  }, [C, L]);
  if (b || !G)
    return n.cloneElement(l, { ref: x });
  const z = n.cloneElement(l, {
    ref: x,
    [r]: I,
    className: `${l.props.className || ""} editable-attribute ${f ? "is-authenticated" : ""} ${s ? "editable-highlight" : ""}`.trim(),
    "data-context": P,
    "data-context-id": `${e}-${r}`,
    "data-editable-attribute": r
  });
  return /* @__PURE__ */ i.jsxs("div", { style: { position: "relative", display: "inline-block" }, children: [
    z,
    f && !$ && /* @__PURE__ */ i.jsxs(
      "span",
      {
        className: "editable-attribute-indicator",
        onClick: j,
        style: { cursor: "pointer" },
        children: [
          "✏️ ",
          m || r
        ]
      }
    ),
    $ && f && /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: "editable-attribute-editor",
        style: {
          position: "absolute",
          top: "100%",
          left: 0,
          marginTop: "8px",
          background: "rgba(0, 0, 0, 0.95)",
          padding: "12px",
          borderRadius: "6px",
          minWidth: "250px",
          zIndex: 1e3,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
        },
        children: [
          /* @__PURE__ */ i.jsx("label", { style: {
            display: "block",
            marginBottom: "8px",
            color: "white",
            fontSize: "13px",
            fontWeight: "500"
          }, children: m || `Edit ${r}` }),
          /* @__PURE__ */ i.jsxs("div", { style: { display: "flex", gap: "8px", marginBottom: y ? "8px" : 0 }, children: [
            /* @__PURE__ */ i.jsx(
              "input",
              {
                ref: w,
                type: "text",
                value: v,
                onChange: (_) => {
                  N(_.target.value), h(_.target.value);
                },
                onKeyDown: q,
                style: {
                  flex: 1,
                  padding: "6px 10px",
                  border: `1px solid ${y ? "#ef4444" : "rgba(255, 255, 255, 0.3)"}`,
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  borderRadius: "4px",
                  fontSize: "13px"
                },
                disabled: A
              }
            ),
            /* @__PURE__ */ i.jsx(
              "button",
              {
                onClick: L,
                disabled: A || !!y,
                style: {
                  padding: "6px 12px",
                  background: y ? "#6b7280" : "#10b981",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: A || y ? "not-allowed" : "pointer",
                  opacity: A || y ? 0.6 : 1,
                  fontSize: "13px"
                },
                children: "✓"
              }
            ),
            /* @__PURE__ */ i.jsx(
              "button",
              {
                onClick: C,
                disabled: A,
                style: {
                  padding: "6px 12px",
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "13px"
                },
                children: "✕"
              }
            )
          ] }),
          y && /* @__PURE__ */ i.jsx("div", { style: {
            color: "#ef4444",
            fontSize: "12px",
            marginTop: "-4px"
          }, children: y })
        ]
      }
    )
  ] });
}, mr = n.memo(sr), br = ({
  children: l,
  useModernDesign: e = !0
  // Default to modern design
}) => {
  const [r, o] = n.useState(!1), c = () => {
    o((u) => !u);
  };
  return n.useEffect(() => {
    const u = document.body;
    return r ? u.classList.add("editable-highlight-active") : u.classList.remove("editable-highlight-active"), () => {
      u.classList.remove("editable-highlight-active");
    };
  }, [r]), n.useEffect(() => {
    const u = document.body;
    return e ? u.classList.add("inline-editor-modern") : u.classList.remove("inline-editor-modern"), () => {
      u.classList.remove("inline-editor-modern");
    };
  }, [e]), /* @__PURE__ */ i.jsx(tt.Provider, { value: { showEditableHighlights: r }, children: /* @__PURE__ */ i.jsx(Kt, { children: /* @__PURE__ */ i.jsx(Yt, { children: /* @__PURE__ */ i.jsxs(Gt, { children: [
    l,
    /* @__PURE__ */ i.jsx(
      or,
      {
        showEditableHighlights: r,
        toggleEditableHighlights: c
      }
    ),
    /* @__PURE__ */ i.jsx(Xt, {})
  ] }) }) }) });
}, tt = n.createContext({ showEditableHighlights: !1 }), vr = () => n.useContext(tt).showEditableHighlights;
export {
  mr as EditableAttribute,
  hr as EditableBackground,
  br as InlineEditor,
  gr as ModernEditableImage,
  pr as ModernEditableWrapper,
  or as ModernEditorToolbar,
  br as default,
  ue as useAuth,
  ye as useContent,
  vr as useEditableHighlights,
  xe as useNotifications
};
