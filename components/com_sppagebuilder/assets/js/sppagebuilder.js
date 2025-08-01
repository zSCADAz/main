/**
 * @package SP Page Builder
 * @author JoomShaper http://www.joomshaper.com
 * @copyright Copyright (c) 2010 - 2022 JoomShaper
 * @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 or later
 */
! function(t) {
    "use strict";
    var e = '[data-dismiss="sppb-alert"]',
        i = function(i) {
            t(i).on("click", e, this.close)
        };
    i.VERSION = "3.2.0", i.prototype.close = function(e) {
        var i = t(this),
            n = i.attr("data-target");
        n || (n = (n = i.attr("href")) && n.replace(/.*(?=#[^\s]*$)/, ""));
        var s = t(n);

        function a() {
            s.detach().trigger("closed.sppb.alert").remove()
        }
        e && e.preventDefault(), s.length || (s = i.hasClass("sppb-alert") ? i : i.parent()), s.trigger(e = t.Event("close.sppb.alert")), e.isDefaultPrevented() || (s.removeClass("in"), t.support.transition && s.hasClass("sppb-fade") ? s.one("bsTransitionEnd", a).emulateTransitionEnd(150) : a())
    };
    var n = t.fn.spbalert;
    t.fn.spbalert = function(e) {
        return this.each((function() {
            var n = t(this),
                s = n.data("sppb.alert");
            s || n.data("sppb.alert", s = new i(this)), "string" == typeof e && s[e].call(n)
        }))
    }, t.fn.spbalert.Constructor = i, t.fn.spbalert.noConflict = function() {
        return t.fn.spbalert = n, this
    }, t(document).on("click.sppb.alert.data-api", e, i.prototype.close)
}(jQuery),
function(t) {
    "use strict";
    var e = function(e, i) {
        this.$element = t(e).on("keydown.sppb.carousel", t.proxy(this.keydown, this)), this.$indicators = this.$element.find(".sppb-carousel-indicators"), this.options = i, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter.sppb.carousel", t.proxy(this.pause, this)).on("mouseleave.sppb.carousel", t.proxy(this.cycle, this))
    };

    function i(i) {
        return this.each((function() {
            var n = t(this),
                s = n.data("sppb.carousel"),
                a = t.extend({}, e.DEFAULTS, n.data(), "object" == typeof i && i),
                o = "string" == typeof i ? i : a.slide;
            s || n.data("sppb.carousel", s = new e(this, a)), "number" == typeof i ? s.to(i) : o ? s[o]() : a.interval && s.pause().cycle()
        }))
    }
    e.VERSION = "3.2.0", e.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0
    }, e.prototype.keydown = function(t) {
        switch (t.which) {
            case 37:
                this.prev();
                break;
            case 39:
                this.next();
                break;
            default:
                return
        }
        t.preventDefault()
    }, e.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, e.prototype.getItemIndex = function(t) {
        return this.$items = t.parent().children(".sppb-item"), this.$items.index(t || this.$active)
    }, e.prototype.to = function(e) {
        var i = this,
            n = this.getItemIndex(this.$active = this.$element.find(".sppb-item.active"));
        if (!(e > this.$items.length - 1 || e < 0)) return this.sliding ? this.$element.one("slid.sppb.carousel", (function() {
            i.to(e)
        })) : n == e ? this.pause().cycle() : this.slide(e > n ? "next" : "prev", t(this.$items[e]))
    }, e.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, e.prototype.next = function() {
        if (!this.sliding) return this.slide("next")
    }, e.prototype.prev = function() {
        if (!this.sliding) return this.slide("prev")
    }, e.prototype.slide = function(e, i) {
        var n = this.$element.find(".sppb-item.active"),
            s = i || n[e](),
            a = this.interval,
            o = "next" == e ? "left" : "right",
            r = "next" == e ? "first" : "last",
            l = this;
        if (!s.length) {
            if (!this.options.wrap) return;
            s = this.$element.find(".sppb-item")[r]()
        }
        if (s.hasClass("active")) return this.sliding = !1;
        var p = s[0],
            d = t.Event("slide.sppb.carousel", {
                relatedTarget: p,
                direction: o
            });
        if (this.$element.trigger(d), !d.isDefaultPrevented()) {
            if (this.sliding = !0, a && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var h = t(this.$indicators.children()[this.getItemIndex(s)]);
                h && h.addClass("active")
            }
            var c = t.Event("slid.sppb.carousel", {
                relatedTarget: p,
                direction: o
            });
            return t.support.transition && this.$element.hasClass("sppb-slide") ? (s.addClass(e), s[0].offsetWidth, n.addClass(o), s.addClass(o), n.one("bsTransitionEnd", (function() {
                s.removeClass([e, o].join(" ")).addClass("active"), n.removeClass(["active", o].join(" ")), l.sliding = !1, setTimeout((function() {
                    l.$element.trigger(c)
                }), 0)
            })).emulateTransitionEnd(1e3 * n.css("transition-duration").slice(0, -1))) : (n.removeClass("active"), s.addClass("active"), this.sliding = !1, this.$element.trigger(c)), a && this.cycle(), this
        }
    };
    var n = t.fn.sppbcarousel;
    t.fn.sppbcarousel = i, t.fn.sppbcarousel.Constructor = e, t.fn.sppbcarousel.noConflict = function() {
        return t.fn.sppbcarousel = n, this
    }, t(document).ready((function() {
        t(".sppb-carousel").each((function(e) {
            var i = t(this).find(".sppb-item"),
                n = "sppb-carousel" + (e + 1),
                s = "";
            t(this).attr("id", n);
            for (var a = 0; a < i.length; a++) s += 0 == a ? '<li data-sppb-target="#' + n + '" class="active" data-sppb-slide-to="0"></li>' : '\n<li data-sppb-target="#' + n + '" data-sppb-slide-to="' + a + '"></li>';
            t(this).find(">.sppb-carousel-indicators").html(s), t(this).find(".sppb-carousel-control").attr("href", "#" + n), t(this).find(".sppb-item").first().addClass("active")
        }))
    })), t(document).on("click.sppb.carousel.data-api", "[data-slide], [data-sppb-slide-to]", (function(e) {
        var n, s = t(this),
            a = t(s.attr("data-sppb-target") || (n = s.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""));
        if (a.hasClass("sppb-carousel")) {
            var o = t.extend({}, a.data(), s.data()),
                r = s.attr("data-sppb-slide-to");
            r && (o.interval = !1), i.call(a, o), r && a.data("sppb.carousel").to(r), e.preventDefault()
        }
    })), t(document).ready((function() {
        if (t('[data-sppb-ride="sppb-carousel"]').each((function() {
                var e = t(this);
                i.call(e, e.data())
            })), t(window).width() < 767) {
            var e = t(".sppb-carousel-pro-inner-content").outerHeight(!0) + 50;
            t(".sppb-carousel-pro .sppb-item > img").css({
                height: e
            })
        }
    }))
}(jQuery),
function(t) {
    "use strict";
    t(document).on("click", ".sppb-panel-heading", (function(e) {
        e.preventDefault();
        var i = t(this),
            n = i.closest(".sppb-panel-group").find(">div"),
            s = n.find(".sppb-panel-heading"),
            a = n.find(".sppb-panel-collapse");
        t(this).hasClass("active") ? (t(this).removeClass("active"), i.next().slideUp()) : (s.removeClass("active"), a.slideUp(), setTimeout(() => {
            t(this).addClass("active").next().slideDown((function() {
                i[0].getBoundingClientRect().top < 0 && t("html,body").animate({
                    scrollTop: i.offset().top
                }, 400)
            }))
        }))
    }))
}(jQuery),
function(t) {
    "use strict";
    var e = function(e) {
        this.element = t(e)
    };

    function i(i) {
        return this.each((function() {
            var n = t(this),
                s = n.data("sppb.tab");
            s || n.data("sppb.tab", s = new e(this)), "string" == typeof i && s[i]()
        }))
    }
    e.VERSION = "3.2.0", e.prototype.show = function() {
        var e = this.element,
            i = e.closest("ul:not(.dropdown-menu)"),
            n = e.data("target");
        if (n || (n = (n = e.attr("href")) && n.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var s = i.find(".active:last a")[0],
                a = t.Event("show.sppb.tab", {
                    relatedTarget: s
                });
            if (e.trigger(a), !a.isDefaultPrevented()) {
                var o = t(n);
                this.activate(e.closest("li"), i), this.activate(o, o.parent(), (function() {
                    e.trigger({
                        type: "shown.sppb.tab",
                        relatedTarget: s
                    })
                }))
            }
        }
    }, e.prototype.activate = function(e, i, n) {
        var s = i.find("> .active"),
            a = n && t.support.transition && s.hasClass("sppb-fade");

        function o() {
            s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), e.addClass("active"), a ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("sppb-fade"), e.parent(".dropdown-menu") && e.closest("li.dropdown").addClass("active"), n && n()
        }
        a ? s.one("bsTransitionEnd", o).emulateTransitionEnd(150) : o(), s.removeClass("in")
    };
    var n = t.fn.sppbtab;
    t.fn.sppbtab = i, t.fn.sppbtab.Constructor = e, t.fn.sppbtab.noConflict = function() {
        return t.fn.sppbtab = n, this
    }, t(document).ready((function() {
        t(".sppb-tab").each((function(e) {
            var i = "sppb-tab" + (e + 1),
                n = "sppb-content" + (e + 1);
            t(this).find(">.sppb-nav").children().each((function(e) {
                t(this).find(">a").attr("href", "#" + i + "-" + (e + 1)), t(this).find(">a").attr("id", "#" + n + "-" + (e + 1)), t(this).find(">a").attr("aria-controls", "#" + i + "-" + (e + 1))
            })), t(this).find(">.sppb-tab-content").children().each((function(e) {
                t(this).attr("id", i + "-" + (e + 1)), t(this).attr("aria-labelledby", n + "-" + (e + 1))
            }))
        }))
    })), t(document).on("click.sppb.tab.data-api", '[data-toggle="sppb-tab"], [data-toggle="sppb-pill"]', (function(e) {
        e.preventDefault(), i.call(t(this), "show")
    }))
}(jQuery),
function(t) {
    "use strict";
    var e = function(t, e) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("sppbtooltip", t, e)
    };
    e.VERSION = "3.2.0", e.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="sppb-tooltip" role="tooltip"><div class="sppb-tooltip-arrow"></div><div class="sppb-tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, e.prototype.init = function(e, i, n) {
        this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(n), this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport);
        for (var s = this.options.trigger.split(" "), a = s.length; a--;) {
            var o = s[a];
            if ("click" == o) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != o) {
                var r = "hover" == o ? "mouseenter" : "focusin",
                    l = "hover" == o ? "mouseleave" : "focusout";
                this.$element.on(r + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, e.prototype.getDefaults = function() {
        return e.DEFAULTS
    }, e.prototype.getOptions = function(e) {
        return (e = t.extend({}, this.getDefaults(), this.$element.data(), e)).delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, e.prototype.getDelegateOptions = function() {
        var e = {},
            i = this.getDefaults();
        return this._options && t.each(this._options, (function(t, n) {
            i[t] != n && (e[t] = n)
        })), e
    }, e.prototype.enter = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("sppb." + this.type);
        if (i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("sppb." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "in", !i.options.delay || !i.options.delay.show) return i.show();
        i.timeout = setTimeout((function() {
            "in" == i.hoverState && i.show()
        }), i.options.delay.show)
    }, e.prototype.leave = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("sppb." + this.type);
        if (i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("sppb." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "out", !i.options.delay || !i.options.delay.hide) return i.hide();
        i.timeout = setTimeout((function() {
            "out" == i.hoverState && i.hide()
        }), i.options.delay.hide)
    }, e.prototype.show = function() {
        var e = t.Event("show.sppb." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var i = t.contains(document.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !i) return;
            var n = this,
                s = this.tip(),
                a = this.getUID(this.type);
            this.setContent(), s.attr("id", a), this.$element.attr("aria-describedby", a), this.options.animation && s.addClass("sppb-fade");
            var o = "function" == typeof this.options.placement ? this.options.placement.call(this, s[0], this.$element[0]) : this.options.placement,
                r = /\s?auto?\s?/i,
                l = r.test(o);
            l && (o = o.replace(r, "") || "top"), s.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(o).data("sppb." + this.type, this), this.options.container ? s.appendTo(this.options.container) : s.insertAfter(this.$element);
            var p = this.getPosition(),
                d = s[0].offsetWidth,
                h = s[0].offsetHeight;
            if (l) {
                var c = o,
                    u = this.$element.parent(),
                    f = this.getPosition(u);
                o = "bottom" == o && p.top + p.height + h - f.scroll > f.height ? "top" : "top" == o && p.top - f.scroll - h < 0 ? "bottom" : "right" == o && p.right + d > f.width ? "left" : "left" == o && p.left - d < f.left ? "right" : o, s.removeClass(c).addClass(o)
            }
            var m = this.getCalculatedOffset(o, p, d, h);
            this.applyPlacement(m, o);
            var v = function() {
                n.$element.trigger("shown.sppb." + n.type), n.hoverState = null
            };
            t.support.transition && this.$tip.hasClass("sppb-") ? s.one("bsTransitionEnd", v).emulateTransitionEnd(150) : v()
        }
    }, e.prototype.applyPlacement = function(e, i) {
        var n = this.tip(),
            s = n[0].offsetWidth,
            a = n[0].offsetHeight,
            o = parseInt(n.css("margin-top"), 10),
            r = parseInt(n.css("margin-left"), 10);
        isNaN(o) && (o = 0), isNaN(r) && (r = 0), e.top = e.top + o, e.left = e.left + r, t.offset.setOffset(n[0], t.extend({
            using: function(t) {
                n.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                })
            }
        }, e), 0), n.addClass("in");
        var l = n[0].offsetWidth,
            p = n[0].offsetHeight;
        "top" == i && p != a && (e.top = e.top + a - p);
        var d = this.getViewportAdjustedDelta(i, e, l, p);
        d.left ? e.left += d.left : e.top += d.top;
        var h = d.left ? 2 * d.left - s + l : 2 * d.top - a + p,
            c = d.left ? "left" : "top",
            u = d.left ? "offsetWidth" : "offsetHeight";
        n.offset(e), this.replaceArrow(h, n[0][u], c)
    }, e.prototype.replaceArrow = function(t, e, i) {
        this.arrow().css(i, t ? 50 * (1 - t / e) + "%" : "")
    }, e.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle();
        t.find(".sppb-tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("sppb-fade in top bottom left right")
    }, e.prototype.hide = function() {
        var e = this,
            i = this.tip(),
            n = t.Event("hide.sppb." + this.type);

        function s() {
            "in" != e.hoverState && i.detach(), e.$element.trigger("hidden.sppb." + e.type)
        }
        if (this.$element.removeAttr("aria-describedby"), this.$element.trigger(n), !n.isDefaultPrevented()) return i.removeClass("in"), t.support.transition && this.$tip.hasClass("sppb-fade") ? i.one("bsTransitionEnd", s).emulateTransitionEnd(150) : s(), this.hoverState = null, this
    }, e.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, e.prototype.hasContent = function() {
        return this.getTitle()
    }, e.prototype.getPosition = function(e) {
        var i = (e = e || this.$element)[0],
            n = "BODY" == i.tagName;
        return t.extend({}, "function" == typeof i.getBoundingClientRect ? i.getBoundingClientRect() : null, {
            scroll: n ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop(),
            width: n ? t(window).width() : e.outerWidth(),
            height: n ? t(window).height() : e.outerHeight()
        }, n ? {
            top: 0,
            left: 0
        } : e.offset())
    }, e.prototype.getCalculatedOffset = function(t, e, i, n) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - n,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - n / 2,
            left: e.left - i
        } : {
            top: e.top + e.height / 2 - n / 2,
            left: e.left + e.width
        }
    }, e.prototype.getViewportAdjustedDelta = function(t, e, i, n) {
        var s = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return s;
        var a = this.options.viewport && this.options.viewport.padding || 0,
            o = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var r = e.top - a - o.scroll,
                l = e.top + a - o.scroll + n;
            r < o.top ? s.top = o.top - r : l > o.top + o.height && (s.top = o.top + o.height - l)
        } else {
            var p = e.left - a,
                d = e.left + a + i;
            p < o.left ? s.left = o.left - p : d > o.width && (s.left = o.left + o.width - d)
        }
        return s
    }, e.prototype.getTitle = function() {
        var t = this.$element,
            e = this.options;
        return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
    }, e.prototype.getUID = function(t) {
        do {
            t += ~~(1e6 * Math.random())
        } while (document.getElementById(t));
        return t
    }, e.prototype.tip = function() {
        return this.$tip = this.$tip || t(this.options.template)
    }, e.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".sppb-tooltip-arrow")
    }, e.prototype.validate = function() {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, e.prototype.enable = function() {
        this.enabled = !0
    }, e.prototype.disable = function() {
        this.enabled = !1
    }, e.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, e.prototype.toggle = function(e) {
        var i = this;
        e && ((i = t(e.currentTarget).data("sppb." + this.type)) || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("sppb." + this.type, i))), i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }, e.prototype.destroy = function() {
        clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("sppb." + this.type)
    };
    var i = t.fn.sppbtooltip;
    t.fn.sppbtooltip = function(i) {
        return this.each((function() {
            var n = t(this),
                s = n.data("sppb.tooltip"),
                a = "object" == typeof i && i;
            (s || "destroy" != i) && (s || n.data("sppb.tooltip", s = new e(this, a)), "string" == typeof i && s[i]())
        }))
    }, t.fn.sppbtooltip.Constructor = e, t.fn.sppbtooltip.noConflict = function() {
        return t.fn.sppbtooltip = i, this
    }
}(jQuery),
function(t) {
    "use strict";
    var e = function(t, e) {
        this.init("sppbpopover", t, e)
    };
    if (!t.fn.sppbtooltip) throw new Error("Popover requires tooltip.js");
    e.VERSION = "3.2.0", e.DEFAULTS = t.extend({}, t.fn.sppbtooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="sppb-popover" role="tooltip"><div class="arrow"></div><h3 class="sppb-popover-title"></h3><div class="sppb-popover-content"></div></div>'
    }), (e.prototype = t.extend({}, t.fn.sppbtooltip.Constructor.prototype)).constructor = e, e.prototype.getDefaults = function() {
        return e.DEFAULTS
    }, e.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle(),
            i = this.getContent();
        t.find(".sppb-popover-title")[this.options.html ? "html" : "text"](e), t.find(".sppb-popover-content").empty()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i), t.removeClass("sppb-fade top bottom left right in"), t.find(".sppb-popover-title").html() || t.find(".sppb-popover-title").hide()
    }, e.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, e.prototype.getContent = function() {
        var t = this.$element,
            e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, e.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, e.prototype.tip = function() {
        return this.$tip || (this.$tip = t(this.options.template)), this.$tip
    };
    var i = t.fn.sppbpopover;
    t.fn.sppbpopover = function(i) {
        return this.each((function() {
            var n = t(this),
                s = n.data("sppb.popover"),
                a = "object" == typeof i && i;
            (s || "destroy" != i) && (s || n.data("sppb.popover", s = new e(this, a)), "string" == typeof i && s[i]())
        }))
    }, t.fn.sppbpopover.Constructor = e, t.fn.sppbpopover.noConflict = function() {
        return t.fn.sppbpopover = i, this
    }
}(jQuery),
function(t) {
    "use strict";
    t.fn.emulateTransitionEnd = function(e) {
        var i = !1,
            n = this;
        t(this).one("bsTransitionEnd", (function() {
            i = !0
        }));
        return setTimeout((function() {
            i || t(n).trigger(t.support.transition.end)
        }), e), this
    }, t((function() {
        t.support.transition = function() {
            var t = document.createElement("bootstrap"),
                e = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
            for (var i in e)
                if (void 0 !== t.style[i]) return {
                    end: e[i]
                };
            return !1
        }(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function(e) {
                if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
            }
        })
    }))
}(jQuery);
var carousel = jQuery(".carousel");
carousel && jQuery(window).ready((function() {
        "undefined" != typeof jQuery && "undefined" != typeof MooTools && Element.implement({
            slide: function(t, e) {
                return this
            }
        })
    }))
    /*! WOW - v1.0.1 - 2014-08-15
     * Copyright (c) 2014 Matthieu Aussaguel; Licensed MIT */
    ,
    function() {
        var t, e, i, n = function(t, e) {
                return function() {
                    return t.apply(e, arguments)
                }
            },
            s = [].indexOf || function(t) {
                for (var e = 0, i = this.length; i > e; e++)
                    if (e in this && this[e] === t) return e;
                return -1
            };
        e = function() {
            function t() {}
            return t.prototype.extend = function(t, e) {
                var i, n;
                for (i in e) n = e[i], null == t[i] && (t[i] = n);
                return t
            }, t.prototype.isMobile = function(t) {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)
            }, t
        }(), i = this.WeakMap || this.MozWeakMap || (i = function() {
            function t() {
                this.keys = [], this.values = []
            }
            return t.prototype.get = function(t) {
                var e, i, n, s;
                for (e = i = 0, n = (s = this.keys).length; n > i; e = ++i)
                    if (s[e] === t) return this.values[e]
            }, t.prototype.set = function(t, e) {
                var i, n, s, a;
                for (i = n = 0, s = (a = this.keys).length; s > n; i = ++n)
                    if (a[i] === t) return void(this.values[i] = e);
                return this.keys.push(t), this.values.push(e)
            }, t
        }()), t = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (t = function() {
            function t() {
                console.warn("MutationObserver is not supported by your browser."), console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
            }
            return t.notSupported = !0, t.prototype.observe = function() {}, t
        }()), this.SPPBWOW = function() {
            function a(t) {
                null == t && (t = {}), this.scrollCallback = n(this.scrollCallback, this), this.scrollHandler = n(this.scrollHandler, this), this.start = n(this.start, this), this.scrolled = !0, this.config = this.util().extend(t, this.defaults), this.animationNameCache = new i
            }
            return a.prototype.defaults = {
                boxClass: "sppb-wow",
                animateClass: "sppb-animated",
                offset: 0,
                mobile: !0,
                live: !0
            }, a.prototype.init = function() {
                var t;
                return this.element = window.document.documentElement, "interactive" === (t = document.readyState) || "complete" === t ? this.start() : document.addEventListener("DOMContentLoaded", this.start), this.finished = []
            }, a.prototype.start = function() {
                var e, i, n, s;
                if (this.stopped = !1, this.boxes = function() {
                        var t, i, n, s;
                        for (s = [], t = 0, i = (n = this.element.querySelectorAll("." + this.config.boxClass)).length; i > t; t++) e = n[t], s.push(e);
                        return s
                    }.call(this), this.all = function() {
                        var t, i, n, s;
                        for (s = [], t = 0, i = (n = this.boxes).length; i > t; t++) e = n[t], s.push(e);
                        return s
                    }.call(this), this.boxes.length, this.disabled()) this.resetStyle();
                else {
                    for (i = 0, n = (s = this.boxes).length; n > i; i++) e = s[i], this.applyStyle(e, !0);
                    window.addEventListener("scroll", this.scrollHandler, !1), window.addEventListener("resize", this.scrollHandler, !1), this.interval = setInterval(this.scrollCallback, 50)
                }
                return this.config.live ? new t(function(t) {
                    return function(e) {
                        var i, n, s, a, o;
                        for (o = [], s = 0, a = e.length; a > s; s++) n = e[s], o.push(function() {
                            var t, e, s, a;
                            for (a = [], t = 0, e = (s = n.addedNodes || []).length; e > t; t++) i = s[t], a.push(this.doSync(i));
                            return a
                        }.call(t));
                        return o
                    }
                }(this)).observe(document.body, {
                    childList: !0,
                    subtree: !0
                }) : void 0
            }, a.prototype.stop = function() {
                return this.stopped = !0, window.removeEventListener("scroll", this.scrollHandler, !1), window.removeEventListener("resize", this.scrollHandler, !1), null != this.interval ? clearInterval(this.interval) : void 0
            }, a.prototype.sync = function() {
                return t.notSupported ? this.doSync(this.element) : void 0
            }, a.prototype.doSync = function(t) {
                var e, i, n, a, o;
                if (!this.stopped) {
                    if (null == t && (t = this.element), 1 !== t.nodeType) return;
                    for (o = [], i = 0, n = (a = (t = t.parentNode || t).querySelectorAll("." + this.config.boxClass)).length; n > i; i++) e = a[i], s.call(this.all, e) < 0 ? (this.applyStyle(e, !0), this.boxes.push(e), this.all.push(e), o.push(this.scrolled = !0)) : o.push(void 0);
                    return o
                }
            }, a.prototype.show = function(t) {
                return this.applyStyle(t), t.className = t.className + " " + this.config.animateClass
            }, a.prototype.applyStyle = function(t, e) {
                var i, n, s;
                return n = t.getAttribute("data-sppb-wow-duration"), i = t.getAttribute("data-sppb-wow-delay"), s = t.getAttribute("data-sppb-wow-iteration"), this.animate(function(a) {
                    return function() {
                        return a.customStyle(t, e, n, i, s)
                    }
                }(this))
            }, a.prototype.animate = "requestAnimationFrame" in window ? function(t) {
                return window.requestAnimationFrame(t)
            } : function(t) {
                return t()
            }, a.prototype.resetStyle = function() {
                var t, e, i, n, s;
                for (s = [], e = 0, i = (n = this.boxes).length; i > e; e++) t = n[e], s.push(t.setAttribute("style", "visibility: visible;"));
                return s
            }, a.prototype.customStyle = function(t, e, i, n, s) {
                return e && this.cacheAnimationName(t), t.style.visibility = e ? "hidden" : "visible", i && this.vendorSet(t.style, {
                    animationDuration: i
                }), n && this.vendorSet(t.style, {
                    animationDelay: n
                }), s && this.vendorSet(t.style, {
                    animationIterationCount: s
                }), this.vendorSet(t.style, {
                    animationName: e ? "none" : this.cachedAnimationName(t)
                }), t
            }, a.prototype.vendors = ["moz", "webkit"], a.prototype.vendorSet = function(t, e) {
                var i, n, s, a;
                for (i in a = [], e) n = e[i], t["" + i] = n, a.push(function() {
                    var e, a, o, r;
                    for (r = [], e = 0, a = (o = this.vendors).length; a > e; e++) s = o[e], r.push(t["" + s + i.charAt(0).toUpperCase() + i.substr(1)] = n);
                    return r
                }.call(this));
                return a
            }, a.prototype.vendorCSS = function(t, e) {
                var i, n, s, a, o, r;
                for (i = (n = window.getComputedStyle(t)).getPropertyCSSValue(e), a = 0, o = (r = this.vendors).length; o > a; a++) s = r[a], i = i || n.getPropertyCSSValue("-" + s + "-" + e);
                return i
            }, a.prototype.animationName = function(t) {
                var e;
                try {
                    e = this.vendorCSS(t, "animation-name").cssText
                } catch (i) {
                    e = window.getComputedStyle(t).getPropertyValue("animation-name")
                }
                return "none" === e ? "" : e
            }, a.prototype.cacheAnimationName = function(t) {
                return this.animationNameCache.set(t, this.animationName(t))
            }, a.prototype.cachedAnimationName = function(t) {
                return this.animationNameCache.get(t)
            }, a.prototype.scrollHandler = function() {
                return this.scrolled = !0
            }, a.prototype.scrollCallback = function() {
                var t;
                return !this.scrolled || (this.scrolled = !1, this.boxes = function() {
                    var e, i, n, s;
                    for (s = [], e = 0, i = (n = this.boxes).length; i > e; e++)(t = n[e]) && (this.isVisible(t) ? this.show(t) : s.push(t));
                    return s
                }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
            }, a.prototype.offsetTop = function(t) {
                for (var e; void 0 === t.offsetTop;) t = t.parentNode;
                for (e = t.offsetTop; t = t.offsetParent;) e += t.offsetTop;
                return e
            }, a.prototype.isVisible = function(t) {
                var e, i, n, s, a;
                return i = t.getAttribute("data-sppb-wow-offset") || this.config.offset, s = (a = window.pageYOffset) + Math.min(this.element.clientHeight, innerHeight) - i, e = (n = this.offsetTop(t)) + t.clientHeight, s >= n && e >= a
            }, a.prototype.util = function() {
                return null != this._util ? this._util : this._util = new e
            }, a.prototype.disabled = function() {
                return !this.config.mobile && this.util().isMobile(navigator.userAgent)
            }, a
        }()
    }.call(this), jQuery((function(t) {
        (new SPPBWOW).init()
    })),
    function(t) {
        var e, i, n, s = {},
            a = document,
            o = window,
            r = a.documentElement,
            l = t.expando;

        function p() {
            var n, l, p, d, h = t(),
                c = 0;
            if (t.each(s, (function(t, e) {
                    var i = e.data.selector,
                        n = e.$element;
                    h = h.add(i ? n.find(i) : n)
                })), n = h.length)
                for (e = e || ((d = {
                        height: o.innerHeight,
                        width: o.innerWidth
                    }).height || !(l = a.compatMode) && t.support.boxModel || (d = {
                        height: (p = "CSS1Compat" === l ? r : a.body).clientHeight,
                        width: p.clientWidth
                    }), d), i = i || {
                        top: o.pageYOffset || r.scrollTop || a.body.scrollTop,
                        left: o.pageXOffset || r.scrollLeft || a.body.scrollLeft
                    }; c < n; c++)
                    if (t.contains(r, h[c])) {
                        var u, f, m, v = t(h[c]),
                            g = {
                                height: v.height(),
                                width: v.width()
                            },
                            b = v.offset(),
                            y = v.data("inview");
                        if (!i || !e) return;
                        b.top + g.height > i.top && b.top < i.top + e.height && b.left + g.width > i.left && b.left < i.left + e.width ? (m = (u = i.left > b.left ? "right" : i.left + e.width < b.left + g.width ? "left" : "both") + "-" + (f = i.top > b.top ? "bottom" : i.top + e.height < b.top + g.height ? "top" : "both"), y && y === m || v.data("inview", m).trigger("inview", [!0, u, f])) : y && v.data("inview", !1).trigger("inview", [!1])
                    }
        }
        t.event.special.inview = {
            add: function(e) {
                s[e.guid + "-" + this[l]] = {
                    data: e,
                    $element: t(this)
                }, n || t.isEmptyObject(s) || (n = setInterval(p, 250))
            },
            remove: function(e) {
                try {
                    delete s[e.guid + "-" + this[l]]
                } catch (t) {}
                t.isEmptyObject(s) && (clearInterval(n), n = null)
            }
        }, t(document).bind("scroll resize scrollstop", (function() {
            e = i = null
        })), !r.addEventListener && r.attachEvent && r.attachEvent("onfocusin", (function() {
            i = null
        })), t(document).on("inview", ".sppb-progress", (function(e, i, n, s) {
            var a = t(this).find(".sppb-progress-bar");
            i && (a.css("width", a.data("width")), t(this).unbind("inview"))
        })), t.fn.sppbanimateNumbers = function(e, i, n, s) {
            return this.each((function() {
                var a = t(this),
                    o = parseInt(a.text().replace(/,/g, ""));
                i = void 0 === i || i, t({
                    value: o
                }).animate({
                    value: e
                }, {
                    duration: null == n ? 1e3 : n,
                    easing: null == s ? "swing" : s,
                    step: function() {
                        a.text(Math.floor(this.value)), i && a.text(a.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
                    },
                    complete: function() {
                        parseInt(a.text()) !== e && (a.text(e), i && a.text(a.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")))
                    }
                })
            }))
        }, t(document).on("inview", ".sppb-animated-number", (function(e, i, n, s) {
            var a = t(this);
            i && (a.sppbanimateNumbers(a.data("digit"), !1, a.data("duration")), a.unbind("inview"))
        })), t(document).on("inview", ".sppb-pie-chart", (function(e, i, n, s) {
            var a = t(this);
            if (i) {
                var o = {
                    barColor: a.data("barcolor"),
                    trackColor: a.data("trackcolor"),
                    scaleColor: !1,
                    lineWidth: a.data("width"),
                    size: a.data("size"),
                    onStep: function(t, e, i) {
                        a.find(".sppb-chart-percent > span").text(Math.round(i) + "%")
                    }
                };
                if (a.data("duration")) {
                    var r = a.data("duration");
                    o.animate = {
                        duration: r,
                        enabled: !0
                    }
                }
                a.easyPieChart(o), a.unbind("inview")
            }
        }))
    }(jQuery), jQuery((function(t) {
        function e(e, n) {
            void 0 === n && (n = !1);
            var s = !1;
            return e.find(" input[type=text], input[type=email], input[type=radio], input[type=checkbox], textarea, select").each((function(e, a) {
                if (s) return !1;
                if (n) t(this).on("change keyup", (function() {
                    var e = t(this).val().replace(/\s/g, ""),
                        n = t(this).attr("type"),
                        a = t(this).attr("name");
                    "" === e || 0 === e.length ? (s = !0, t(this).addClass("sppb-has-field-error")) : (s = !1, t(this).removeClass("sppb-has-field-error")), "text" !== n || "captcha_question" === a || "phone" === a || isNaN(e) || s ? (s = !1, t(this).removeClass("sppb-has-field-error")) : (s = !0, t(this).addClass("sppb-has-field-error")), void 0 !== t(this).prop("required") && e.length > 0 && "email" === n && !s && (i(e) ? (t(this).removeClass("sppb-has-field-error"), s = !1) : (t(this).addClass("sppb-has-field-error"), s = !0))
                }));
                else {
                    var o = t(this).val().replace(/\s/g, ""),
                        r = t(this).attr("type"),
                        l = t(this).attr("name");
                    "" !== o && 0 !== o.length || (s = !0, t(this).addClass("sppb-has-field-error")), "text" !== r || isNaN(o) || "captcha_question" === l || "phone" === l || s || (s = !0, t(this).addClass("sppb-has-field-error")), void 0 !== t(this).prop("required") && o.length > 0 && "email" === t(this).attr("type") && !s && (i(o) || (t(this).addClass("sppb-has-field-error"), s = !0))
                }
            })), s
        }

        function i(t) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(t).toLowerCase())
        }

        function n(e) {
            var n = !1;
            if (void 0 !== e.prop("required")) {
                var s = e.parents(".sppb-form-group"),
                    a = e.val().replace(/\s/g, "");
                e.attr("type"), e.attr("name");
                if (void 0 === s || "undefined" === s.find("span.sppb-form-builder-required")) return !1;
                if (0 === a.length && e.prop("required") && (s.find("span.sppb-form-builder-required").show(), n = !0), a.length > 0 && e.prop("required") && (s.find("span.sppb-form-builder-required").hide(), n = !1), "radio" === e.attr("type") && e.prop("required")) {
                    var o = e.attr("name");
                    t('input[name="' + o + '"]').is(":checked") ? (s.find("span.sppb-form-builder-required").hide(), n = !1) : (s.find("span.sppb-form-builder-required").show(), n = !0)
                }
                if ("checkbox" === e.attr("type")) {
                    s.find("input[type=checkbox]").length;
                    var r = !1;
                    s.find("input[type=checkbox]").each((function(e, i) {
                        if (t(this).prop("required")) {
                            var n = t(this).attr("name");
                            t('input[name="' + n + '"]').is(":checked") || (r = !0)
                        }
                        if (r) return !1
                    })), r ? (s.find("span.sppb-form-builder-required").show(), n = !0) : (s.find("span.sppb-form-builder-required").hide(), n = !1)
                }
            }
            return void 0 !== e.prop("required") && a.length > 0 && "email" === e.attr("type") && (i(a) ? (s.find("span.sppb-form-builder-required").hide(), n = !1) : (s.find("span.sppb-form-builder-required").show(), n = !0)), n
        }

        function s(e) {
            var i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                s = !1;
            return e.find(" input[type=text], input[type=email], input[type=radio], input[type=checkbox], textarea, select").each((function(e, a) {
                if (!0 === i) t(this).on("change keyup", (function(e) {
                    if (s = n(t(this))) return !1
                }));
                else if (s = n(t(this))) return !1
            })), s
        }
        e(t(".sppb-ajaxt-contact-form"), !0), t(document).on("submit", ".sppb-ajaxt-contact-form", (function(i) {
            i.preventDefault();
            var n = t(this),
                s = t(this).serializeArray();
            if (e(n)) return n.find(".sppb-form-validation-error").remove(), n.append('<p class="sppb-form-validation-error"> Please re-check required fields! </p>'), !1;
            n.find(".sppb-form-validation-error").remove();
            var a = {
                name: "view_type",
                value: "page"
            };
            if (n.closest(".sp-page-builder").hasClass("mod-sppagebuilder")) {
                a.value = "module";
                var o = {
                    name: "module_id",
                    value: n.closest(".sp-page-builder").data("module_id")
                };
                s.push(o)
            } else n.closest(".sp-page-builder").hasClass("sppb-article-page-wrapper") && (a.value = "article");
            s.push(a);
            var r = {
                option: "com_sppagebuilder",
                task: "ajax",
                addon: "ajax_contact",
                "g-recaptcha-response": n.find("#g-recaptcha-response").val(),
                data: s
            };
            return t.ajax({
                type: "POST",
                data: r,
                beforeSend: function() {
                    n.find(".fa").addClass("fa-spinner fa-spin")
                },
                success: function(e) {
                    var i = t.parseJSON(e);
                    try {
                        var s = t.parseJSON(i.data),
                            a = s.content,
                            o = "json"
                    } catch (t) {
                        a = i.data, o = "strings"
                    }
                    "json" == o ? s.status && (n.trigger("reset"), void 0 === s.gcaptchaType || !s.gcaptchaType.length || "invisible" != s.gcaptchaType && "dynamic" != s.gcaptchaType || ((gcaptchaWidgetId = t("#" + s.gcaptchaId).attr("data-recaptcha-widget-id")) ? (grecaptcha.reset(gcaptchaWidgetId), "invisible" == s.gcaptchaType && grecaptcha.execute(gcaptchaWidgetId)) : (grecaptcha.reset(), "invisible" == s.gcaptchaType && grecaptcha.execute()))) : n.trigger("reset"), n.find(".fa-spin").removeClass("fa-spinner fa-spin"), n.next(".sppb-ajax-contact-status").html(a).fadeIn().delay(4e3).fadeOut(500)
                }
            }), !1
        })), t(".sppb-addon-form-builder-form").length > 0 && (s(t(".sppb-addon-form-builder-form"), !0), t('.sppb-form-builder-range input[type="range"]').on("input change", (function() {
            var e = t(this),
                i = e.attr("min"),
                n = e.attr("max"),
                s = e.val(),
                a = (s - i) / (n - i) * 100,
                o = Math.round(50 * a / 100) - 25;
            e.next(".sppb-form-builder-range-output").css("left", "calc(" + a + "% - " + o + "px)").text(s)
        }))), t(document).on("submit", ".sppb-addon-form-builder-form", (function(e) {
            e.preventDefault();
            var i = t(this),
                n = t(this).serializeArray(),
                a = s(i),
                o = i.data("redirect"),
                r = i.data("redirect-url");
            if (a) return i.next(".sppb-ajax-contact-status").html('<span class="sppb-text-danger">Please check the required field!</span>').fadeIn().delay(4e3).fadeOut(500), !1;
            i.find('input[type="checkbox"]:not(:checked)').each((function(e, i) {
                n.push({
                    name: t(i).attr("name"),
                    value: ""
                })
            }));
            var l = {
                name: "view_type",
                value: "page"
            };
            if (i.closest(".sp-page-builder").hasClass("mod-sppagebuilder")) {
                l.value = "module";
                var p = {
                    name: "module_id",
                    value: i.closest(".sp-page-builder").data("module_id")
                };
                n.push(p)
            } else i.closest(".sp-page-builder").hasClass("sppb-article-page-wrapper") && (l.value = "article");
            n.push(l);
            var d = {
                option: "com_sppagebuilder",
                task: "ajax",
                addon: "form_builder",
                "g-recaptcha-response": i.find("#g-recaptcha-response").val(),
                data: n
            };
            return t.ajax({
                type: "POST",
                data: d,
                beforeSend: function() {
                    i.find(".fa").addClass("fa-spinner fa-spin")
                },
                success: function(e) {
                    var n = t.parseJSON(e);
                    try {
                        var a = t.parseJSON(n.data),
                            l = a.content,
                            p = "json";
                        void 0 !== a.form_validation && s(i)
                    } catch (t) {
                        l = n.data, p = "strings"
                    }
                    "json" == p ? a.status && (i.trigger("reset"), void 0 === a.gcaptchaType || !a.gcaptchaType.length || "invisible" != a.gcaptchaType && "dynamic" != a.gcaptchaType || (a.gcaptchaId ? (gcaptchaWidgetId = t("#" + a.gcaptchaId).attr("data-recaptcha-widget-id")) && (grecaptcha.reset(gcaptchaWidgetId), "invisible" == a.gcaptchaType && grecaptcha.execute(gcaptchaWidgetId)) : (grecaptcha.reset(), "invisible" == a.gcaptchaType && grecaptcha.execute()))) : i.trigger("reset"), i.find(".fa-spin").removeClass("fa-spinner fa-spin"), i.next(".sppb-ajax-contact-status").html(l).fadeIn().delay(4e3).fadeOut(500), "yes" === o && setTimeout((function() {
                        window.location.href = r
                    }), 2500)
                }
            }), !1
        }))
    })), jQuery((function(t) {
        t(document).on("submit", ".sppb-optin-form", (function(e) {
            e.preventDefault();
            var i = t(this),
                n = t(this).serializeArray(),
                s = {
                    name: "view_type",
                    value: "page"
                };
            if (i.closest(".sp-page-builder").hasClass("mod-sppagebuilder")) {
                s.value = "module";
                var a = {
                    name: "module_id",
                    value: i.closest(".sp-page-builder").data("module_id")
                };
                n.push(a)
            } else i.closest(".sp-page-builder").hasClass("sppb-article-page-wrapper") && (s.value = "article");
            n.push(s);
            var o = {
                option: "com_sppagebuilder",
                task: "ajax",
                addon: "optin_form",
                "g-recaptcha-response": i.find("#g-recaptcha-response").val(),
                data: n
            };
            return t.ajax({
                type: "POST",
                data: o,
                beforeSend: function() {
                    i.find(".fa").addClass("fa-spinner fa-spin")
                },
                success: function(e) {
                    var n = t.parseJSON(e);
                    if (!n.success) return i.find(".fa-spin").removeClass("fa-spinner fa-spin"), n.message ? i.next(".sppb-optin-form-status").html('<p class="sppb-alert sppb-alert-warning">' + n.message + "</p>").fadeIn().delay(4e3).fadeOut(1e3) : n.messages && i.next(".sppb-optin-form-status").html('<p class="sppb-alert sppb-alert-warning">' + n.messages + "</p>").fadeIn().delay(4e3).fadeOut(1e3), !1;
                    var s = t.parseJSON(n.data),
                        a = "sppb-alert sppb-alert-warning";
                    if (s.status) {
                        a = "sppb-alert sppb-alert-success";
                        i.trigger("reset")
                    }
                    i.find(".fa-spin").removeClass("fa-spinner fa-spin"), i.next(".sppb-optin-form-status").html('<p class="' + a + '">' + s.content + "</p>").fadeIn().delay(4e3).fadeOut(1e3)
                }
            }), !1
        }))
    })), jQuery((function(t) {
        t(document).on("click", ".sppb-magnific-popup", (function(e) {
            e.preventDefault();
            var i = t(this);
            i.magnificPopup({
                type: i.data("popup_type"),
                mainClass: i.data("mainclass")
            }).magnificPopup("open")
        }))
    })), jQuery((function(t) {
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? (t(".sppb-addon-sppb-flibox .sppb-flipbox-panel, .threeD-flipbox .threeD-content-wrap").on("mouseover", (function(e) {
            t(this).toggleClass("flip")
        })), t(document).on("mouseenter", ".sppb-addon-sppb-flibox .sppb-flipbox-panel, .threeD-flipbox .threeD-content-wrap", (function(e) {
            t(this).addClass("flip")
        })), t(document).on("mouseleave", ".sppb-addon-sppb-flibox .sppb-flipbox-panel, .threeD-flipbox .threeD-content-wrap", (function(e) {
            t(this).removeClass("flip")
        }))) : (t(document).on("click", ".sppb-addon-sppb-flibox.flipon-click .sppb-flipbox-panel, .threeD-flipbox.flipon-click .threeD-content-wrap", (function(e) {
            t(this).toggleClass("flip")
        })), t(document).on("mouseenter", ".sppb-addon-sppb-flibox.flipon-hover .sppb-flipbox-panel, .threeD-flipbox.flipon-hover .threeD-content-wrap", (function() {
            t(this).addClass("flip")
        })), t(document).on("mouseleave", ".sppb-addon-sppb-flibox.flipon-hover .sppb-flipbox-panel, .threeD-flipbox.flipon-hover .threeD-content-wrap", (function() {
            t(this).removeClass("flip")
        })))
    })), jQuery((function(t) {
        new MutationObserver((function(e) {
            e.forEach((function(e) {
                var i = e.addedNodes;
                null !== i && t(i).each((function() {
                    t(this).find(".sppb-addon-countdown .sppb-countdown-timer").each((function() {
                        var e = t(this),
                            i = e.data("date") + " " + e.data("time");
                        e.countdown(i, (function(i) {
                            t(this).html(i.strftime('<div class="sppb-countdown-days sppb-col-xs-6 sppb-col-sm-3 sppb-text-center"><span class="sppb-countdown-number">%-D</span><span class="sppb-countdown-text">%!D: ' + Joomla.JText._("COM_SPPAGEBUILDER_DAY") + "," + Joomla.JText._("COM_SPPAGEBUILDER_DAYS") + ';</span></div><div class="sppb-countdown-hours sppb-col-xs-6 sppb-col-sm-3 sppb-text-center"><span class="sppb-countdown-number">%H</span><span class="sppb-countdown-text">%!H: ' + Joomla.JText._("COM_SPPAGEBUILDER_HOUR") + "," + Joomla.JText._("COM_SPPAGEBUILDER_HOURS") + ';</span></div><div class="sppb-countdown-minutes sppb-col-xs-6 sppb-col-sm-3 sppb-text-center"><span class="sppb-countdown-number">%M</span><span class="sppb-countdown-text">%!M:' + Joomla.JText._("COM_SPPAGEBUILDER_MINUTE") + "," + Joomla.JText._("COM_SPPAGEBUILDER_MINUTES") + ';</span></div><div class="sppb-countdown-seconds sppb-col-xs-6 sppb-col-sm-3 sppb-text-center"><span class="sppb-countdown-number">%S</span><span class="sppb-countdown-text">%!S:' + Joomla.JText._("COM_SPPAGEBUILDER_SECOND") + "," + Joomla.JText._("COM_SPPAGEBUILDER_SECONDS") + ";</span></div>")).on("finish.countdown", (function() {
                                t(this).html('<div class="sppb-countdown-finishedtext-wrap sppb-col-xs-12 sppb-col-sm-12 sppb-text-center"><h3 class="sppb-countdown-finishedtext">' + e.data("finish-text") + "</h3></div>")
                            }))
                        }))
                    }))
                }))
            }))
        })).observe(document.body, {
            childList: !0,
            subtree: !0
        })
    })),
    function(t) {
        var e = function(t) {
            this.$heading = t.heading, this.type = void 0 === t.type ? "word" : t.type, this.animationDelay = 2500, this.barAnimationDelay = 3800, this.barWaiting = this.barAnimationDelay - 3e3, this.lettersDelay = 50, this.typeLettersDelay = 150, this.selectionDuration = 500, this.typeAnimationDelay = this.selectionDuration + 800, this.revealDuration = 600, this.revealAnimationDelay = 1500, this.interval = 0, this.init()
        };
        e.prototype.init = function() {
            var t = this.$heading.parent().find(".letters");
            this.singleLetters(t.find(".animated-text")), this.animateHeadline(this.$heading)
        }, e.prototype.singleLetters = function(e) {
            e.each((function() {
                var e = t(this),
                    n = e.text().split(""),
                    s = e.hasClass("is-visible");
                for (i in n) e.parents(".animation-wave").length > 0 && (n[i] = "<em>" + n[i] + "</em>"), n[i] = s ? '<i class="in">' + n[i] + "</i>" : "<i>" + n[i] + "</i>";
                var a = n.join("");
                e.html(a).css("opacity", 1)
            }))
        }, e.prototype.animateHeadline = function(e) {
            var i = this.animationDelay,
                n = this;
            e.each((function() {
                var e = t(this);
                if (e.hasClass("loading-bar")) i = n.barAnimationDelay, setTimeout((function() {
                    e.find(".animated-text-words-wrapper").addClass("is-loading")
                }), n.barWaiting);
                else if (e.hasClass("text-clip")) {
                    var s = e.find(".animated-text-words-wrapper"),
                        a = s.width() + 10;
                    s.css("width", a)
                } else if (!e.hasClass("type")) {
                    var o = e.find(".animated-text-words-wrapper .animated-text.is-visible");
                    n.setParentClassWidth(o, delay = !1)
                }
                setTimeout((function() {
                    n.hideWord(e.find("span.is-visible").eq(0))
                }), i)
            }))
        }, e.prototype.hideWord = function(t) {
            var e = this.takeNext(t),
                i = this;
            if (t.parents(".animated-heading-text").hasClass("type")) {
                var n = t.parent(".animated-text-words-wrapper");
                n.addClass("selected").removeClass("waiting"), setTimeout((function() {
                    n.removeClass("selected"), t.removeClass("is-visible").addClass("is-hidden").children("i").removeClass("in").addClass("out")
                }), i.selectionDuration), setTimeout((function() {
                    i.showWord(e, i.typeLettersDelay)
                }), i.typeAnimationDelay)
            } else if (t.parents(".animated-heading-text").hasClass("letters")) {
                var s = t.children("i").length >= e.children("i").length;
                i.hideLetter(t.find("i").eq(0), t, s, i.lettersDelay), i.showLetter(e.find("i").eq(0), e, s, i.lettersDelay), i.setParentClassWidth(e)
            } else t.parents(".animated-heading-text").hasClass("text-clip") ? t.parents(".animated-text-words-wrapper").animate({
                width: "2px"
            }, i.revealDuration, (function() {
                i.switchWord(t, e), i.showWord(e)
            })) : t.parents(".animated-heading-text").hasClass("loading-bar") ? (t.parents(".animated-text-words-wrapper").removeClass("is-loading"), this.switchWord(t, e), setTimeout((function() {
                i.hideWord(e)
            }), i.barAnimationDelay), setTimeout((function() {
                t.parents(".animated-text-words-wrapper").addClass("is-loading")
            }), i.barWaiting), this.setParentClassWidth(e)) : (this.switchWord(t, e), setTimeout((function() {
                i.hideWord(e)
            }), i.animationDelay), this.setParentClassWidth(e))
        }, e.prototype.showWord = function(t, e) {
            var i = this;
            t.parents(".animated-heading-text").hasClass("type") ? (i.showLetter(t.find("i").eq(0), t, !1, e), t.addClass("is-visible").removeClass("is-hidden")) : t.parents(".animated-heading-text").hasClass("text-clip") && t.parents(".animated-text-words-wrapper").animate({
                width: t.width() + 10
            }, i.revealDuration, (function() {
                setTimeout((function() {
                    i.hideWord(t)
                }), i.revealAnimationDelay)
            }))
        }, e.prototype.hideLetter = function(e, i, n, s) {
            e.removeClass("in").addClass("out");
            var a = this;
            if (e.is(":last-child") ? n && setTimeout((function() {
                    a.hideWord(a.takeNext(i))
                }), a.animationDelay) : setTimeout((function() {
                    a.hideLetter(e.next(), i, n, s)
                }), s), e.is(":last-child") && t("html").hasClass("no-csstransitions")) {
                var o = a.takeNext(i);
                a.switchWord(i, o)
            }
        }, e.prototype.showLetter = function(t, e, i, n) {
            t.addClass("in").removeClass("out");
            var s = this;
            t.is(":last-child") ? (e.parents(".animated-heading-text").hasClass("type") && setTimeout((function() {
                e.parents(".animated-text-words-wrapper").addClass("waiting")
            }), 200), i || setTimeout((function() {
                s.hideWord(e)
            }), s.animationDelay)) : setTimeout((function() {
                s.showLetter(t.next(), e, i, n)
            }), n)
        }, e.prototype.takeNext = function(t) {
            return t.is(":last-child") ? t.parent().children().eq(0) : t.next()
        }, e.prototype.takePrev = function(t) {
            return t.is(":first-child") ? t.parent().children().last() : t.prev()
        }, e.prototype.switchWord = function(t, e) {
            t.removeClass("is-visible").addClass("is-hidden"), e.removeClass("is-hidden").addClass("is-visible")
        }, e.prototype.setParentClassWidth = function(t) {
            var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                i = t.parents(".animated-text-words-wrapper"),
                n = t.width(),
                s = e ? this.revealDuration / 2 : 0;
            this.interval > 0 && (clearInterval(this.interval), this.interval = 0);
            var a = this;
            setTimeout((function() {
                i.css({
                    "transition-function": "ease",
                    transitionDuration: a.revealDuration + "ms",
                    transitionProperty: "width",
                    width: n + "px"
                })
            }), s)
        }, t(document).ready((function() {
            new e({
                heading: t(".animated-heading-text")
            });
            new MutationObserver((function(i) {
                i.forEach((function(i) {
                    var n = i.addedNodes;
                    null !== n && t(n).each((function() {
                        t(this).find(".animated-heading-text").each((function() {
                            new e({
                                heading: t(this)
                            })
                        }))
                    }))
                }))
            })).observe(document.body, {
                childList: !0,
                subtree: !0
            })
        }))
    }(jQuery),
    function(t) {
        function e() {
            if ("undefined" == typeof stickyParent && (stickyParent = t('[data-sticky-it="true"]').parents(".sppb-section ")), "undefined" != typeof stickyParent && 0 != stickyParent.length) {
                var e = stickyParent.offset();
                stickyParentWrap = stickyParent.parents(".sppb-sticky-wrap"), stickyParentWrap.hasClass("sppb-sticky-wrap") && (e = stickyParentWrap.offset()), window.scrollY >= e.top && !stickyParent.hasClass("sppb-sticky-it") ? (stickyParent.wrap('<div class="sppb-sticky-wrap" style="height:' + stickyParent.outerHeight() + 'px;"></div>'), stickyParent.addClass("sppb-sticky-it")) : window.scrollY < e.top && stickyParent.hasClass("sppb-sticky-it") && (stickyParent.removeClass("sppb-sticky-it"), stickyParent.unwrap())
            }
        }
        window.sppbVideoBackgroundResize = function(t) {
            t.find(".sppb-youtube-video-bg").removeClass("hidden");
            var e = t.innerWidth(),
                i = t.innerHeight();
            iframeW = e, iframeH = e * (9 / 16), marginTop = -Math.round((iframeH - i) / 2), marginLeft = -Math.round((iframeW - e) / 2), e / i < 16 / 9 && (iframeW = i * (16 / 9), iframeH = i, marginLeft = -Math.round((iframeW - e) / 2), marginTop = -Math.round((iframeH - i) / 2)), t.find(".sppb-youtube-video-bg iframe").css({
                maxWidth: "1000%",
                marginLeft: marginLeft,
                marginTop: marginTop,
                width: iframeW,
                height: iframeH
            })
        }, t(window).on("load resize", (function() {
            t(".sppb-row-have-ext-bg").each((function() {
                sppbVideoBackgroundResize(t(this))
            }))
        })), t(document).ready((function() {
            void 0 !== jQuery.fn.parallax && t('[data-sppb-parallax="on"]').each((function() {
                t(this).parallax()
            }));
            var e = document.getElementsByClassName("section-bg-video");
            if (e.volume = 0, t(window).width() < 767) {
                for (var i = 0; i < e.length; i++);
                t(document).on("touchend touchcancel", (function() {
                    ! function() {
                        for (var t = 0; t < e.length; t++) e[t].paused && e[t].play()
                    }()
                }))
            }
            var n = t(".sppb-positioned-addon");
            n.length > 0 && n.each((function() {
                var e = t("#section-id-" + t(this).data("rowid")),
                    i = t(this).data("zindex"),
                    n = t("#column-wrap-id-" + t(this).data("colid")).find(".sppb-column"),
                    s = t(this).data("col-zindex");
                e.css({
                    zIndex: i
                }), n.css({
                    zIndex: s
                })
            }))
        })), t(document).on("click", '[data-scroll-to="true"], .sppb-menu-scroll', (function(e) {
            e.preventDefault();
            var i = t(this).attr("href"),
                n = t(this).parents(".sppb-link-list-wrap"),
                s = t(this).parents(".sppb-link-list-wrap").data("offset");
            (s = void 0 === s || "" === s ? 0 : parseInt(s)) < 0 ? s = Math.abs(s) : s *= -1, n.find(".sppb-active").removeClass("sppb-active"), t(this).parent().addClass("sppb-active"), t("html, body").animate({
                scrollTop: t(i).offset().top + s
            }, 600)
        })), t(document).on("load", e), t(window).on("scroll resize", e), t(document).on("click", ".sppb-responsive-bars", (function() {
            t(this).toggleClass("open"), t(this).next().toggleClass("open")
        })), jQuery(window).on("load", (function() {
            "use strict";
            new MutationObserver((function(t) {
                t.forEach((function(t) {
                    var e = t.addedNodes;
                    null !== e && jQuery(e).each((function() {
                        jQuery(this).find(".sppb-article-scroller-wrap").each((function() {
                            var t = jQuery(this).data("articles"),
                                e = jQuery(this).data("move"),
                                i = jQuery(this).data("speed");
                            jQuery(".sppb-article-scroller-wrap").bxSlider({
                                minSlides: t,
                                mode: "vertical",
                                speed: i,
                                pager: !1,
                                controls: !1,
                                auto: !0,
                                moveSlides: e,
                                adaptiveHeight: !0,
                                touchEnabled: !1
                            })
                        }))
                    }))
                }))
            })).observe(document.body, {
                childList: !0,
                subtree: !0
            });
            new MutationObserver((function(t) {
                t.forEach((function(t) {
                    var e = t.addedNodes;
                    null !== e && jQuery(e).each((function() {
                        jQuery(this).find(".sppb-articles-carousel-wrap").each((function() {
                            var t = jQuery(this).data("articles"),
                                e = jQuery(this).data("speed"),
                                i = jQuery(this).data("autoplay"),
                                n = jQuery(this).data("drag"),
                                s = jQuery(this).data("arrow");
                            jQuery((function() {
                                jQuery(".sppb-articles-carousel-wrap").bxSlider({
                                    mode: "horizontal",
                                    slideSelector: "div.sppb-articles-carousel-column",
                                    minSlides: t,
                                    maxSlides: t,
                                    moveSlides: t,
                                    slideWidth: 1140,
                                    pager: !0,
                                    controls: s,
                                    nextText: "<i class='fa fa-angle-right' aria-hidden='true'></i>",
                                    prevText: "<i class='fa fa-angle-left' aria-hidden='true'></i>",
                                    speed: e,
                                    auto: i,
                                    autoHover: !0,
                                    touchEnabled: n,
                                    autoStart: !0
                                })
                            }))
                        }))
                    }))
                }))
            })).observe(document.body, {
                childList: !0,
                subtree: !0
            });
            new MutationObserver((function(t) {
                t.forEach((function(t) {
                    var e = t.addedNodes;
                    null !== e && jQuery(e).each((function() {
                        jQuery(this).find(".sppb-addon-articles-ticker").each((function() {
                            var t = jQuery(this).parent("div").attr("id"),
                                e = jQuery(this).data("speed");
                            jQuery("#" + t + " .sppb-articles-ticker-content").bxSlider({
                                minSlides: 1,
                                maxSlides: 1,
                                mode: "vertical",
                                speed: e,
                                pager: !1,
                                controls: !1,
                                auto: !0,
                                adaptiveHeight: !0,
                                autoHover: !0,
                                touchEnabled: !1
                            })
                        }))
                    }))
                }))
            })).observe(document.body, {
                childList: !0,
                subtree: !0
            })
        }))
    }(jQuery),
    /*
     * @license jQuery Basictable | MIT | Jerry Low | https://www.github.com/jerrylow/basictable
     */
    function(t) {
        t.fn.basictable = function(e) {
            var i = function(e, i) {
                    var s = [];
                    if (i.tableWrap && e.wrap('<div class="bt-wrapper"></div>'), i.header) {
                        var a = "";
                        a = e.find("thead tr th").length ? "thead th" : e.find("tbody tr th").length ? "tbody tr th" : e.find("th").length ? "tr:first th" : "tr:first td", t.each(e.find(a), (function() {
                            var e = t(this),
                                i = parseInt(e.attr("colspan"), 10) || 1,
                                n = e.closest("tr").index();
                            s[n] || (s[n] = []);
                            for (var a = 0; a < i; a++) s[n].push(e)
                        }))
                    }
                    t.each(e.find("tbody tr"), (function() {
                        n(t(this), s, i)
                    })), t.each(e.find("tfoot tr"), (function() {
                        n(t(this), s, i)
                    }))
                },
                n = function(e, i, n) {
                    e.children().each((function() {
                        var e = t(this);
                        if ("" !== e.html() && "&nbsp;" !== e.html() || n.showEmptyCells) {
                            for (var s = e.index(), a = "", o = 0; o < i.length; o++) {
                                0 != o && (a += ": ");
                                var r = i[o][s],
                                    l = r.find("div");
                                l.length > 0 ? a += (r = t(l[l.length - 1])).text() : a += r.text()
                            }
                            e.attr("data-th", a.trim()), n.contentWrap && !e.children().hasClass("bt-content") && e.wrapInner('<span class="bt-content" />')
                        } else e.addClass("bt-hide")
                    }))
                },
                s = function(e, i) {
                    i.forceResponsive ? null !== i.breakpoint && t(window).width() <= i.breakpoint || null !== i.containerBreakpoint && e.parent().width() <= i.containerBreakpoint ? a(e, i) : o(e, i) : e.removeClass("bt").outerWidth() > e.parent().width() ? a(e, i) : o(e, i)
                },
                a = function(t, e) {
                    t.addClass("bt"), e.header || t.addClass("bt--no-header"), e.tableWrap && t.parent(".bt-wrapper").addClass("active")
                },
                o = function(t, e) {
                    t.removeClass("bt bt--no-header"), e.tableWrap && t.parent(".bt-wrapper").removeClass("active")
                },
                r = function(e, i) {
                    e.removeClass("bt bt--no-header"), e.find("td").removeAttr("data-th"), i.tableWrap && e.unwrap(), i.contentWrap && function(e) {
                        t.each(e.find("td"), (function() {
                            var e = t(this),
                                i = e.children(".bt-content").html();
                            e.html(i)
                        }))
                    }(e), e.removeData("basictable")
                };
            this.each((function() {
                var n = t(this);
                if (0 === n.length || n.data("basictable")) {
                    if (n.data("basictable")) {
                        var l = n.data("basictable");
                        "destroy" === e ? r(n, l) : "restart" === e ? (r(n, l), n.data("basictable", l), i(n, l), s(n, l)) : "start" === e ? a(n, l) : "stop" === e ? o(n, l) : s(n, l)
                    }
                    return !1
                }
                var p = t.extend({}, t.fn.basictable.defaults, e),
                    d = {
                        breakpoint: p.breakpoint,
                        containerBreakpoint: p.containerBreakpoint,
                        contentWrap: p.contentWrap,
                        forceResponsive: p.forceResponsive,
                        noResize: p.noResize,
                        tableWrap: p.tableWrap,
                        showEmptyCells: p.showEmptyCells,
                        header: p.header
                    };
                null === d.breakpoint && null === d.containerBreakpoint && (d.breakpoint = 568), n.data("basictable", d), i(n, n.data("basictable")), d.noResize || (s(n, n.data("basictable")), t(window).bind("resize.basictable", (function() {
                    ! function(t) {
                        t.data("basictable") && s(t, t.data("basictable"))
                    }(n)
                })))
            }))
        }, t.fn.basictable.defaults = {
            breakpoint: null,
            containerBreakpoint: null,
            contentWrap: !0,
            forceResponsive: !0,
            noResize: !1,
            tableWrap: !1,
            showEmptyCells: !1,
            header: !0
        }, t.fn.addSortWidget = function(e) {
            e = t.extend({}, {
                sort_asc: "sort-asc",
                sort_desc: "sort-desc",
                no_sort: "no-sort"
            }, e);
            var i = t(this),
                n = !0;
            return t("th", i).each((function(s) {
                t("<div>").addClass("sppb-table-addon-sortable").attr("data-content", e.no_sort).on("click", (function() {
                    t(".sppb-table-addon-sortable", i).attr("data-content", e.no_sort), t(this).attr("data-content", n ? e.sort_desc : e.sort_asc), n = !n;
                    var a = t("tr", i).not(":has(th)").get();
                    a.sort((function(e, i) {
                        var a = t("td:eq(" + s + ")", e).text(),
                            o = t("td:eq(" + s + ")", i).text();
                        return isNaN(a) || isNaN(o) ? n ? a.localeCompare(o) : o.localeCompare(a) : n ? a - o : o - a
                    }));
                    for (var o = i.has("tbody") ? "tbody" : "", r = 0; r < a.length; r++) t(o, i).append(a[r])
                })).appendTo(this)
            })), i
        }, t.fn.pageMe = function(e) {
            var i = t.extend({
                    perPage: 10,
                    showPrevNext: !1,
                    nextText: "Next",
                    prevText: "Prev",
                    hidePageNumbers: !1
                }, e),
                n = this.find("tbody"),
                s = i.perPage,
                a = this.hasClass("sppb-no-table-header"),
                o = n.children(),
                r = t(".pager");
            void 0 !== i.childSelector && (o = n.find(i.childSelector)), void 0 !== i.pagerSelector && this.next().length && (r = this.next().find(i.pagerSelector));
            var l = o.length,
                p = Math.ceil(l / s);
            this.next().length && this.next().find(".sppb-table-total-reg").html("Total Entries: " + l), r.data("curr", 0), i.showPrevNext && t('<li class="sppb-page-item"><a href="#" class="sppb-table-prev-link sppb-page-link" title="' + i.prevText + '"><i aria-hidden="true" class="fa fa-angle-left"></i></a></li>').appendTo(r);
            for (var d = 0; p > d && 0 == i.hidePageNumbers;) t('<li class="sppb-page-item"><a href="#" class="sppb-table-paginate-link sppb-page-link">' + (d + 1) + "</a></li>").appendTo(r), d++;

            function h(t) {
                var e = t * s,
                    i = e + s;
                o.css("display", "none").slice(e, i).show(), t >= 1 ? r.find(".sppb-table-prev-link").show() : r.find(".sppb-table-prev-link").hide(), t < p - 1 ? r.find(".sppb-table-next-link").show() : r.find(".sppb-table-next-link").hide(), r.data("curr", t), r.children().removeClass("active"), r.children().eq(t + 1).addClass("active")
            }
            i.showPrevNext && t('<li class="sppb-page-item"><a href="#" class="sppb-table-next-link sppb-page-link"  title="' + i.nextText + '"><i aria-hidden="true" class="fa fa-angle-right"></i></a></li>').appendTo(r), r.find(".sppb-table-prev-link").hide(), p <= 1 && r.find(".sppb-table-next-link").hide(), r.children().eq(1).addClass("active"), o.hide(), o.slice(0, s).show(), r.find("li .sppb-table-paginate-link").click((function() {
                return h(t(this).html().valueOf() - 1), a && n.find("tr:first-child").show(), !1
            })), r.find("li .sppb-table-prev-link").click((function() {
                return h(parseInt(r.data("curr")) - 1), a && n.find("tr:first-child").show(), a && n.find("tr:first-child").show(), !1
            })), r.find("li .sppb-table-next-link").click((function() {
                return goToPage = parseInt(r.data("curr")) + 1, h(goToPage), a && n.find("tr:first-child").show(), a && n.find("tr:first-child").show(), !1
            }))
        }, t(document).ready((function() {
            t(".sppb-addon-table-main").length > 0 && t(".sppb-addon-table-main").each((function(e) {
                var i = t(this).data("responsive"),
                    n = !i;
                t(this).basictable({
                    showEmptyCells: !1,
                    forceResponsive: i,
                    noResize: n
                });
                var s = t(this).data("searchable"),
                    a = t(this).data("sortable"),
                    o = t(this).data("search-limit");
                null !== o && void 0 !== typeof o && (o = (o = String(o)).split(",").map((function(t) {
                    return t - 1
                })).join(""));
                var r = this,
                    l = t(r).parent().find(".sppb-pagination"),
                    p = t(this).data("pagination-item"),
                    d = t(r).hasClass("sppb-no-table-header");
                if (s) {
                    var h = t(this).parent().find("input");
                    t(h).keyup((function() {
                        ! function(t, e, i) {
                            if (void 0 === i && (i = "0"), 0 != e.length && /^[0-9]*$/.test(i))
                                for (var n = 0; n < e.length; n++) {
                                    for (var s = "false", a = 0; a < i.length; a++)
                                        if (e.eq(n).children().length > i[a] && -1 != e.eq(n).children().eq(i[a]).text().toLowerCase().indexOf(t)) {
                                            s = "success";
                                            break
                                        }
                                    "success" == s ? e.eq(n).addClass("sppb-table-addon-item-search").show() : e.eq(n).removeClass("sppb-table-addon-item-search").hide()
                                }
                        }(t(h).val().toLowerCase(), t(r).find("tbody tr"), o), d && t(r).find("tr:first-child").show(), l.length > 0 && (l.html(""), setTimeout((function() {
                            t(r).pageMe({
                                pagerSelector: ".sppb-pagination",
                                prevText: "Prev",
                                nextText: "Next",
                                childSelector: ".sppb-table-addon-item-search",
                                showPrevNext: !0,
                                hidePageNumbers: !1,
                                perPage: p
                            })
                        })))
                    }))
                }
                a && t(r).addSortWidget(), l.length > 0 && t(this).pageMe({
                    pagerSelector: ".sppb-pagination",
                    prevText: "Prev",
                    nextText: "Next",
                    showPrevNext: !0,
                    hidePageNumbers: !1,
                    perPage: p
                })
            }));
            new MutationObserver((function(e) {
                e.forEach((function(e) {
                    var i = e.addedNodes;
                    null !== i && jQuery(i).each((function() {
                        jQuery(this).find(".sppb-addon-table-main").each((function() {
                            var e = t(this).data("responsive"),
                                i = !e;
                            t(this).basictable({
                                showEmptyCells: !1,
                                forceResponsive: e,
                                noResize: i
                            });
                            t(this).data("sortable") && t(this).addSortWidget();
                            var n = t(this).parent().find(".sppb-pagination"),
                                s = t(this).data("pagination-item");
                            n.length > 0 && t(this).pageMe({
                                pagerSelector: ".sppb-pagination",
                                prevText: "Prev",
                                nextText: "Next",
                                showPrevNext: !0,
                                hidePageNumbers: !1,
                                perPage: s
                            })
                        }))
                    }))
                }))
            })).observe(document.body, {
                childList: !0,
                subtree: !0
            })
        }))
    }(jQuery), window.addEventListener("DOMContentLoaded", (function() {
        var t = document.querySelectorAll(".sppb-element-lazy");

        function e(t) {
            for (var e in t.children) {
                "string" == typeof(e = t.children[e]).tagName && "SOURCE" === e.tagName && (e.src = e.dataset.large)
            }
            t.load()
        }

        function i(t, i) {
            t.forEach((function(t) {
                var n = t.target,
                    s = n.querySelector(".section-bg-video"),
                    a = document.querySelector(".sppb-youtube-iframe");
                t.intersectionRatio && ("IMG" !== n.tagName && "IFRAME" !== n.tagName || (n.src = n.dataset.large), n.classList.contains("sppb-element-lazy") && n.classList.add("sppb-element-loaded"), "VIDEO" === n.tagName && e(n), null !== s && e(s), a && (a.src = a.dataset.src), i.unobserve(n))
            }))
        }
        if (t.length > 0) {
            ! function() {
                if ("IntersectionObserver" in window) {
                    var e = new IntersectionObserver(i, {
                        root: null,
                        rootMargin: "0px",
                        threshold: .1
                    });
                    t.forEach((function(t) {
                        e.observe(t)
                    }))
                } else t.forEach((function(t) {
                    t.src = t.dataset.src, t.classList.contains("sppb-element-lazy") && t.classList.add("sppb-element-loaded")
                }))
            }()
        }
    }));
var _createClass = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
    }
    return function(e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e
    }
}();

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}! function(t) {
    "use strict";

    function e(t) {
        this.actions = t, this.actionProperty = ["move", "rotate", "scale", "skew", "opacity", "blur"], this.actionSortList = {}
    }
    e.prototype.bindCustomAnimation = function() {
        var t = this;
        this.actionProperty.map((function(e) {
            t.actionSortList[e] = t.actions.filter((function(t) {
                return t.name === e
            }))
        }))
    }, e.prototype.getCustomAnimationActionByName = function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        if (null === e) return void 0 !== this.actionSortList[t] ? this.actionSortList[t] : [];
        var i = {
                from: null,
                to: null
            },
            n = void 0 !== this.actionSortList[t] ? this.actionSortList[t] : [];
        if (0 === n.length) return i;
        var s = !1;
        return n.map((function(t, a) {
            e < parseInt(t.keyframe) && null === i.to && (void 0 !== i.fixed && delete i.fixed, t.toKF = 0, i.to = t, void 0 !== n[a - 1] && (n[a - 1].scroll = 0, i.from = n[a - 1]), s = !0), a === n.length - 1 && !1 === s && (i.fixed = !0, i.to = t, void 0 !== n[a - 1] && (n[a - 1].scroll = 0, i.from = n[a - 1]))
        })), i
    }, e.prototype.getTAxis = function(t, e, i, n) {
        var s = n.toKF,
            a = n.fromKF;
        return t - (t - e) / s * (0 === a ? i : i - a)
    }, e.prototype.getMoveTransform = function(t, e, i) {
        var n = e.to.keyframe,
            s = e.from.keyframe,
            a = {
                toKF: isNaN(n) ? 100 : Math.abs(s - n),
                fromKF: s,
                totalKF: n
            },
            o = e.from.x,
            r = e.to.x,
            l = e.from.y,
            p = e.to.y,
            d = e.from.z,
            h = e.to.z;
        return e.goal.x = this.getTAxis(o, r, i, a), e.goal.y = this.getTAxis(l, p, i, a), e.goal.z = this.getTAxis(d, h, i, a), e
    }, e.prototype.getSkew = function(t, e, i) {
        var n = e.to.keyframe,
            s = e.from.keyframe,
            a = {
                toKF: isNaN(n) ? 100 : Math.abs(s - n),
                fromKF: s,
                totalKF: n
            },
            o = e.from.x,
            r = e.to.x,
            l = e.from.y,
            p = e.to.y;
        return e.goal.x = this.getTAxis(o, r, i, a), e.goal.y = this.getTAxis(l, p, i, a), e
    }, e.prototype.getOpacity = function(t, e, i) {
        var n = e.to.keyframe,
            s = e.from.keyframe,
            a = {
                toKF: isNaN(n) ? 100 : Math.abs(s - n),
                fromKF: s,
                totalKF: n
            },
            o = e.from.value,
            r = e.to.value;
        return e.goal.value = this.getTAxis(o, r, i, a), e
    };
    var i = function() {
            function t(e) {
                var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                _classCallCheck(this, t), this.width = null, this.height = null, this.clientWidth = null, this.clientHeight = null, this.left = null, this.top = null, this.gammazero = null, this.betazero = null, this.lastgammazero = null, this.lastbetazero = null, this.transitionTimeout = null, this.updateCall = null, this.event = null, this.updateBind = this.update.bind(this), this.resetBind = this.reset.bind(this), this.element = e, this.settings = this.extendSettings(i), this.reverse = this.settings.reverse ? -1 : 1, this.glare = t.isSettingTrue(this.settings.glare), this.glarePrerender = t.isSettingTrue(this.settings["glare-prerender"]), this.fullPageListening = t.isSettingTrue(this.settings["full-page-listening"]), this.gyroscope = t.isSettingTrue(this.settings.gyroscope), this.gyroscopeSamples = this.settings.gyroscopeSamples, this.elementListener = this.getElementListener(), this.glare && this.prepareGlare(), this.fullPageListening && this.updateClientSize(), this.addEventListeners(), this.updateInitialPosition()
            }
            return _createClass(t, [{
                key: "getElementListener",
                value: function() {
                    return this.element
                }
            }, {
                key: "addEventListeners",
                value: function() {
                    this.onMouseEnterBind = this.onMouseEnter.bind(this), this.onMouseMoveBind = this.onMouseMove.bind(this), this.onMouseLeaveBind = this.onMouseLeave.bind(this), this.onWindowResizeBind = this.onWindowResize.bind(this), this.onDeviceOrientationBind = this.onDeviceOrientation.bind(this), this.elementListener.addEventListener("mouseenter", this.onMouseEnterBind), this.elementListener.addEventListener("mouseleave", this.onMouseLeaveBind), this.elementListener.addEventListener("mousemove", this.onMouseMoveBind), (this.glare || this.fullPageListening) && window.addEventListener("resize", this.onWindowResizeBind), this.gyroscope && window.addEventListener("deviceorientation", this.onDeviceOrientationBind)
                }
            }, {
                key: "removeEventListeners",
                value: function() {
                    this.elementListener.removeEventListener("mouseenter", this.onMouseEnterBind), this.elementListener.removeEventListener("mouseleave", this.onMouseLeaveBind), this.elementListener.removeEventListener("mousemove", this.onMouseMoveBind), this.gyroscope && window.removeEventListener("deviceorientation", this.onDeviceOrientationBind), (this.glare || this.fullPageListening) && window.removeEventListener("resize", this.onWindowResizeBind)
                }
            }, {
                key: "destroy",
                value: function() {
                    clearTimeout(this.transitionTimeout), null !== this.updateCall && cancelAnimationFrame(this.updateCall), this.reset(), this.removeEventListeners(), this.element.vanillaTilt = null, delete this.element.vanillaTilt, this.element = null
                }
            }, {
                key: "onDeviceOrientation",
                value: function(t) {
                    if (null !== t.gamma && null !== t.beta) {
                        this.updateElementPosition(), this.gyroscopeSamples > 0 && (this.lastgammazero = this.gammazero, this.lastbetazero = this.betazero, null === this.gammazero ? (this.gammazero = t.gamma, this.betazero = t.beta) : (this.gammazero = (t.gamma + this.lastgammazero) / 2, this.betazero = (t.beta + this.lastbetazero) / 2), this.gyroscopeSamples -= 1);
                        var e = this.settings.gyroscopeMaxAngleX - this.settings.gyroscopeMinAngleX,
                            i = this.settings.gyroscopeMaxAngleY - this.settings.gyroscopeMinAngleY,
                            n = e / this.width,
                            s = i / this.height,
                            a = (t.gamma - (this.settings.gyroscopeMinAngleX + this.gammazero)) / n,
                            o = (t.beta - (this.settings.gyroscopeMinAngleY + this.betazero)) / s;
                        null !== this.updateCall && cancelAnimationFrame(this.updateCall), this.event = {
                            clientX: a + this.left,
                            clientY: o + this.top
                        }, this.updateCall = requestAnimationFrame(this.updateBind)
                    }
                }
            }, {
                key: "wrapWithParent",
                value: function() {
                    if (null !== this.element.parentElement && "sppb-addon-wrapper" === this.element.parentElement.className && (this.element = this.element.parentElement), "sppb-addon-wrapper" !== this.element.className) {
                        var t = document.createElement("div");
                        t.setAttribute("class", "sppb-addon-wrapper"), this.element.parentNode.insertBefore(t, this.element), t.appendChild(this.element), this.element = t
                    }
                }
            }, {
                key: "unWrapParent",
                value: function() {
                    if ("sppb-addon-wrapper" === this.element.className) {
                        var t = this.element.childNodes;
                        if (t.length > 0) {
                            var e = this.element.parentNode.insertBefore(t[0], this.element);
                            this.element.parentElement.removeChild(this.element), this.element = e
                        }
                    }
                }
            }, {
                key: "onMouseEnter",
                value: function() {
                    this.updateElementPosition(), this.element.style.willChange = "transform", this.setTransition()
                }
            }, {
                key: "onMouseMove",
                value: function(t) {
                    null !== this.updateCall && cancelAnimationFrame(this.updateCall), this.event = t, this.updateCall = requestAnimationFrame(this.updateBind)
                }
            }, {
                key: "onMouseLeave",
                value: function() {
                    this.setTransition(), this.settings.reset && requestAnimationFrame(this.resetBind)
                }
            }, {
                key: "reset",
                value: function() {
                    this.event = {
                        clientX: this.left + this.width / 2,
                        clientY: this.top + this.height / 2
                    }, null !== this.element.parentElement && "sppb-addon-wrapper" === this.element.parentElement.className && (this.element = this.element.parentElement), this.element && "sppb-addon-wrapper" !== this.element.className || (this.element && this.element.style && (this.element.style.transform = "perspective(" + this.settings.perspective + "px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"), this.resetGlare())
                }
            }, {
                key: "resetGlare",
                value: function() {
                    this.glare && (this.glareElement.style.transform = "rotate(180deg) translate(-50%, -50%)", this.glareElement.style.opacity = "0")
                }
            }, {
                key: "updateInitialPosition",
                value: function() {
                    if (0 !== this.settings.startX || 0 !== this.settings.startY) {
                        this.onMouseEnter(), this.fullPageListening ? this.event = {
                            clientX: (this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.clientWidth,
                            clientY: (this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.clientHeight
                        } : this.event = {
                            clientX: this.left + (this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.width,
                            clientY: this.top + (this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.height
                        };
                        var t = this.settings.scale;
                        this.settings.scale = 1, this.update(), this.settings.scale = t, this.resetGlare()
                    }
                }
            }, {
                key: "getValues",
                value: function() {
                    var t = void 0,
                        e = void 0;
                    return this.fullPageListening ? (t = this.event.clientX / this.clientWidth, e = this.event.clientY / this.clientHeight) : (t = (this.event.clientX - this.left) / this.width, e = (this.event.clientY - this.top) / this.height), t = Math.min(Math.max(t, 0), 1), e = Math.min(Math.max(e, 0), 1), {
                        tiltX: (this.reverse * (this.settings.max - t * this.settings.max * 2)).toFixed(2),
                        tiltY: (this.reverse * (e * this.settings.max * 2 - this.settings.max)).toFixed(2),
                        percentageX: 100 * t,
                        percentageY: 100 * e,
                        angle: Math.atan2(this.event.clientX - (this.left + this.width / 2), -(this.event.clientY - (this.top + this.height / 2))) * (180 / Math.PI)
                    }
                }
            }, {
                key: "updateElementPosition",
                value: function() {
                    var t = this.element.getBoundingClientRect();
                    this.width = this.element.offsetWidth, this.height = this.element.offsetHeight, this.left = t.left, this.top = t.top
                }
            }, {
                key: "update",
                value: function() {
                    var t = this.getValues();
                    this.element.style.transform = "perspective(" + this.settings.perspective + "px) rotateX(" + ("x" === this.settings.axis ? 0 : t.tiltY) + "deg) rotateY(" + ("y" === this.settings.axis ? 0 : t.tiltX) + "deg) scale3d(" + this.settings.scale + ", " + this.settings.scale + ", " + this.settings.scale + ")", this.glare && (this.glareElement.style.transform = "rotate(" + t.angle + "deg) translate(-50%, -50%)", this.glareElement.style.opacity = "" + t.percentageY * this.settings["max-glare"] / 100), this.element.dispatchEvent(new CustomEvent("tiltChange", {
                        detail: t
                    })), this.updateCall = null
                }
            }, {
                key: "prepareGlare",
                value: function() {
                    if (!this.glarePrerender) {
                        var t = document.createElement("div");
                        t.classList.add("js-tilt-glare");
                        var e = document.createElement("div");
                        e.classList.add("js-tilt-glare-inner"), t.appendChild(e), this.element.appendChild(t)
                    }
                    this.glareElementWrapper = this.element.querySelector(".js-tilt-glare"), this.glareElement = this.element.querySelector(".js-tilt-glare-inner"), this.glarePrerender || (Object.assign(this.glareElementWrapper.style, {
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        "pointer-events": "none"
                    }), Object.assign(this.glareElement.style, {
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        "pointer-events": "none",
                        "background-image": "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                        width: 2 * this.element.offsetWidth + "px",
                        height: 2 * this.element.offsetWidth + "px",
                        transform: "rotate(180deg) translate(-50%, -50%)",
                        "transform-origin": "0% 0%",
                        opacity: "0"
                    }))
                }
            }, {
                key: "updateGlareSize",
                value: function() {
                    this.glare && Object.assign(this.glareElement.style, {
                        width: "" + 2 * this.element.offsetWidth,
                        height: "" + 2 * this.element.offsetWidth
                    })
                }
            }, {
                key: "updateClientSize",
                value: function() {
                    this.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, this.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
                }
            }, {
                key: "onWindowResize",
                value: function() {
                    this.updateGlareSize(), this.updateClientSize()
                }
            }, {
                key: "setTransition",
                value: function() {
                    var t = this;
                    clearTimeout(this.transitionTimeout), this.element.style.transition = this.settings.speed + "ms " + this.settings.easing, this.glare && (this.glareElement.style.transition = "opacity " + this.settings.speed + "ms " + this.settings.easing), this.transitionTimeout = setTimeout((function() {
                        t.element.style.transition = "", t.glare && (t.glareElement.style.transition = "")
                    }), this.settings.speed)
                }
            }, {
                key: "extendSettings",
                value: function(t) {
                    var e = {
                            reverse: !1,
                            max: 15,
                            startX: 0,
                            startY: 0,
                            perspective: 1e3,
                            easing: "cubic-bezier(.03,.98,.52,.99)",
                            scale: 1,
                            speed: 300,
                            transition: !0,
                            axis: null,
                            glare: !1,
                            "max-glare": 1,
                            "glare-prerender": !1,
                            "full-page-listening": !1,
                            "mouse-event-element": null,
                            reset: !0,
                            gyroscope: !0,
                            gyroscopeMinAngleX: -45,
                            gyroscopeMaxAngleX: 45,
                            gyroscopeMinAngleY: -45,
                            gyroscopeMaxAngleY: 45,
                            gyroscopeSamples: 10
                        },
                        i = {};
                    for (var n in e)
                        if (n in t) i[n] = t[n];
                        else if (this.element.hasAttribute("data-tilt-" + n)) {
                        var s = this.element.getAttribute("data-tilt-" + n);
                        try {
                            i[n] = JSON.parse(s)
                        } catch (t) {
                            i[n] = s
                        }
                    } else i[n] = e[n];
                    return i
                }
            }], [{
                key: "isSettingTrue",
                value: function(t) {
                    return "" === t || !0 === t || 1 === t
                }
            }, {
                key: "init",
                value: function(e, i) {
                    e.vanillaTilt = new t(e, i)
                }
            }]), t
        }(),
        n = t(window),
        s = n.width();

    function a(e) {
        var i = t(window).height(),
            s = n.scrollTop(),
            a = e.offset().top,
            o = e.height();
        if (a > s + i) return -1;
        if (a + o < s) return 101;
        var r = (s + i - a) / ((i + o) / 100);
        return r > 100 ? 100 : r
    }
    var o = {};

    function r(e) {
        void 0 !== addonInteraction.mouse_movement && addonInteraction.mouse_movement.map((function(n) {
            var s = t("#sppb-addon-" + n.addonId);
            if (s.parent().hasClass("sppb-addon-wrapper") || s.wrap('<div class="sppb-addon-wrapper"></div>'), e < 768 && !1 === n.enable_mobile) return void 0 !== o[n.addonId] && (o[n.addonId].tiltIntance.destroy(), delete o[n.addonId]), !1;
            if (e > 767 && e < 991 && !1 === n.enable_tablet) return void 0 !== o[n.addonId] && (o[n.addonId].tiltIntance.destroy(), delete o[n.addonId]), !1;
            if (void 0 !== o[n.addonId]) return !1;
            var a = document.getElementById("sppb-addon-" + n.addonId);
            a = a.parentElement;
            var r = {
                    speed: 1e3 * parseFloat(n.animation.mouse_tilt_speed),
                    max: parseFloat(n.animation.mouse_tilt_max),
                    reverse: "opposite" === n.animation.mouse_tilt_direction,
                    easing: "cubic-bezier(.03,.98,.52,.99)",
                    scale: 1.05,
                    transition: !0,
                    perspective: 1e3
                },
                l = new i(a, r);
            o[n.addonId] = {
                tiltIntance: l,
                enable_mobile: n.enable_mobile,
                enable_tablet: n.enable_tablet
            }
        }))
    }

    function l(t, e, i) {
        var n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
        if (n) {
            var s = p(e, i);
            s.transitionDuration = ".1s", t.css(s)
        }
        i > -1 && i <= 100 && t.css(p(e, i))
    }

    function p(t, i) {
        var n = {
                move: {
                    from: {
                        x: 0,
                        y: 0,
                        z: 0,
                        keyframe: 0,
                        f: !1
                    },
                    to: {
                        x: 0,
                        y: 0,
                        z: 0,
                        keyframe: 0,
                        f: !1
                    },
                    goal: {
                        x: 0,
                        y: 0,
                        z: 0,
                        keyframe: 0
                    }
                },
                scale: {
                    from: {
                        x: 1,
                        y: 1,
                        z: 1,
                        keyframe: 0
                    },
                    to: {
                        x: 1,
                        y: 1,
                        z: 1,
                        keyframe: 0
                    },
                    goal: {
                        x: 1,
                        y: 1,
                        z: 1,
                        keyframe: 0
                    }
                },
                skew: {
                    from: {
                        x: 0,
                        y: 0,
                        keyframe: 0
                    },
                    to: {
                        x: 0,
                        y: 0,
                        keyframe: 0
                    },
                    goal: {
                        x: 0,
                        y: 0,
                        keyframe: 0
                    }
                },
                rotate: {
                    from: {
                        x: 0,
                        y: 0,
                        z: 0,
                        keyframe: 0
                    },
                    to: {
                        x: 0,
                        y: 0,
                        z: 0,
                        keyframe: 0
                    },
                    goal: {
                        x: 0,
                        y: 0,
                        z: 0,
                        keyframe: 0
                    }
                },
                opacity: {
                    from: {
                        value: 0,
                        keyframe: 0
                    },
                    to: {
                        value: 0,
                        keyframe: 0
                    },
                    goal: {
                        value: 1,
                        keyframe: 0
                    }
                },
                blur: {
                    from: {
                        value: 0,
                        keyframe: 0
                    },
                    to: {
                        value: 0,
                        keyframe: 0
                    },
                    goal: {
                        value: 0,
                        keyframe: 0
                    }
                }
            },
            s = t.animation,
            a = t.origin,
            o = new e(s);
        return o.bindCustomAnimation(), o.actionProperty.map((function(t) {
            var e = o.getCustomAnimationActionByName(t, i);
            null !== e.from && (Object.assign(n[t].from, e.from.property), n[t].from.f = !0, n[t].from.keyframe = parseInt(e.from.keyframe), void 0 !== n[t].from.x && (n[t].from.x = "" === n[t].from.x ? 0 : parseFloat(n[t].from.x)), void 0 !== n[t].from.y && (n[t].from.y = "" === n[t].from.y ? 0 : parseFloat(n[t].from.y)), void 0 !== n[t].from.z && (n[t].from.z = "" === n[t].from.z ? 0 : parseFloat(n[t].from.z)), void 0 !== n[t].from.value && (n[t].from.value = "" === n[t].from.value ? 0 : parseFloat(n[t].from.value))), null !== e.to && (Object.assign(n[t].to, e.to.property), void 0 !== n[t].to.x && (n[t].to.x = "" === n[t].to.x ? 0 : parseFloat(n[t].to.x), n[t].goal.x = n[t].to.x), void 0 !== n[t].to.y && (n[t].to.y = "" === n[t].to.y ? 0 : parseFloat(n[t].to.y), n[t].goal.y = n[t].to.y), void 0 !== n[t].to.z && (n[t].to.z = "" === n[t].to.z ? 0 : parseFloat(n[t].to.z), n[t].goal.z = n[t].to.z), void 0 !== n[t].to.value && (n[t].to.value = "" === n[t].to.value ? 0 : parseFloat(n[t].to.value), n[t].goal.value = n[t].to.value), n[t].to.keyframe = parseInt(e.to.keyframe), n[t].to.f = !0), !0 === n[t].to.f && !0 === n[t].from.f && void 0 === e.fixed && (n[t] = "opacity" === t || "blur" === t ? o.getOpacity(t, n[t], i) : "skew" === t ? o.getSkew(t, n[t], i) : o.getMoveTransform(t, n[t], i))
        })), {
            willChange: "transform",
            "-webkit-transition-timing-function": "ease",
            transitionDuration: "0.1s",
            "transform-origin": a.x_offset + " " + a.y_offset,
            transformStyle: "preserve-3d",
            filter: "blur(" + n.blur.goal.value + "px)",
            "-webkit-filter": "blur(" + n.blur.goal.value + "px)",
            opacity: n.opacity.goal.value,
            transform: "perspective(1000px) translate3d(" + n.move.goal.x + "px, " + n.move.goal.y + "px, " + n.move.goal.z + "px) \n                scale3d(" + n.scale.goal.x + ", " + n.scale.goal.y + ", " + n.scale.goal.z + ")\n                rotateX(" + n.rotate.goal.x + "deg) rotateY(" + n.rotate.goal.y + "deg) rotateZ(" + n.rotate.goal.z + "deg) \n                skew(" + n.skew.goal.x + "deg, " + n.skew.goal.y + "deg)"
        }
    }
    window.addEventListener("DOMContentLoaded", (function(e) {
        "undefined" != typeof addonInteraction && (r(s), function() {
            var e = addonInteraction.while_scroll_view,
                i = t(window),
                n = {};
            t(document).ready((function() {
                e.map((function(e) {
                    if (s < 768 && !1 === e.enable_mobile) return !1;
                    if (s > 767 && s < 991 && !1 === e.enable_tablet) return !1;
                    var i = t("#sppb-addon-" + e.addonId);
                    i.parent().hasClass("sppb-addon-wrapper") || i.wrap('<div class="sppb-addon-wrapper"></div>'), n[e.addonId] = i, i.addClass("sppb-interaction-hide");
                    var o = a(i.parent("div.sppb-addon-wrapper"));
                    l(i, e, o, !0), setTimeout((function() {
                        i.removeClass("sppb-interaction-hide")
                    }), 500)
                }))
            })), t(window).on("load", (function() {
                t(document).on("scroll", (function() {
                    s = i.width(), e.map((function(e) {
                        var i = t("#sppb-addon-" + e.addonId);
                        if (s < 768 && !1 === e.enable_mobile) return i.css({
                            willChange: "transform",
                            "-webkit-transition-timing-function": "ease",
                            transitionDuration: "0s",
                            "transform-origin": "center center",
                            transformStyle: "preserve-3d",
                            filter: "blur(0px)",
                            "-webkit-filter": "blur(0px)",
                            opacity: 1,
                            transform: "perspective(1000px) translate3d(0px, 0px, 0px) \n                scale3d(1, 1, 1)\n                rotateX(0deg) rotateY(0deg) rotateZ(0deg) \n                skew(0deg, 0deg)"
                        }), !1;
                        if (s > 767 && s < 991 && !1 === e.enable_tablet) return i.css({
                            willChange: "transform",
                            "-webkit-transition-timing-function": "ease",
                            transitionDuration: "0s",
                            "transform-origin": "center center",
                            transformStyle: "preserve-3d",
                            filter: "blur(0px)",
                            "-webkit-filter": "blur(0px)",
                            opacity: 1,
                            transform: "perspective(1000px) translate3d(0px, 0px, 0px) \n                scale3d(1, 1, 1)\n                rotateX(0deg) rotateY(0deg) rotateZ(0deg) \n                skew(0deg, 0deg)"
                        }), !1;
                        var n = a(i.parent("div.sppb-addon-wrapper"), t(window));
                        l(i, e, n)
                    }))
                }))
            }))
        }())
    })), n.resize((function() {
        "undefined" != typeof addonInteraction && r(n.width())
    }))
}(jQuery);