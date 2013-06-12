(function() {
    function V(b, n, m) {
        if (b === n) {
            return b !== 0 || 1 / b == 1 / n
        }
        if (b == null || n == null) {
            return b === n
        }
        if (b._chain) {
            b = b._wrapped
        }
        if (n._chain) {
            n = n._wrapped
        }
        if (b.isEqual && ah.isFunction(b.isEqual)) {
            return b.isEqual(n)
        }
        if (n.isEqual && ah.isFunction(n.isEqual)) {
            return n.isEqual(b)
        }
        var l = ad.call(b);
        if (l != ad.call(n)) {
            return false
        }
        switch (l) {
            case "[object String]":
                return b == String(n);
            case "[object Number]":
                return b != +b ? n != +n: b == 0 ? 1 / b == 1 / n: b == +n;
            case "[object Date]":
            case "[object Boolean]":
                return + b == +n;
            case "[object RegExp]":
                return b.source == n.source && b.global == n.global && b.multiline == n.multiline && b.ignoreCase == n.ignoreCase
        }
        if (typeof b != "object" || typeof n != "object") {
            return false
        }
        for (var k = m.length; k--;) {
            if (m[k] == b) {
                return true
            }
        }
        m.push(b);
        var k = 0,
        j = true;
        if (l == "[object Array]") {
            if (k = b.length, j = k == n.length) {
                for (; k--;) {
                    if (! (j = k in b == k in n && V(b[k], n[k], m))) {
                        break
                    }
                }
            }
        } else {
            if ("constructor" in b != "constructor" in n || b.constructor != n.constructor) {
                return false
            }
            for (var i in b) {
                if (ac.call(b, i) && (k++, !(j = ac.call(n, i) && V(b[i], n[i], m)))) {
                    break
                }
            }
            if (j) {
                for (i in n) {
                    if (ac.call(n, i) && !k--) {
                        break
                    }
                }
                j = !k
            }
        }
        m.pop();
        return j
    }
    var T = this,
    N = T._,
    aa = {},
    ae = Array.prototype,
    Z = Object.prototype,
    ag = ae.slice,
    h = ae.unshift,
    ad = Z.toString,
    ac = Z.hasOwnProperty,
    L = ae.forEach,
    g = ae.map,
    e = ae.reduce,
    c = ae.reduceRight,
    Y = ae.filter,
    X = ae.every,
    U = ae.some,
    W = ae.indexOf,
    S = ae.lastIndexOf,
    Z = Array.isArray,
    f = Object.keys,
    R = Function.prototype.bind,
    ah = function(b) {
        return new ab(b)
    };
    if (typeof exports !== "undefined") {
        if (typeof module !== "undefined" && module.exports) {
            exports = module.exports = ah
        }
        exports._ = ah
    } else {
        T._ = ah
    }
    ah.VERSION = "1.3.0";
    var af = ah.each = ah.forEach = function(j, m, i) {
        if (j != null) {
            if (L && j.forEach === L) {
                j.forEach(m, i)
            } else {
                if (j.length === +j.length) {
                    for (var l = 0, k = j.length; l < k; l++) {
                        if (l in j && m.call(i, j[l], l, j) === aa) {
                            break
                        }
                    }
                } else {
                    for (l in j) {
                        if (ac.call(j, l) && m.call(i, j[l], l, j) === aa) {
                            break
                        }
                    }
                }
            }
        }
    };
    ah.map = function(j, l, i) {
        var k = [];
        if (j == null) {
            return k
        }
        if (g && j.map === g) {
            return j.map(l, i)
        }
        af(j, function(b, n, m) {
            k[k.length] = l.call(i, b, n, m)
        });
        if (j.length === +j.length) {
            k.length = j.length
        }
        return k
    };
    ah.reduce = ah.foldl = ah.inject = function(b, l, k, j) {
        var i = arguments.length > 2;
        b == null && (b = []);
        if (e && b.reduce === e) {
            return j && (l = ah.bind(l, j)),
            i ? b.reduce(l, k) : b.reduce(l)
        }
        af(b, function(n, m, o) {
            i ? k = l.call(j, k, n, m, o) : (k = n, i = true)
        });
        if (!i) {
            throw new TypeError("Reduce of empty array with no initial value")
        }
        return k
    };
    ah.reduceRight = ah.foldr = function(b, m, l, k) {
        var j = arguments.length > 2;
        b == null && (b = []);
        if (c && b.reduceRight === c) {
            return k && (m = ah.bind(m, k)),
            j ? b.reduceRight(m, l) : b.reduceRight(m)
        }
        var i = ah.toArray(b).reverse();
        k && !j && (m = ah.bind(m, k));
        return j ? ah.reduce(i, m, l, k) : ah.reduce(i, m)
    };
    ah.find = ah.detect = function(j, l, i) {
        var k;
        Q(j, function(b, n, m) {
            if (l.call(i, b, n, m)) {
                return k = b,
                true
            }
        });
        return k
    };
    ah.filter = ah.select = function(j, l, i) {
        var k = [];
        if (j == null) {
            return k
        }
        if (Y && j.filter === Y) {
            return j.filter(l, i)
        }
        af(j, function(b, n, m) {
            l.call(i, b, n, m) && (k[k.length] = b)
        });
        return k
    };
    ah.reject = function(j, l, i) {
        var k = [];
        if (j == null) {
            return k
        }
        af(j, function(b, n, m) {
            l.call(i, b, n, m) || (k[k.length] = b)
        });
        return k
    };
    ah.every = ah.all = function(j, l, i) {
        var k = true;
        if (j == null) {
            return k
        }
        if (X && j.every === X) {
            return j.every(l, i)
        }
        af(j, function(b, n, m) {
            if (! (k = k && l.call(i, b, n, m))) {
                return aa
            }
        });
        return k
    };
    var Q = ah.some = ah.any = function(b, k, j) {
        k || (k = ah.identity);
        var i = false;
        if (b == null) {
            return i
        }
        if (U && b.some === U) {
            return b.some(k, j)
        }
        af(b, function(m, l, n) {
            if (i || (i = k.call(j, m, l, n))) {
                return aa
            }
        });
        return !! i
    };
    ah.include = ah.contains = function(j, k) {
        var i = false;
        if (j == null) {
            return i
        }
        return W && j.indexOf === W ? j.indexOf(k) != -1: i = Q(j, function(b) {
            return b === k
        })
    };
    ah.invoke = function(b, j) {
        var i = ag.call(arguments, 2);
        return ah.map(b, function(k) {
            return (ah.isFunction(j) ? j || k: k[j]).apply(k, i)
        })
    };
    ah.pluck = function(b, i) {
        return ah.map(b, function(j) {
            return j[i]
        })
    };
    ah.max = function(b, k, j) {
        if (!k && ah.isArray(b)) {
            return Math.max.apply(Math, b)
        }
        if (!k && ah.isEmpty(b)) {
            return - Infinity
        }
        var i = {
            computed: -Infinity
        };
        af(b, function(m, l, n) {
            l = k ? k.call(j, m, l, n) : m;
            l >= i.computed && (i = {
                value: m,
                computed: l
            })
        });
        return i.value
    };
    ah.min = function(b, k, j) {
        if (!k && ah.isArray(b)) {
            return Math.min.apply(Math, b)
        }
        if (!k && ah.isEmpty(b)) {
            return Infinity
        }
        var i = {
            computed: Infinity
        };
        af(b, function(m, l, n) {
            l = k ? k.call(j, m, l, n) : m;
            l < i.computed && (i = {
                value: m,
                computed: l
            })
        });
        return i.value
    };
    ah.shuffle = function(j) {
        var k = [],
        i;
        af(j, function(b, l) {
            l == 0 ? k[0] = b: (i = Math.floor(Math.random() * (l + 1)), k[l] = k[i], k[i] = b)
        });
        return k
    };
    ah.sortBy = function(b, j, i) {
        return ah.pluck(ah.map(b, function(l, k, m) {
            return {
                value: l,
                criteria: j.call(i, l, k, m)
            }
        }).sort(function(l, k) {
            var n = l.criteria,
            m = k.criteria;
            return n < m ? -1: n > m ? 1: 0
        }), "value")
    };
    ah.groupBy = function(b, k) {
        var j = {},
        i = ah.isFunction(k) ? k: function(l) {
            return l[k]
        };
        af(b, function(m, l) {
            var n = i(m, l);
            (j[n] || (j[n] = [])).push(m)
        });
        return j
    };
    ah.sortedIndex = function(b, m, l) {
        l || (l = ah.identity);
        for (var k = 0, j = b.length; k < j;) {
            var i = k + j >> 1;
            l(b[i]) < l(m) ? k = i + 1: j = i
        }
        return k
    };
    ah.toArray = function(b) {
        return ! b ? [] : b.toArray ? b.toArray() : ah.isArray(b) ? ag.call(b) : ah.isArguments(b) ? ag.call(b) : ah.values(b)
    };
    ah.size = function(b) {
        return ah.toArray(b).length
    };
    ah.first = ah.head = function(j, i, k) {
        return i != null && !k ? ag.call(j, 0, i) : j[0]
    };
    ah.initial = function(j, i, k) {
        return ag.call(j, 0, j.length - (i == null || k ? 1: i))
    };
    ah.last = function(j, i, k) {
        return i != null && !k ? ag.call(j, Math.max(j.length - i, 0)) : j[j.length - 1]
    };
    ah.rest = ah.tail = function(j, i, k) {
        return ag.call(j, i == null || k ? 1: i)
    };
    ah.compact = function(b) {
        return ah.filter(b, function(i) {
            return !! i
        })
    };
    ah.flatten = function(b, i) {
        return ah.reduce(b, function(j, k) {
            if (ah.isArray(k)) {
                return j.concat(i ? k: ah.flatten(k))
            }
            j[j.length] = k;
            return j
        }, [])
    };
    ah.without = function(b) {
        return ah.difference(b, ag.call(arguments, 1))
    };
    ah.uniq = ah.unique = function(b, k, j) {
        var j = j ? ah.map(b, j) : b,
        i = [];
        ah.reduce(j, function(n, m, l) {
            if (0 == l || (k === true ? ah.last(n) != m: !ah.include(n, m))) {
                n[n.length] = m,
                i[i.length] = b[l]
            }
            return n
        }, []);
        return i
    };
    ah.union = function() {
        return ah.uniq(ah.flatten(arguments, true))
    };
    ah.intersection = ah.intersect = function(b) {
        var i = ag.call(arguments, 1);
        return ah.filter(ah.uniq(b), function(j) {
            return ah.every(i, function(k) {
                return ah.indexOf(k, j) >= 0
            })
        })
    };
    ah.difference = function(b) {
        var i = ah.flatten(ag.call(arguments, 1));
        return ah.filter(b, function(j) {
            return ! ah.include(i, j)
        })
    };
    ah.zip = function() {
        for (var b = ag.call(arguments), k = ah.max(ah.pluck(b, "length")), j = Array(k), i = 0; i < k; i++) {
            j[i] = ah.pluck(b, "" + i)
        }
        return j
    };
    ah.indexOf = function(b, k, j) {
        if (b == null) {
            return - 1
        }
        var i;
        if (j) {
            return j = ah.sortedIndex(b, k),
            b[j] === k ? j: -1
        }
        if (W && b.indexOf === W) {
            return b.indexOf(k)
        }
        for (j = 0, i = b.length; j < i; j++) {
            if (j in b && b[j] === k) {
                return j
            }
        }
        return - 1
    };
    ah.lastIndexOf = function(j, i) {
        if (j == null) {
            return - 1
        }
        if (S && j.lastIndexOf === S) {
            return j.lastIndexOf(i)
        }
        for (var k = j.length; k--;) {
            if (k in j && j[k] === i) {
                return k
            }
        }
        return - 1
    };
    ah.range = function(j, i, n) {
        arguments.length <= 1 && (i = j || 0, j = 0);
        for (var n = arguments[2] || 1, m = Math.max(Math.ceil((i - j) / n), 0), l = 0, k = Array(m); l < m;) {
            k[l++] = j,
            j += n
        }
        return k
    };
    var P = function() {};
    ah.bind = function(b, k) {
        var j,
        i;
        if (b.bind === R && R) {
            return R.apply(b, ag.call(arguments, 1))
        }
        if (!ah.isFunction(b)) {
            throw new TypeError
        }
        i = ag.call(arguments, 2);
        return j = function() {
            if (! (this instanceof j)) {
                return b.apply(k, i.concat(ag.call(arguments)))
            }
            P.prototype = b.prototype;
            var l = new P,
            m = b.apply(l, i.concat(ag.call(arguments)));
            return Object(m) === m ? m: l
        }
    };
    ah.bindAll = function(b) {
        var i = ag.call(arguments, 1);
        i.length == 0 && (i = ah.functions(b));
        af(i, function(j) {
            b[j] = ah.bind(b[j], b)
        });
        return b
    };
    ah.memoize = function(b, j) {
        var i = {};
        j || (j = ah.identity);
        return function() {
            var k = j.apply(this, arguments);
            return ac.call(i, k) ? i[k] : i[k] = b.apply(this, arguments)
        }
    };
    ah.delay = function(j, i) {
        var k = ag.call(arguments, 2);
        return setTimeout(function() {
            return j.apply(j, k)
        }, i)
    };
    ah.defer = function(b) {
        return ah.delay.apply(ah, [b, 1].concat(ag.call(arguments, 1)))
    };
    ah.throttle = function(b, p) {
        var o,
        n,
        m,
        l,
        k,
        j = ah.debounce(function() {
            k = l = false
        }, p);
        return function() {
            o = this;
            n = arguments;
            var i;
            m || (m = setTimeout(function() {
                m = null;
                k && b.apply(o, n);
                j()
            }, p));
            l ? k = true: b.apply(o, n);
            j();
            l = true
        }
    };
    ah.debounce = function(j, i) {
        var k;
        return function() {
            var l = this,
            b = arguments;
            clearTimeout(k);
            k = setTimeout(function() {
                k = null;
                j.apply(l, b)
            }, i)
        }
    };
    ah.once = function(j) {
        var i = false,
        k;
        return function() {
            if (i) {
                return k
            }
            i = true;
            return k = j.apply(this, arguments)
        }
    };
    ah.wrap = function(j, i) {
        return function() {
            var b = [j].concat(ag.call(arguments, 0));
            return i.apply(this, b)
        }
    };
    ah.compose = function() {
        var b = arguments;
        return function() {
            for (var i = arguments, j = b.length - 1; j >= 0; j--) {
                i = [b[j].apply(this, i)]
            }
            return i[0]
        }
    };
    ah.after = function(j, i) {
        return j <= 0 ? i() : function() {
            if (--j < 1) {
                return i.apply(this, arguments)
            }
        }
    };
    ah.keys = f || function(j) {
        if (j !== Object(j)) {
            throw new TypeError("Invalid object")
        }
        var i = [],
        k;
        for (k in j) {
            ac.call(j, k) && (i[i.length] = k)
        }
        return i
    };
    ah.values = function(b) {
        return ah.map(b, ah.identity)
    };
    ah.functions = ah.methods = function(b) {
        var j = [],
        i;
        for (i in b) {
            ah.isFunction(b[i]) && j.push(i)
        }
        return j.sort()
    };
    ah.extend = function(b) {
        af(ag.call(arguments, 1), function(i) {
            for (var j in i) {
                i[j] !== void 0 && (b[j] = i[j])
            }
        });
        return b
    };
    ah.defaults = function(b) {
        af(ag.call(arguments, 1), function(i) {
            for (var j in i) {
                b[j] == null && (b[j] = i[j])
            }
        });
        return b
    };
    ah.clone = function(b) {
        return ! ah.isObject(b) ? b: ah.isArray(b) ? b.slice() : ah.extend({}, b)
    };
    ah.tap = function(j, i) {
        i(j);
        return j
    };
    ah.isEqual = function(j, i) {
        return V(j, i, [])
    };
    ah.isEmpty = function(b) {
        if (ah.isArray(b) || ah.isString(b)) {
            return b.length === 0
        }
        for (var i in b) {
            if (ac.call(b, i)) {
                return false
            }
        }
        return true
    };
    ah.isElement = function(b) {
        return !! (b && b.nodeType == 1)
    };
    ah.isArray = Z || function(b) {
        return ad.call(b) == "[object Array]"
    };
    ah.isObject = function(b) {
        return b === Object(b)
    };
    ah.isArguments = function(b) {
        return ad.call(b) == "[object Arguments]"
    };
    if (!ah.isArguments(arguments)) {
        ah.isArguments = function(b) {
            return ! (!b || !ac.call(b, "callee"))
        }
    }
    ah.isFunction = function(b) {
        return ad.call(b) == "[object Function]"
    };
    ah.isString = function(b) {
        return ad.call(b) == "[object String]"
    };
    ah.isNumber = function(b) {
        return ad.call(b) == "[object Number]"
    };
    ah.isNaN = function(b) {
        return b !== b
    };
    ah.isBoolean = function(b) {
        return b === true || b === false || ad.call(b) == "[object Boolean]"
    };
    ah.isDate = function(b) {
        return ad.call(b) == "[object Date]"
    };
    ah.isRegExp = function(b) {
        return ad.call(b) == "[object RegExp]"
    };
    ah.isNull = function(b) {
        return b === null
    };
    ah.isUndefined = function(b) {
        return b === void 0
    };
    ah.noConflict = function() {
        T._ = N;
        return this
    };
    ah.identity = function(b) {
        return b
    };
    ah.times = function(j, i, l) {
        for (var k = 0; k < j; k++) {
            i.call(l, k)
        }
    };
    ah.escape = function(b) {
        return ("" + b).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
    };
    ah.mixin = function(b) {
        af(ah.functions(b), function(i) {
            d(i, ah[i] = b[i])
        })
    };
    var a = 0;
    ah.uniqueId = function(j) {
        var i = a++;
        return j ? j + i: i
    };
    ah.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var O = /.^/;
    ah.template = function(b, k) {
        var j = ah.templateSettings,
        j = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + b.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(j.escape || O, function(m, l) {
            return "',_.escape(" + l.replace(/\\'/g, "'") + "),'"
        }).replace(j.interpolate || O, function(m, l) {
            return "'," + l.replace(/\\'/g, "'") + ",'"
        }).replace(j.evaluate || O, function(m, l) {
            return "');" + l.replace(/\\'/g, "'").replace(/[\r\n\t]/g, " ").replace(/\\\\/g, "\\") + ";__p.push('"
        }).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');",
        i = new Function("obj", "_", j);
        return k ? i(k, ah) : function(l) {
            return i.call(this, l, ah)
        }
    };
    ah.chain = function(b) {
        return ah(b).chain()
    };
    var ab = function(b) {
        this._wrapped = b
    };
    ah.prototype = ab.prototype;
    var M = function(b, i) {
        return i ? ah(b).chain() : b
    },
    d = function(b, i) {
        ab.prototype[b] = function() {
            var j = ag.call(arguments);
            h.call(j, this._wrapped);
            return M(i.apply(ah, j), this._chain)
        }
    };
    ah.mixin(ah);
    af("pop,push,reverse,shift,sort,splice,unshift".split(","), function(j) {
        var i = ae[j];
        ab.prototype[j] = function() {
            var k = this._wrapped;
            i.apply(k, arguments);
            var b = k.length;
            (j == "shift" || j == "splice") && b === 0 && delete k[0];
            return M(k, this._chain)
        }
    });
    af(["concat", "join", "slice"], function(j) {
        var i = ae[j];
        ab.prototype[j] = function() {
            return M(i.apply(this._wrapped, arguments), this._chain)
        }
    });
    ab.prototype.chain = function() {
        this._chain = true;
        return this
    };
    ab.prototype.value = function() {
        return this._wrapped
    }
}).call(this);
var JSON;
if (!JSON) {
    JSON = {}
} (function() {
    function f(n) {
        return n < 10 ? "0" + n: n
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function(key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z": null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {
            return this.valueOf()
        }
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    gap,
    indent,
    meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    },
    rep;
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return typeof c === "string" ? c: "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice( - 4)
        }) + '"': '"' + string + '"'
    }
    function str(key, holder) {
        var i,
        k,
        v,
        length,
        mind = gap,
        partial,
        value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key)
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
            case "string":
                return quote(value);
            case "number":
                return isFinite(value) ? String(value) : "null";
            case "boolean":
            case "null":
                return String(value);
            case "object":
                if (!value) {
                    return "null"
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === "[object Array]") {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || "null"
                    }
                    v = partial.length === 0 ? "[]": gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]": "[" + partial.join(",") + "]";
                    gap = mind;
                    return v
                }
                if (rep && typeof rep === "object") {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === "string") {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": ": ":") + v)
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": ": ":") + v)
                            }
                        }
                    }
                }
                v = partial.length === 0 ? "{}": gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}": "{" + partial.join(",") + "}";
                gap = mind;
                return v
        }
    }
    if (typeof JSON.stringify !== "function") {
        JSON.stringify = function(value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " "
                }
            } else {
                if (typeof space === "string") {
                    indent = space
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify")
            }
            return str("", {
                "": value
            })
        }
    }
    if (typeof JSON.parse !== "function") {
        JSON.parse = function(text, reviver) {
            var j;
            function walk(holder, key) {
                var k,
                v,
                value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function(a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice( - 4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
} ());
(function() {
    var I = this,
    A = I.Backbone,
    L;
    L = typeof exports !== "undefined" ? exports: I.Backbone = {};
    L.VERSION = "0.5.3";
    var K = I._;
    if (!K && typeof require !== "undefined") {
        K = require("underscore")._
    }
    var J = I.jQuery || I.Zepto;
    L.noConflict = function() {
        I.Backbone = A;
        return this
    };
    L.emulateHTTP = !1;
    L.emulateJSON = !1;
    L.Events = {
        bind: function(f, e, h) {
            var g = this._callbacks || (this._callbacks = {});
            (g[f] || (g[f] = [])).push([e, h]);
            return this
        },
        unbind: function(g, f) {
            var j;
            if (g) {
                if (j = this._callbacks) {
                    if (f) {
                        j = j[g];
                        if (!j) {
                            return this
                        }
                        for (var i = 0, h = j.length; i < h; i++) {
                            if (j[i] && f === j[i][0]) {
                                j[i] = null;
                                break
                            }
                        }
                    } else {
                        j[g] = []
                    }
                }
            } else {
                this._callbacks = {}
            }
            return this
        },
        trigger: function(j) {
            var i,
            p,
            o,
            n,
            m = 2;
            if (! (p = this._callbacks)) {
                return this
            }
            for (; m--;) {
                if (i = m ? j: "all", i = p[i]) {
                    for (var l = 0, k = i.length; l < k; l++) {
                        (o = i[l]) ? (n = m ? Array.prototype.slice.call(arguments, 1) : arguments, o[0].apply(o[1] || this, n)) : (i.splice(l, 1), l--, k--)
                    }
                }
            }
            return this
        }
    };
    L.Model = function(f, e) {
        var g;
        f || (f = {});
        if (g = this.defaults) {
            K.isFunction(g) && (g = g.call(this)),
            f = K.extend({}, g, f)
        }
        this.attributes = {};
        this._escapedAttributes = {};
        this.cid = K.uniqueId("c");
        this.set(f, {
            silent: !0
        });
        this._changed = !1;
        this._previousAttributes = K.clone(this.attributes);
        if (e && e.collection) {
            this.collection = e.collection
        }
        this.initialize(f, e)
    };
    K.extend(L.Model.prototype, L.Events, {
        _previousAttributes: null,
        _changed: !1,
        idAttribute: "id",
        initialize: function() {},
        toJSON: function() {
            return K.clone(this.attributes)
        },
        get: function(e) {
            return this.attributes[e]
        },
        escape: function(f) {
            var e;
            if (e = this._escapedAttributes[f]) {
                return e
            }
            e = this.attributes[f];
            return this._escapedAttributes[f] = (e == null ? "": "" + e).replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
        },
        has: function(e) {
            return this.attributes[e] != null
        },
        set: function(i, f) {
            f || (f = {});
            if (!i) {
                return this
            }
            if (i.attributes) {
                i = i.attributes
            }
            var n = this.attributes,
            m = this._escapedAttributes;
            if (!f.silent && this.validate && !this._performValidation(i, f)) {
                return ! 1
            }
            if (this.idAttribute in i) {
                this.id = i[this.idAttribute]
            }
            var l = this._changing;
            this._changing = !0;
            for (var k in i) {
                var j = i[k];
                if (!K.isEqual(n[k], j)) {
                    n[k] = j,
                    delete m[k],
                    this._changed = !0,
                    f.silent || this.trigger("change:" + k, this, j, f)
                }
            } ! l && !f.silent && this._changed && this.change(f);
            this._changing = !1;
            return this
        },
        unset: function(f, e) {
            if (! (f in this.attributes)) {
                return this
            }
            e || (e = {});
            var g = {};
            g[f] = void 0;
            if (!e.silent && this.validate && !this._performValidation(g, e)) {
                return ! 1
            }
            delete this.attributes[f];
            delete this._escapedAttributes[f];
            f == this.idAttribute && delete this.id;
            this._changed = !0;
            e.silent || (this.trigger("change:" + f, this, void 0, e), this.change(e));
            return this
        },
        clear: function(f) {
            f || (f = {});
            var e,
            h = this.attributes,
            g = {};
            for (e in h) {
                g[e] = void 0
            }
            if (!f.silent && this.validate && !this._performValidation(g, f)) {
                return ! 1
            }
            this.attributes = {};
            this._escapedAttributes = {};
            this._changed = !0;
            if (!f.silent) {
                for (e in h) {
                    this.trigger("change:" + e, this, void 0, f)
                }
                this.change(f)
            }
            return this
        },
        fetch: function(f) {
            f || (f = {});
            var e = this,
            g = f.success;
            f.success = function(j, i, h) {
                if (!e.set(e.parse(j, h), f)) {
                    return ! 1
                }
                g && g(e, j)
            };
            f.error = H(f.error, e, f);
            return (this.sync || L.sync).call(this, "read", this, f)
        },
        save: function(g, e) {
            e || (e = {});
            if (g && !this.set(g, e)) {
                return ! 1
            }
            var j = this,
            i = e.success;
            e.success = function(k, m, l) {
                if (!j.set(j.parse(k, l), e)) {
                    return ! 1
                }
                i && i(j, k, l)
            };
            e.error = H(e.error, j, e);
            var h = this.isNew() ? "create": "update";
            return (this.sync || L.sync).call(this, h, this, e)
        },
        destroy: function(f) {
            f || (f = {});
            if (this.isNew()) {
                return this.trigger("destroy", this, this.collection, f)
            }
            var e = this,
            g = f.success;
            f.success = function(h) {
                e.trigger("destroy", e, e.collection, f);
                g && g(e, h)
            };
            f.error = H(f.error, e, f);
            return (this.sync || L.sync).call(this, "delete", this, f)
        },
        url: function() {
            var e = F(this.collection) || this.urlRoot || E();
            if (this.isNew()) {
                return e
            }
            return e + (e.charAt(e.length - 1) == "/" ? "": "/") + encodeURIComponent(this.id)
        },
        parse: function(e) {
            return e
        },
        clone: function() {
            return new this.constructor(this)
        },
        isNew: function() {
            return this.id == null
        },
        change: function(e) {
            this.trigger("change", this, e);
            this._previousAttributes = K.clone(this.attributes);
            this._changed = !1
        },
        hasChanged: function(e) {
            if (e) {
                return this._previousAttributes[e] != this.attributes[e]
            }
            return this._changed
        },
        changedAttributes: function(f) {
            f || (f = this.attributes);
            var e = this._previousAttributes,
            h = !1,
            g;
            for (g in f) {
                K.isEqual(e[g], f[g]) || (h = h || {}, h[g] = f[g])
            }
            return h
        },
        previous: function(e) {
            if (!e || !this._previousAttributes) {
                return null
            }
            return this._previousAttributes[e]
        },
        previousAttributes: function() {
            return K.clone(this._previousAttributes)
        },
        _performValidation: function(f, e) {
            var g = this.validate(f);
            if (g) {
                return e.error ? e.error(this, g, e) : this.trigger("error", this, g, e),
                !1
            }
            return ! 0
        }
    });
    L.Collection = function(f, e) {
        e || (e = {});
        if (e.comparator) {
            this.comparator = e.comparator
        }
        K.bindAll(this, "_onModelEvent", "_removeReference");
        this._reset();
        f && this.reset(f, {
            silent: !0
        });
        this.initialize.apply(this, arguments)
    };
    K.extend(L.Collection.prototype, L.Events, {
        model: L.Model,
        initialize: function() {},
        toJSON: function() {
            return this.map(function(e) {
                return e.toJSON()
            })
        },
        add: function(f, e) {
            if (K.isArray(f)) {
                for (var h = 0, g = f.length; h < g; h++) {
                    this._add(f[h], e)
                }
            } else {
                this._add(f, e)
            }
            return this
        },
        remove: function(f, e) {
            if (K.isArray(f)) {
                for (var h = 0, g = f.length; h < g; h++) {
                    this._remove(f[h], e)
                }
            } else {
                this._remove(f, e)
            }
            return this
        },
        get: function(e) {
            if (e == null) {
                return null
            }
            return this._byId[e.id != null ? e.id: e]
        },
        getByCid: function(e) {
            return e && this._byCid[e.cid || e]
        },
        at: function(e) {
            return this.models[e]
        },
        sort: function(e) {
            e || (e = {});
            if (!this.comparator) {
                throw Error("Cannot sort a set without a comparator")
            }
            this.models = this.sortBy(this.comparator);
            e.silent || this.trigger("reset", this, e);
            return this
        },
        pluck: function(e) {
            return K.map(this.models, function(f) {
                return f.get(e)
            })
        },
        reset: function(f, e) {
            f || (f = []);
            e || (e = {});
            this.each(this._removeReference);
            this._reset();
            this.add(f, {
                silent: !0
            });
            e.silent || this.trigger("reset", this, e);
            return this
        },
        fetch: function(f) {
            f || (f = {});
            var e = this,
            g = f.success;
            f.success = function(j, h, i) {
                e[f.add ? "add": "reset"](e.parse(j, i), f);
                g && g(e, j)
            };
            f.error = H(f.error, e, f);
            return (this.sync || L.sync).call(this, "read", this, f)
        },
        create: function(f, e) {
            var h = this;
            e || (e = {});
            f = this._prepareModel(f, e);
            if (!f) {
                return ! 1
            }
            var g = e.success;
            e.success = function(i, k, j) {
                h.add(i, e);
                g && g(i, k, j)
            };
            f.save(null, e);
            return f
        },
        parse: function(e) {
            return e
        },
        chain: function() {
            return K(this.models).chain()
        },
        _reset: function() {
            this.length = 0;
            this.models = [];
            this._byId = {};
            this._byCid = {}
        },
        _prepareModel: function(f, e) {
            if (f instanceof L.Model) {
                if (!f.collection) {
                    f.collection = this
                }
            } else {
                var g = f;
                f = new this.model(g, {
                    collection: this
                });
                f.validate && !f._performValidation(g, e) && (f = !1)
            }
            return f
        },
        _add: function(f, e) {
            e || (e = {});
            f = this._prepareModel(f, e);
            if (!f) {
                return ! 1
            }
            var g = this.getByCid(f);
            if (g) {
                throw Error(["Can't add the same model to a set twice", g.id])
            }
            this._byId[f.id] = f;
            this._byCid[f.cid] = f;
            this.models.splice(e.at != null ? e.at: this.comparator ? this.sortedIndex(f, this.comparator) : this.length, 0, f);
            f.bind("all", this._onModelEvent);
            this.length++;
            e.silent || f.trigger("add", f, this, e);
            return f
        },
        _remove: function(f, e) {
            e || (e = {});
            f = this.getByCid(f) || this.get(f);
            if (!f) {
                return null
            }
            delete this._byId[f.id];
            delete this._byCid[f.cid];
            this.models.splice(this.indexOf(f), 1);
            this.length--;
            e.silent || f.trigger("remove", f, this, e);
            this._removeReference(f);
            return f
        },
        _removeReference: function(e) {
            this == e.collection && delete e.collection;
            e.unbind("all", this._onModelEvent)
        },
        _onModelEvent: function(f, e, h, g) {
            (f == "add" || f == "remove") && h != this || (f == "destroy" && this._remove(e, g), e && f === "change:" + e.idAttribute && (delete this._byId[e.previous(e.idAttribute)], this._byId[e.id] = e), this.trigger.apply(this, arguments))
        }
    });
    K.each(["forEach", "each", "map", "reduce", "reduceRight", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "sortBy", "sortedIndex", "toArray", "size", "first", "rest", "last", "without", "indexOf", "lastIndexOf", "isEmpty", "groupBy"], function(e) {
        L.Collection.prototype[e] = function() {
            return K[e].apply(K, [this.models].concat(K.toArray(arguments)))
        }
    });
    L.Router = function(e) {
        e || (e = {});
        if (e.routes) {
            this.routes = e.routes
        }
        this._bindRoutes();
        this.initialize.apply(this, arguments)
    };
    var z = /:([\w\d]+)/g,
    y = /\*([\w\d]+)/g,
    x = /[-[\]{}()+?.,\\^$|#\s]/g;
    K.extend(L.Router.prototype, L.Events, {
        initialize: function() {},
        route: function(f, e, g) {
            L.history || (L.history = new L.History);
            K.isRegExp(f) || (f = this._routeToRegExp(f));
            L.history.route(f, K.bind(function(h) {
                h = this._extractParameters(f, h);
                g.apply(this, h);
                this.trigger.apply(this, ["route:" + e].concat(h))
            }, this))
        },
        navigate: function(f, e) {
            L.history.navigate(f, e)
        },
        _bindRoutes: function() {
            if (this.routes) {
                var f = [],
                e;
                for (e in this.routes) {
                    f.unshift([e, this.routes[e]])
                }
                e = 0;
                for (var g = f.length; e < g; e++) {
                    this.route(f[e][0], f[e][1], this[f[e][1]])
                }
            }
        },
        _routeToRegExp: function(e) {
            e = e.replace(x, "\\$&").replace(z, "([^/]*)").replace(y, "(.*?)");
            return RegExp("^" + e + "$")
        },
        _extractParameters: function(f, e) {
            return f.exec(e).slice(1)
        }
    });
    L.History = function() {
        this.handlers = [];
        K.bindAll(this, "checkUrl")
    };
    var G = /^#*/,
    d = /msie [\w.]+/,
    D = !1;
    K.extend(L.History.prototype, {
        interval: 50,
        getFragment: function(f, e) {
            if (f == null) {
                if (this._hasPushState || e) {
                    f = window.location.pathname;
                    var g = window.location.search;
                    g && (f += g);
                    f.indexOf(this.options.root) == 0 && (f = f.substr(this.options.root.length))
                } else {
                    f = window.location.hash
                }
            }
            return decodeURIComponent(f.replace(G, ""))
        },
        start: function(f) {
            if (D) {
                throw Error("Backbone.history has already been started")
            }
            this.options = K.extend({}, {
                root: "/"
            }, this.options, f);
            this._wantsPushState = !!this.options.pushState;
            this._hasPushState = !(!this.options.pushState || !window.history || !window.history.pushState);
            f = this.getFragment();
            var e = document.documentMode;
            if (e = d.exec(navigator.userAgent.toLowerCase()) && (!e || e <= 7)) {
                this.iframe = J('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,
                this.navigate(f)
            }
            this._hasPushState ? J(window).bind("popstate", this.checkUrl) : "onhashchange" in window && !e ? J(window).bind("hashchange", this.checkUrl) : setInterval(this.checkUrl, this.interval);
            this.fragment = f;
            D = !0;
            f = window.location;
            e = f.pathname == this.options.root;
            if (this._wantsPushState && !this._hasPushState && !e) {
                return this.fragment = this.getFragment(null, !0),
                window.location.replace(this.options.root + "#" + this.fragment),
                !0
            } else {
                if (this._wantsPushState && this._hasPushState && e && f.hash) {
                    this.fragment = f.hash.replace(G, ""),
                    window.history.replaceState({}, document.title, f.protocol + "//" + f.host + this.options.root + this.fragment)
                }
            }
            if (!this.options.silent) {
                return this.loadUrl()
            }
        },
        route: function(f, e) {
            this.handlers.unshift({
                route: f,
                callback: e
            })
        },
        checkUrl: function() {
            var e = this.getFragment();
            e == this.fragment && this.iframe && (e = this.getFragment(this.iframe.location.hash));
            if (e == this.fragment || e == decodeURIComponent(this.fragment)) {
                return ! 1
            }
            this.iframe && this.navigate(e);
            this.loadUrl() || this.loadUrl(window.location.hash)
        },
        loadUrl: function(f) {
            var e = this.fragment = this.getFragment(f);
            return K.any(this.handlers, function(g) {
                if (g.route.test(e)) {
                    return g.callback(e),
                    !0
                }
            })
        },
        navigate: function(f, e) {
            var h = (f || "").replace(G, "");
            if (! (this.fragment == h || this.fragment == decodeURIComponent(h))) {
                if (this._hasPushState) {
                    var g = window.location;
                    h.indexOf(this.options.root) != 0 && (h = this.options.root + h);
                    this.fragment = h;
                    window.history.pushState({}, document.title, g.protocol + "//" + g.host + h)
                } else {
                    if (window.location.hash = this.fragment = h, this.iframe && h != this.getFragment(this.iframe.location.hash)) {
                        this.iframe.document.open().close(),
                        this.iframe.location.hash = h
                    }
                }
                e && this.loadUrl(f)
            }
        }
    });
    L.View = function(e) {
        this.cid = K.uniqueId("view");
        this._configure(e || {});
        this._ensureElement();
        this.delegateEvents();
        this.initialize.apply(this, arguments)
    };
    var c = /^(\S+)\s*(.*)$/,
    C = ["model", "collection", "el", "id", "attributes", "className", "tagName"];
    K.extend(L.View.prototype, L.Events, {
        tagName: "div",
        $: function(e) {
            return J(e, this.el)
        },
        initialize: function() {},
        render: function() {
            return this
        },
        remove: function() {
            J(this.el).remove();
            return this
        },
        make: function(f, e, g) {
            f = document.createElement(f);
            e && J(f).attr(e);
            g && J(f).html(g);
            return f
        },
        delegateEvents: function(g) {
            if (g || (g = this.events)) {
                for (var f in K.isFunction(g) && (g = g.call(this)), J(this.el).unbind(".delegateEvents" + this.cid), g) {
                    var j = this[g[f]];
                    if (!j) {
                        throw Error('Event "' + g[f] + '" does not exist')
                    }
                    var i = f.match(c),
                    h = i[1];
                    i = i[2];
                    j = K.bind(j, this);
                    h += ".delegateEvents" + this.cid;
                    i === "" ? J(this.el).bind(h, j) : J(this.el).delegate(i, h, j)
                }
            }
        },
        _configure: function(f) {
            this.options && (f = K.extend({}, this.options, f));
            for (var e = 0, h = C.length; e < h; e++) {
                var g = C[e];
                f[g] && (this[g] = f[g])
            }
            this.options = f
        },
        _ensureElement: function() {
            if (this.el) {
                if (K.isString(this.el)) {
                    this.el = J(this.el).get(0)
                }
            } else {
                var e = this.attributes || {};
                if (this.id) {
                    e.id = this.id
                }
                if (this.className) {
                    e["class"] = this.className
                }
                this.el = this.make(this.tagName, e)
            }
        }
    });
    L.Model.extend = L.Collection.extend = L.Router.extend = L.View.extend = function(f, e) {
        var g = b(this, f, e);
        g.extend = this.extend;
        return g
    };
    var a = {
        create: "POST",
        update: "PUT",
        "delete": "DELETE",
        read: "GET"
    };
    L.sync = function(f, e, h) {
        var g = a[f];
        h = K.extend({
            type: g,
            dataType: "json"
        }, h);
        if (!h.url) {
            h.url = F(e) || E()
        }
        if (!h.data && e && (f == "create" || f == "update")) {
            h.contentType = "application/json",
            h.data = JSON.stringify(e.toJSON())
        }
        if (L.emulateJSON) {
            h.contentType = "application/x-www-form-urlencoded",
            h.data = h.data ? {
                model: h.data
            }: {}
        }
        if (L.emulateHTTP && (g === "PUT" || g === "DELETE")) {
            if (L.emulateJSON) {
                h.data._method = g
            }
            h.type = "POST";
            h.beforeSend = function(i) {
                i.setRequestHeader("X-HTTP-Method-Override", g)
            }
        }
        if (h.type !== "GET" && !L.emulateJSON) {
            h.processData = !1
        }
        return J.ajax(h)
    };
    var B = function() {},
    b = function(f, e, h) {
        var g;
        g = e && e.hasOwnProperty("constructor") ? e.constructor: function() {
            return f.apply(this, arguments)
        };
        K.extend(g, f);
        B.prototype = f.prototype;
        g.prototype = new B;
        e && K.extend(g.prototype, e);
        h && K.extend(g, h);
        g.prototype.constructor = g;
        g.__super__ = f.prototype;
        return g
    },
    F = function(e) {
        if (!e || !e.url) {
            return null
        }
        return K.isFunction(e.url) ? e.url() : e.url
    },
    E = function() {
        throw Error('A "url" property or function must be specified')
    },
    H = function(f, e, g) {
        return function(h) {
            f ? f(e, h, g) : e.trigger("error", e, h, g)
        }
    }
}).call(this);
(function(ag, aR, aF, aj, aK, am) {
    var aT = this;
    var aH = Math.floor(Math.random() * 10000);
    var aE = Function.prototype;
    var ad = /^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/;
    var ac = /[\-\w]+\/\.\.\//;
    var ao = /([^:])\/\//g;
    var al = "";
    var aG = {};
    var ah = ag.easyXDM;
    var Z = "easyXDM_";
    var ap;
    var aw = false;
    var aM;
    var aN;
    function ar(c, a) {
        var b = typeof c[a];
        return b == "function" || ( !! (b == "object" && c[a])) || b == "unknown"
    }
    function aA(b, a) {
        return !! (typeof(b[a]) == "object" && b[a])
    }
    function aD(a) {
        return Object.prototype.toString.call(a) === "[object Array]"
    }
    function aS() {
        try {
            var b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            aM = Array.prototype.slice.call(b.GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/), 1);
            aN = parseInt(aM[0], 10) > 9 && parseInt(aM[1], 10) > 0;
            b = null;
            return true
        } catch(a) {
            return false
        }
    }
    var az,
    ax;
    if (ar(ag, "addEventListener")) {
        az = function(a, c, b) {
            a.addEventListener(c, b, false)
        };
        ax = function(a, c, b) {
            a.removeEventListener(c, b, false)
        }
    } else {
        if (ar(ag, "attachEvent")) {
            az = function(c, a, b) {
                c.attachEvent("on" + a, b)
            };
            ax = function(c, a, b) {
                c.detachEvent("on" + a, b)
            }
        } else {
            throw new Error("Browser not supported")
        }
    }
    var X = false,
    ak = [],
    ai;
    if ("readyState" in aR) {
        ai = aR.readyState;
        X = ai == "complete" || (~navigator.userAgent.indexOf("AppleWebKit/") && (ai == "loaded" || ai == "interactive"))
    } else {
        X = !!aR.body
    }
    function aC() {
        if (X) {
            return
        }
        X = true;
        for (var a = 0; a < ak.length; a++) {
            ak[a]()
        }
        ak.length = 0
    }
    if (!X) {
        if (ar(ag, "addEventListener")) {
            az(aR, "DOMContentLoaded", aC)
        } else {
            az(aR, "readystatechange", function() {
                if (aR.readyState == "complete") {
                    aC()
                }
            });
            if (aR.documentElement.doScroll && ag === top) {
                var aO = function() {
                    if (X) {
                        return
                    }
                    try {
                        aR.documentElement.doScroll("left")
                    } catch(a) {
                        aj(aO, 1);
                        return
                    }
                    aC()
                };
                aO()
            }
        }
        az(ag, "load", aC)
    }
    function an(a, b) {
        if (X) {
            a.call(b);
            return
        }
        ak.push(function() {
            a.call(b)
        })
    }
    function aI() {
        var a = parent;
        if (al !== "") {
            for (var c = 0, b = al.split("."); c < b.length; c++) {
                a = a[b[c]]
            }
        }
        return a.easyXDM
    }
    function aQ(a) {
        ag.easyXDM = ah;
        al = a;
        if (al) {
            Z = "easyXDM_" + al.replace(".", "_") + "_"
        }
        return aG
    }
    function av(a) {
        return a.match(ad)[3]
    }
    function aP(a) {
        return a.match(ad)[4] || ""
    }
    function aL(c) {
        var e = c.toLowerCase().match(ad);
        var b = e[2],
        a = e[3],
        d = e[4] || "";
        if ((b == "http:" && d == ":80") || (b == "https:" && d == ":443")) {
            d = ""
        }
        return b + "//" + a + d
    }
    function at(b) {
        b = b.replace(ao, "$1/");
        if (!b.match(/^(http||https):\/\//)) {
            var a = (b.substring(0, 1) === "/") ? "": aF.pathname;
            if (a.substring(a.length - 1) !== "/") {
                a = a.substring(0, a.lastIndexOf("/") + 1)
            }
            b = aF.protocol + "//" + aF.host + a + b
        }
        while (ac.test(b)) {
            b = b.replace(ac, "")
        }
        return b
    }
    function ae(f, d) {
        var a = "",
        c = f.indexOf("#");
        if (c !== -1) {
            a = f.substring(c);
            f = f.substring(0, c)
        }
        var b = [];
        for (var e in d) {
            if (d.hasOwnProperty(e)) {
                b.push(e + "=" + am(d[e]))
            }
        }
        return f + (aw ? "#": (f.indexOf("?") == -1 ? "?": "&")) + b.join("&") + a
    }
    var ab = (function(d) {
        d = d.substring(1).split("&");
        var b = {},
        a,
        c = d.length;
        while (c--) {
            a = d[c].split("=");
            b[a[0]] = aK(a[1])
        }
        return b
    } (/xdm_e=/.test(aF.search) ? aF.search: aF.hash));
    function aB(a) {
        return typeof a === "undefined"
    }
    var af = function() {
        var b = {};
        var a = {
            a: [1, 2, 3]
        },
        c = '{"a":[1,2,3]}';
        if (typeof JSON != "undefined" && typeof JSON.stringify === "function" && JSON.stringify(a).replace((/\s/g), "") === c) {
            return JSON
        }
        if (Object.toJSON) {
            if (Object.toJSON(a).replace((/\s/g), "") === c) {
                b.stringify = Object.toJSON
            }
            }
            if (typeof String.prototype.evalJSON === "function") {
                a = c.evalJSON();
                if (a.a && a.a.length === 3 && a.a[2] === 3) {
                    b.parse = function(d) {
                        return d.evalJSON()
                    }
                }
            }
            if (b.stringify && b.parse) {
                af = function() {
                    return b
                };
                return b
            }
            return null
        };
        function aa(e, d, c) {
            var a;
            for (var b in d) {
                if (d.hasOwnProperty(b)) {
                    if (b in e) {
                        a = d[b];
                        if (typeof a === "object") {
                            aa(e[b], a, c)
                        } else {
                            if (!c) {
                                e[b] = d[b]
                            }
                        }
                    } else {
                        e[b] = d[b]
                    }
                }
            }
            return e
        }
        function aU() {
            var a = aR.body.appendChild(aR.createElement("form")),
            b = a.appendChild(aR.createElement("input"));
            b.name = Z + "TEST" + aH;
            ap = b !== a.elements[b.name];
            aR.body.removeChild(a)
        }
        function au(c) {
            if (aB(ap)) {
                aU()
            }
            var a;
            if (ap) {
                a = aR.createElement('<iframe name="' + c.props.name + '"/>')
            } else {
                a = aR.createElement("IFRAME");
                a.name = c.props.name
            }
            a.id = a.name = c.props.name;
            delete c.props.name;
            if (c.onLoad) {
                az(a, "load", c.onLoad)
            }
            if (typeof c.container == "string") {
                c.container = aR.getElementById(c.container)
            }
            if (!c.container) {
                aa(a.style, {
                    position: "absolute",
                    top: "-2000px"
                });
                c.container = aR.body
            }
            var b = c.props.src;
            delete c.props.src;
            aa(a, c.props);
            a.border = a.frameBorder = 0;
            a.allowTransparency = true;
            c.container.appendChild(a);
            a.src = b;
            c.props.src = b;
            return a
        }
        function Y(b, a) {
            if (typeof b == "string") {
                b = [b]
            }
            var c,
            d = b.length;
            while (d--) {
                c = b[d];
                c = new RegExp(c.substr(0, 1) == "^" ? c: ("^" + c.replace(/(\*)/g, ".$1").replace(/\?/g, ".") + "$"));
                if (c.test(a)) {
                    return true
                }
            }
            return false
        }
        function aJ(f) {
            var a = f.protocol,
            g;
            f.isHost = f.isHost || aB(ab.xdm_p);
            aw = f.hash || false;
            if (!f.props) {
                f.props = {}
            }
            if (!f.isHost) {
                f.channel = ab.xdm_c;
                f.secret = ab.xdm_s;
                f.remote = ab.xdm_e;
                a = ab.xdm_p;
                if (f.acl && !Y(f.acl, f.remote)) {
                    throw new Error("Access denied for " + f.remote)
                }
            } else {
                f.remote = at(f.remote);
                f.channel = f.channel || "default" + aH++;
                f.secret = Math.random().toString(16).substring(2);
                if (aB(a)) {
                    if (aL(aF.href) == aL(f.remote)) {
                        a = "4"
                    } else {
                        if (ar(ag, "postMessage") || ar(aR, "postMessage")) {
                            a = "1"
                        } else {
                            if (f.swf && ar(ag, "ActiveXObject") && aS()) {
                                a = "6"
                            } else {
                                if (navigator.product === "Gecko" && "frameElement" in ag && navigator.userAgent.indexOf("WebKit") == -1) {
                                    a = "5"
                                } else {
                                    if (f.remoteHelper) {
                                        f.remoteHelper = at(f.remoteHelper);
                                        a = "2"
                                    } else {
                                        a = "0"
                                    }
                                }
                            }
                        }
                    }
                }
            }
            f.protocol = a;
            switch (a) {
                case "0":
                    aa(f, {
                        interval: 100,
                        delay: 2000,
                        useResize: true,
                        useParent: false,
                        usePolling: false
                    }, true);
                    if (f.isHost) {
                        if (!f.local) {
                            var c = aF.protocol + "//" + aF.host,
                            h = aR.body.getElementsByTagName("img"),
                            b;
                            var e = h.length;
                            while (e--) {
                                b = h[e];
                                if (b.src.substring(0, c.length) === c) {
                                    f.local = b.src;
                                    break
                                }
                            }
                            if (!f.local) {
                                f.local = ag
                            }
                        }
                        var d = {
                            xdm_c: f.channel,
                            xdm_p: 0
                        };
                        if (f.local === ag) {
                            f.usePolling = true;
                            f.useParent = true;
                            f.local = aF.protocol + "//" + aF.host + aF.pathname + aF.search;
                            d.xdm_e = f.local;
                            d.xdm_pa = 1
                        } else {
                            d.xdm_e = at(f.local)
                        }
                        if (f.container) {
                            f.useResize = false;
                            d.xdm_po = 1
                        }
                        f.remote = ae(f.remote, d)
                    } else {
                        aa(f, {
                            channel: ab.xdm_c,
                            remote: ab.xdm_e,
                            useParent: !aB(ab.xdm_pa),
                            usePolling: !aB(ab.xdm_po),
                            useResize: f.useParent ? false: f.useResize
                        })
                    }
                    g = [new aG.stack.HashTransport(f), new aG.stack.ReliableBehavior({}), new aG.stack.QueueBehavior({
                        encode: true,
                        maxLength: 4000 - f.remote.length
                    }), new aG.stack.VerifyBehavior({
                        initiate: f.isHost
                    })];
                    break;
                case "1":
                    g = [new aG.stack.PostMessageTransport(f)];
                    break;
                case "2":
                    g = [new aG.stack.NameTransport(f), new aG.stack.QueueBehavior(), new aG.stack.VerifyBehavior({
                        initiate: f.isHost
                    })];
                    break;
                case "3":
                    g = [new aG.stack.NixTransport(f)];
                    break;
                case "4":
                    g = [new aG.stack.SameOriginTransport(f)];
                    break;
                case "5":
                    g = [new aG.stack.FrameElementTransport(f)];
                    break;
                case "6":
                    if (!aM) {
                        aS()
                    }
                    g = [new aG.stack.FlashTransport(f)];
                    break
            }
            g.push(new aG.stack.QueueBehavior({
                lazy: f.lazy,
                remove: true
            }));
            return g
        }
        function aq(c) {
            var a,
            b = {
                incoming: function(f, g) {
                    this.up.incoming(f, g)
                },
                outgoing: function(g, f) {
                    this.down.outgoing(g, f)
                },
                callback: function(f) {
                    this.up.callback(f)
                },
                init: function() {
                    this.down.init()
                },
                destroy: function() {
                    this.down.destroy()
                }
            };
            for (var d = 0, e = c.length; d < e; d++) {
                a = c[d];
                aa(a, b, true);
                if (d !== 0) {
                    a.down = c[d - 1]
                }
                if (d !== e - 1) {
                    a.up = c[d + 1]
                }
            }
            return a
        }
        function ay(a) {
            a.up.down = a.down;
            a.down.up = a.up;
            a.up = a.down = null
        }
        aa(aG, {
            version: "2.4.15.118",
            query: ab,
            stack: {},
            apply: aa,
            getJSONObject: af,
            whenReady: an,
            noConflict: aQ
        });
        aG.DomHelper = {
            on: az,
            un: ax,
            requiresJSON: function(a) {
                if (!aA(ag, "JSON")) {
                    aR.write('<script type="text/javascript" src="' + a + '"><\/script>')
                }
            }
        };
        (function() {
            var a = {};
            aG.Fn = {
                set: function(c, b) {
                    a[c] = b
                },
                get: function(c, d) {
                    var b = a[c];
                    if (d) {
                        delete a[c]
                    }
                    return b
                }
            }
        } ());
            aG.Socket = function(b) {
                var c = aq(aJ(b).concat([{
                    incoming: function(d, e) {
                        b.onMessage(d, e)
                    },
                    callback: function(d) {
                        if (b.onReady) {
                            b.onReady(d)
                        }
                    }
                }])),
                a = aL(b.remote);
                this.origin = aL(b.remote);
                this.destroy = function() {
                    c.destroy()
                };
                this.postMessage = function(d) {
                    c.outgoing(d, a)
                };
                c.init()
            };
            aG.Rpc = function(c, d) {
                if (d.local) {
                    for (var a in d.local) {
                        if (d.local.hasOwnProperty(a)) {
                            var b = d.local[a];
                            if (typeof b === "function") {
                                d.local[a] = {
                                    method: b
                                }
                            }
                        }
                    }
                }
                var e = aq(aJ(c).concat([new aG.stack.RpcBehavior(this, d), {
                    callback: function(f) {
                        if (c.onReady) {
                            c.onReady(f)
                        }
                    }
                }]));
                this.origin = aL(c.remote);
                this.destroy = function() {
                    e.destroy()
                };
                e.init()
            };
            aG.stack.SameOriginTransport = function(d) {
                var c,
                a,
                b,
                e;
                return (c = {
                    outgoing: function(g, f, h) {
                        b(g);
                        if (h) {
                            h()
                        }
                    },
                    destroy: function() {
                        if (a) {
                            a.parentNode.removeChild(a);
                            a = null
                        }
                    },
                    onDOMReady: function() {
                        e = aL(d.remote);
                        if (d.isHost) {
                            aa(d.props, {
                                src: ae(d.remote, {
                                    xdm_e: aF.protocol + "//" + aF.host + aF.pathname,
                                    xdm_c: d.channel,
                                    xdm_p: 4
                                }),
                                name: Z + d.channel + "_provider"
                            });
                            a = au(d);
                            aG.Fn.set(d.channel, function(f) {
                                b = f;
                                aj(function() {
                                    c.up.callback(true)
                                }, 0);
                                return function(g) {
                                    c.up.incoming(g, e)
                                }
                            })
                        } else {
                            b = aI().Fn.get(d.channel, true)(function(f) {
                                c.up.incoming(f, e)
                            });
                            aj(function() {
                                c.up.callback(true)
                            }, 0)
                        }
                    },
                    init: function() {
                        an(c.onDOMReady, c)
                    }
                })
            };
            aG.stack.FlashTransport = function(a) {
                var h,
                d,
                i,
                g,
                c,
                f;
                function e(j, k) {
                    aj(function() {
                        h.up.incoming(j, g)
                    }, 0)
                }
                function b(k) {
                    var l = a.swf + "?host=" + a.isHost;
                    var m = "easyXDM_swf_" + Math.floor(Math.random() * 10000);
                    aG.Fn.set("flash_loaded" + k.replace(/[\-.]/g, "_"), function() {
                        aG.stack.FlashTransport[k].swf = c = f.firstChild;
                        var o = aG.stack.FlashTransport[k].queue;
                        for (var n = 0; n < o.length; n++) {
                            o[n]()
                        }
                        o.length = 0
                    });
                    if (a.swfContainer) {
                        f = (typeof a.swfContainer == "string") ? aR.getElementById(a.swfContainer) : a.swfContainer
                    } else {
                        f = aR.createElement("div");
                        aa(f.style, aN && a.swfNoThrottle ? {
                            height: "20px",
                            width: "20px",
                            position: "fixed",
                            right: 0,
                            top: 0
                        }: {
                            height: "1px",
                            width: "1px",
                            position: "absolute",
                            overflow: "hidden",
                            right: 0,
                            top: 0
                        });
                        aR.body.appendChild(f)
                    }
                    var j = "callback=flash_loaded" + k.replace(/[\-.]/g, "_") + "&proto=" + aT.location.protocol + "&domain=" + av(aT.location.href) + "&port=" + aP(aT.location.href) + "&ns=" + al;
                    f.innerHTML = "<object height='20' width='20' type='application/x-shockwave-flash' id='" + m + "' data='" + l + "'><param name='allowScriptAccess' value='always'></param><param name='wmode' value='transparent'><param name='movie' value='" + l + "'></param><param name='flashvars' value='" + j + "'></param><embed type='application/x-shockwave-flash' FlashVars='" + j + "' allowScriptAccess='always' wmode='transparent' src='" + l + "' height='1' width='1'></embed></object>"
                }
                return (h = {
                    outgoing: function(k, j, l) {
                        c.postMessage(a.channel, k.toString());
                        if (l) {
                            l()
                        }
                    },
                    destroy: function() {
                        try {
                            c.destroyChannel(a.channel)
                        } catch(j) {}
                        c = null;
                        if (d) {
                            d.parentNode.removeChild(d);
                            d = null
                        }
                    },
                    onDOMReady: function() {
                        g = a.remote;
                        aG.Fn.set("flash_" + a.channel + "_init", function() {
                            aj(function() {
                                h.up.callback(true)
                            })
                        });
                        aG.Fn.set("flash_" + a.channel + "_onMessage", e);
                        a.swf = at(a.swf);
                        var j = av(a.swf);
                        var k = function() {
                            aG.stack.FlashTransport[j].init = true;
                            c = aG.stack.FlashTransport[j].swf;
                            c.createChannel(a.channel, a.secret, aL(a.remote), a.isHost);
                            if (a.isHost) {
                                if (aN && a.swfNoThrottle) {
                                    aa(a.props, {
                                        position: "fixed",
                                        right: 0,
                                        top: 0,
                                        height: "20px",
                                        width: "20px"
                                    })
                                }
                                aa(a.props, {
                                    src: ae(a.remote, {
                                        xdm_e: aL(aF.href),
                                        xdm_c: a.channel,
                                        xdm_p: 6,
                                        xdm_s: a.secret
                                    }),
                                    name: Z + a.channel + "_provider"
                                });
                                d = au(a)
                            }
                        };
                        if (aG.stack.FlashTransport[j] && aG.stack.FlashTransport[j].init) {
                            k()
                        } else {
                            if (!aG.stack.FlashTransport[j]) {
                                aG.stack.FlashTransport[j] = {
                                    queue: [k]
                                };
                                b(j)
                            } else {
                                aG.stack.FlashTransport[j].queue.push(k)
                            }
                        }
                    },
                    init: function() {
                        an(h.onDOMReady, h)
                    }
                })
            };
            aG.stack.PostMessageTransport = function(e) {
                var b,
                a,
                f,
                d;
                function g(h) {
                    if (h.origin) {
                        return aL(h.origin)
                    }
                    if (h.uri) {
                        return aL(h.uri)
                    }
                    if (h.domain) {
                        return aF.protocol + "//" + h.domain
                    }
                    throw "Unable to retrieve the origin of the event"
                }
                function c(h) {
                    var i = g(h);
                    if (i == d && h.data.substring(0, e.channel.length + 1) == e.channel + " ") {
                        b.up.incoming(h.data.substring(e.channel.length + 1), i)
                    }
                }
                return (b = {
                    outgoing: function(i, h, j) {
                        f.postMessage(e.channel + " " + i, h || d);
                        if (j) {
                            j()
                        }
                    },
                    destroy: function() {
                        ax(ag, "message", c);
                        if (a) {
                            f = null;
                            a.parentNode.removeChild(a);
                            a = null
                        }
                    },
                    onDOMReady: function() {
                        d = aL(e.remote);
                        if (e.isHost) {
                            var h = function(i) {
                                if (i.data == e.channel + "-ready") {
                                    f = ("postMessage" in a.contentWindow) ? a.contentWindow: a.contentWindow.document;
                                    ax(ag, "message", h);
                                    az(ag, "message", c);
                                    aj(function() {
                                        b.up.callback(true)
                                    }, 0)
                                }
                            };
                            az(ag, "message", h);
                            aa(e.props, {
                                src: ae(e.remote, {
                                    xdm_e: aL(aF.href),
                                    xdm_c: e.channel,
                                    xdm_p: 1
                                }),
                                name: Z + e.channel + "_provider"
                            });
                            a = au(e)
                        } else {
                            az(ag, "message", c);
                            f = ("postMessage" in ag.parent) ? ag.parent: ag.parent.document;
                            f.postMessage(e.channel + "-ready", d);
                            aj(function() {
                                b.up.callback(true)
                            }, 0)
                        }
                    },
                    init: function() {
                        an(b.onDOMReady, b)
                    }
                })
            };
            aG.stack.FrameElementTransport = function(d) {
                var c,
                a,
                b,
                e;
                return (c = {
                    outgoing: function(g, f, h) {
                        b.call(this, g);
                        if (h) {
                            h()
                        }
                    },
                    destroy: function() {
                        if (a) {
                            a.parentNode.removeChild(a);
                            a = null
                        }
                    },
                    onDOMReady: function() {
                        e = aL(d.remote);
                        if (d.isHost) {
                            aa(d.props, {
                                src: ae(d.remote, {
                                    xdm_e: aL(aF.href),
                                    xdm_c: d.channel,
                                    xdm_p: 5
                                }),
                                name: Z + d.channel + "_provider"
                            });
                            a = au(d);
                            a.fn = function(f) {
                                delete a.fn;
                                b = f;
                                aj(function() {
                                    c.up.callback(true)
                                }, 0);
                                return function(g) {
                                    c.up.incoming(g, e)
                                }
                            }
                        } else {
                            if (aR.referrer && aL(aR.referrer) != ab.xdm_e) {
                                ag.top.location = ab.xdm_e
                            }
                            b = ag.frameElement.fn(function(f) {
                                c.up.incoming(f, e)
                            });
                            c.up.callback(true)
                        }
                    },
                    init: function() {
                        an(c.onDOMReady, c)
                    }
                })
            };
            aG.stack.NameTransport = function(m) {
                var l;
                var j,
                f,
                a,
                h,
                g,
                c,
                d;
                function i(n) {
                    var o = m.remoteHelper + (j ? "#_3": "#_2") + m.channel;
                    f.contentWindow.sendMessage(n, o)
                }
                function k() {
                    if (j) {
                        if (++h === 2 || !j) {
                            l.up.callback(true)
                        }
                    } else {
                        i("ready");
                        l.up.callback(true)
                    }
                }
                function e(n) {
                    l.up.incoming(n, c)
                }
                function b() {
                    if (g) {
                        aj(function() {
                            g(true)
                        }, 0)
                    }
                }
                return (l = {
                    outgoing: function(o, n, p) {
                        g = p;
                        i(o)
                    },
                    destroy: function() {
                        f.parentNode.removeChild(f);
                        f = null;
                        if (j) {
                            a.parentNode.removeChild(a);
                            a = null
                        }
                    },
                    onDOMReady: function() {
                        j = m.isHost;
                        h = 0;
                        c = aL(m.remote);
                        m.local = at(m.local);
                        if (j) {
                            aG.Fn.set(m.channel, function(o) {
                                if (j && o === "ready") {
                                    aG.Fn.set(m.channel, e);
                                    k()
                                }
                            });
                            d = ae(m.remote, {
                                xdm_e: m.local,
                                xdm_c: m.channel,
                                xdm_p: 2
                            });
                            aa(m.props, {
                                src: d + "#" + m.channel,
                                name: Z + m.channel + "_provider"
                            });
                            a = au(m)
                        } else {
                            m.remoteHelper = m.remote;
                            aG.Fn.set(m.channel, e)
                        }
                        f = au({
                            props: {
                                src: m.local + "#_4" + m.channel
                            },
                            onLoad: function n() {
                                var p = f || this;
                                ax(p, "load", n);
                                aG.Fn.set(m.channel + "_load", b);
                                (function o() {
                                    if (typeof p.contentWindow.sendMessage == "function") {
                                        k()
                                    } else {
                                        aj(o, 50)
                                    }
                                } ())
                            }
                        })
                    },
                    init: function() {
                        an(l.onDOMReady, l)
                    }
                })
            };
            aG.stack.HashTransport = function(b) {
                var o;
                var j = this,
                l,
                a,
                d,
                n,
                e,
                p,
                f;
                var k,
                c;
                function g(q) {
                    if (!f) {
                        return
                    }
                    var r = b.remote + "#" + (e++) + "_" + q;
                    ((l || !k) ? f.contentWindow: f).location = r
                }
                function m(q) {
                    n = q;
                    o.up.incoming(n.substring(n.indexOf("_") + 1), c)
                }
                function h() {
                    if (!p) {
                        return
                    }
                    var s = p.location.href,
                    q = "",
                    r = s.indexOf("#");
                    if (r != -1) {
                        q = s.substring(r)
                    }
                    if (q && q != n) {
                        m(q)
                    }
                }
                function i() {
                    a = setInterval(h, d)
                }
                return (o = {
                    outgoing: function(r, q) {
                        g(r)
                    },
                    destroy: function() {
                        ag.clearInterval(a);
                        if (l || !k) {
                            f.parentNode.removeChild(f)
                        }
                        f = null
                    },
                    onDOMReady: function() {
                        l = b.isHost;
                        d = b.interval;
                        n = "#" + b.channel;
                        e = 0;
                        k = b.useParent;
                        c = aL(b.remote);
                        if (l) {
                            b.props = {
                                src: b.remote,
                                name: Z + b.channel + "_provider"
                            };
                            if (k) {
                                b.onLoad = function() {
                                    p = ag;
                                    i();
                                    o.up.callback(true)
                                }
                            } else {
                                var q = 0,
                                s = b.delay / 50;
                                (function r() {
                                    if (++q > s) {
                                        throw new Error("Unable to reference listenerwindow")
                                    }
                                    try {
                                        p = f.contentWindow.frames[Z + b.channel + "_consumer"]
                                    } catch(t) {}
                                    if (p) {
                                        i();
                                        o.up.callback(true)
                                    } else {
                                        aj(r, 50)
                                    }
                                } ())
                            }
                            f = au(b)
                        } else {
                            p = ag;
                            i();
                            if (k) {
                                f = parent;
                                o.up.callback(true)
                            } else {
                                aa(b, {
                                    props: {
                                        src: b.remote + "#" + b.channel + new Date(),
                                        name: Z + b.channel + "_consumer"
                                    },
                                    onLoad: function() {
                                        o.up.callback(true)
                                    }
                                });
                                f = au(b)
                            }
                        }
                    },
                    init: function() {
                        an(o.onDOMReady, o)
                    }
                })
            };
            aG.stack.ReliableBehavior = function(e) {
                var d,
                a;
                var b = 0,
                f = 0,
                c = "";
                return (d = {
                    incoming: function(h, j) {
                        var i = h.indexOf("_"),
                        g = h.substring(0, i).split(",");
                        h = h.substring(i + 1);
                        if (g[0] == b) {
                            c = "";
                            if (a) {
                                a(true)
                            }
                        }
                        if (h.length > 0) {
                            d.down.outgoing(g[1] + "," + b + "_" + c, j);
                            if (f != g[1]) {
                                f = g[1];
                                d.up.incoming(h, j)
                            }
                        }
                    },
                    outgoing: function(g, i, h) {
                        c = g;
                        a = h;
                        d.down.outgoing(f + "," + (++b) + "_" + g, i)
                    }
                })
            };
            aG.stack.QueueBehavior = function(b) {
                var i,
                h = [],
                e = true,
                a = "",
                f,
                d = 0,
                c = false,
                j = false;
                function g() {
                    if (b.remove && h.length === 0) {
                        ay(i);
                        return
                    }
                    if (e || h.length === 0 || f) {
                        return
                    }
                    e = true;
                    var k = h.shift();
                    i.down.outgoing(k.data, k.origin, function(l) {
                        e = false;
                        if (k.callback) {
                            aj(function() {
                                k.callback(l)
                            }, 0)
                        }
                        g()
                    })
                }
                return (i = {
                    init: function() {
                        if (aB(b)) {
                            b = {}
                        }
                        if (b.maxLength) {
                            d = b.maxLength;
                            j = true
                        }
                        if (b.lazy) {
                            c = true
                        } else {
                            i.down.init()
                        }
                    },
                    callback: function(k) {
                        e = false;
                        var l = i.up;
                        g();
                        l.callback(k)
                    },
                    incoming: function(m, k) {
                        if (j) {
                            var n = m.indexOf("_"),
                            l = parseInt(m.substring(0, n), 10);
                            a += m.substring(n + 1);
                            if (l === 0) {
                                if (b.encode) {
                                    a = aK(a)
                                }
                                i.up.incoming(a, k);
                                a = ""
                            }
                        } else {
                            i.up.incoming(m, k)
                        }
                    },
                    outgoing: function(m, k, n) {
                        if (b.encode) {
                            m = am(m)
                        }
                        var l = [],
                        o;
                        if (j) {
                            while (m.length !== 0) {
                                o = m.substring(0, d);
                                m = m.substring(o.length);
                                l.push(o)
                            }
                            while ((o = l.shift())) {
                                h.push({
                                    data: l.length + "_" + o,
                                    origin: k,
                                    callback: l.length === 0 ? n: null
                                })
                            }
                        } else {
                            h.push({
                                data: m,
                                origin: k,
                                callback: n
                            })
                        }
                        if (c) {
                            i.down.init()
                        } else {
                            g()
                        }
                    },
                    destroy: function() {
                        f = true;
                        i.down.destroy()
                    }
                })
            };
            aG.stack.VerifyBehavior = function(b) {
                var a,
                d,
                e,
                c = false;
                function f() {
                    d = Math.random().toString(16).substring(2);
                    a.down.outgoing(d)
                }
                return (a = {
                    incoming: function(g, i) {
                        var h = g.indexOf("_");
                        if (h === -1) {
                            if (g === d) {
                                a.up.callback(true)
                            } else {
                                if (!e) {
                                    e = g;
                                    if (!b.initiate) {
                                        f()
                                    }
                                    a.down.outgoing(g)
                                }
                            }
                        } else {
                            if (g.substring(0, h) === e) {
                                a.up.incoming(g.substring(h + 1), i)
                            }
                        }
                    },
                    outgoing: function(g, i, h) {
                        a.down.outgoing(d + "_" + g, i, h)
                    },
                    callback: function(g) {
                        if (b.initiate) {
                            f()
                        }
                    }
                })
            };
            aG.stack.RpcBehavior = function(g, c) {
                var a,
                e = c.serializer || af();
                var f = 0,
                h = {};
                function d(j) {
                    j.jsonrpc = "2.0";
                    a.down.outgoing(e.stringify(j))
                }
                function i(l, j) {
                    var k = Array.prototype.slice;
                    return function() {
                        var o = arguments.length,
                        m,
                        n = {
                            method: j
                        };
                        if (o > 0 && typeof arguments[o - 1] === "function") {
                            if (o > 1 && typeof arguments[o - 2] === "function") {
                                m = {
                                    success: arguments[o - 2],
                                    error: arguments[o - 1]
                                };
                                n.params = k.call(arguments, 0, o - 2)
                            } else {
                                m = {
                                    success: arguments[o - 1]
                                };
                                n.params = k.call(arguments, 0, o - 1)
                            }
                            h["" + (++f)] = m;
                            n.id = f
                        } else {
                            n.params = k.call(arguments, 0)
                        }
                        if (l.namedParams && n.params.length === 1) {
                            n.params = n.params[0]
                        }
                        d(n)
                    }
                }
                function b(m, n, j, o) {
                    if (!j) {
                        if (n) {
                            d({
                                id: n,
                                error: {
                                    code: -32601,
                                    message: "Procedure not found."
                                }
                            })
                        }
                        return
                    }
                    var p,
                    k;
                    if (n) {
                        p = function(r) {
                            p = aE;
                            d({
                                id: n,
                                result: r
                            })
                        };
                        k = function(t, s) {
                            k = aE;
                            var r = {
                                id: n,
                                error: {
                                    code: -32099,
                                    message: t
                                }
                            };
                            if (s) {
                                r.error.data = s
                            }
                            d(r)
                        }
                    } else {
                        p = k = aE
                    }
                    if (!aD(o)) {
                        o = [o]
                    }
                    try {
                        var l = j.method.apply(j.scope, o.concat([p, k]));
                        if (!aB(l)) {
                            p(l)
                        }
                    } catch(q) {
                        k(q.message)
                    }
                }
                return (a = {
                    incoming: function(k, l) {
                        var j = e.parse(k);
                        if (j.method) {
                            if (c.handle) {
                                c.handle(j, d)
                            } else {
                                b(j.method, j.id, c.local[j.method], j.params)
                            }
                        } else {
                            var m = h[j.id];
                            if (j.error) {
                                if (m.error) {
                                    m.error(j.error)
                                }
                            } else {
                                if (m.success) {
                                    m.success(j.result)
                                }
                            }
                            delete h[j.id]
                        }
                    },
                    init: function() {
                        if (c.remote) {
                            for (var j in c.remote) {
                                if (c.remote.hasOwnProperty(j)) {
                                    g[j] = i(c.remote[j], j)
                                }
                            }
                        }
                        a.down.init()
                    },
                    destroy: function() {
                        for (var j in c.remote) {
                            if (c.remote.hasOwnProperty(j) && g.hasOwnProperty(j)) {
                                delete g[j]
                            }
                        }
                        a.down.destroy()
                    }
                })
            };
            aT.easyXDM = aG
        })(window, document, location, window.setTimeout, decodeURIComponent, encodeURIComponent);
Cache = {
    _use_local_storage: "localStorage" in window,
    _cache: this._use_local_storage ? false: {},
    disabled: false,
    disable: function() {
        this.disabled = true
    },
    enable: function() {
        this.disabled = false
    },
    get: function(a) {
        if (!this.disabled) {
            if (this._use_local_storage) {
                return localStorage[a]
            } else {
                return this._cache[a]
            }
        }
    },
    set: function(a, b) {
        if (!this.disabled) {
            if (this._use_local_storage) {
                localStorage[a] = b
            } else {
                this._cache[a] = b
            }
        }
    },
    remove: function(a) {
        if (!this.disabled) {
            if (this._use_local_storage) {
                localStorage.removeItem(a)
            } else {
                this._cache[a] = null
            }
        }
    },
    clear: function() {
        if (!this.disabled) {
            if (this._use_local_storage) {
                localStorage.clear()
            } else {
                this._cache = {}
            }
        }
    }
};
$.fn.siapModaltip = function() {
    $("html").live("mouseup", function(a) {
        if ($(a.target).closest(".tips-modal").length == 0) {
            $(".tips-modal:visible").not($(a.target).closest(".tips-modal")).hide()
        }
    });
    return $(this).each(function() {
        if ($(this).is(".js-modal-tips")) {
            var a = $($(this).attr("rel"))
        } else {
            return $(this)
        }
        $(this).live("click", function(k) {
            k.preventDefault();
            var i = $($(this).attr("rel")).removeData("srcobj").hide();
            i.css({
                top: 0,
                left: 0
            }).data("srcobj", $(this));
            var j = i.outerWidth();
            var d = $(this).outerWidth();
            var m = $(this).innerHeight();
            var c = $(this).offset().left;
            var b = $(this).offset().top;
            var h = (c >= $("body").innerWidth() - j) ? true: false;
            var g = c - (h ? (j - d - 11) + (i.is(".sdw") ? 3: 0) : 11);
            var l = (j < d ? j - 20: d);
            if (l < 15) {
                l = 15
            }
            var f = b + m + 8;
            i.find(".point").css({
                width: l,
                height: 9,
                top: -9
            });
            if (h) {
                i.find(".point").css({
                    left: "",
                    right: 10
                })
            } else {
                i.find(".point").css({
                    left: 10,
                    right: ""
                })
            }
            i.css({
                top: f,
                left: g
            }).show()
        })
    })
};
$.fn.siapModaltimed = function() {
    $("html").mouseup(function(a) {
        if ($(a.target).closest(".tips-modal").length == 0) {
            $(".tips-modal:visible").not($(a.target).closest(".tips-modal")).hide()
        }
    });
    return $(this).each(function() {
        if ($(this).is(".js-cardhov")) {
            var a = $($(this).attr("rel"))
        } else {
            return $(this)
        }
        $(this).hover(function() {
            if (a.data("srcobj")) {
                var i = $(this).offset();
                var e = a.data("srcobj").offset();
                if (i.left == e.left && i.top == e.top) {
                    a.show();
                    return $(this)
                } else {
                    a.removeData("srcobj").hide()
                }
            }
            a.css({
                top: 0,
                left: 0
            });
            var j = a.outerWidth(true);
            var d = $(this).outerWidth();
            var m = $(this).innerHeight();
            var c = $(this).offset().left;
            var b = $(this).offset().top;
            var h = (c >= $("body").innerWidth() - j) ? true: false;
            var g = c - (h ? (j - d - 11) + (a.is(".sdw") ? 3: 0) : 11);
            var l = (j < d ? j - 20: d);
            if (l < 15) {
                l = 15
            }
            var f = b + m + 8;
            a.find(".point").css({
                width: l,
                height: 9,
                top: -9
            });
            if (h) {
                a.find(".point").css({
                    left: "",
                    right: 10
                })
            } else {
                a.find(".point").css({
                    left: 10,
                    right: ""
                })
            }
            var k = a.find(".profil,.relation").hide();
            a.css({
                top: f,
                left: g
            }).stop(true, true).delay(500).data("srcobj", $(this)).fadeIn(300, function() {
                var o = "content/img/thumbs1/avatar-blank.png";
                var n = $(this).data("srcobj").text();
                if ($(this).data("srcobj").is(".js-list-thumb .js-cardhov")) {
                    o = $(this).data("srcobj").closest("li").children("img").attr("src")
                } else {
                    if ($(this).data("srcobj").is(".agenda .js-cardhov")) {
                        n = $(this).data("srcobj").find("img").attr("alt")
                    } else {
                        if ($(this).data("srcobj").is(".namecard .js-cardhov")) {
                            o = $(this).data("srcobj").children("img").attr("src")
                        }
                    }
                }
                $(this).find(".profil >img").attr("src", o).end().find(".profil h4 >a.tips").text(n);
                clearInterval(tipsgohide);
                tipsgohide = window.setInterval(function() {
                    k.show()
                }, 2000)
            })
        }, function() {
            clearInterval(tipsgohide);
            a.stop(true, true);
            if (a.find(".profil").is(":hidden")) {
                a.removeData("srcobj").hide()
            }
        })
    })
};
$.fn.siapTooltip = function() {
    $("html").mouseup(function(b) {
        if ($(b.target).closest("#siapTooltipObj").length == 0) {
            $("#siapTooltipObj:visible").not($(b.target).closest("#siapTooltipObj")).hide()
        }
    });
    var a = $("#siapTooltipObj");
    if (typeof a.get(0) == "undefined") {
        a = $("body").append('<div id="siapTooltipObj" class="tips-msg rnd5 sdw"><div class="point"></div><div class="msg">Pesan</div></span>')
    }
    return $(this).each(function() {
        if (!$(this).data("siaptip")) {
            if (!$(this).attr("title")) {
                if (typeof $(this).find(".tips-msg").get(0) == "object") {
                    $(this).data("siaptip", $(this).find(".tips-msg").html()).find(".tips-msg").remove()
                } else {
                    if (typeof $(this).next(".tips-msg").get(0) == "object") {
                        $(this).data("siaptip", $(this).next(".tips-msg").html()).next(".tips-msg").remove()
                    } else {
                        return false
                    }
                }
            } else {
                $(this).data("siaptip", $(this).attr("title")).removeAttr("title")
            }
        }
        $(this).data("sticky", $(this).is(".tips-on") || $(this).is(".ic-help"));
        $(this).hover(function() {
            var i = $("#siapTooltipObj").css({
                top: 0,
                left: 0
            }).data("stickybubble", $(this).is(".tips-on") || $(this).is(".ic-help"));
            var h = i.find(".msg").html($(this).data("siaptip")).closest(".tips-msg").outerWidth();
            var d = $(this).outerWidth();
            var k = $(this).innerHeight();
            var c = $(this).offset().left;
            var b = $(this).offset().top;
            var g = (c >= $("body").innerWidth() - h) ? true: false;
            var f = c - (g ? (h - d - 11) : 11);
            var j = (h < d ? h - 20: d);
            if (j < 15) {
                j = 15
            }
            var e = b + $(this).innerHeight() + 8;
            i.find(".point").css({
                width: j,
                height: 9,
                top: -9
            });
            if (g) {
                i.find(".point").css({
                    left: "",
                    right: 10
                })
            } else {
                i.find(".point").css({
                    left: 10,
                    right: ""
                })
            }
            i.css({
                top: e,
                left: f
            }).show();
            clearInterval(tipsgohide);
            if (!$(this).data("sticky")) {
                tipsgohide = window.setInterval(function() {
                    i.hide();
                    clearInterval(tipsgohide)
                }, 4000)
            }
        }, function() {
            clearInterval(tipsgohide);
            if (!$(this).data("sticky")) {
                $("#siapTooltipObj").hide()
            } else {
                tipsgohide = window.setInterval(function() {
                    $("#siapTooltipObj").hide();
                    clearInterval(tipsgohide)
                }, 4000)
            }
        });
        a.mouseenter(function() {
            if ($(this).data("stickybubble")) {
                clearInterval(tipsgohide);
                $(this).show()
            }
        }).mouseleave(function() {
            if ($(this).data("stickybubble")) {
                $(this).hide()
            }
        });
        $(this).blur(function() {
            if (!$(this).data("sticky")) {
                clearInterval(tipsgohide);
                $("#siapTooltipObj").hide()
            }
        })
    })
};
(function(b) {
    b.fn.ajaxSubmit = function(d) {
        if (!this.length) {
            a("ajaxSubmit: skipping submit process - no element selected");
            return this
        }
        var c,
        t,
        f,
        h = this;
        if (typeof d == "function") {
            d = {
                success: d
            }
        }
        c = this.attr("method");
        t = this.attr("action");
        f = (typeof t === "string") ? b.trim(t) : "";
        f = f || window.location.href || "";
        if (f) {
            f = (f.match(/^([^#]+)/) || [])[1]
        }
        d = b.extend(true, {
            url: f,
            success: b.ajaxSettings.success,
            type: c || "GET",
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false": "about:blank"
        }, d);
        var m = {};
        this.trigger("form-pre-serialize", [this, d, m]);
        if (m.veto) {
            a("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
            return this
        }
        if (d.beforeSerialize && d.beforeSerialize(this, d) === false) {
            a("ajaxSubmit: submit aborted via beforeSerialize callback");
            return this
        }
        var g = d.traditional;
        if (g === undefined) {
            g = b.ajaxSettings.traditional
        }
        var x,
        s,
        j,
        y = this.formToArray(d.semantic);
        if (d.data) {
            d.extraData = d.data;
            x = b.param(d.data, g)
        }
        if (d.beforeSubmit && d.beforeSubmit(y, this, d) === false) {
            a("ajaxSubmit: submit aborted via beforeSubmit callback");
            return this
        }
        this.trigger("form-submit-validate", [y, this, d, m]);
        if (m.veto) {
            a("ajaxSubmit: submit vetoed via form-submit-validate trigger");
            return this
        }
        var r = b.param(y, g);
        if (x) {
            r = (r ? (r + "&" + x) : x)
        }
        if (d.type.toUpperCase() == "GET") {
            d.url += (d.url.indexOf("?") >= 0 ? "&": "?") + r;
            d.data = null
        } else {
            d.data = r
        }
        var A = [];
        if (d.resetForm) {
            A.push(function() {
                h.resetForm()
            })
        }
        if (d.clearForm) {
            A.push(function() {
                h.clearForm(d.includeHidden)
            })
        }
        if (!d.dataType && d.target) {
            var e = d.success || function() {};
            A.push(function(q) {
                var n = d.replaceTarget ? "replaceWith": "html";
                b(d.target)[n](q).each(e, arguments)
            })
        } else {
            if (d.success) {
                A.push(d.success)
            }
        }
        d.success = function(C, q, D) {
            var B = d.context || d;
            for (var v = 0, n = A.length; v < n; v++) {
                A[v].apply(B, [C, q, D || h, h])
            }
        };
        var w = b("input:file:enabled[value]", this);
        var i = w.length > 0;
        var u = "multipart/form-data";
        var p = (h.attr("enctype") == u || h.attr("encoding") == u);
        var o = !!(i && w.get(0).files && window.FormData);
        a("fileAPI :" + o);
        var k = (i || p) && !o;
        if (d.iframe !== false && (d.iframe || k)) {
            if (d.closeKeepAlive) {
                b.get(d.closeKeepAlive, function() {
                    z(y)
                })
            } else {
                z(y)
            }
        } else {
            if ((i || p) && o) {
                d.progress = d.progress || b.noop;
                l(y)
            } else {
                b.ajax(d)
            }
        }
        this.trigger("form-submit-notify", [this, d]);
        return this;
        function l(q) {
            var n = new FormData();
            for (var B = 0; B < q.length; B++) {
                if (q[B].type == "file") {
                    continue
                }
                n.append(q[B].name, q[B].value)
            }
            h.find("input:file:enabled").each(function() {
                var E = b(this).attr("name"),
                G = this.files;
                if (E) {
                    for (var F = 0; F < G.length; F++) {
                        n.append(E, G[F])
                    }
                }
            });
            if (d.extraData) {
                for (var v in d.extraData) {
                    n.append(v, d.extraData[v])
                }
            }
            d.data = null;
            var D = b.extend(true, {}, b.ajaxSettings, d, {
                contentType: false,
                processData: false,
                cache: false,
                type: "POST"
            });
            D.context = D.context || D;
            D.data = null;
            var C = D.beforeSend;
            D.beforeSend = function(F, E) {
                E.data = n;
                if (F.upload) {
                    F.upload.onprogress = function(G) {
                        E.progress(G.position, G.total)
                    }
                }
                if (C) {
                    C.call(E, F, d)
                }
            };
            b.ajax(D)
        }
        function z(Z) {
            var E = h[0],
            D,
            V,
            P,
            X,
            S,
            G,
            K,
            I,
            J,
            T,
            W,
            N;
            var H = !!b.fn.prop;
            if (Z) {
                if (H) {
                    for (V = 0; V < Z.length; V++) {
                        D = b(E[Z[V].name]);
                        D.prop("disabled", false)
                    }
                } else {
                    for (V = 0; V < Z.length; V++) {
                        D = b(E[Z[V].name]);
                        D.removeAttr("disabled")
                    }
                }
            }
            if (b(":input[name=submit],:input[id=submit]", E).length) {
                alert('Error: Form elements must not have name or id of "submit".');
                return
            }
            P = b.extend(true, {}, b.ajaxSettings, d);
            P.context = P.context || P;
            S = "jqFormIO" + (new Date().getTime());
            if (P.iframeTarget) {
                G = b(P.iframeTarget);
                T = G.attr("name");
                if (T == null) {
                    G.attr("name", S)
                } else {
                    S = T
                }
            } else {
                G = b('<iframe name="' + S + '" src="' + P.iframeSrc + '" />');
                G.css({
                    position: "absolute",
                    top: "-1000px",
                    left: "-1000px"
                })
            }
            K = G[0];
            I = {
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: "n/a",
                getAllResponseHeaders: function() {},
                getResponseHeader: function() {},
                setRequestHeader: function() {},
                abort: function(n) {
                    var ac = (n === "timeout" ? "timeout": "aborted");
                    a("aborting upload... " + ac);
                    this.aborted = 1;
                    G.attr("src", P.iframeSrc);
                    I.error = ac;
                    P.error && P.error.call(P.context, I, ac, n);
                    X && b.event.trigger("ajaxError", [I, P, ac]);
                    P.complete && P.complete.call(P.context, I, ac)
                }
            };
            X = P.global;
            if (X && !b.active++) {
                b.event.trigger("ajaxStart")
            }
            if (X) {
                b.event.trigger("ajaxSend", [I, P])
            }
            if (P.beforeSend && P.beforeSend.call(P.context, I, P) === false) {
                if (P.global) {
                    b.active--
                }
                return
            }
            if (I.aborted) {
                return
            }
            J = E.clk;
            if (J) {
                T = J.name;
                if (T && !J.disabled) {
                    P.extraData = P.extraData || {};
                    P.extraData[T] = J.value;
                    if (J.type == "image") {
                        P.extraData[T + ".x"] = E.clk_x;
                        P.extraData[T + ".y"] = E.clk_y
                    }
                }
            }
            var O = 1;
            var L = 2;
            function M(ac) {
                var n = ac.contentWindow ? ac.contentWindow.document: ac.contentDocument ? ac.contentDocument: ac.document;
                return n
            }
            var C = b("meta[name=csrf-token]").attr("content");
            var B = b("meta[name=csrf-param]").attr("content");
            if (B && C) {
                P.extraData = P.extraData || {};
                P.extraData[B] = C
            }
            function U() {
                var ae = h.attr("target"),
                ac = h.attr("action");
                E.setAttribute("target", S);
                if (!c) {
                    E.setAttribute("method", "POST")
                }
                if (ac != P.url) {
                    E.setAttribute("action", P.url)
                }
                if (!P.skipEncodingOverride && (!c || /post/i.test(c))) {
                    h.attr({
                        encoding: "multipart/form-data",
                        enctype: "multipart/form-data"
                    })
                }
                if (P.timeout) {
                    N = setTimeout(function() {
                        W = true;
                        R(O)
                    }, P.timeout)
                }
                function af() {
                    try {
                        var n = M(K).readyState;
                        a("state = " + n);
                        if (n.toLowerCase() == "uninitialized") {
                            setTimeout(af, 50)
                        }
                    } catch(ah) {
                        a("Server abort: ", ah, " (", ah.name, ")");
                        R(L);
                        N && clearTimeout(N);
                        N = undefined
                    }
                }
                var ad = [];
                try {
                    if (P.extraData) {
                        for (var ag in P.extraData) {
                            ad.push(b('<input type="hidden" name="' + ag + '">').attr("value", P.extraData[ag]).appendTo(E)[0])
                        }
                    }
                    if (!P.iframeTarget) {
                        G.appendTo("body");
                        K.attachEvent ? K.attachEvent("onload", R) : K.addEventListener("load", R, false)
                    }
                    setTimeout(af, 15);
                    E.submit()
                } finally {
                    E.setAttribute("action", ac);
                    if (ae) {
                        E.setAttribute("target", ae)
                    } else {
                        h.removeAttr("target")
                    }
                    b(ad).remove()
                }
            }
            if (P.forceSync) {
                U()
            } else {
                setTimeout(U, 10)
            }
            var aa,
            ab,
            Y = 50,
            F;
            function R(ag) {
                if (I.aborted || F) {
                    return
                }
                try {
                    ab = M(K)
                } catch(aj) {
                    a("cannot access response document: ", aj);
                    ag = L
                }
                if (ag === O && I) {
                    I.abort("timeout");
                    return
                } else {
                    if (ag == L && I) {
                        I.abort("server abort");
                        return
                    }
                }
                if (!ab || ab.location.href == P.iframeSrc) {
                    if (!W) {
                        return
                    }
                }
                K.detachEvent ? K.detachEvent("onload", R) : K.removeEventListener("load", R, false);
                var ae = "success",
                ai;
                try {
                    if (W) {
                        throw "timeout"
                    }
                    var ad = P.dataType == "xml" || ab.XMLDocument || b.isXMLDoc(ab);
                    a("isXml=" + ad);
                    if (!ad && window.opera && (ab.body == null || ab.body.innerHTML == "")) {
                        if (--Y) {
                            a("requeing onLoad callback, DOM not available");
                            setTimeout(R, 250);
                            return
                        }
                    }
                    var ak = ab.body ? ab.body: ab.documentElement;
                    I.responseText = ak ? ak.innerHTML: null;
                    I.responseXML = ab.XMLDocument ? ab.XMLDocument: ab;
                    if (ad) {
                        P.dataType = "xml"
                    }
                    I.getResponseHeader = function(an) {
                        var am = {
                            "content-type": P.dataType
                        };
                        return am[an]
                    };
                    if (ak) {
                        I.status = Number(ak.getAttribute("status")) || I.status;
                        I.statusText = ak.getAttribute("statusText") || I.statusText
                    }
                    var n = (P.dataType || "").toLowerCase();
                    var ah = /(json|script|text)/.test(n);
                    if (ah || P.textarea) {
                        var af = ab.getElementsByTagName("textarea")[0];
                        if (af) {
                            I.responseText = af.value;
                            I.status = Number(af.getAttribute("status")) || I.status;
                            I.statusText = af.getAttribute("statusText") || I.statusText
                        } else {
                            if (ah) {
                                var ac = ab.getElementsByTagName("pre")[0];
                                var al = ab.getElementsByTagName("body")[0];
                                if (ac) {
                                    I.responseText = ac.textContent ? ac.textContent: ac.innerText
                                } else {
                                    if (al) {
                                        I.responseText = al.textContent ? al.textContent: al.innerText
                                    }
                                }
                            }
                        }
                    } else {
                        if (n == "xml" && !I.responseXML && I.responseText != null) {
                            I.responseXML = Q(I.responseText)
                        }
                    }
                    try {
                        aa = q(I, n, P)
                    } catch(ag) {
                        ae = "parsererror";
                        I.error = ai = (ag || ae)
                    }
                } catch(ag) {
                    a("error caught: ", ag);
                    ae = "error";
                    I.error = ai = (ag || ae)
                }
                if (I.aborted) {
                    a("upload aborted");
                    ae = null
                }
                if (I.status) {
                    ae = (I.status >= 200 && I.status < 300 || I.status === 304) ? "success": "error"
                }
                if (ae === "success") {
                    P.success && P.success.call(P.context, aa, "success", I);
                    X && b.event.trigger("ajaxSuccess", [I, P])
                } else {
                    if (ae) {
                        if (ai == undefined) {
                            ai = I.statusText
                        }
                        P.error && P.error.call(P.context, I, ae, ai);
                        X && b.event.trigger("ajaxError", [I, P, ai])
                    }
                }
                X && b.event.trigger("ajaxComplete", [I, P]);
                if (X && !--b.active) {
                    b.event.trigger("ajaxStop")
                }
                P.complete && P.complete.call(P.context, I, ae);
                F = true;
                if (P.timeout) {
                    clearTimeout(N)
                }
                setTimeout(function() {
                    if (!P.iframeTarget) {
                        G.remove()
                    }
                    I.responseXML = null
                }, 100)
            }
            var Q = b.parseXML || function(n, ac) {
                if (window.ActiveXObject) {
                    ac = new ActiveXObject("Microsoft.XMLDOM");
                    ac.async = "false";
                    ac.loadXML(n)
                } else {
                    ac = (new DOMParser()).parseFromString(n, "text/xml")
                }
                return (ac && ac.documentElement && ac.documentElement.nodeName != "parsererror") ? ac: null
            };
            var v = b.parseJSON || function(n) {
                return window["eval"]("(" + n + ")")
            };
            var q = function(ag, ae, ad) {
                var ac = ag.getResponseHeader("content-type") || "",
                n = ae === "xml" || !ae && ac.indexOf("xml") >= 0,
                af = n ? ag.responseXML: ag.responseText;
                if (n && af.documentElement.nodeName === "parsererror") {
                    b.error && b.error("parsererror")
                }
                if (ad && ad.dataFilter) {
                    af = ad.dataFilter(af, ae)
                }
                if (typeof af === "string") {
                    if (ae === "json" || !ae && ac.indexOf("json") >= 0) {
                        af = v(af)
                    } else {
                        if (ae === "script" || !ae && ac.indexOf("javascript") >= 0) {
                            b.globalEval(af)
                        }
                    }
                }
                return af
            }
        }
    };
    b.fn.ajaxForm = function(c) {
        if (this.length === 0) {
            var d = {
                s: this.selector,
                c: this.context
            };
            if (!b.isReady && d.s) {
                a("DOM not ready, queuing ajaxForm");
                b(function() {
                    b(d.s, d.c).ajaxForm(c)
                });
                return this
            }
            a("terminating; zero elements found by selector" + (b.isReady ? "": " (DOM not ready)"));
            return this
        }
        return this.ajaxFormUnbind().bind("submit.form-plugin", function(f) {
            if (!f.isDefaultPrevented()) {
                f.preventDefault();
                b(this).ajaxSubmit(c)
            }
        }).bind("click.form-plugin", function(j) {
            var i = j.target;
            var g = b(i);
            if (! (g.is(":submit,input:image"))) {
                var f = g.closest(":submit");
                if (f.length == 0) {
                    return
                }
                i = f[0]
            }
            var h = this;
            h.clk = i;
            if (i.type == "image") {
                if (j.offsetX != undefined) {
                    h.clk_x = j.offsetX;
                    h.clk_y = j.offsetY
                } else {
                    if (typeof b.fn.offset == "function") {
                        var k = g.offset();
                        h.clk_x = j.pageX - k.left;
                        h.clk_y = j.pageY - k.top
                    } else {
                        h.clk_x = j.pageX - i.offsetLeft;
                        h.clk_y = j.pageY - i.offsetTop
                    }
                }
            }
            setTimeout(function() {
                h.clk = h.clk_x = h.clk_y = null
            }, 100)
        })
    };
    b.fn.ajaxFormUnbind = function() {
        return this.unbind("submit.form-plugin click.form-plugin")
    };
    b.fn.formToArray = function(q) {
        var p = [];
        if (this.length === 0) {
            return p
        }
        var d = this[0];
        var g = q ? d.getElementsByTagName("*") : d.elements;
        if (!g) {
            return p
        }
        var k,
        h,
        f,
        r,
        e,
        m,
        c;
        for (k = 0, m = g.length; k < m; k++) {
            e = g[k];
            f = e.name;
            if (!f) {
                continue
            }
            if (q && d.clk && e.type == "image") {
                if (!e.disabled && d.clk == e) {
                    p.push({
                        name: f,
                        value: b(e).val(),
                        type: e.type
                    });
                    p.push({
                        name: f + ".x",
                        value: d.clk_x
                    }, {
                        name: f + ".y",
                        value: d.clk_y
                    })
                }
                continue
            }
            r = b.fieldValue(e, true);
            if (r && r.constructor == Array) {
                for (h = 0, c = r.length; h < c; h++) {
                    p.push({
                        name: f,
                        value: r[h]
                    })
                }
            } else {
                if (r !== null && typeof r != "undefined") {
                    p.push({
                        name: f,
                        value: r,
                        type: e.type
                    })
                }
            }
        }
        if (!q && d.clk) {
            var l = b(d.clk),
            o = l[0];
            f = o.name;
            if (f && !o.disabled && o.type == "image") {
                p.push({
                    name: f,
                    value: l.val()
                });
                p.push({
                    name: f + ".x",
                    value: d.clk_x
                }, {
                    name: f + ".y",
                    value: d.clk_y
                })
            }
        }
        return p
    };
    b.fn.formSerialize = function(c) {
        return b.param(this.formToArray(c))
    };
    b.fn.fieldSerialize = function(d) {
        var c = [];
        this.each(function() {
            var h = this.name;
            if (!h) {
                return
            }
            var f = b.fieldValue(this, d);
            if (f && f.constructor == Array) {
                for (var g = 0, e = f.length; g < e; g++) {
                    c.push({
                        name: h,
                        value: f[g]
                    })
                }
            } else {
                if (f !== null && typeof f != "undefined") {
                    c.push({
                        name: this.name,
                        value: f
                    })
                }
            }
        });
        return b.param(c)
    };
    b.fn.fieldValue = function(h) {
        for (var g = [], e = 0, c = this.length; e < c; e++) {
            var f = this[e];
            var d = b.fieldValue(f, h);
            if (d === null || typeof d == "undefined" || (d.constructor == Array && !d.length)) {
                continue
            }
            d.constructor == Array ? b.merge(g, d) : g.push(d)
        }
        return g
    };
    b.fieldValue = function(c, j) {
        var e = c.name,
        p = c.type,
        q = c.tagName.toLowerCase();
        if (j === undefined) {
            j = true
        }
        if (j && (!e || c.disabled || p == "reset" || p == "button" || (p == "checkbox" || p == "radio") && !c.checked || (p == "submit" || p == "image") && c.form && c.form.clk != c || q == "select" && c.selectedIndex == -1)) {
            return null
        }
        if (q == "select") {
            var k = c.selectedIndex;
            if (k < 0) {
                return null
            }
            var m = [],
            d = c.options;
            var g = (p == "select-one");
            var l = (g ? k + 1: d.length);
            for (var f = (g ? k: 0); f < l; f++) {
                var h = d[f];
                if (h.selected) {
                    var o = h.value;
                    if (!o) {
                        o = (h.attributes && h.attributes.value && !(h.attributes.value.specified)) ? h.text: h.value
                    }
                    if (g) {
                        return o
                    }
                    m.push(o)
                }
            }
            return m
        }
        return b(c).val()
    };
    b.fn.clearForm = function(c) {
        return this.each(function() {
            b("input,select,textarea", this).clearFields(c)
        })
    };
    b.fn.clearFields = b.fn.clearInputs = function(c) {
        var d = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function() {
            var f = this.type,
            e = this.tagName.toLowerCase();
            if (d.test(f) || e == "textarea" || (c && /hidden/.test(f))) {
                this.value = ""
            } else {
                if (f == "checkbox" || f == "radio") {
                    this.checked = false
                } else {
                    if (e == "select") {
                        this.selectedIndex = -1
                    }
                }
            }
        })
    };
    b.fn.resetForm = function() {
        return this.each(function() {
            if (typeof this.reset == "function" || (typeof this.reset == "object" && !this.reset.nodeType)) {
                this.reset()
            }
        })
    };
    b.fn.enable = function(c) {
        if (c === undefined) {
            c = true
        }
        return this.each(function() {
            this.disabled = !c
        })
    };
    b.fn.selected = function(c) {
        if (c === undefined) {
            c = true
        }
        return this.each(function() {
            var d = this.type;
            if (d == "checkbox" || d == "radio") {
                this.checked = c
            } else {
                if (this.tagName.toLowerCase() == "option") {
                    var e = b(this).parent("select");
                    if (c && e[0] && e[0].type == "select-one") {
                        e.find("option").selected(false)
                    }
                    this.selected = c
                }
            }
        })
    };
    b.fn.ajaxSubmit.debug = false;
    function a() {
        if (!b.fn.ajaxSubmit.debug) {
            return
        }
        var c = "[jquery.form] " + Array.prototype.join.call(arguments, "");
        if (window.console && window.console.log) {
            window.console.log(c)
        } else {
            if (window.opera && window.opera.postError) {
                window.opera.postError(c)
            }
        }
    }
})(jQuery);
    var xdmLoader = false;
    $(document).ready(function() {
        $(".tips, .tips-on").siapTooltip();
        $(".js-modal-tips").siapModaltip();
        $(".js-cardhov").siapModaltimed();
        Cache.disable()
    });
    var siapAkunFunctions = new function() {
        this.baseUrl = BASE_URL;
        this.statikUrl = STATIK_URL;
        this.xdmLoader = false;
        this.initXdmlLoader = function() {
            this.xdmLoader = new easyXDM.Rpc({
                remote: STATIK_URL + "/prebuild/akun/html/cors/index.html"
            }, {
                remote: {
                    request: {}
                }
            })
        };
        this.getBaseUrl = function() {
            return this.baseUrl
        };
        this.getStatikUrl = function() {
            return this.statikUrl
        };
        this.animateHtml = function(a, b, c) {
            $(function() {
                var d = $(a).children().get(0);
                if ($(d).length > 0) {
                    $(d).slideUp("fast", function() {
                        $(a).empty();
                        $(a).append($(b).hide());
                        c()
                    })
                } else {
                    $(a).append($(b).hide());
                    c()
                }
                return false
            })
        };
        this.dataLoaded = function(a) {
            $(a).slideDown("fast")
        };
        this.loadHtml = function(e, c, g, b, a, h) {
            if (!this.xdmLoader) {
                this.initXdmlLoader()
            }
            var f = this.statikUrl + "/prebuild/akun/html" + (e ? "/" + e: "") + (c ? "/" + c: "") + (g ? "/" + g: "") + (b ? "_" + b: "") + ".html?v=" + STATIK_BUILD_VERSION;
            if (Cache.get(f) && false) {
                var d = $(Cache.get(f));
                siapAkunFunctions.animateHtml(a, d, h)
            } else {
                this.xdmLoader.request({
                    url: f,
                    method: "GET"
                }, function(i) {
                    var j = i.data;
                    Cache.set(f, j);
                    siapAkunFunctions.animateHtml(a, j, h)
                })
            }
        };
        this.showMessage = function(a, j, g, k, h, c, e) {
            var i = new Date();
            var l = i.getTime();
            var f = '<div class="warn-cont js-appmessage_' + l + '">';
            f += '<div class="warn' + (j ? " " + j: "") + '" alt="' + g + '">';
            f += '<span alt="' + k + '">' + h + "</span>";
            f += "</div>";
            f += "</div>";
            if (!e) {
                e = 200
            }
            if (!c) {
                c = "append"
            }
            if (c == "prepend") {
                $(a).prepend($(f).hide().fadeIn(e))
            } else {
                $(a).append($(f).hide().fadeIn(e))
            }
            var b = $(f);
            $("html, body").animate({
                scrollTop: $(b).offset().top
            }, 500);
            return l
        };
        this.hideMessage = function(c, a, b) {
            if (!a) {
                a = 200
            }
            $(".js-appmessage_" + c).fadeOut(a, function() {
                $(".js-appmessage_" + c).remove();
                if (b) {
                    b.call()
                }
            })
        };
        this.generatePager = function(q, h, a, b, l, f) {
            if (!q) {
                var n = new Date();
                var p = n.getTime()
            } else {
                var p = q
            }
            $(".tips-modal").hide();
            var o = "js_pager_data_rendered_" + p;
            var m = "js_pager_paging_rendered_" + p;
            var e = Math.ceil(a / 10);
            if (!q) {
                var k = "";
                k += '<div id="' + m + '" class="tips-modal rnd3">';
                k += '<div class="point"></div>';
                for (var g = 1; g <= e; g++) {
                    if ((1 + ((g - 1) * 10)) <= a) {
                        k += '<ul class="nav-no">';
                        for (var c = 1; c <= 10; c++) {
                            if ((c + ((g - 1) * 10)) <= a) {
                                k += "<li " + ((c + ((g - 1) * 10)) == l ? 'class="on"': "") + " onclick=\"window.location = '" + f + "/" + b + "/" + (c + ((g - 1) * 10)) + "';\">" + (c + ((g - 1) * 10)) + "</li>"
                            } else {
                                break
                            }
                        }
                        k += "</ul>"
                    } else {
                        break
                    }
                }
                k += "</div>";
                k += '<div id="' + o + '" class="tips-modal menu rnd3">';
                k += '<div class="point"></div>';
                k += "<ul>";
                k += "<li " + (20 == b ? 'class="on"': "") + '><a href="' + f + "/20/" + 1 + '">20 data</a></li>';
                k += "<li " + (50 == b ? 'class="on"': "") + '><a href="' + f + "/50/" + 1 + '">50 data</a></li>';
                k += "<li " + (100 == b ? 'class="on"': "") + '><a href="' + f + "/100/" + 1 + '">100 data</a></li>';
                k += "</ul>";
                k += "</div>";
                $(h).find(".js-paging-holder").attr("rel", "#" + m);
                $(h).find(".js-paging-holder span").html("Hal " + l + " dari " + a);
                $(h).find(".js-limit-holder").attr("rel", "#" + o);
                $(h).find(".js-limit-holder span").html(b + " data");
                $("body").append(k);
                $(".js-modal-tips").siapModaltip()
            } else {
                $(m).empty();
                var k = "";
                k += '<div class="point"></div>';
                for (var g = 1; g <= e; g++) {
                    if ((1 + ((g - 1) * 10)) <= a) {
                        k += '<ul class="nav-no">';
                        for (var c = 1; c <= 10; c++) {
                            if ((c + ((g - 1) * 10)) <= a) {
                                k += "<li " + ((c + ((g - 1) * 10)) == l ? 'class="on"': "") + " onclick=\"window.location = '" + f + "/" + b + "/" + (c + ((g - 1) * 10)) + "';\">" + (c + ((g - 1) * 10)) + "</li>"
                            } else {
                                break
                            }
                        }
                        k += "</ul>"
                    } else {
                        break
                    }
                }
                $("#" + m).append(k);
                $(o).empty();
                var k = "";
                k += '<div class="point"></div>';
                k += "<ul>";
                k += "<li " + (20 == b ? 'class="on"': "") + '><a href="' + f + "/20/" + 1 + '">20 data</a></li>';
                k += "<li " + (50 == b ? 'class="on"': "") + '><a href="' + f + "/50/" + 1 + '">50 data</a></li>';
                k += "<li " + (100 == b ? 'class="on"': "") + '><a href="' + f + "/100/" + 1 + '">100 data</a></li>';
                k += "</ul>";
                $("#" + o).append(k);
                $(h).find(".js-limit-holder span").html(b + " data");
                $(h).find(".js-paging-holder span").html("Hal " + l + " dari " + a)
            }
            return p
        };
        this.destroyPager = function(a) {
            $("#js_pager_data_rendered_" + a).remove();
            $("#js_pager_paging_rendered_" + a).remove()
        }
    };
    (function(c, b, a, d) {
        b.siap = {};
        b.siap.loadScript = function(e) {
            var g = a.createElement("script");
            var f = a.getElementsByTagName("script")[0];
            g.type = "text/javascript";
            g.async = false;
            g.src = e;
            f.parentNode.insertBefore(g, f)
        };
        b.siap.getGlobalVar = function(e) {
            if (typeof e != "string") {
                return false
            }
            if (!e.match(/^[a-z_$][0-9a-z_$]*$/i)) {
                return false
            }
            if (!b[e]) {
                return false
            }
            return b[e]
        };
        b.siap.date = (function() {
            var e = [false, "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
            var f = [false, "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
            return {
                toLocale: function(g, h) {
                    if (typeof g != "string") {
                        return ""
                    } else {
                        g = g.split("-");
                        g[1] = (h ? f[Number(g[1])] : e[Number(g[1])]);
                        g.reverse();
                        return g.join(" ")
                    }
                },
                manageConstraint: function(g, i, h) {
                    g = c(typeof g == "string" ? "#" + g: g);
                    i = c(typeof i == "string" ? "#" + i: i);
                    h = c(typeof h == "string" ? "#" + h: h);
                    g.add(i).add(h).change(function() {
                        var k = Number(g.val());
                        var j = Number(i.val());
                        var l = Number(h.val());
                        if (j == 2 && l % 4 == 0 && k > 29) {
                            g.val("29")
                        } else {
                            if (j == 2 && l % 4 != 0 && k > 28) {
                                g.val("28")
                            } else {
                                if ((j == 4 || j == 6 || j == 9 || j == 11) && k > 30) {
                                    g.val("30")
                                }
                            }
                        }
                    })
                }
            }
        })();
        b.siap.cookie = (function() {
            var e = new Date(1970, 1, 1);
            return {
                get: function(f) {
                    var h;
                    var g = null;
                    if (a.cookie) {
                        h = a.cookie.split(";");
                        c.each(h, function() {
                            var i = c.trim(this).split("=");
                            if (i[0] == f) {
                                g = i[1];
                                return false
                            }
                        })
                    }
                    return g
                },
                set: function(g, h, f) {
                    if (typeof f == "object") {
                        f = f.toUTCString()
                    } else {
                        if (typeof f != "string") {
                            f = null
                        }
                    }
                    a.cookie = g + "=" + h + (f ? ";expires=" + f: "")
                },
                clear: function(f) {
                    this.set(f, "", e)
                }
            }
        })();
        b.siap.ajaxTimeout = 10000;
        b.siap.ajaxLoading = (function() {
            var g;
            var f = c('<div class="disabler" />');
            var e = c(['<div class="wraper disabler-status">', '<div class="rnd5 warn warn-info warn-load">', '<div class="rnd5 warn-ic">', '<div class="rnd5 rnd-r warn-msg">', "<span>Processing !</span> Harap tunggu, data sedang diproses ...", "</div>", "</div>", "</div>", "</div>"].join(""));
            return {
                show: function() {
                    c(a.body).append(f).append(e);
                    this.show = function() {
                        g = b.setTimeout(function() {
                            f.show();
                            e.show()
                        }, 10)
                    };
                    this.show()
                },
                hide: function() {
                    b.clearTimeout(g);
                    b.setTimeout(function() {
                        e.hide();
                        f.hide()
                    }, 400)
                }
            }
        })();
        b.siap.ajax = function(e, f, g) {
            if (typeof g == "function") {
                g = {
                    success: g
                }
            }
            g = c.extend({
                start: siap.ajaxLoading.show,
                success: function() {},
                timeout: function() {},
                error: function() {},
                complete: function() {},
                stop: siap.ajaxLoading.hide
            }, g || {});
            g.start();
            return c.ajax({
                url: e || "/",
                type: "post",
                data: f || {},
                dataType: "json",
                timeout: siap.ajaxTimeout,
                success: function(i, h, j) {
                    if (i) {
                        g.success(i)
                    } else {
                        g.error(j, h)
                    }
                },
                complete: function(i, h) {
                    if (h == "timeout") {
                        g.timeout(i, h)
                    } else {
                        if (h != "success") {
                            g.error(i, h)
                        }
                    }
                    g.complete(i, h);
                    g.stop()
                }
            })
        };
        b.siap.history = (typeof dhtmlHistory == "undefined" ? {}: (function() {
            var e = function() {};
            dhtmlHistory.create({
                toJSON: JSON.stringify,
                fromJSON: JSON.parse
            });
            function f(h, g) {
                e(h, g)
            }
            return {
                initialize: function(g) {
                    dhtmlHistory.initialize();
                    dhtmlHistory.addListener(f);
                    if (typeof g == "function") {
                        e = g
                    }
                },
                add: function(h, g) {
                    dhtmlHistory.add(h, g)
                }
            }
        })());
        b.siap.table = function(e) {
            e = c(typeof e == "string" ? "#" + e: e);
            e.addRow = function(h, f) {
                var g = c("<tr />");
                f = f || [];
                c.each(h || [], function(j, k) {
                    var l = c("<td />");
                    f[j] && l.attr(f[j]);
                    l.append(k);
                    g.append(l)
                });
                e.append(g)
            };
            e.insertRow = function(k, h, g) {
                var f = e.find("tr"),
                i = f.eq(Math.max(0, Math.min(f.length - 1, g)));
                var j = c("<tr />");
                h = h || [];
                c.each(k || [], function(l, m) {
                    var n = c("<td />");
                    h[l] && n.attr(h[l]);
                    n.append(m);
                    j.append(n)
                });
                i.before(j)
            };
            return e
        };
        b.siap.option = function(e) {
            e = c(typeof e == "string" ? "#" + e: e);
            e.populate = function(i, h, f) {
                var g;
                if (f) {
                    g = '<option value="' + f[0] + '">' + f[1] + "</option>";
                    e.append(g)
                }
                c.each(i || [], function() {
                    g = '<option value="' + this[0] + '"' + (this[0] == h ? ' selected="selected"': "") + ">" + this[1] + "</option>";
                    e.append(g)
                })
            };
            return e
        };
        b.siap.autocomplete = function(f, g) {
            var h = 38;
            var l = 40;
            var k = 13;
            var m,
            e,
            j,
            i = {};
            f = typeof f == "string" ? c(f) : f;
            g = g || [];
            i.search = false;
            i.data = [];
            i.index = false;
            f.attr("autocomplete", "off");
            f.wrap('<span class="autocomplete" />');
            f.after('<div class="ac-box"><ul /></div>');
            m = f.closest(".autocomplete");
            e = m.children(".ac-box");
            j = e.children("ul");
            f.focus(function() {
                if (i.data.length > 0) {
                    e.show()
                }
            });
            f.keyup(function(q) {
                var o,
                n;
                if (q.keyCode != l && q.keyCode != h && q.keyCode != k) {
                    i.search = q.target.value.toLowerCase().replace(/^\s+/, "").replace(/\s+$/, "");
                    i.data = [];
                    j.empty();
                    if (i.search) {
                        for (var p = 0; p < g.length; p++) {
                            if (g[p][1].toLowerCase().search(i.search) > -1) {
                                n = c('<li class="ac-li-' + p + '">' + g[p][1] + "</li>");
                                i.data[i.data.length] = g[p];
                                j.append(n)
                            }
                        }
                        if (i.data.length > 0) {
                            if (i.index === false) {
                                i.index = 0
                            } else {
                                if (i.index >= i.data.length) {
                                    i.index = i.data.length - 1
                                }
                            }
                            o = j.children("li");
                            o.click(function() {
                                var r = this.className.replace(/^ac-li-(\d+).*$/, "$1");
                                i.index = Number(r);
                                f.val(this.innerHTML);
                                e.hide()
                            });
                            o.mouseover(function() {
                                o.removeClass("on");
                                c(this).addClass("on")
                            });
                            j.mouseout(function() {
                                o.removeClass("on").eq(i.index).addClass("on")
                            });
                            o.eq(i.index).addClass("on");
                            e.show()
                        } else {
                            e.hide()
                        }
                    } else {
                        e.hide()
                    }
                }
            });
            f.keydown(function(o) {
                var n = i.data.length;
                if (o.keyCode == l) {
                    i.index = i.index < n - 1 ? i.index + 1: 0;
                    j.children("li").removeClass("on").eq(i.index).addClass("on")
                } else {
                    if (o.keyCode == h) {
                        i.index = i.index > 0 ? i.index - 1: n - 1;
                        j.children("li").removeClass("on").eq(i.index).addClass("on")
                    } else {
                        if (o.keyCode == k) {
                            f.val(j.children("li").eq(i.index).html());
                            e.hide()
                        }
                    }
                }
            });
            return {
                reload: function(n) {
                    n = n || []
                },
                val: function() {
                    return g[i.index] ? g[i.index][0] : ""
                }
            }
        };
        b.siap.popupTemplate = "";
        b.siap.popup = function(i, f) {
            var h = c('<div id="', i, '">', '<div id="', i, '-layer"></div>', '<div id="', i, '-ct">', (f || siap.popupTemplate), "</div>", "</div>");
            var e = h.children("#" + i + "-layer");
            var g = h.children("#" + i + "-ct");
            c(a.body).append(h);
            h.css({
                display: "none",
                left: 0,
                position: "absolute",
                top: 0
            });
            e.css({
                opacity: 0.5,
                position: "absolute"
            });
            g.css({
                overflow: "hidden",
                position: "relative"
            });
            c(a.body).append(h);
            return {
                id: i,
                show: function() {
                    var k = b.innerWidth;
                    var j = b.innerHeight;
                    h.css({
                        width: k,
                        height: j
                    });
                    e.css({
                        width: k,
                        height: j
                    });
                    g.css({
                        width: k,
                        height: j
                    });
                    h.show()
                },
                hide: function() {
                    h.hide()
                }
            }
        }
    })(jQuery, window, window.document);