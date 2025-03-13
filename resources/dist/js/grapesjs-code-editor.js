var v = typeof window < "u" ? window : null, $ = v === null, A = $ ? void 0 : v.document, f = "addEventListener", p = "removeEventListener", W = "getBoundingClientRect", D = "_a", m = "_b", y = "_c", k = "horizontal", g = function() {
  return !1;
}, pe = $ ? "calc" : ["", "-webkit-", "-moz-", "-o-"].filter(function(o) {
  var r = A.createElement("div");
  return r.style.cssText = "width:" + o + "calc(9px)", !!r.style.length;
}).shift() + "calc", ne = function(o) {
  return typeof o == "string" || o instanceof String;
}, te = function(o) {
  if (ne(o)) {
    var r = A.querySelector(o);
    if (!r)
      throw new Error("Selector " + o + " did not match a DOM element");
    return r;
  }
  return o;
}, d = function(o, r, s) {
  var a = o[r];
  return a !== void 0 ? a : s;
}, B = function(o, r, s, a) {
  if (r) {
    if (a === "end")
      return 0;
    if (a === "center")
      return o / 2;
  } else if (s) {
    if (a === "start")
      return 0;
    if (a === "center")
      return o / 2;
  }
  return o;
}, me = function(o, r) {
  var s = A.createElement("div");
  return s.className = "gutter gutter-" + r, s;
}, ge = function(o, r, s) {
  var a = {};
  return ne(r) ? a[o] = r : a[o] = pe + "(" + r + "% - " + s + "px)", a;
}, Se = function(o, r) {
  var s;
  return s = {}, s[o] = r + "px", s;
}, ye = function(o, r) {
  if (r === void 0 && (r = {}), $)
    return {};
  var s = o, a, S, C, O, z, l;
  Array.from && (s = Array.from(s));
  var F = te(s[0]), w = F.parentNode, T = getComputedStyle ? getComputedStyle(w) : null, X = T ? T.flexDirection : null, U = d(r, "sizes") || s.map(function() {
    return 100 / s.length;
  }), G = d(r, "minSize", 100), N = Array.isArray(G) ? G : s.map(function() {
    return G;
  }), R = d(r, "maxSize", 1 / 0), re = Array.isArray(R) ? R : s.map(function() {
    return R;
  }), ie = d(r, "expandToMin", !1), M = d(r, "gutterSize", 10), L = d(r, "gutterAlign", "center"), q = d(r, "snapOffset", 30), se = Array.isArray(q) ? q : s.map(function() {
    return q;
  }), I = d(r, "dragInterval", 1), x = d(r, "direction", k), _ = d(
    r,
    "cursor",
    x === k ? "col-resize" : "row-resize"
  ), ae = d(r, "gutter", me), Y = d(
    r,
    "elementStyle",
    ge
  ), oe = d(r, "gutterStyle", Se);
  x === k ? (a = "width", S = "clientX", C = "left", O = "right", z = "clientWidth") : x === "vertical" && (a = "height", S = "clientY", C = "top", O = "bottom", z = "clientHeight");
  function P(n, e, t, i) {
    var u = Y(a, e, t, i);
    Object.keys(u).forEach(function(c) {
      n.style[c] = u[c];
    });
  }
  function le(n, e, t) {
    var i = oe(a, e, t);
    Object.keys(i).forEach(function(u) {
      n.style[u] = i[u];
    });
  }
  function j() {
    return l.map(function(n) {
      return n.size;
    });
  }
  function Z(n) {
    return "touches" in n ? n.touches[0][S] : n[S];
  }
  function J(n) {
    var e = l[this.a], t = l[this.b], i = e.size + t.size;
    e.size = n / this.size * i, t.size = i - n / this.size * i, P(e.element, e.size, this[m], e.i), P(t.element, t.size, this[y], t.i);
  }
  function ce(n) {
    var e, t = l[this.a], i = l[this.b];
    this.dragging && (e = Z(n) - this.start + (this[m] - this.dragOffset), I > 1 && (e = Math.round(e / I) * I), e <= t.minSize + t.snapOffset + this[m] ? e = t.minSize + this[m] : e >= this.size - (i.minSize + i.snapOffset + this[y]) && (e = this.size - (i.minSize + this[y])), e >= t.maxSize - t.snapOffset + this[m] ? e = t.maxSize + this[m] : e <= this.size - (i.maxSize - i.snapOffset + this[y]) && (e = this.size - (i.maxSize + this[y])), J.call(this, e), d(r, "onDrag", g)(j()));
  }
  function K() {
    var n = l[this.a].element, e = l[this.b].element, t = n[W](), i = e[W]();
    this.size = t[a] + i[a] + this[m] + this[y], this.start = t[C], this.end = t[O];
  }
  function ue(n) {
    if (!getComputedStyle)
      return null;
    var e = getComputedStyle(n);
    if (!e)
      return null;
    var t = n[z];
    return t === 0 ? null : (x === k ? t -= parseFloat(e.paddingLeft) + parseFloat(e.paddingRight) : t -= parseFloat(e.paddingTop) + parseFloat(e.paddingBottom), t);
  }
  function Q(n) {
    var e = ue(w);
    if (e === null || N.reduce(function(c, h) {
      return c + h;
    }, 0) > e)
      return n;
    var t = 0, i = [], u = n.map(function(c, h) {
      var E = e * c / 100, H = B(
        M,
        h === 0,
        h === n.length - 1,
        L
      ), V = N[h] + H;
      return E < V ? (t += V - E, i.push(0), V) : (i.push(E - V), E);
    });
    return t === 0 ? n : u.map(function(c, h) {
      var E = c;
      if (t > 0 && i[h] - t > 0) {
        var H = Math.min(
          t,
          i[h] - t
        );
        t -= H, E = c - H;
      }
      return E / e * 100;
    });
  }
  function de() {
    var n = this, e = l[n.a].element, t = l[n.b].element;
    n.dragging && d(r, "onDragEnd", g)(j()), n.dragging = !1, v[p]("mouseup", n.stop), v[p]("touchend", n.stop), v[p]("touchcancel", n.stop), v[p]("mousemove", n.move), v[p]("touchmove", n.move), n.stop = null, n.move = null, e[p]("selectstart", g), e[p]("dragstart", g), t[p]("selectstart", g), t[p]("dragstart", g), e.style.userSelect = "", e.style.webkitUserSelect = "", e.style.MozUserSelect = "", e.style.pointerEvents = "", t.style.userSelect = "", t.style.webkitUserSelect = "", t.style.MozUserSelect = "", t.style.pointerEvents = "", n.gutter.style.cursor = "", n.parent.style.cursor = "", A.body.style.cursor = "";
  }
  function he(n) {
    if (!("button" in n && n.button !== 0)) {
      var e = this, t = l[e.a].element, i = l[e.b].element;
      e.dragging || d(r, "onDragStart", g)(j()), n.preventDefault(), e.dragging = !0, e.move = ce.bind(e), e.stop = de.bind(e), v[f]("mouseup", e.stop), v[f]("touchend", e.stop), v[f]("touchcancel", e.stop), v[f]("mousemove", e.move), v[f]("touchmove", e.move), t[f]("selectstart", g), t[f]("dragstart", g), i[f]("selectstart", g), i[f]("dragstart", g), t.style.userSelect = "none", t.style.webkitUserSelect = "none", t.style.MozUserSelect = "none", t.style.pointerEvents = "none", i.style.userSelect = "none", i.style.webkitUserSelect = "none", i.style.MozUserSelect = "none", i.style.pointerEvents = "none", e.gutter.style.cursor = _, e.parent.style.cursor = _, A.body.style.cursor = _, K.call(e), e.dragOffset = Z(n) - e.end;
    }
  }
  U = Q(U);
  var b = [];
  l = s.map(function(n, e) {
    var t = {
      element: te(n),
      size: U[e],
      minSize: N[e],
      maxSize: re[e],
      snapOffset: se[e],
      i: e
    }, i;
    if (e > 0 && (i = {
      a: e - 1,
      b: e,
      dragging: !1,
      direction: x,
      parent: w
    }, i[m] = B(
      M,
      e - 1 === 0,
      !1,
      L
    ), i[y] = B(
      M,
      !1,
      e === s.length - 1,
      L
    ), X === "row-reverse" || X === "column-reverse")) {
      var u = i.a;
      i.a = i.b, i.b = u;
    }
    if (e > 0) {
      var c = ae(e, x, t.element);
      le(c, M, e), i[D] = he.bind(i), c[f](
        "mousedown",
        i[D]
      ), c[f](
        "touchstart",
        i[D]
      ), w.insertBefore(c, t.element), i.gutter = c;
    }
    return P(
      t.element,
      t.size,
      B(
        M,
        e === 0,
        e === s.length - 1,
        L
      ),
      e
    ), e > 0 && b.push(i), t;
  });
  function ee(n) {
    var e = n.i === b.length, t = e ? b[n.i - 1] : b[n.i];
    K.call(t);
    var i = e ? t.size - n.minSize - t[y] : n.minSize + t[m];
    J.call(t, i);
  }
  l.forEach(function(n) {
    var e = n.element[W]()[a];
    e < n.minSize && (ie ? ee(n) : n.minSize = e);
  });
  function ve(n) {
    var e = Q(n);
    e.forEach(function(t, i) {
      if (i > 0) {
        var u = b[i - 1], c = l[u.a], h = l[u.b];
        c.size = e[i - 1], h.size = t, P(c.element, c.size, u[m], c.i), P(h.element, h.size, u[y], h.i);
      }
    });
  }
  function fe(n, e) {
    b.forEach(function(t) {
      if (e !== !0 ? t.parent.removeChild(t.gutter) : (t.gutter[p](
        "mousedown",
        t[D]
      ), t.gutter[p](
        "touchstart",
        t[D]
      )), n !== !0) {
        var i = Y(
          a,
          t.a.size,
          t[m]
        );
        Object.keys(i).forEach(function(u) {
          l[t.a].element.style[u] = "", l[t.b].element.style[u] = "";
        });
      }
    });
  }
  return {
    setSizes: ve,
    getSizes: j,
    collapse: function(e) {
      ee(l[e]);
    },
    destroy: fe,
    parent: w,
    pairs: b
  };
};
class ze {
  constructor(r, s) {
    var a, S;
    this.opts = {
      openState: { cv: "55%", pn: "45%" },
      //State when open
      closedState: { cv: "85%", pn: "15%" }
      //State when closed
    }, this.isVisible = !1, this.editor = r, this.opts = { ...this.opts, ...s }, this.canvas = (a = this.editor.getEl()) == null ? void 0 : a.querySelector(".gjs-cv-canvas"), this.panelViews = (S = this.editor.getEl()) == null ? void 0 : S.querySelector(".gjs-pn-views-container");
  }
  buildCodeEditor(r) {
    return this.editor.CodeManager.createViewer({
      codeName: r === "html" ? "htmlmixed" : "css",
      readOnly: 0
    });
  }
  // add html/css code editor views-container, along with style, traits, components
  buildCodePanel() {
    const r = (C, O) => {
      const z = document.createElement("section");
      z.insertAdjacentHTML("beforeend", `
        <div class="codepanel-separator">
          <div class="codepanel-label">${C}</div>
          <button class="apply-btn gjs-btn-prim">Apply</button>
        </div>`);
      const l = O.getElement();
      l.style.height = "calc(100% - 30px)", z.appendChild(l);
      const F = C === "html" ? this.updateHtml : C === "css" ? this.updateCss : () => alert("apply handler error");
      return z.querySelector(".apply-btn").addEventListener("click", F.bind(this)), z;
    };
    this.htmlCodeEditor = this.buildCodeEditor("html"), this.cssCodeEditor = this.buildCodeEditor("css");
    const s = r("html", this.htmlCodeEditor), a = r("css", this.cssCodeEditor);
    this.codePanel = document.createElement("div"), this.codePanel.classList.add("code-panel"), this.codePanel.append(s, a);
    const S = this.editor.Panels.getPanel("views-container");
    S.view.el.appendChild(this.codePanel), S.trigger("change:appendContent"), this.updateEditorContents(), ye([s, a], {
      direction: "vertical",
      sizes: [50, 50],
      minSize: 100,
      gutterSize: 1
    }), this.editor.on(
      "component:update",
      () => this.updateEditorContents()
    ), this.editor.on(
      "stop:preview",
      () => this.isVisible && (this.canvas.style.width = this.opts.openState.cv)
    );
  }
  showCodePanel() {
    this.updateEditorContents(), this.isVisible = !0, this.panelViews.style.width = this.opts.openState.pn, this.canvas.style.width = this.opts.openState.cv;
  }
  hideCodePanel() {
    this.codePanel.remove(), this.isVisible = !1, this.panelViews.style.width = this.opts.closedState.pn, this.canvas.style.width = this.opts.closedState.cv;
  }
  updateHtml(r) {
    var a;
    r.preventDefault();
    let s = this.htmlCodeEditor.getContent().trim();
    !s || s === this.previousHtmlCode || (this.previousHtmlCode = s, this.editor.select((a = this.component) == null ? void 0 : a.replaceWith(s)));
  }
  updateCss(r) {
    r.preventDefault();
    const s = this.cssCodeEditor.getContent().trim();
    !s || s === this.previousCssCode || (this.previousCssCode = s, this.editor.Css.addRules(s));
  }
  updateEditorContents() {
    if (!this.editor.getSelected()) return;
    this.component = this.editor.getSelected(), this.htmlCodeEditor.setContent(this.component.toHTML());
    const r = this.editor.CodeManager.getCode(this.component, "css", {
      cssc: this.editor.Css
    });
    this.cssCodeEditor.setContent(r);
  }
}
const Ce = (o, r = {}) => {
  let s;
  o.Commands.add("open-code", {
    run: function(a) {
      s = new ze(a, r), s == null || s.buildCodePanel(), s == null || s.showCodePanel();
    },
    stop: function(a) {
      s == null || s.hideCodePanel();
    }
  });
};
export {
  Ce as default
};
