! function(t) {
    var n = t(window),
        a = n.height();
    n.resize((function() {
        a = n.height()
    })), t.fn.parallax = function(o, r, i) {
        var s, c, e = t(this);

        function l() {
            var i = n.scrollTop();
            e.each((function() {
                var n = t(this),
                    l = n.offset().top;
                l + s(n) < i || l > i + a || !e.data("sppbparallax") || e.css("backgroundPosition", o + " " + Math.round((c - i) * r) + "px")
            }))
        }
        e.data("sppbparallax", !0), e.css("backgroundAttachment", "fixed"), e.each((function() {
            c = e.offset().top
        })), s = i ? function(t) {
            return t.outerHeight(!0)
        } : function(t) {
            return t.height()
        }, (arguments.length < 1 || null === o) && (o = "50%"), (arguments.length < 2 || null === r) && (r = .15), (arguments.length < 3 || null === i) && (i = !0), n.bind("scroll", l).resize(l), l()
    }, t.fn.parallaxDestroy = function(n, a) {
        var o = t(this);
        o.data("sppbparallax") && (n ? o.css("backgroundPosition", n) : o.css("backgroundPosition", "0% 0%"), a ? o.css("backgroundAttachment", a) : o.css("backgroundAttachment", "inherit"), o.data("sppbparallax", !1))
    }
}(jQuery);