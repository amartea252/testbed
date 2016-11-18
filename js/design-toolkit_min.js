if ("undefined" === typeof jQuery) {
    var newScript = document.createElement("script");
    newScript.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js";
    newScript.type = "text/javascript";
    var docHead = document.getElementsByTagName("head")[0],
        firstScript = document.getElementsByTagName("script")[0];
    docHead.insertBefore(newScript, firstScript);
    newScript.readyState ? newScript.onreadystatechange = function() {
            "loaded" !== newScript.readyState && "complete" !== newScript.readyState || loadDTK(jQuery, window, document)
        } :
        newScript.onload = function() {
            loadDTK(jQuery, window, document)
        }
} else loadDTK(jQuery, window, document);

function loadDTK(b, e, f, n) {
    function t(a, h) {
        function d(a) {
            if (b(k).is(":animated")) return !1;
            if (r = "reverse" === a ? !0 : !1)
                for (a = e - 1; - 1 < a; a--) b(c[a]).hasClass("currentPic") && (k = c[a], n = l[a], 0 === a ? (m = c[e - 1], p = l[e - 1]) : (m = c[a - 1], p = l[a - 1]));
            else if (f)
                for (a = 0; a < e; a++) b(c[a]).hasClass("currentPic") && (k = c[a], n = l[a], a + 1 === e ? (m = c[0], p = l[0]) : (m = c[a + 1], p = l[a + 1]));
            else
                for (a = 0; a < e; a++) b(c[a]).hasClass("currentPic") && (k = c[a], m = a + 1 === e ? c[0] : c[a + 1]);
            if (g.options.carousel) {
                var h = b(k).width();
                b(k).removeClass("currentPic");
                r ? (b(m).addClass("currentPic").css({
                    left: -h,
                    display: "block"
                }), b(k).animate({
                    left: h
                }, g.options.animationSpeed, function() {
                    b(this).css({
                        display: "none",
                        left: h
                    })
                })) : (b(m).addClass("currentPic").css({
                    right: -h,
                    display: "block",
                    left: h
                }), b(k).animate({
                    left: -h
                }, g.options.animationSpeed, function() {
                    b(this).css({
                        display: "none",
                        left: h
                    })
                }));
                b(m).animate({
                    left: 0,
                    right: 0
                }, g.options.animationSpeed)
            } else b(k).removeClass("currentPic"), b(m).addClass("currentPic"), b(m).fadeIn(1E3, function() {
                b(k).hide()
            });
            b(n).removeClass("selected");
            b(p).addClass("selected")
        }
        var c = b(a).find(".slide"),
            l = b(a).find("#btns a"),
            q = b(a).find(".forward_btn"),
            e = c.length,
            f = l.length,
            k = b(a).find(".currentPic"),
            n, m, p, r;
        this.options = b.extend({}, {
            speed: 4E3,
            animationSpeed: 400,
            carousel: !1,
            pauseOnHover: !0
        }, h);
        var g = this;
        this.intervalID = null;
        if (q) {
            var q = b("a.forward_btn"),
                s = b("a.back_btn");
            q.length && q.click(function() {
                clearInterval(g.intervalID);
                d();
                return !1
            });
            s.length && s.click(function() {
                clearInterval(g.intervalID);
                d("reverse");
                return !1
            })
        }
        f && b(l).click(function(a) {
            a.stopPropagation();
            c.each(function(a) {
                b(c[a]).hide().removeClass("currentPic");
                b(l[a]).removeClass("selected")
            });
            a = b(this).index();
            b(c[a]).fadeIn().addClass("currentPic");
            b(l[a]).addClass("selected");
            clearInterval(g.intervalID);
            return !1
        });
        g.options.pauseOnHover && b(a).mouseleave(function() {
            clearInterval(g.intervalID);
            g.intervalID = setInterval(d, g.options.speed)
        }).mouseenter(function() {
            clearInterval(g.intervalID)
        });
        this.intervalID = setInterval(d, this.options.speed)
    }
    e.DTK = {
        addWindowLoadEvent: function(a) {
            return a ? (e.addEventListener ?
                e.addEventListener("load", a, !1) : e.attachEvent("onload", a), this) : !1
        },
        removeBreadcrumb: function() {
            var a = f.getElementById("content_area").getElementsByTagName("table")[0];
            a.parentNode.removeChild(a);
            return this
        },
        removeAllTablePadding: function() {
            for (var a = f.getElementsByTagName("table"), b = a.length, d = 0; d < b; d++) a[d].setAttribute("cellpadding", "0"), a[d].setAttribute("cellspacing", "0");
            return this
        },
        injectTag: function(a) {
            var b = {
                    type: null,
                    url: null,
                    callback: null,
                    node: "script",
                    cache: !0
                },
                d;
            for (d in b) "undefined" ===
                typeof a[d] && (a[d] = b[d]);
            b = f.getElementsByTagName(a.node)[0];
            if ("stylesheet" === a.type) return b = b.parentNode, f.createStyleSheet ? f.createStyleSheet(a.url) : (d = f.createElement("link"), d.setAttribute("rel", "stylesheet"), d.setAttribute("type", "text/css"), d.setAttribute("href", a.url), b.appendChild(d)), this;
            if ("script" === a.type) {
                var c = f.createElement("script");
                c.type = "text/javascript";
                d = (new Date).getTime();
                c.readyState ? c.onreadystatechange = function() {
                    if ("loaded" === c.readyState || "complete" === c.readyState) c.onreadystatechange =
                        null, "function" === typeof a.callback && a.callback()
                } : c.onload = function() {
                    "function" === typeof a.callback && a.callback()
                };
                !1 === a.cache && (a.url += (/\?/.test(a.url) ? "&" : "?") + "vjsNoCache=" + d);
                c.src = a.url;
                b.parentNode.insertBefore(c, b);
                return this
            }
        },
        checkPage: function(a) {
            if ("function" === typeof PageName) {
                if (PageName().split("#")[0] === a.toLowerCase()) return !0;
                if ("default.asp" === a.toLowerCase()) return "" === PageName().split("#")[0] ? !0 : !1
            }
        },
        loadCSS: function(a) {
            var b;
            if (a) return this.checkPage("searchresults.asp") &&
                (b = "/v/vspfiles/templates/" + a + "/css/category.css"), this.checkPage("productdetails.asp") && (b = "/v/vspfiles/templates/" + a + "/css/productdetails.css"), this.checkPage("shoppingcart.asp") && (b = "/v/vspfiles/templates/" + a + "/css/shoppingcart.css"), this.checkPage("one-page-checkout.asp") && (b = "/v/vspfiles/templates/" + a + "/css/onepagecheckout.css"), this.checkPage("orderfinished.asp") && (b = "/v/vspfiles/templates/" + a + "/css/thankyou.css"), this.checkPage("dealoftheday.asp") && (b = "/v/vspfiles/templates/" + a + "/css/dealoftheday.css"),
                b && this.injectTag({
                    type: "stylesheet",
                    url: b
                }), this.injectTag({
                    type: "stylesheet",
                    url: "/v/vspfiles/templates/" + a + "/css/softaddtocart.css"
                }), this;
            e.alert("No template name specified");
            return !1
        },
        placeholderPolyfill: function() {
            "placeholder" in f.createElement("input") || b("input[placeholder]").each(function() {
                var a = b(this).attr("placeholder");
                b(this).removeAttr("placeholder").val(a);
                b(this).bind({
                    focus: function() {
                        b(this).val() === a && b(this).val("")
                    },
                    blur: function() {
                        "" === b(this).val() && b(this).val(a)
                    }
                })
            })
        },
        formCheck: function(a) {
            var h = e.attachEvent ? !0 : !1,
                d = e.WebKitAnimationEvent && !e.WebGLActiveInfo ? !0 : !1;
            a = a.elements;
            var c = 0;
            if ("undefined" !== typeof f.body.style.MozBoxShadow || h || d) {
                if (b.each(a, function(a, b) {
                        b.style.outline = "";
                        if (b.getAttribute("required") !== n) {
                            if ("" === b.value || -1 === b.selectedIndex) b.hasAttribute === n ? b.style.border = "1px solid #d30000" : b.style.outline = "1px solid #d30000", c++
                        } else "email" !== b.getAttribute("type") || /^(([^<>\(\)\[\]\\.,;:\s@\"]+(\.[^<>\(\)\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i.test(b.value) ||
                            (b.hasAttribute === n ? b.style.border = "1px solid #d30000" : b.style.outline = "1px solid #d30000", c++)
                    }), 0 < c) return e.alert("The fields in red are either required or invalid."), !1
            } else return b("#Email_1").val() !== b("#Email_2").val() ? (e.alert("The emails do not match."), !1) : !0
        },
        addYear: function() {
            var a = (new Date).getFullYear();
            0 < b(".insertYear").length && b(".insertYear").html(a)
        },
        init: function() {
            this.placeholderPolyfill();
            this.addYear()
        }
    };
    b(f).ready(function() {
        DTK.init()
    });
    b.fn.vslide = function(a) {
        return this.each(function() {
            new t(this,
                a)
        })
    }
};