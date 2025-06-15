var jt = Object.defineProperty;
var Tt = (u, e, r) => e in u ? jt(u, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : u[e] = r;
var le = (u, e, r) => Tt(u, typeof e != "symbol" ? e + "" : e, r);
import n, { useRef as _t, useCallback as Ut } from "react";
import ne, { Toaster as At } from "react-hot-toast";
import { Info as Pt, AlertCircle as It, XCircle as $t, CheckCircle as Dt, Loader2 as Ot, Save as zt, X as Mt, EyeOff as Lt, Eye as Ft, Settings as Wt, LogOut as Nt } from "lucide-react";
import { motion as ae, AnimatePresence as Vt } from "framer-motion";
var Ue = { exports: {} }, fe = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ye;
function Bt() {
  if (Ye) return fe;
  Ye = 1;
  var u = n, e = Symbol.for("react.element"), r = Symbol.for("react.fragment"), o = Object.prototype.hasOwnProperty, l = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, c = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(b, f, d) {
    var g, x = {}, P = null, C = null;
    d !== void 0 && (P = "" + d), f.key !== void 0 && (P = "" + f.key), f.ref !== void 0 && (C = f.ref);
    for (g in f) o.call(f, g) && !c.hasOwnProperty(g) && (x[g] = f[g]);
    if (b && b.defaultProps) for (g in f = b.defaultProps, f) x[g] === void 0 && (x[g] = f[g]);
    return { $$typeof: e, type: b, key: P, ref: C, props: x, _owner: l.current };
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
var Ke;
function qt() {
  return Ke || (Ke = 1, process.env.NODE_ENV !== "production" && function() {
    var u = n, e = Symbol.for("react.element"), r = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), s = Symbol.for("react.provider"), b = Symbol.for("react.context"), f = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), g = Symbol.for("react.suspense_list"), x = Symbol.for("react.memo"), P = Symbol.for("react.lazy"), C = Symbol.for("react.offscreen"), I = Symbol.iterator, N = "@@iterator";
    function $(t) {
      if (t === null || typeof t != "object")
        return null;
      var i = I && t[I] || t[N];
      return typeof i == "function" ? i : null;
    }
    var O = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function m(t) {
      {
        for (var i = arguments.length, p = new Array(i > 1 ? i - 1 : 0), R = 1; R < i; R++)
          p[R - 1] = arguments[R];
        W("error", t, p);
      }
    }
    function W(t, i, p) {
      {
        var R = O.ReactDebugCurrentFrame, M = R.getStackAddendum();
        M !== "" && (i += "%s", p = p.concat([M]));
        var F = p.map(function(U) {
          return String(U);
        });
        F.unshift("Warning: " + i), Function.prototype.apply.call(console[t], console, F);
      }
    }
    var A = !1, J = !1, G = !1, E = !1, y = !1, D;
    D = Symbol.for("react.module.reference");
    function v(t) {
      return !!(typeof t == "string" || typeof t == "function" || t === o || t === c || y || t === l || t === d || t === g || E || t === C || A || J || G || typeof t == "object" && t !== null && (t.$$typeof === P || t.$$typeof === x || t.$$typeof === s || t.$$typeof === b || t.$$typeof === f || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      t.$$typeof === D || t.getModuleId !== void 0));
    }
    function w(t, i, p) {
      var R = t.displayName;
      if (R)
        return R;
      var M = i.displayName || i.name || "";
      return M !== "" ? p + "(" + M + ")" : p;
    }
    function j(t) {
      return t.displayName || "Context";
    }
    function h(t) {
      if (t == null)
        return null;
      if (typeof t.tag == "number" && m("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof t == "function")
        return t.displayName || t.name || null;
      if (typeof t == "string")
        return t;
      switch (t) {
        case o:
          return "Fragment";
        case r:
          return "Portal";
        case c:
          return "Profiler";
        case l:
          return "StrictMode";
        case d:
          return "Suspense";
        case g:
          return "SuspenseList";
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case b:
            var i = t;
            return j(i) + ".Consumer";
          case s:
            var p = t;
            return j(p._context) + ".Provider";
          case f:
            return w(t, t.render, "ForwardRef");
          case x:
            var R = t.displayName || null;
            return R !== null ? R : h(t.type) || "Memo";
          case P: {
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
    var L = Object.assign, S = 0, q, z, _, V, X, k, B;
    function ee() {
    }
    ee.__reactDisabledLog = !0;
    function Ae() {
      {
        if (S === 0) {
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
        S++;
      }
    }
    function tt() {
      {
        if (S--, S === 0) {
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
        S < 0 && m("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var we = O.ReactCurrentDispatcher, Ee;
    function ge(t, i, p) {
      {
        if (Ee === void 0)
          try {
            throw Error();
          } catch (M) {
            var R = M.stack.trim().match(/\n( *(at )?)/);
            Ee = R && R[1] || "";
          }
        return `
` + Ee + t;
      }
    }
    var Se = !1, he;
    {
      var rt = typeof WeakMap == "function" ? WeakMap : Map;
      he = new rt();
    }
    function Pe(t, i) {
      if (!t || Se)
        return "";
      {
        var p = he.get(t);
        if (p !== void 0)
          return p;
      }
      var R;
      Se = !0;
      var M = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var F;
      F = we.current, we.current = null, Ae();
      try {
        if (i) {
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
        Se = !1, we.current = F, tt(), Error.prepareStackTrace = M;
      }
      var se = t ? t.displayName || t.name : "", oe = se ? ge(se) : "";
      return typeof t == "function" && he.set(t, oe), oe;
    }
    function nt(t, i, p) {
      return Pe(t, !1);
    }
    function ot(t) {
      var i = t.prototype;
      return !!(i && i.isReactComponent);
    }
    function be(t, i, p) {
      if (t == null)
        return "";
      if (typeof t == "function")
        return Pe(t, ot(t));
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
            return nt(t.render);
          case x:
            return be(t.type, i, p);
          case P: {
            var R = t, M = R._payload, F = R._init;
            try {
              return be(F(M), i, p);
            } catch {
            }
          }
        }
      return "";
    }
    var de = Object.prototype.hasOwnProperty, Ie = {}, $e = O.ReactDebugCurrentFrame;
    function xe(t) {
      if (t) {
        var i = t._owner, p = be(t.type, t._source, i ? i.type : null);
        $e.setExtraStackFrame(p);
      } else
        $e.setExtraStackFrame(null);
    }
    function at(t, i, p, R, M) {
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
              T = t[U](i, U, R, p, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (H) {
              T = H;
            }
            T && !(T instanceof Error) && (xe(M), m("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", R || "React class", p, U, typeof T), xe(null)), T instanceof Error && !(T.message in Ie) && (Ie[T.message] = !0, xe(M), m("Failed %s type: %s", p, T.message), xe(null));
          }
      }
    }
    var it = Array.isArray;
    function ke(t) {
      return it(t);
    }
    function st(t) {
      {
        var i = typeof Symbol == "function" && Symbol.toStringTag, p = i && t[Symbol.toStringTag] || t.constructor.name || "Object";
        return p;
      }
    }
    function lt(t) {
      try {
        return De(t), !1;
      } catch {
        return !0;
      }
    }
    function De(t) {
      return "" + t;
    }
    function Oe(t) {
      if (lt(t))
        return m("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", st(t)), De(t);
    }
    var ze = O.ReactCurrentOwner, ct = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Me, Le;
    function ut(t) {
      if (de.call(t, "ref")) {
        var i = Object.getOwnPropertyDescriptor(t, "ref").get;
        if (i && i.isReactWarning)
          return !1;
      }
      return t.ref !== void 0;
    }
    function dt(t) {
      if (de.call(t, "key")) {
        var i = Object.getOwnPropertyDescriptor(t, "key").get;
        if (i && i.isReactWarning)
          return !1;
      }
      return t.key !== void 0;
    }
    function ft(t, i) {
      typeof t.ref == "string" && ze.current;
    }
    function pt(t, i) {
      {
        var p = function() {
          Me || (Me = !0, m("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", i));
        };
        p.isReactWarning = !0, Object.defineProperty(t, "key", {
          get: p,
          configurable: !0
        });
      }
    }
    function gt(t, i) {
      {
        var p = function() {
          Le || (Le = !0, m("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", i));
        };
        p.isReactWarning = !0, Object.defineProperty(t, "ref", {
          get: p,
          configurable: !0
        });
      }
    }
    var ht = function(t, i, p, R, M, F, U) {
      var T = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: t,
        key: i,
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
    function bt(t, i, p, R, M) {
      {
        var F, U = {}, T = null, Z = null;
        p !== void 0 && (Oe(p), T = "" + p), dt(i) && (Oe(i.key), T = "" + i.key), ut(i) && (Z = i.ref, ft(i, M));
        for (F in i)
          de.call(i, F) && !ct.hasOwnProperty(F) && (U[F] = i[F]);
        if (t && t.defaultProps) {
          var H = t.defaultProps;
          for (F in H)
            U[F] === void 0 && (U[F] = H[F]);
        }
        if (T || Z) {
          var Y = typeof t == "function" ? t.displayName || t.name || "Unknown" : t;
          T && pt(U, Y), Z && gt(U, Y);
        }
        return ht(t, T, Z, M, R, ze.current, U);
      }
    }
    var Ce = O.ReactCurrentOwner, Fe = O.ReactDebugCurrentFrame;
    function ie(t) {
      if (t) {
        var i = t._owner, p = be(t.type, t._source, i ? i.type : null);
        Fe.setExtraStackFrame(p);
      } else
        Fe.setExtraStackFrame(null);
    }
    var Re;
    Re = !1;
    function je(t) {
      return typeof t == "object" && t !== null && t.$$typeof === e;
    }
    function We() {
      {
        if (Ce.current) {
          var t = h(Ce.current.type);
          if (t)
            return `

Check the render method of \`` + t + "`.";
        }
        return "";
      }
    }
    function xt(t) {
      return "";
    }
    var Ne = {};
    function mt(t) {
      {
        var i = We();
        if (!i) {
          var p = typeof t == "string" ? t : t.displayName || t.name;
          p && (i = `

Check the top-level render call using <` + p + ">.");
        }
        return i;
      }
    }
    function Ve(t, i) {
      {
        if (!t._store || t._store.validated || t.key != null)
          return;
        t._store.validated = !0;
        var p = mt(i);
        if (Ne[p])
          return;
        Ne[p] = !0;
        var R = "";
        t && t._owner && t._owner !== Ce.current && (R = " It was passed a child from " + h(t._owner.type) + "."), ie(t), m('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', p, R), ie(null);
      }
    }
    function Be(t, i) {
      {
        if (typeof t != "object")
          return;
        if (ke(t))
          for (var p = 0; p < t.length; p++) {
            var R = t[p];
            je(R) && Ve(R, i);
          }
        else if (je(t))
          t._store && (t._store.validated = !0);
        else if (t) {
          var M = $(t);
          if (typeof M == "function" && M !== t.entries)
            for (var F = M.call(t), U; !(U = F.next()).done; )
              je(U.value) && Ve(U.value, i);
        }
      }
    }
    function vt(t) {
      {
        var i = t.type;
        if (i == null || typeof i == "string")
          return;
        var p;
        if (typeof i == "function")
          p = i.propTypes;
        else if (typeof i == "object" && (i.$$typeof === f || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        i.$$typeof === x))
          p = i.propTypes;
        else
          return;
        if (p) {
          var R = h(i);
          at(p, t.props, "prop", R, t);
        } else if (i.PropTypes !== void 0 && !Re) {
          Re = !0;
          var M = h(i);
          m("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", M || "Unknown");
        }
        typeof i.getDefaultProps == "function" && !i.getDefaultProps.isReactClassApproved && m("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function yt(t) {
      {
        for (var i = Object.keys(t.props), p = 0; p < i.length; p++) {
          var R = i[p];
          if (R !== "children" && R !== "key") {
            ie(t), m("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", R), ie(null);
            break;
          }
        }
        t.ref !== null && (ie(t), m("Invalid attribute `ref` supplied to `React.Fragment`."), ie(null));
      }
    }
    var qe = {};
    function He(t, i, p, R, M, F) {
      {
        var U = v(t);
        if (!U) {
          var T = "";
          (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (T += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Z = xt();
          Z ? T += Z : T += We();
          var H;
          t === null ? H = "null" : ke(t) ? H = "array" : t !== void 0 && t.$$typeof === e ? (H = "<" + (h(t.type) || "Unknown") + " />", T = " Did you accidentally export a JSX literal instead of a component?") : H = typeof t, m("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", H, T);
        }
        var Y = bt(t, i, p, M, F);
        if (Y == null)
          return Y;
        if (U) {
          var te = i.children;
          if (te !== void 0)
            if (R)
              if (ke(te)) {
                for (var se = 0; se < te.length; se++)
                  Be(te[se], t);
                Object.freeze && Object.freeze(te);
              } else
                m("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Be(te, t);
        }
        if (de.call(i, "key")) {
          var oe = h(t), Q = Object.keys(i).filter(function(Rt) {
            return Rt !== "key";
          }), Te = Q.length > 0 ? "{key: someKey, " + Q.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!qe[oe + Te]) {
            var Ct = Q.length > 0 ? "{" + Q.join(": ..., ") + ": ...}" : "{}";
            m(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Te, oe, Ct, oe), qe[oe + Te] = !0;
          }
        }
        return t === o ? yt(Y) : vt(Y), Y;
      }
    }
    function wt(t, i, p) {
      return He(t, i, p, !0);
    }
    function Et(t, i, p) {
      return He(t, i, p, !1);
    }
    var St = Et, kt = wt;
    pe.Fragment = o, pe.jsx = St, pe.jsxs = kt;
  }()), pe;
}
process.env.NODE_ENV === "production" ? Ue.exports = Bt() : Ue.exports = qt();
var a = Ue.exports;
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
const Ge = n.createContext(null), ue = () => {
  const u = n.useContext(Ge);
  if (!u)
    throw new Error("useAuth must be used within AuthProvider");
  return u;
}, Ht = ({ children: u }) => {
  const [e, r] = n.useState(!1), [o, l] = n.useState(null), c = "https://api.example.com";
  n.useEffect(() => {
    (async () => {
      console.group("[AuthProvider] Init auth");
      const g = re.detect();
      if (!g) {
        console.warn("[AuthProvider] No token detected. User is not authenticated."), r(!1), l(null), console.groupEnd();
        return;
      }
      if (re.isExpired(g)) {
        console.warn("[AuthProvider] Token is expired. Clearing..."), re.clear(), r(!1), l(null), console.groupEnd();
        return;
      }
      try {
        console.info("[AuthProvider] Token is valid. Fetching user info...");
        const x = await b(g);
        x ? (r(!0), l(x), console.info("[AuthProvider] User authenticated:", x)) : (r(!1), l(null), console.warn("[AuthProvider] Token valid but user fetch failed."));
      } catch (x) {
        r(!1), l(null), console.error("[AuthProvider] Error fetching user:", x);
      }
      console.groupEnd();
    })();
  }, []);
  const s = () => {
    re.clear(), r(!1), l(null), console.info("[AuthProvider] User logged out.");
  }, b = async (d) => {
    try {
      const g = await fetch(`${c}/wp-json/wp/v2/users/me`, {
        headers: {
          Authorization: `Bearer ${d}`
        }
      });
      if (!g.ok)
        return console.warn("[AuthProvider] fetchUser: API responded", g.status), null;
      const x = await g.json();
      return console.debug("[AuthProvider] fetchUser: API returned", x), x;
    } catch (g) {
      return console.error("[AuthProvider] fetchUser: Error", g), null;
    }
  }, f = {
    isAuthenticated: e,
    user: o,
    logout: s
  };
  return /* @__PURE__ */ a.jsx(Ge.Provider, { value: f, children: u });
}, Xe = n.createContext(null), me = () => {
  const u = n.useContext(Xe);
  if (!u)
    throw new Error("useNotifications must be used within NotificationProvider");
  return u;
}, Yt = ({ children: u }) => {
  const f = {
    success: (d, g) => {
      ne.success(d, {
        duration: 4e3,
        position: "top-right",
        style: {
          background: "rgba(16, 185, 129, 0.1)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(16, 185, 129, 0.3)",
          borderRadius: "12px",
          color: "#065f46",
          fontWeight: "500",
          fontSize: "14px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        },
        icon: /* @__PURE__ */ a.jsx(Dt, { size: 20, className: "text-emerald-600" }),
        ...g
      });
    },
    error: (d, g) => {
      ne.error(d, {
        duration: 6e3,
        position: "top-right",
        style: {
          background: "rgba(239, 68, 68, 0.1)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          borderRadius: "12px",
          color: "#991b1b",
          fontWeight: "500",
          fontSize: "14px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        },
        icon: /* @__PURE__ */ a.jsx($t, { size: 20, className: "text-red-600" }),
        ...g
      });
    },
    warning: (d, g) => {
      ne(d, {
        duration: 5e3,
        position: "top-right",
        style: {
          background: "rgba(245, 158, 11, 0.1)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(245, 158, 11, 0.3)",
          borderRadius: "12px",
          color: "#92400e",
          fontWeight: "500",
          fontSize: "14px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        },
        icon: /* @__PURE__ */ a.jsx(It, { size: 20, className: "text-amber-600" }),
        ...g
      });
    },
    info: (d, g) => {
      ne(d, {
        duration: 4e3,
        position: "top-right",
        style: {
          background: "rgba(59, 130, 246, 0.1)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(59, 130, 246, 0.3)",
          borderRadius: "12px",
          color: "#1e40af",
          fontWeight: "500",
          fontSize: "14px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        },
        icon: /* @__PURE__ */ a.jsx(Pt, { size: 20, className: "text-blue-600" }),
        ...g
      });
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
        fontSize: "14px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
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
        fontSize: "14px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
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
  return /* @__PURE__ */ a.jsxs(Xe.Provider, { value: f, children: [
    u,
    /* @__PURE__ */ a.jsx(
      At,
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
function Kt(u, e) {
  const r = _t();
  return Ut(
    (...o) => {
      r.current && clearTimeout(r.current), r.current = window.setTimeout(() => {
        u(...o);
      }, e);
    },
    [u, e]
  );
}
class _e {
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
    const o = new AbortController(), l = setTimeout(() => o.abort(), this.config.timeout);
    try {
      const c = await fetch(e, {
        ...r,
        signal: o.signal
      });
      return clearTimeout(l), c;
    } catch (c) {
      throw clearTimeout(l), c instanceof Error && c.name === "AbortError" ? new Error("Request timeout") : c;
    }
  }
  /**
   * Exécute une requête avec retry automatique
   */
  async fetchWithRetry(e, r = {}, o = this.config.maxRetries) {
    let l = null;
    for (let c = 0; c < o; c++)
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
          l = f;
          continue;
        }
        return await s.json();
      } catch (s) {
        if (l = s, s instanceof SyntaxError || s instanceof Error && "status" in s && s.status >= 400 && s.status < 500)
          throw s;
        if (c < o - 1) {
          const b = this.config.retryDelay * Math.pow(2, c);
          console.log(`[ApiService] Retry attempt ${c + 1}/${o} after ${b}ms`), await new Promise((f) => setTimeout(f, b));
        }
      }
    throw l || new Error("Request failed after all retries");
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
    const l = !e.editable_id && !e.version && r !== void 0, c = {
      content: e.content,
      // Always use the user's edited content
      context: e.context,
      context_id: e.context_id,
      content_type: e.contentType || "text"
    };
    e.version && (c.version = e.version), l && (c.isDefaultContent = !0, c.defaultContent = r), console.log("[ApiService] Request body:", c);
    try {
      const s = await this.fetchWithRetry(
        `${this.baseUrl}/wp-json/api/editable-content/save`,
        {
          method: "POST",
          headers: this.getHeaders(!0),
          body: JSON.stringify(c)
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
      }), l = await this.fetchWithRetry(
        `${this.baseUrl}/wp-json/api/editable-content/get?${o.toString()}`,
        {
          headers: this.getHeaders(!1)
          // Pas d'auth nécessaire pour la lecture
        }
      );
      return l.exists ? {
        editable_id: l.editable_id,
        content: l.content || "",
        context: l.context,
        context_id: l.context_id,
        version: l.version || 0,
        contentType: l.content_type || "text",
        lastModified: l.updated_at ? new Date(l.updated_at).getTime() : Date.now()
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
const Ze = n.createContext(null), ve = () => {
  const u = n.useContext(Ze);
  if (!u)
    throw new Error("useContent must be used within ContentProvider");
  return u;
}, Jt = ({
  children: u,
  apiBaseUrl: e,
  onVersionConflict: r
}) => {
  const { isAuthenticated: o } = ue(), { error: l, warning: c, promise: s } = me(), [b, f] = n.useState(!0), [d, g] = n.useState({}), x = n.useRef(/* @__PURE__ */ new Map()), P = 5 * 60 * 1e3, C = e || void 0, [I] = n.useState(() => new _e(C)), N = Kt(async (v, w) => await A(v, w), 500), $ = n.useCallback((v, w) => {
    if (!(v != null && v.trim()) || !(w != null && w.trim()))
      throw new Error("Context and contextId are required and cannot be empty");
    return `${v}#${w}`;
  }, []), O = n.useCallback((v) => {
    const w = x.current.get(v);
    return w && Date.now() - w.timestamp < P ? w.content : (x.current.delete(v), null);
  }, []), m = n.useCallback((v, w) => {
    x.current.set(v, {
      content: w,
      timestamp: Date.now()
    });
  }, []), W = n.useCallback((v, w, j) => {
    if (!(v != null && v.trim()) || !(w != null && w.trim()))
      return console.warn("[ContentProvider] getContent called with empty context or contextId"), j;
    try {
      const h = $(v, w), L = O(h);
      if (L)
        return L.content;
      const S = d[h];
      return S ? (m(h, S), S.content) : j;
    } catch (h) {
      return console.error("[ContentProvider] Error in getContent:", h), j;
    }
  }, [d, $, O, m]), A = n.useCallback(async (v, w) => {
    var L, S;
    if (!((L = v.context) != null && L.trim()) || !((S = v.context_id) != null && S.trim()))
      return console.error("[ContentProvider] Cannot save: context and context_id are required"), l("Invalid content configuration"), !1;
    if (!o)
      return console.error("[ContentProvider] Cannot save: authentication required"), c("Please log in to save changes"), !1;
    const j = $(v.context, v.context_id), h = d[j];
    try {
      const q = { ...v, lastModified: Date.now() };
      g((V) => ({ ...V, [j]: q })), m(j, q);
      const z = {
        ...v,
        ...h && {
          editable_id: h.editable_id,
          version: h.version
        }
      }, _ = await I.saveContent(
        z,
        !h && w !== void 0 ? w : void 0
      );
      switch (_.status) {
        case "success":
        case "no_action":
          const V = _.content;
          return g((X) => ({ ...X, [j]: V })), m(j, V), !0;
        case "no_change":
          return c("No changes detected"), !0;
        default:
          throw new Error(`Unexpected status: ${_.status}`);
      }
    } catch (q) {
      if (console.error("[ContentProvider] Save failed:", q), g((z) => {
        const _ = { ...z };
        return h ? (_[j] = h, m(j, h)) : (delete _[j], x.current.delete(j)), _;
      }), _e.isVersionConflictError(q)) {
        const z = _e.getConflictInfo(q);
        if (z && r)
          switch (await r({
            clientVersion: z.client_version,
            serverVersion: z.server_version,
            serverContent: z.server_content,
            clientContent: v.content
          })) {
            case "overwrite":
              const V = {
                ...v,
                version: z.server_version,
                editable_id: z.editable_id
              };
              return A(V);
            case "keep_server":
              const X = {
                ...v,
                content: z.server_content,
                version: z.server_version,
                editable_id: z.editable_id,
                lastModified: Date.now()
              };
              return g((k) => ({ ...k, [j]: X })), m(j, X), c("Using server version of content"), !1;
            case "cancel":
            default:
              return c("Save cancelled"), !1;
          }
        else
          l("Content was modified by another user. Please refresh to get the latest version.");
      }
      return !1;
    }
  }, [o, $, I, d, r, l, c, m]), J = n.useCallback(async (v, w) => N(v, w), [N]), G = n.useCallback((v) => {
    const w = {};
    for (const j of v)
      if (j.context && j.context_id) {
        const h = $(j.context, j.context_id);
        w[h] = j;
      }
    return w;
  }, [$]), E = n.useCallback(async () => {
    try {
      const v = await I.loadAllContents(), w = G(v);
      g(w), Object.entries(w).forEach(([j, h]) => {
        m(j, h);
      }), Object.keys(w).length > 0 && o && console.log(`[ContentProvider] Successfully loaded ${Object.keys(w).length} editable contents`);
    } catch (v) {
      throw console.error("[ContentProvider] Failed to load contents:", v), l("Failed to load content. Please refresh the page."), v;
    }
  }, [I, G, l, o, m]);
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
    isLoading: b,
    contents: d,
    getContent: W,
    saveContent: J,
    refreshContents: y
  };
  return /* @__PURE__ */ a.jsx(Ze.Provider, { value: D, children: u });
}, Gt = () => {
  const [u, e] = n.useState(!1);
  return null;
}, Xt = ({
  content: u,
  onSave: e,
  onCancel: r,
  config: o,
  className: l = "",
  style: c = {},
  as: s = "span"
}) => {
  const [b, f] = n.useState(!1), [d, g] = n.useState(!1), x = n.useRef(null), P = n.useRef(u), { success: C, error: I, loading: N, dismiss: $ } = me();
  n.useEffect(() => {
    if (x.current) {
      x.current.focus();
      const E = document.createRange(), y = window.getSelection();
      E.selectNodeContents(x.current), E.collapse(!1), y == null || y.removeAllRanges(), y == null || y.addRange(E);
    }
  }, []);
  const O = n.useCallback(() => x.current && x.current.innerText || "", []), m = n.useCallback(() => {
    const E = O();
    g(E !== P.current);
  }, [O]), W = n.useCallback((E) => {
    E.key === "Escape" ? (E.preventDefault(), r()) : ((E.ctrlKey || E.metaKey) && E.key === "Enter" || (E.ctrlKey || E.metaKey) && E.key === "s") && (E.preventDefault(), A()), !o.multiline && E.key === "Enter" && E.preventDefault();
  }, [r, o.multiline]), A = n.useCallback(async () => {
    const E = O();
    if (b) return;
    if (E === P.current) {
      C("No changes to save"), r();
      return;
    }
    f(!0);
    const y = N("Saving changes...");
    try {
      const D = await e(E);
      $(y), D ? (C("Changes saved successfully"), P.current = E, g(!1)) : I("Failed to save changes");
    } catch (D) {
      $(y), I("An error occurred while saving"), console.error("[ModernInlineTextEditor] Save error:", D);
    } finally {
      f(!1);
    }
  }, [O, e, b, C, I, N, $, r]), J = n.useCallback((E) => {
    E.preventDefault();
    const y = E.clipboardData.getData("text/plain"), D = o.multiline ? y : y.replace(/\n/g, " ");
    document.execCommand("insertText", !1, D), m();
  }, [o.multiline, m]), G = n.useCallback((E) => {
    const y = E.relatedTarget;
    y != null && y.closest(".inline-editor-actions-modern") || d && !b && A();
  }, [d, b, A]);
  return /* @__PURE__ */ a.jsxs("div", { className: "inline-editor-container-modern", children: [
    /* @__PURE__ */ a.jsx(
      "div",
      {
        ref: x,
        contentEditable: !0,
        suppressContentEditableWarning: !0,
        onKeyDown: W,
        onPaste: J,
        onBlur: G,
        onInput: m,
        className: `inline-editor-content-modern ${l}`,
        style: {
          ...c,
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
        children: u
      }
    ),
    /* @__PURE__ */ a.jsxs(
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
          opacity: d || b ? 1 : 0.7
        },
        children: [
          /* @__PURE__ */ a.jsx(
            "button",
            {
              onClick: A,
              disabled: b || !d,
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
                cursor: b || !d ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                opacity: b || !d ? 0.6 : 1
              },
              "aria-label": "Save changes",
              children: b ? /* @__PURE__ */ a.jsx(Ot, { size: 12, className: "animate-spin" }) : /* @__PURE__ */ a.jsx(zt, { size: 12 })
            }
          ),
          /* @__PURE__ */ a.jsx(
            "button",
            {
              onClick: r,
              disabled: b,
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
              children: /* @__PURE__ */ a.jsx(Mt, { size: 12 })
            }
          )
        ]
      }
    )
  ] });
}, Zt = n.memo(Xt);
function Qt(u) {
  const e = window.location.pathname;
  if (!u)
    return {
      path: e,
      sectionId: 0,
      sectionSelector: "body"
    };
  const r = er(u);
  return {
    path: e,
    sectionId: r.id,
    sectionSelector: r.selector
  };
}
function er(u) {
  var o;
  let e = u.parentElement;
  for (; e && e.tagName !== "BODY"; ) {
    if (e.id && Je(e))
      return {
        id: tr(e.id),
        selector: `#${e.id}`
      };
    if (e.hasAttribute("data-section-id")) {
      const l = e.getAttribute("data-section-id");
      return {
        id: parseInt(l || "0", 10),
        selector: e.id ? `#${e.id}` : `[data-section-id="${l}"]`
      };
    }
    if (Je(e)) {
      const l = Array.from(((o = e.parentElement) == null ? void 0 : o.children) || []).indexOf(e);
      return {
        id: l + 1,
        selector: `${e.tagName.toLowerCase()}:nth-child(${l + 1})`
      };
    }
    e = e.parentElement;
  }
  return document.querySelector("main") ? { id: 1, selector: "main" } : { id: 0, selector: "body" };
}
function Je(u) {
  return ["SECTION", "ARTICLE", "MAIN", "HEADER", "FOOTER", "ASIDE"].includes(u.tagName) || u.hasAttribute("data-section") || u.classList.contains("section");
}
function tr(u) {
  let e = 0;
  for (let r = 0; r < u.length; r++) {
    const o = u.charCodeAt(r);
    e = (e << 5) - e + o, e = e & e;
  }
  return Math.abs(e);
}
function ye(u) {
  const e = Qt(u);
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
}, rr = ({
  children: u,
  id: e,
  multiline: r = !0,
  maxLength: o,
  placeholder: l,
  className: c = "",
  as: s = "span",
  showEditableHighlights: b = !1
}) => {
  const { isAuthenticated: f } = ue(), { getContent: d, saveContent: g, isLoading: x } = ve(), { error: P, promise: C } = me(), [I, N] = n.useState(!1), [$, O] = n.useState(!1), [m, W] = n.useState(""), [A, J] = n.useState(""), [G, E] = n.useState(""), [y, D] = n.useState(!1), v = n.useRef(null), w = n.useCallback((S) => typeof S == "string" ? S : typeof S == "number" ? S.toString() : S ? n.isValidElement(S) && S.props.children ? w(S.props.children) : Array.isArray(S) ? S.map(w).join("") : "" : "", []);
  n.useEffect(() => {
    if (x || !v.current) return;
    const S = w(u).trim();
    E(S);
    const q = ye(v.current);
    W(q);
    const z = d(q, e, S);
    J(z), D(!0), console.log("[ModernEditableWrapper] Initialized:", {
      context: q,
      contextId: e,
      defaultContent: S,
      currentContent: z
    });
  }, [e, u, d, w, x]);
  const j = n.useCallback((S) => {
    S.stopPropagation(), f && !I && m && N(!0);
  }, [f, I, m]), h = n.useCallback(async (S) => {
    if (!m)
      return P("Cannot save: invalid configuration"), !1;
    const q = {
      content: S,
      context: m,
      context_id: e,
      contentType: "text",
      lastModified: Date.now()
    };
    try {
      const z = await C(
        g(q, G),
        {
          loading: "Saving changes...",
          success: "Changes saved successfully!",
          error: "Failed to save changes"
        }
      );
      return z && (J(S), N(!1)), z;
    } catch (z) {
      return console.error("[ModernEditableWrapper] Save error:", z), !1;
    }
  }, [m, e, g, G, P, C]), L = n.useCallback(() => {
    N(!1);
  }, []);
  return x || !y ? n.createElement(
    s,
    {
      ref: v,
      className: `modern-editable-skeleton ${c}`,
      style: {
        background: `linear-gradient(90deg, ${K.colors.neutral[200]} 25%, ${K.colors.neutral[100]} 50%, ${K.colors.neutral[200]} 75%)`,
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
        borderRadius: K.borderRadius.sm,
        minHeight: "1.25rem",
        minWidth: "4rem"
      }
    }
  ) : I && f ? /* @__PURE__ */ a.jsx(
    Zt,
    {
      content: A,
      onSave: h,
      onCancel: L,
      config: {
        id: e,
        multiline: r,
        maxLength: o,
        placeholder: l
      },
      className: c,
      as: s,
      preserveStyles: !0
    }
  ) : /* @__PURE__ */ a.jsxs(
    ae.div,
    {
      style: { position: "relative", display: "inline-block" },
      onHoverStart: () => O(!0),
      onHoverEnd: () => O(!1),
      children: [
        n.createElement(
          s,
          {
            ref: v,
            className: `modern-editable-wrapper ${f ? "is-authenticated" : ""} ${b ? "show-highlights" : ""} ${c}`,
            onClick: j,
            onKeyDown: f ? (S) => {
              (S.key === "Enter" || S.key === " ") && (S.preventDefault(), j(S));
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
              ...f && $ && {
                outline: `2px solid ${K.colors.primary[100]}`,
                backgroundColor: `${K.colors.primary[50]}`
              },
              ...b && f && {
                outline: `2px dashed ${K.colors.primary[100]}`,
                backgroundColor: `${K.colors.primary[50]}`
              }
            },
            title: f ? "Click to edit" : void 0,
            "data-context": m,
            "data-context-id": e,
            role: f ? "button" : void 0,
            tabIndex: f ? 0 : void 0,
            "aria-label": f ? `Edit ${e}` : void 0
          },
          A
        ),
        /* @__PURE__ */ a.jsx(Vt, { children: f && $ && !I && /* @__PURE__ */ a.jsxs(
          ae.div,
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
              /* @__PURE__ */ a.jsx(
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
}, fr = n.memo(rr), nr = ({
  showEditableHighlights: u,
  toggleEditableHighlights: e
}) => {
  const { isAuthenticated: r, logout: o, user: l } = ue(), { success: c, info: s } = me();
  if (!r)
    return null;
  const b = () => {
    o(), c("Successfully logged out");
  }, f = () => {
    e(), s(u ? "Edit highlights hidden" : "Edit highlights shown");
  };
  return /* @__PURE__ */ a.jsxs(
    ae.div,
    {
      className: "global-editor-toolbar-modern",
      initial: { opacity: 0, y: -20, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { duration: 0.3, ease: "easeOut" },
      children: [
        /* @__PURE__ */ a.jsxs(
          ae.div,
          {
            className: "flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200",
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.3, delay: 0.1 },
            children: [
              /* @__PURE__ */ a.jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }),
              /* @__PURE__ */ a.jsx("span", { className: "text-xs font-medium text-blue-800", children: (l == null ? void 0 : l.name) || "Editor" })
            ]
          }
        ),
        /* @__PURE__ */ a.jsx(
          ae.button,
          {
            onClick: f,
            className: `global-editor-toolbar-btn-modern ${u ? "active" : ""}`,
            title: u ? "Hide editable highlights" : "Show editable highlights",
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 },
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.3, delay: 0.2 },
            children: u ? /* @__PURE__ */ a.jsx(Lt, { size: 18 }) : /* @__PURE__ */ a.jsx(Ft, { size: 18 })
          }
        ),
        /* @__PURE__ */ a.jsx(
          ae.button,
          {
            className: "global-editor-toolbar-btn-modern",
            title: "Editor settings",
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 },
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.3, delay: 0.3 },
            onClick: () => s("Settings panel coming soon"),
            children: /* @__PURE__ */ a.jsx(Wt, { size: 18 })
          }
        ),
        /* @__PURE__ */ a.jsx(
          ae.button,
          {
            onClick: b,
            className: "global-editor-toolbar-btn-modern logout",
            title: "Logout",
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 },
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.3, delay: 0.4 },
            children: /* @__PURE__ */ a.jsx(Nt, { size: 18 })
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
    const l = re.get();
    if (!l)
      return {
        success: !1,
        error: "Authentication required"
      };
    const c = new FormData();
    c.append("file", e), c.append("title", e.name.replace(/\.[^/.]+$/, "")), c.append("alt", e.name.replace(/\.[^/.]+$/, ""));
    try {
      const s = new XMLHttpRequest(), b = new Promise((f, d) => {
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
      }), s.open("POST", `${this.baseUrl}/wp-json/wp/v2/media`), s.setRequestHeader("Authorization", `Bearer ${l}`), s.send(c), await b;
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
    const l = re.get();
    if (!l)
      return {
        success: !1,
        error: "Authentication required"
      };
    try {
      const c = await fetch(`${this.baseUrl}/wp-json/api/media/import-url`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${l}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          url: e,
          filename: r || this.extractFilenameFromUrl(e),
          title: (r == null ? void 0 : r.replace(/\.[^/.]+$/, "")) || "Imported image",
          alt: (r == null ? void 0 : r.replace(/\.[^/.]+$/, "")) || "Imported image"
        })
      });
      if (!c.ok) {
        const b = await c.text();
        throw new Error(`Import failed: ${c.status} - ${b}`);
      }
      const s = await c.json();
      return console.log("[MediaUploadService] URL import successful:", s), this.formatResponse(s);
    } catch (c) {
      return console.error("[MediaUploadService] URL import error:", c), {
        success: !1,
        error: c instanceof Error ? c.message : "Import failed"
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
      const o = new URL(e).pathname, l = o.substring(o.lastIndexOf("/") + 1);
      return !l || l === "" ? `image-${Date.now()}.jpg` : l.includes(".") ? l : `${l}.jpg`;
    } catch {
      return `image-${Date.now()}.jpg`;
    }
  }
  /**
   * Formate la réponse WordPress en format uniforme
   */
  formatResponse(e) {
    var l, c, s, b, f, d, g;
    if (!e || !e.id && !e.ID)
      return {
        success: !1,
        error: "Invalid response from server"
      };
    const r = e.id || e.ID, o = e.source_url || ((l = e.guid) == null ? void 0 : l.rendered) || e.url;
    return {
      success: !0,
      data: {
        id: r,
        url: o,
        alt: e.alt_text || "",
        title: ((c = e.title) == null ? void 0 : c.rendered) || e.title || "",
        sizes: (s = e.media_details) != null && s.sizes ? {
          thumbnail: (b = e.media_details.sizes.thumbnail) == null ? void 0 : b.source_url,
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
const Qe = ({
  isOpen: u,
  onClose: e,
  onImageSelected: r
}) => {
  const [o, l] = n.useState("file"), [c, s] = n.useState(!1), [b, f] = n.useState(null), [d, g] = n.useState(""), [x, P] = n.useState(""), [C, I] = n.useState(!1), [N, $] = n.useState(0), [O, m] = n.useState(""), W = n.useRef(null), A = n.useRef(new ce()).current;
  n.useEffect(() => () => {
    d && !ce.isUrl(d) && ce.revokePreviewUrl(d);
  }, [d]);
  const J = n.useCallback((h) => {
    h.preventDefault(), s(!0);
  }, []), G = n.useCallback((h) => {
    h.preventDefault(), s(!1);
  }, []), E = n.useCallback((h) => {
    h.preventDefault(), s(!1);
    const S = Array.from(h.dataTransfer.files).find((q) => q.type.startsWith("image/"));
    S ? y(S) : m("Veuillez déposer une image");
  }, []), y = n.useCallback((h) => {
    f(h), m(""), d && !ce.isUrl(d) && ce.revokePreviewUrl(d);
    const L = ce.createPreviewUrl(h);
    g(L);
  }, [d]), D = n.useCallback(async () => {
    if (!b) {
      m("Aucun fichier sélectionné");
      return;
    }
    I(!0), m(""), $(0);
    try {
      const h = await A.uploadFile(
        b,
        (L) => {
          $(L.percentage);
        }
      );
      h.success && h.data ? (r(h.data.url), e()) : m(h.error || "Échec de l'upload");
    } catch (h) {
      m("Erreur lors de l'upload"), console.error("[ImageUploadModal] Upload error:", h);
    } finally {
      I(!1), $(0);
    }
  }, [b, A, r, e]), v = n.useCallback(async () => {
    if (!x.trim()) {
      m("Veuillez entrer une URL");
      return;
    }
    I(!0), m("");
    try {
      const h = await A.uploadFromUrl(x);
      h.success && h.data ? (r(h.data.url), e()) : m(h.error || "Échec de l'import");
    } catch (h) {
      m("Erreur lors de l'import"), console.error("[ImageUploadModal] Import error:", h);
    } finally {
      I(!1);
    }
  }, [x, A, r, e]), w = n.useCallback(() => {
    if (!x.trim()) {
      m("Veuillez entrer une URL");
      return;
    }
    r(x), e();
  }, [x, r, e]), j = n.useCallback(() => {
    f(null), g(""), P(""), m(""), l("file"), e();
  }, [e]);
  return u ? /* @__PURE__ */ a.jsx(
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
      children: /* @__PURE__ */ a.jsxs(
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
            /* @__PURE__ */ a.jsx("h2", { style: { margin: "0 0 20px 0", fontSize: "24px" }, children: "Modifier l'image" }),
            /* @__PURE__ */ a.jsxs("div", { style: { display: "flex", gap: "8px", marginBottom: "24px" }, children: [
              /* @__PURE__ */ a.jsx(
                "button",
                {
                  onClick: () => l("file"),
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
              /* @__PURE__ */ a.jsx(
                "button",
                {
                  onClick: () => l("url"),
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
            o === "file" && /* @__PURE__ */ a.jsxs("div", { children: [
              /* @__PURE__ */ a.jsx(
                "div",
                {
                  onDragOver: J,
                  onDragLeave: G,
                  onDrop: E,
                  onClick: () => {
                    var h;
                    return (h = W.current) == null ? void 0 : h.click();
                  },
                  style: {
                    border: `2px dashed ${c ? "#3b82f6" : "#6b7280"}`,
                    borderRadius: "8px",
                    padding: "40px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: c ? "rgba(59, 130, 246, 0.1)" : "rgba(55, 65, 81, 0.5)",
                    transition: "all 0.2s"
                  },
                  children: b ? /* @__PURE__ */ a.jsxs("div", { children: [
                    d && /* @__PURE__ */ a.jsx(
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
                    /* @__PURE__ */ a.jsx("p", { style: { margin: "8px 0", fontSize: "14px" }, children: b.name }),
                    /* @__PURE__ */ a.jsxs("p", { style: { margin: "0", fontSize: "12px", color: "#9ca3af" }, children: [
                      (b.size / 1024 / 1024).toFixed(2),
                      " MB"
                    ] })
                  ] }) : /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
                    /* @__PURE__ */ a.jsx("p", { style: { margin: "0 0 8px 0", fontSize: "18px" }, children: "📁 Glissez une image ici" }),
                    /* @__PURE__ */ a.jsx("p", { style: { margin: "0", fontSize: "14px", color: "#9ca3af" }, children: "ou cliquez pour sélectionner" })
                  ] })
                }
              ),
              /* @__PURE__ */ a.jsx(
                "input",
                {
                  ref: W,
                  type: "file",
                  accept: "image/*",
                  onChange: (h) => {
                    var S;
                    const L = (S = h.target.files) == null ? void 0 : S[0];
                    L && y(L);
                  },
                  style: { display: "none" }
                }
              ),
              C && N > 0 && /* @__PURE__ */ a.jsxs("div", { style: { marginTop: "16px" }, children: [
                /* @__PURE__ */ a.jsx("div", { style: {
                  background: "#374151",
                  borderRadius: "4px",
                  height: "8px",
                  overflow: "hidden"
                }, children: /* @__PURE__ */ a.jsx("div", { style: {
                  background: "#3b82f6",
                  height: "100%",
                  width: `${N}%`,
                  transition: "width 0.3s"
                } }) }),
                /* @__PURE__ */ a.jsxs("p", { style: {
                  textAlign: "center",
                  marginTop: "8px",
                  fontSize: "14px",
                  color: "#9ca3af"
                }, children: [
                  N,
                  "%"
                ] })
              ] })
            ] }),
            o === "url" && /* @__PURE__ */ a.jsxs("div", { children: [
              /* @__PURE__ */ a.jsx(
                "input",
                {
                  type: "text",
                  value: x,
                  onChange: (h) => P(h.target.value),
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
              /* @__PURE__ */ a.jsxs("div", { style: {
                marginTop: "12px",
                padding: "12px",
                background: "rgba(59, 130, 246, 0.1)",
                borderRadius: "6px",
                fontSize: "14px"
              }, children: [
                /* @__PURE__ */ a.jsx("p", { style: { margin: "0 0 8px 0" }, children: "💡 Deux options disponibles :" }),
                /* @__PURE__ */ a.jsxs("ul", { style: { margin: "0", paddingLeft: "20px" }, children: [
                  /* @__PURE__ */ a.jsxs("li", { children: [
                    /* @__PURE__ */ a.jsx("strong", { children: "Importer dans WordPress" }),
                    " : L'image sera téléchargée et stockée dans votre médiathèque"
                  ] }),
                  /* @__PURE__ */ a.jsxs("li", { children: [
                    /* @__PURE__ */ a.jsx("strong", { children: "Utiliser l'URL directement" }),
                    " : L'image restera hébergée sur le site externe"
                  ] })
                ] })
              ] })
            ] }),
            O && /* @__PURE__ */ a.jsxs("div", { style: {
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
            /* @__PURE__ */ a.jsxs("div", { style: {
              display: "flex",
              gap: "12px",
              marginTop: "24px",
              justifyContent: "flex-end"
            }, children: [
              /* @__PURE__ */ a.jsx(
                "button",
                {
                  onClick: j,
                  disabled: C,
                  style: {
                    padding: "10px 20px",
                    background: "#6b7280",
                    border: "none",
                    borderRadius: "6px",
                    color: "white",
                    cursor: C ? "not-allowed" : "pointer",
                    fontSize: "16px",
                    opacity: C ? 0.5 : 1
                  },
                  children: "Annuler"
                }
              ),
              o === "file" && /* @__PURE__ */ a.jsx(
                "button",
                {
                  onClick: D,
                  disabled: !b || C,
                  style: {
                    padding: "10px 20px",
                    background: "#10b981",
                    border: "none",
                    borderRadius: "6px",
                    color: "white",
                    cursor: !b || C ? "not-allowed" : "pointer",
                    fontSize: "16px",
                    opacity: !b || C ? 0.5 : 1
                  },
                  children: C ? "Upload..." : "Uploader"
                }
              ),
              o === "url" && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
                /* @__PURE__ */ a.jsx(
                  "button",
                  {
                    onClick: w,
                    disabled: !x.trim() || C,
                    style: {
                      padding: "10px 20px",
                      background: "#3b82f6",
                      border: "none",
                      borderRadius: "6px",
                      color: "white",
                      cursor: !x.trim() || C ? "not-allowed" : "pointer",
                      fontSize: "16px",
                      opacity: !x.trim() || C ? 0.5 : 1
                    },
                    children: "Utiliser l'URL"
                  }
                ),
                /* @__PURE__ */ a.jsx(
                  "button",
                  {
                    onClick: v,
                    disabled: !x.trim() || C,
                    style: {
                      padding: "10px 20px",
                      background: "#10b981",
                      border: "none",
                      borderRadius: "6px",
                      color: "white",
                      cursor: !x.trim() || C ? "not-allowed" : "pointer",
                      fontSize: "16px",
                      opacity: !x.trim() || C ? 0.5 : 1
                    },
                    children: C ? "Import..." : "Importer dans WP"
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  ) : null;
}, or = ({
  id: u,
  src: e,
  alt: r = "",
  className: o = "",
  style: l = {},
  width: c,
  height: s,
  loading: b = "lazy",
  showEditableHighlights: f = !1
}) => {
  const { isAuthenticated: d } = ue(), { getContent: g, saveContent: x, isLoading: P } = ve(), [C, I] = n.useState(""), [N, $] = n.useState(""), [O, m] = n.useState(!1), [W, A] = n.useState(!1), J = n.useRef(null);
  n.useEffect(() => {
    if (P || !J.current) return;
    const y = ye(J.current);
    I(y);
    const D = g(y, u, e);
    $(D), m(!0), console.log("[ModernEditableImage] Initialized:", {
      context: y,
      contextId: u,
      defaultSrc: e,
      savedSrc: D
    });
  }, [u, e, g, P]);
  const G = n.useCallback(() => {
    d && C && A(!0);
  }, [d, C]), E = n.useCallback(async (y) => {
    if (C) {
      try {
        const D = {
          content: y,
          context: C,
          context_id: u,
          contentType: "text",
          lastModified: Date.now()
        };
        await x(D, e) ? ($(y), console.log(`[ModernEditableImage] Image source saved for ${u}`)) : console.error(`[ModernEditableImage] Failed to save image source for ${u}`);
      } catch (D) {
        console.error("[ModernEditableImage] Error saving image:", D);
      }
      A(!1);
    }
  }, [C, u, x, e]);
  return P || !O ? /* @__PURE__ */ a.jsx(
    "div",
    {
      className: `editable-image-skeleton ${o}`,
      style: {
        ...l,
        width: c || "100%",
        height: s || "200px",
        background: "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
        borderRadius: "0.375rem"
      }
    }
  ) : /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsx(
      "img",
      {
        ref: J,
        src: N,
        alt: r,
        width: c,
        height: s,
        loading: b,
        className: `editable-image-seamless ${d ? "is-authenticated" : ""} ${f ? "editable-highlight" : ""} ${o}`,
        style: {
          ...l,
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
        "data-context": C,
        "data-context-id": u,
        role: d ? "button" : void 0,
        tabIndex: d ? 0 : void 0,
        "aria-label": d ? `Edit image: ${r || u}` : r,
        onKeyDown: d ? (y) => {
          (y.key === "Enter" || y.key === " ") && (y.preventDefault(), G());
        } : void 0
      }
    ),
    /* @__PURE__ */ a.jsx(
      Qe,
      {
        isOpen: W,
        onClose: () => A(!1),
        onImageSelected: E
      }
    )
  ] });
}, pr = n.memo(or), ar = ({
  children: u,
  backgroundImage: e,
  id: r,
  className: o = "",
  style: l = {},
  as: c = "div",
  showEditableHighlights: s = !1
}) => {
  const { isAuthenticated: b } = ue(), { getContent: f, saveContent: d, isLoading: g } = ve(), [x, P] = n.useState(!1), [C, I] = n.useState(""), [N, $] = n.useState(""), [O, m] = n.useState(""), [W, A] = n.useState(!1), [J, G] = n.useState(!1), [E, y] = n.useState(!1), D = n.useRef(null), v = n.useRef(null), w = n.useCallback((k) => {
    const B = k.match(/url\(['"]?([^'"]+)['"]?\)/);
    return B ? B[1] : k;
  }, []), j = n.useCallback((k) => !k || k === "none" ? "none" : `url('${k}')`, []);
  n.useEffect(() => {
    if (g || !D.current) return;
    const k = ye(D.current);
    I(k);
    const B = w(e), ee = f(k, r, B);
    $(ee), G(!0), console.log("[EditableBackground] Initialized:", {
      context: k,
      contextId: r,
      defaultUrl: B,
      savedUrl: ee
    });
  }, [r, e, f, g, w]);
  const h = () => /* @__PURE__ */ a.jsx(
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
    b && !x && C && (P(!0), m(N), y(!1), setTimeout(() => {
      var k, B;
      (k = v.current) == null || k.focus(), (B = v.current) == null || B.select();
    }, 0));
  }, [b, x, C, N]), S = n.useCallback((k) => {
    m(k), y(!1);
  }, []), q = n.useCallback(async (k) => !k || k === "none" ? !0 : new Promise((B) => {
    const ee = new Image();
    ee.onload = () => B(!0), ee.onerror = () => B(!1), ee.src = k;
  }), []), z = n.useCallback(async () => {
    if (!C || W) return;
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
        context: C,
        context_id: r,
        contentType: "text",
        lastModified: Date.now()
      }, ee = w(e);
      await d(B, ee) ? ($(k), P(!1), console.log(`[EditableBackground] Background URL saved for ${r}`)) : console.error(`[EditableBackground] Failed to save background URL for ${r}`);
    } finally {
      A(!1);
    }
  }, [C, O, W, r, d, e, w, q]), _ = n.useCallback(() => {
    m(N), P(!1);
  }, [N]), V = n.useCallback((k) => {
    k.key === "Escape" ? (k.preventDefault(), _()) : k.key === "Enter" && (k.preventDefault(), z());
  }, [_, z]), X = {
    ...l,
    backgroundImage: j(x ? O : N),
    position: "relative",
    transition: "all 0.2s ease"
  };
  return g || !J ? n.createElement(
    c,
    {
      ref: D,
      className: o,
      style: { ...l, visibility: "hidden" }
    },
    u
  ) : n.createElement(
    c,
    {
      ref: D,
      className: `editable-background ${b ? "is-authenticated" : ""} ${s && b ? "editable-highlight" : ""} ${o}`,
      style: X,
      "data-context": C,
      "data-context-id": r,
      onMouseEnter: (k) => {
        if (b && !x) {
          const B = k.currentTarget.querySelector(".editable-background-edit-btn");
          B && (B.style.opacity = "1");
        }
      },
      onMouseLeave: (k) => {
        if (b && !x && !s) {
          const B = k.currentTarget.querySelector(".editable-background-edit-btn");
          B && (B.style.opacity = "0");
        }
      }
    },
    /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
      u,
      b && !x && /* @__PURE__ */ a.jsx(h, {}),
      x && b && /* @__PURE__ */ a.jsxs(
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
            /* @__PURE__ */ a.jsx("h4", { style: { margin: "0 0 12px 0", color: "white", fontSize: "16px" }, children: "Modifier l'image de fond" }),
            /* @__PURE__ */ a.jsxs("div", { style: { display: "flex", gap: "8px" }, children: [
              /* @__PURE__ */ a.jsx(
                "input",
                {
                  ref: v,
                  type: "text",
                  value: O,
                  onChange: (k) => m(k.target.value),
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
                  disabled: W
                }
              ),
              /* @__PURE__ */ a.jsx(
                "button",
                {
                  onClick: () => y(!0),
                  disabled: W,
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
              /* @__PURE__ */ a.jsx(
                "button",
                {
                  onClick: z,
                  disabled: W,
                  style: {
                    padding: "8px 16px",
                    background: "#10b981",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: W ? "not-allowed" : "pointer",
                    opacity: W ? 0.6 : 1,
                    fontSize: "14px",
                    fontWeight: "500"
                  },
                  children: W ? "Saving..." : "Save"
                }
              ),
              /* @__PURE__ */ a.jsx(
                "button",
                {
                  onClick: _,
                  disabled: W,
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
            /* @__PURE__ */ a.jsx("div", { style: { marginTop: "8px", fontSize: "12px", color: "rgba(255, 255, 255, 0.6)" }, children: "Exemples : https://example.com/image.jpg, /images/hero.jpg, none" })
          ]
        }
      ),
      /* @__PURE__ */ a.jsx(
        Qe,
        {
          isOpen: E,
          onClose: () => y(!1),
          onImageSelected: S
        }
      )
    ] })
  );
}, gr = n.memo(ar), ir = ({
  children: u,
  id: e,
  attribute: r,
  defaultValue: o,
  validator: l,
  transformer: c,
  showEditableHighlights: s = !1,
  editLabel: b
}) => {
  const { isAuthenticated: f } = ue(), { getContent: d, saveContent: g, isLoading: x } = ve(), [P, C] = n.useState(!1), [I, N] = n.useState(""), [$, O] = n.useState(""), [m, W] = n.useState(""), [A, J] = n.useState(!1), [G, E] = n.useState(!1), [y, D] = n.useState(""), v = n.useRef(null), w = n.useRef(null);
  n.useEffect(() => {
    if (x || !v.current) return;
    const _ = ye(v.current);
    N(_);
    const V = `${e}-${r}`, X = d(_, V, o);
    O(X), E(!0), console.log("[EditableAttribute] Initialized:", {
      context: _,
      contextId: V,
      attribute: r,
      defaultValue: o,
      savedValue: X
    });
  }, [e, r, o, d, x]);
  const j = n.useCallback((_) => {
    _.preventDefault(), _.stopPropagation(), f && !P && I && (C(!0), W($), D(""), setTimeout(() => {
      var V, X;
      (V = w.current) == null || V.focus(), (X = w.current) == null || X.select();
    }, 0));
  }, [f, P, I, $]), h = n.useCallback((_) => {
    if (!l) return !0;
    const V = l(_);
    return typeof V == "string" ? (D(V), !1) : (D(""), V);
  }, [l]), L = n.useCallback(async () => {
    if (!I || A || !h(m))
      return;
    const _ = c ? c(m) : m;
    J(!0);
    try {
      const V = `${e}-${r}`, X = {
        content: _,
        context: I,
        context_id: V,
        contentType: "text",
        lastModified: Date.now()
      };
      await g(X, o) ? (O(_), C(!1), console.log(`[EditableAttribute] Attribute ${r} saved for ${e}`)) : console.error(`[EditableAttribute] Failed to save attribute ${r} for ${e}`);
    } finally {
      J(!1);
    }
  }, [I, m, A, e, r, g, o, h, c]), S = n.useCallback(() => {
    W($), C(!1), D("");
  }, [$]), q = n.useCallback((_) => {
    _.key === "Escape" ? (_.preventDefault(), S()) : _.key === "Enter" && (_.preventDefault(), L());
  }, [S, L]);
  if (x || !G)
    return n.cloneElement(u, { ref: v });
  const z = n.cloneElement(u, {
    ref: v,
    [r]: $,
    className: `${u.props.className || ""} editable-attribute ${f ? "is-authenticated" : ""} ${s ? "editable-highlight" : ""}`.trim(),
    "data-context": I,
    "data-context-id": `${e}-${r}`,
    "data-editable-attribute": r
  });
  return /* @__PURE__ */ a.jsxs("div", { style: { position: "relative", display: "inline-block" }, children: [
    z,
    f && !P && /* @__PURE__ */ a.jsxs(
      "span",
      {
        className: "editable-attribute-indicator",
        onClick: j,
        style: { cursor: "pointer" },
        children: [
          "✏️ ",
          b || r
        ]
      }
    ),
    P && f && /* @__PURE__ */ a.jsxs(
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
          /* @__PURE__ */ a.jsx("label", { style: {
            display: "block",
            marginBottom: "8px",
            color: "white",
            fontSize: "13px",
            fontWeight: "500"
          }, children: b || `Edit ${r}` }),
          /* @__PURE__ */ a.jsxs("div", { style: { display: "flex", gap: "8px", marginBottom: y ? "8px" : 0 }, children: [
            /* @__PURE__ */ a.jsx(
              "input",
              {
                ref: w,
                type: "text",
                value: m,
                onChange: (_) => {
                  W(_.target.value), h(_.target.value);
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
            /* @__PURE__ */ a.jsx(
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
            /* @__PURE__ */ a.jsx(
              "button",
              {
                onClick: S,
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
          y && /* @__PURE__ */ a.jsx("div", { style: {
            color: "#ef4444",
            fontSize: "12px",
            marginTop: "-4px"
          }, children: y })
        ]
      }
    )
  ] });
}, hr = n.memo(ir), br = ({
  children: u,
  useModernDesign: e = !0
  // Default to modern design
}) => {
  const [r, o] = n.useState(!1), l = () => {
    o((c) => !c);
  };
  return n.useEffect(() => {
    const c = document.body;
    return r ? c.classList.add("editable-highlight-active") : c.classList.remove("editable-highlight-active"), () => {
      c.classList.remove("editable-highlight-active");
    };
  }, [r]), n.useEffect(() => {
    const c = document.body;
    return e ? c.classList.add("inline-editor-modern") : c.classList.remove("inline-editor-modern"), () => {
      c.classList.remove("inline-editor-modern");
    };
  }, [e]), /* @__PURE__ */ a.jsx(et.Provider, { value: { showEditableHighlights: r }, children: /* @__PURE__ */ a.jsx(Yt, { children: /* @__PURE__ */ a.jsx(Ht, { children: /* @__PURE__ */ a.jsxs(Jt, { children: [
    u,
    /* @__PURE__ */ a.jsx(
      nr,
      {
        showEditableHighlights: r,
        toggleEditableHighlights: l
      }
    ),
    /* @__PURE__ */ a.jsx(Gt, {})
  ] }) }) }) });
}, et = n.createContext({ showEditableHighlights: !1 }), xr = () => n.useContext(et).showEditableHighlights;
export {
  hr as EditableAttribute,
  gr as EditableBackground,
  br as InlineEditor,
  pr as ModernEditableImage,
  fr as ModernEditableWrapper,
  nr as ModernEditorToolbar,
  br as default,
  ue as useAuth,
  ve as useContent,
  xr as useEditableHighlights,
  me as useNotifications
};
