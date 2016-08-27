/**
 * jquery-common.js
 * @version 0.0.33 (2016.07.26)
 *
 * @author Inpassor <inpassor@yandex.com>
 * @link https://github.com/Inpassor
 */

;(function ($, window, document, undefined) {

    $.isUndefined = function (v) {
        return v === undefined;
    };

    $.isBool = $.isBoolean = function (b) {
        return typeof b === 'boolean';
    };

    $.isInt = $.isInteger = function (n) {
        return n === +n && !(n % 1);
    };

    $.isFloat = function (n) {
        return n === +n && n !== (n | 0);
    };

    $.isString = function (s) {
        return typeof s === 'string';
    };

    $.isArray = function (a) {
        return a instanceof Array;
    };

    $.toFloat = function (n) {
        return n ? parseFloat((n + '')
            .replace(/[^0-9+\-Ee.]/g, '')
            .replace(/,/g, '.')
            .replace(/ /g, '')
        ) : 0;
    };

    $.numberFormat = function (number, decimals, decPoint, thousandSep) {
        number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            dp = $.isUndefined(decPoint) ? '.' : decPoint,
            ts = $.isUndefined(thousandSep) ? ',' : thousandSep,
            toFixedFix = function (n, prec) {
                var k = Math.pow(10, prec);
                return '' + Math.round(n * k) / k;
            },
            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, ts);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dp);
    };

    $.toMoney = function (n, decPoint, thousandSep) {
        return n ? $.numberFormat($.toFloat(n), 2, decPoint || '.', thousandSep || ' ') : '0.00';
    };

    $.prefixZero = function (n, length) {
        length = parseInt(length, 10);
        if (!length) {
            length = (n + '').length;
        }
        return (new Array(length).join('0') + n).slice(-length);
    };

    $.removePrefixZero = function (n) {
        n = $.toFloat(n) + '';
        while (n.substr(n.length, 1) == '0' || n.substr(n.length, 1) == '.') {
            n = n.substr(0, n.length - 2);
        }
        return n;
    };

    $.db = function () {
        var s = false;
        try {
            s = !$.isUndefined(typeof window.localStorage);
        } catch (e) {
        }
        if (!s) {
            return s;
        }
        switch (arguments.length) {
            case 0: {
                return true;
            }
            case 1: {
                switch (arguments[0]) {
                    case 'clear': {
                        window.localStorage.clear();
                        return true;
                    }
                    default: {
                        var v = window.localStorage[arguments[0]];
                        return v ? JSON.parse(v || '{}') : undefined;
                    }
                }
            }
            case 2: {
                var r;
                switch (arguments[0]) {
                    case 'remove': {
                        r = window.localStorage[arguments[1]] ? true : false;
                        window.localStorage.removeItem(arguments[1]);
                        return r;
                    }
                    case 'removeAll': {
                        r = false;
                        for (var i in window.localStorage) {
                            if (!window.localStorage.hasOwnProperty(i)) {
                                continue;
                            }
                            if (i.indexOf(arguments[1]) !== -1) {
                                window.localStorage.removeItem(i);
                                r = true;
                            }
                        }
                        return r;
                    }
                    default: {
                        try {
                            window.localStorage[arguments[0]] = JSON.stringify(arguments[1]);
                            return arguments[1];
                        } catch (e) {
                            return false;
                        }
                    }
                }
            }
        }
        return false;
    };

    $.getQueryParams = function (h) {
        if (!h) {
            h = window.location.href;
        }
        var q = {},
            t = h.substr(h.indexOf('?') + 1).split('&');
        for (var i = 0, l = t.length; i < l; i++) {
            t[i] = decodeURIComponent(t[i]).split('=');
            q[t[i][0]] = t[i][1] || '';
        }
        return q;
    };

    $.toQueryString = function (o) {
        var p = [];
        for (var i in o) {
            if (!o.hasOwnProperty(i)) {
                continue;
            }
            p.push(encodeURIComponent(i) + '=' + encodeURIComponent(o[i]));
        }
        return p.join('&');
    };

    $.getScriptParams = function (filename) {
        var r = {},
            s = $('script');
        for (var i = 0, l = s.length; i < l; i++) {
            var q = s[i].getAttribute('src');
            if (!q) {
                continue;
            }
            if (q.indexOf(filename + '.js') !== -1) {
                r = $.getQueryParams(q);
                break;
            }
        }
        return r;
    };

    $.getHashParams = function () {
        var h = window.location.hash,
            i = h.indexOf('#');
        if (i === -1) {
            return false;
        }
        var t = h.substr(i + 1).split('?');
        return [t[0], t[1] ? $.getQueryParams(t[1]) : {}];
    };

    $.hashRemove = function () {
        var sV,
            sH,
            l = window.location;
        if ('pushState' in history) {
            history.pushState('', document.title, l.pathname + l.search);
        } else {
            sV = document.body.scrollTop;
            sH = document.body.scrollLeft;
            l.hash = '';
            document.body.scrollTop = sV;
            document.body.scrollLeft = sH;
        }
    };

    $._renderT = {};
    $.render = function (template, data) {
        return !template ? '' : ($._renderT[template] = $._renderT[template] || new Function("_", "return '" + template
                    .replace(/\n/g, "\\n")
                    .replace(/\r/g, "\\r")
                    .replace(/'/g, "\\'")
                    .replace(/\{\s*([^\}]+)\s*\}/g, "'+(_.$1?(_.$1+''):(_.$1===0?0:''))+'")
                + "'"
            ))(data);
    };

    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };

})(jQuery, window, document);
