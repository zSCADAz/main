/**
 * @package SP Page Builder
 * @author JoomShaper http://www.joomshaper.com
 * @copyright Copyright (c) 2010 - 2022 JoomShaper
 * @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 or later
 */
"use strict";

function _typeof(t) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    })(t)
}
window.onYouTubeIframeAPIReadyTemp = [], [Element.prototype, Document.prototype, DocumentFragment.prototype].forEach((function(t) {
        t.hasOwnProperty("append") || Object.defineProperty(t, "append", {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            value: function() {
                var t = Array.prototype.slice.call(arguments),
                    i = document.createDocumentFragment();
                t.forEach((function(t) {
                    var e = t instanceof Node;
                    i.appendChild(e ? t : document.createTextNode(String(t)))
                })), this.appendChild(i)
            }
        })
    })), "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
        value: function(t, i) {
            if (null == t) throw new TypeError("Cannot convert undefined or null to object");
            for (var e = Object(t), s = 1; s < arguments.length; s++) {
                var o = arguments[s];
                if (null != o)
                    for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n])
            }
            return e
        },
        writable: !0,
        configurable: !0
    }),
    function(t, i, e, s) {
        function o(i, e) {
            this.element = i, this._name = "jsSlider", this.item = null, this.delta = 1, this.isAnimating = !1, this.isDragging = !1, this.timer = 0, this._timeoutId1 = 0, this._timeoutId2 = 0, this._dotControllerTimeId = 0, this._lastViewPort = 0, this.video = this.videoUtils(), this.videoProps = {}, this.videoList = {
                youtube: [],
                vimeo: [],
                html5: []
            }, this.player = {}, this.videoPlaying = !1, this.onMouseOver = !1, this.captionAnimationProperty = {
                direction: "left",
                from: "100%",
                to: "0",
                type: "slide",
                duration: 800,
                after: 0,
                origin: "50% 50% 0",
                timing_function: "cubic-bezier(0, 0.46, 0, 0.63)"
            }, this.videoAspectRatio = 1.78, this.coordinate = {
                x: 0,
                y: 0
            }, this.prevCoordinate = {
                x: 0,
                y: 0,
                diff: 0,
                dragPointer: -1
            }, this._defaults = t.fn.jsSlider.defaults, this.options = t.extend({}, this._defaults, e), 2 !== this.options.nav_text.length && (console.warn("navtext must be need two control element!"), this.options.nav_text = ["<", ">"]), this.init()
        }
        t.extend(o.prototype, {
            init: function() {
                this.buildCache(), this.createHtmlDom(), this.applyBasicStyle(), this.createVideoDom(), this.items > 1 && this.bindEvents(), this.triggerOnStart(), this.options.autoplay && this.startLoop()
            },
            triggerOnStart: function() {
                if (this.updateCaption(), this.options.indicator && this.animateIndicator("start"), this.options.dot_indicator && this.options.dots) {
                    var t = this.$dotContainer.find("li.active");
                    this.animateDotIndicator(t, "start")
                }
            },
            destroy: function() {
                this.unbindEvents(), this.$element.removeData()
            },
            buildCache: function() {
                this.$element = t(this.element)
            },
            unbindEvents: function() {
                this.$element.off("." + this._name)
            },
            createHtmlDom: function() {
                if (this.createOuterStage(), 0 === this.$element.find(".sp-item.active").length && this.$element.find(".sp-item:first-child").addClass("active"), this.item = this.$element.find(".sp-item.active"), this.options.nav && this.createNavigationController(), this.options.dots && this.createDotsController(), this.options.indicator && this.createIndicator(), this.options.show_number && this.createSliderNumber(), 2 === this.$element.find(".sp-item").length) {
                    var t = this.$element.find(".sp-item").clone();
                    t.removeClass("active").addClass("sp-clone-item"), this.$outerStage.append(t)
                }
            },
            createOuterStage: function() {
                this.outerStage = e.createElement("div"), this.outerStage.setAttribute("class", "sp-slider-outer-stage");
                var i = t(this.outerStage);
                this.$element.find(".sp-item").each((function(t, e) {
                    i.append(e)
                })), this.$element.append(i), this.$outerStage = i
            },
            createNavigationController: function() {
                var i = e.createElement("div");
                i.setAttribute("class", "sp-nav-control"), this.$element.append(i), this.nextBtn = e.createElement("span"), this.nextBtn.setAttribute("class", "next-control nav-control"), this.prevBtn = e.createElement("span"), this.prevBtn.setAttribute("class", "prev-control nav-control"), i.append(this.nextBtn), i.append(this.prevBtn), this.nextBtn.innerHTML = this.options.nav_text[1], this.prevBtn.innerHTML = this.options.nav_text[0], this.$nextBtn = t(this.nextBtn), this.$prevBtn = t(this.prevBtn)
            },
            createDotsController: function() {
                if (void 0 !== this.options.dots_class && "" === this.options.dots_class) {
                    var i = e.createElement("div");
                    i.setAttribute("class", "sp-dots"), this.$element.append(i);
                    var s = this,
                        o = e.createElement("ul");
                    this.$element.find(".sp-item").each((function(i, n) {
                        var a = e.createElement("li");
                        if (a.setAttribute("class", "sp-dot-" + i), s.options.dot_indicator) {
                            var r = e.createElement("span");
                            r.setAttribute("class", "dot-indicator"), a.append(r)
                        }
                        t(n).hasClass("active") && a.classList.add("active"), o.append(a)
                    })), i.append(o), this.$element.append(i), this.$dotContainer = t(o)
                } else if (this.$dotContainer = this.$element.find(this.options.dots_class), this.$element.find(".sp-item.active") > 0) {
                    var n = this.$element.find(".sp-item").index();
                    this.$dotContainer.find("li")[n].addClass("active")
                }
            },
            createIndicator: function() {
                var i = this,
                    s = "circle" === this.options.indicator_type ? "circles-indicator" : "line-indicator",
                    o = function() {
                        var o = e.createElement("div");
                        o.setAttribute("class", "sp-indicator-container"), i.$element.append(o), i.indicator = e.createElement("div"), i.indicator.setAttribute("class", "sp-indicator " + s), t(o).append(i.indicator), i.$indicator = t(i.indicator)
                    };
                "" === this.options.indicator_class ? "circle" === this.options.indicator_type || o() : this.$element.find(this.options.indicator_class).length > 0 ? (this.$indicator = this.$element.find(this.options.indicator_class), this.$indicator.addClass(s)) : o()
            },
            createSliderNumber: function() {
                var i = this,
                    s = function() {
                        var s = e.createElement("div");
                        s.setAttribute("class", "sp-slider_number"), i.$element.append(s), i.$slider_number = t(s)
                    };
                "" === this.options.slider_number_class ? s() : this.$element.find(this.options.slider_number_class).length > 0 ? this.$slider_number = this.$element.find(this.options.slider_number_class) : s(), this.$slider_number.append('<span class="sp-slider_current_number"> </span>')
            },
            updateSliderNumber: function() {
                if (!0 === this.options.show_number) {
                    var t = this.$element.find(".sp-item").not(".sp-clone-item").length,
                        i = this.item.index();
                    this.item.hasClass("sp-clone-item") && (i = i === this.items - 1 ? 1 : 0);
                    var e = this.$slider_number.find(".sp-slider_current_number"),
                        s = i + 1 > 10 ? i + 1 : ("0" + (i + 1)).slice(-2),
                        o = t > 10 ? t : ("0" + t).slice(-2);
                    e.html(s + '<span class="sp-slider-current-number-slash">/</span><span class="sp-slider-current-number-right">' + o + "</span>")
                }
            },
            videoUtils: function() {
                var t = {},
                    i = this;
                return t.getVideoSrc = function(t) {
                    var i = t.match(/youtube|youtu\.be/),
                        e = -1 !== t.indexOf("vimeo"),
                        s = !1,
                        o = t.split(".").pop();
                    return "mp4" !== o && "webm" !== o && "ogg" !== o || (s = !0), {
                        isYouTube: i,
                        isVimeo: e,
                        html5: s,
                        videoType: o
                    }
                }, t.getHtml5Type = function(t) {
                    return t.split(".").pop()
                }, t.getYoutubeId = function(t) {
                    var i = t.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
                    return !(!i || 11 != i[7].length) && i[7]
                }, t.hasVideo = function(t) {
                    return void 0 !== i.player["item_" + t]
                }, t.getPlayerType = function(t) {
                    var e = "youtube";
                    return "vimeo" === i.player["item_" + t].type && (e = "vimeo"), "html5" === i.player["item_" + t].type && (e = "html5"), e
                }, t.getPlayer = function(t, e) {
                    void 0 === e && (e = "youtube");
                    var s = i.player["item_" + t];
                    return void 0 !== s && s.type === e ? s.player : null
                }, t.uuid = function() {
                    return "xxx-4xxx-yxxx-xxxxx".replace(/[xy]/g, (function(t) {
                        var i = 16 * Math.random() | 0;
                        return ("x" == t ? i : 3 & i | 8).toString(16)
                    }))
                }, t
            },
            createVideoDom: function() {
                var t = this;
                this.videoList.youtube.length > 0 && (i.YT ? this.createYoutubeDom(this.videoList.youtube) : (i.onYouTubeIframeAPIReadyTemp.push(this.createYoutubeDom.bind(this, this.videoList.youtube)), i.onYouTubeIframeAPIReady = () => i.onYouTubeIframeAPIReadyTemp.forEach(t => t()))), this.videoList.vimeo.length > 0 && this.createVimeoDom(this.videoList.vimeo), this.videoList.html5.length > 0 && this.videoList.html5.map((function(i) {
                    t.createHtml5VideoDom(i)
                }))
            },
            createYoutubeDom: function(t) {
                var i = this;
                t.map((function(t) {
                    i.createYoutubeVideoFrame(t)
                }))
            },
            createVimeoDom: function(t) {
                var i = this;
                "undefined" == typeof Vimeo ? setTimeout((function() {
                    i.createVimeoDom(t)
                }), 10) : t.map((function(t) {
                    i.createVimeoVideoFrame(t)
                }))
            },
            checkVideoBackground: function(t) {
                var i = t.find("div[data-video_src]");
                if (i.length > 0) {
                    var s = i.attr("data-video_src"),
                        o = this.video.getVideoSrc(s);
                    if (o.isYouTube) {
                        if (null === e.getElementById("sp-youtube-script")) {
                            var n = e.createElement("script");
                            n.setAttribute("id", "sp-youtube-script"), n.src = "https://www.youtube.com/iframe_api";
                            var a = e.getElementsByTagName("script")[0];
                            a.parentNode.insertBefore(n, a)
                        }
                        this.videoList.youtube.push(t)
                    }
                    if (o.isVimeo) {
                        if (null === e.getElementById("sp-vimeo-script")) {
                            var r = e.createElement("script");
                            r.setAttribute("id", "sp-vimeo-script"), r.src = "https://player.vimeo.com/api/player.js";
                            var d = e.getElementsByTagName("script")[0];
                            d.parentNode.insertBefore(r, d)
                        }
                        this.videoList.vimeo.push(t)
                    }
                    o.html5 && this.videoList.html5.push(t)
                }
            },
            applyBasicStyle: function() {
                this.outerWidth = this.$outerStage.outerWidth();
                var i = 0,
                    e = this.options.speed,
                    s = this.options.animations,
                    o = this;
                this.$element.find(".sp-item").each((function() {
                    if (i++, o.checkVideoBackground(t(this)), t(this).css({
                            "-webkit-transition-duration": e + "ms"
                        }), "fade" === s && (t(this).css({
                            opacity: 0
                        }), t(this).hasClass("active") && t(this).css({
                            opacity: 1
                        })), "zoomOut" === s && (t(this).hasClass("active") || t(this).css({
                            "-webkit-transform": "scale3D(.8,.8,.8)"
                        })), "clip" === s && (t(this).hasClass("active") ? t(this).css({
                            "-webkit-transition-duration": "0s",
                            "-webkit-transform": "translate3D(0,0,0)",
                            clip: "rect(auto, " + o.outerWidth + "px, auto, 0px)",
                            zIndex: 2,
                            opacity: 1
                        }) : t(this).css({
                            "-webkit-transition-duration": o.options.speed + "ms",
                            "-webkit-transform": "translate3D(0,0,0)",
                            clip: "rect(auto, 0, auto, 0px)",
                            opacity: 0,
                            zIndex: 1
                        })), "bubble" === s)
                        if (t(this).hasClass("active")) t(this).css({
                            "-webkit-transition-duration": "0s",
                            "-webkit-transform": "scale3D(1,1,1)",
                            "clip-path": "circle(100% at 50% 50%)",
                            zIndex: 2,
                            visibility: "visible",
                            opacity: 1
                        });
                        else {
                            var n = Math.floor(50 * Math.random()) + 20,
                                a = Math.floor(40 * Math.random()) + 20;
                            t(this).css({
                                "-webkit-transition-duration": "0s",
                                "-webkit-transform": "scale3D(0,0,0)",
                                "clip-path": "circle(" + o.options.bubble_size + " at " + n + "% " + a + "%)",
                                opacity: 0,
                                visibility: "visible",
                                zIndex: 1
                            })
                        }
                })), "3D" !== s && "3d" !== s || (this.$element.addClass("on-3d-active"), this.add3DHook()), "clip" === s && this.$element.addClass("sp-clip-slider"), "bubble" === s && this.$element.addClass("sp-bubble-slider"), "stack" === s && this.$element.addClass("sp-stack-slider"), "slide" === s && this.$element.addClass("sp-basic-slider"), "fade" === s && this.$element.addClass("sp-fade-slider"), this.items = i, this.updateResponsiveView(), this.updateSliderNumber()
            },
            add3DHook: function() {
                var t = this.options.rotate,
                    i = this.$element.find(".sp-item.active");
                i.css({
                    zIndex: 3,
                    "-webkit-transition-duration": "0s",
                    "-webkit-transform": "translate3d(0, 0, -200px)"
                }), i.next(".sp-item").addClass("next-3d").css({
                    zIndex: 2,
                    opacity: 1,
                    visibility: "visible",
                    "-webkit-transition-duration": "0s",
                    "-webkit-transform": "translate3d(100%, 0,-400px) rotate3d(0,-1,0," + t + "deg)"
                }), this.$element.find(".sp-item:last-child").addClass("prev-3d").css({
                    zIndex: 2,
                    opacity: 1,
                    visibility: "visible",
                    "-webkit-transition-duration": "0s",
                    "-webkit-transform": "translate3d(-100%, 0,-400px) rotate3d(0,-1,0," + -t + "deg)"
                })
            },
            startLoop: function() {
                var t = this;
                this.timer = setInterval((function() {
                    !1 === t.isAnimating && t.Next()
                }), this.options.interval)
            },
            stopLoop: function(t) {
                void 0 === t && (t = null), clearInterval(this.timer), this.timer = 0
            },
            Next: function() {
                this.isAnimating = !0, -1 === this.delta && (this.delta = 1);
                var t = "",
                    i = "";
                "3D" !== this.options.animations && ((t = this.$element.find(".sp-item.active")).addClass("prev-item"), i = t.next(".sp-item").length ? t.next(".sp-item").addClass("active next-item") : this.$element.find(".sp-item:first-child").addClass("active next-item")), "3d" !== this.options.animations && "3D" !== this.options.animations || (t = this.$element.find(".sp-item.active"), i = this.$element.find(".next-3d")), this.item = i, this.updateSliderNumber(), this.updateDotsController(), "3D" !== this.options.animations && this.updateItemStyle(t, i), "3D" === this.options.animations && this.update3DItemStyle(t, i)
            },
            Prev: function() {
                this.isAnimating = !0, 1 === this.delta && (this.delta = -1);
                var t = "",
                    i = "";
                "3D" !== this.options.animations && ((i = this.$element.find(".sp-item.active")).addClass("prev-item"), t = i.prev(".sp-item").length ? i.prev(".sp-item").addClass("active next-item") : this.$element.find(".sp-item:last-child").addClass("active next-item")), "3d" !== this.options.animations && "3D" !== this.options.animations || (i = this.$element.find(".sp-item.active"), t = this.$element.find(".prev-3d")), this.item = t, this.updateSliderNumber(), this.updateDotsController(), "3D" !== this.options.animations && this.updateItemStyle(i, t), "3D" === this.options.animations && this.update3DItemStyle(i, t)
            },
            slideFromPosition: function(t, i) {
                var e = this;
                this.isAnimating = !0;
                var s = "",
                    o = "";
                if ("3D" !== this.options.animations && (s = this.$element.find(".sp-item.active").addClass("prev-item"), o = this.$element.find(".sp-item:nth-child(" + t + ")").addClass("active next-item")), "3D" === this.options.animations) {
                    var n = function() {
                        if (1 === i) {
                            s = e.$element.find(".sp-item.active"), o = e.$element.find(".next-3d");
                            var n = s.index(),
                                a = Math.abs(n - t);
                            if (2 === a) return e.Next(), {
                                v: void 0
                            };
                            for (var r = function(t) {
                                    setTimeout((function() {
                                        1 !== t && (s = e.$element.find(".sp-item.active"), o = e.$element.find(".next-3d")), e.update3DItemStyle(s, o, 300)
                                    }), 300 * t)
                                }, d = 1; d < a; d++) r(d)
                        }
                        if (-1 === i) {
                            s = e.$element.find(".sp-item.active"), o = e.$element.find(".prev-3d");
                            var l = s.index() + 1,
                                c = Math.abs(l - (t - 1));
                            if (2 === c) return e.Prev(), {
                                v: void 0
                            };
                            var h = function(t) {
                                setTimeout((function() {
                                    1 !== t && (s = e.$element.find(".sp-item.active"), o = e.$element.find(".prev-3d")), e.update3DItemStyle(s, o, 300)
                                }), 300 * t)
                            };
                            for (d = 1; d < c; d++) h(d)
                        }
                    }();
                    if ("object" === _typeof(n)) return n.v
                }
                this.item = o, this.updateSliderNumber(), this.delta = i, "3D" !== this.options.animations && this.updateItemStyle(s, o)
            },
            updateDotsController: function() {
                var t = this;
                if (this.options.dots) {
                    var i = this.$dotContainer.find("li.active"),
                        e = "";
                    i.removeClass("active"), 1 === this.delta && (e = i.next("li").length ? i.next("li").addClass("active") : this.$dotContainer.find("li:first-child").addClass("active")), -1 === this.delta && (e = i.prev("li").length ? i.prev("li").addClass("active") : this.$dotContainer.find("li:last-child").addClass("active")), this.options.dot_indicator && (this.animateDotIndicator(i, "stop"), this._dotControllerTimeId > 0 && (clearTimeout(this._dotControllerTimeId), this._dotControllerTimeId = 0), this._dotControllerTimeId = setTimeout((function() {
                        t.animateDotIndicator(e, "start")
                    }), this.options.speed)), e.css({
                        "-webkit-transition": "all 0.5s linear 0s"
                    })
                }
            },
            updateDotsFromPosition: function(t) {
                var i = this,
                    e = this.$dotContainer.find("li.active").removeClass("active"),
                    s = this.$dotContainer.find("li:nth-child(" + t + ")").addClass("active");
                this.options.dot_indicator && (this.animateDotIndicator(e, "stop"), this._dotControllerTimeId > 0 && (clearTimeout(this._dotControllerTimeId), this._dotControllerTimeId = 0), this._dotControllerTimeId = setTimeout((function() {
                    i.animateDotIndicator(s, "start")
                }), this.options.speed)), s.css({
                    "-webkit-transition": "all 0.5s linear 0s"
                })
            },
            animateDotIndicator: function(t, i) {
                if (0 !== t.find(".dot-indicator").length && ("stop" === i && t.find(".dot-indicator").removeClass("active").css({
                        "-webkit-transition-duration": "0s"
                    }), "start" === i)) {
                    var e = Math.abs(this.options.interval - this.options.speed);
                    t.find(".dot-indicator").addClass("active").css({
                        "-webkit-transition-duration": e + "ms"
                    })
                }
            },
            animateIndicator: function(t) {
                if (this.options.indicator) {
                    var i = Math.abs(this.options.interval - this.options.speed);
                    "line" === this.options.indicator_type && ("start" === t && this.$indicator.css({
                        "-webkit-transition-duration": i + "ms",
                        width: "100%"
                    }), "stop" === t && this.$indicator.css({
                        "-webkit-transition-duration": "0s",
                        width: "0"
                    })), "circle" === this.options.indicator_type && "stop" === t && this.$indicator.removeClass("start")
                }
            },
            update3DItemStyle: function(t, i, e) {
                var s = this;
                void 0 === e && (e = null);
                var o = null === e ? this.options.speed : e,
                    n = this.options.rotate;
                if (this.animateIndicator("stop"), -1 === this.delta) {
                    this.$element.find(".next-3d").removeClass("next-3d").css({
                        opacity: 0,
                        visibility: "hidden"
                    });
                    (i.prev(".sp-item").length > 0 ? i.prev(".sp-item") : this.$element.find(".sp-item:last-child")).addClass("prev-3d").css({
                        opacity: 1,
                        zIndex: 1,
                        visibility: "visible",
                        "-webkit-transition-duration": "0s",
                        "-webkit-transform": "translate3d(-100%, 0,-400px) rotate3d(0,-1,0," + -n + "deg)"
                    }), i.addClass("active").removeClass("prev-3d").css({
                        zIndex: 3,
                        opacity: 1,
                        visibility: "visible",
                        "-webkit-transition-duration": o + "ms",
                        "-webkit-transform": "translate3d(0, 0,-200px) rotate3d(0,0,0,0deg)"
                    }), t.addClass("next-3d").removeClass("active").css({
                        zIndex: 1,
                        opacity: 1,
                        visibility: "visible",
                        "-webkit-transition-duration": o + "ms",
                        "-webkit-transform": "translate3d(100%, 0,-400px) rotate3d(0,-1,0," + n + "deg)"
                    })
                }
                if (1 === this.delta) {
                    this.$element.find(".prev-3d").removeClass("prev-3d").css({
                        opacity: 0,
                        visibility: "hidden"
                    });
                    (i.next(".sp-item").length > 0 ? i.next(".sp-item") : this.$element.find(".sp-item:first-child")).addClass("next-3d").css({
                        opacity: 1,
                        visibility: "visible",
                        "-webkit-transition-duration": "0s",
                        "-webkit-transform": "translate3d(100%, 0,-400px) rotate3d(0,-1,0," + n + "deg)"
                    }), i.addClass("active").removeClass("next-3d").css({
                        zIndex: 3,
                        opacity: 1,
                        visibility: "visible",
                        "-webkit-transition-duration": o + "ms",
                        "-webkit-transform": "translate3d(0, 0,-200px) rotate3d(0,0,0,0deg)"
                    }), t.addClass("prev-3d").removeClass("active").css({
                        zIndex: 1,
                        opacity: 1,
                        visibility: "visible",
                        "-webkit-transition-duration": o + "ms",
                        "-webkit-transform": "translate3d(-100%, 0,-400px) rotate3d(0,-1,0," + -n + "deg)"
                    })
                }
                this._timeoutId2 && (clearTimeout(this._timeoutId2), this._timeoutId2 = 0), this._timeoutId2 = setTimeout((function() {
                    s.isAnimating = !1, s.animateIndicator("start")
                }), o), this.options.autoplay && 0 === this.timer && this.startLoop(), this.updateCaption()
            },
            createIframeMask: function(i, s, o) {
                void 0 === o && (o = "youtube");
                var n = e.createElement("div", {
                        css: {
                            position: "absolute",
                            display: "block",
                            minWidth: "100%"
                        }
                    }),
                    a = "sp-video-content-" + s + "-" + this.video.uuid();
                if ("vimeo" === o) n.className = "sp-video-container sp-vimeo-video-container", n.id = a, i.append(n);
                else {
                    n.className = "sp-video-container";
                    var r = e.createElement("div");
                    r.id = a, i.append(t(n).append(r))
                }
                var d = e.createElement("div");
                d.className = "sp-video-background-mask", i.append(d);
                var l = e.createElement("div");
                return l.className = "sp-video-control", t(l).append('<span data-type="' + o + '" data-index="' + s + '" class="sp-volumn-control fa fa-volume-off"></span>'), t(d).append(l), a
            },
            createYoutubeVideoFrame: function(t) {
                var e = t.find("div[data-video_src]"),
                    s = t.index(),
                    o = {
                        active: t.hasClass("active")
                    },
                    n = this.createIframeMask(e, s),
                    a = this.video.getYoutubeId(e.attr("data-video_src"));
                this.videoProps[s];
                var r, d = t.hasClass("active") ? 1 : 0;
                return r = new YT.Player(n, {
                    width: "100%",
                    height: "100%",
                    videoId: a,
                    host: "https://www.youtube.com",
                    playerVars: {
                        enablejsapi: 1,
                        autoplay: d,
                        controls: 0,
                        rel: 0,
                        modestbranding: 0,
                        loop: 1,
                        showinfo: 0,
                        origin: i.location.origin
                    },
                    events: {
                        onReady: this.onPlayerReady.bind(this, o),
                        onStateChange: this.onPlayerStateChange.bind(this),
                        onError: this.onPlayerError.bind(this)
                    }
                }), this.player["item_" + s] = {
                    player: r,
                    type: "youtube"
                }, this.resizeVideoIframeWithAspectRatio(e), r
            },
            onPlayerReady: function(t, i) {
                i.target.mute(), this.videoReady = !0, this.options.autoplay && this.timer > 0 && this.stopLoop("onPlayerReady"), t.active && (i.target.playVideo(), this.videoPlaying = !0)
            },
            onPlayerStateChange: function(t) {
                t.data === YT.PlayerState.ENDED && (this.options.autoplay && !1 === this.onMouseOver ? this.Next() : t.target.playVideo())
            },
            onPlayerError: function(t) {
                console.warn("get video error", t), this.Next()
            },
            createVimeoVideoFrame: function(t) {
                var i = t.find("div[data-video_src]"),
                    e = t.index(),
                    s = t.hasClass("active") ? 1 : 0,
                    o = i.attr("data-video_src"),
                    n = this.createIframeMask(i, e, "vimeo"),
                    a = new Vimeo.Player(n, {
                        url: o,
                        title: 0,
                        byline: 0,
                        loop: s,
                        sidedock: 0,
                        muted: 1,
                        transparent: 1
                    });
                this.player["item_" + e] = {
                    player: a,
                    type: "vimeo"
                }, a.on("bufferstart", function() {
                    this.resizeVideoIframeWithAspectRatio(i)
                }.bind(this)), s && (a.play(), a.on("ended", this.vimeoOnPlayEnd.bind(this, a)))
            },
            createHtml5VideoDom: function(i) {
                var s = i.find("div[data-video_src]"),
                    o = i.index(),
                    n = "sp-video-content-" + o + this.video.uuid(),
                    a = i.hasClass("active"),
                    r = s.attr("data-video_src"),
                    d = e.createElement("div");
                d.className = "sp-video-container sp-html5-video-container";
                var l = e.createElement("div");
                l.className = "sp-video-background-mask";
                var c = e.createElement("div");
                c.className = "sp-video-control", t(c).append('<span data-type="html5" data-index="' + o + '" class="sp-volumn-control fa fa-volume-off"></span>'), t(d).append(t(l).append(c));
                var h = e.createElement("video");
                h.id = n, h.muted = !0, h.playsinline = "playsinline";
                var m = e.createElement("source");
                m.src = r, m.type = "video/" + this.video.getHtml5Type(r), h.append(m), s.append(t(d).append(h)), this.player["item_" + o] = {
                    player: h,
                    type: "html5"
                }, this.resizeVideoIframeWithAspectRatio(s), a && (h.play(), this.videoPlaying = !0, h.onended = this.html5OnPlayEnd.bind(this, h))
            },
            html5OnPlayEnd: function(t, i) {
                this.options.autoplay && !1 === this.onMouseOver ? this.Next() : (t.play(), t.onended = this.html5OnPlayEnd.bind(this, t))
            },
            playVideoAnimation: function(t) {
                var i = this,
                    e = !1,
                    s = t.find("div[data-video_src]");
                if (s.length > 0) {
                    var o = t.index();
                    if (this.video.hasVideo(o)) {
                        var n = this.video.getPlayerType(o);
                        if ("youtube" === n) {
                            var a = this.video.getPlayer(o, n);
                            if ("function" == typeof a.playVideo) {
                                var r = a.getPlayerState();
                                this.resizeVideoIframeWithAspectRatio(s), 5 === r ? (a.seekTo(0), a.playVideo()) : a.playVideo(), e = !0
                            } else e = !1
                        }
                        if ("vimeo" === n) {
                            var d = this.video.getPlayer(o, n);
                            this.resizeVideoIframeWithAspectRatio(s), "function" == typeof d.play ? (d.play().then((function() {
                                d.on("ended", i.vimeoOnPlayEnd.bind(i, d))
                            })), d.on("play", (function(t) {
                                d.setCurrentTime(0)
                            })), e = !0) : e = !1
                        }
                        if ("html5" === n) {
                            var l = this.video.getPlayer(o, n);
                            l.paused && l.readyState > 0 && setTimeout((function() {
                                l.currentTime = 0, l.play(), l.onended = i.html5OnPlayEnd.bind(i, l)
                            }), 500), e = !0
                        }
                        this.options.autoplay && e && this.stopLoop("playVideoAnimation")
                    }
                }
                this.videoPlaying = e
            },
            vimeoOnPlayEnd: function(t, i) {
                this.options.autoplay & !1 === this.onMouseOver ? (this.Next(), t.off("ended")) : (t.setCurrentTime(0), t.play(), t.on("ended", this.vimeoOnPlayEnd.bind(this, t)), t.off("ended"))
            },
            resizeVideoIframeWithAspectRatio: function(e) {
                var s, o = this.video.getVideoSrc(e.attr("data-video_src")),
                    n = t(i).width(),
                    a = t(i).height(),
                    r = {
                        width: this.$outerStage.innerWidth(),
                        height: this.$outerStage.innerHeight()
                    },
                    d = 16,
                    l = 9;
                (null !== o.isYouTube || o.isVimeo) && (s = e.find(".sp-video-container")), o.html5 && (s = e.find(".sp-html5-video-container")), o.isVimeo && (s.removeAttr("height"), s.removeAttr("width"));
                var c = d / l;
                c > r.width / r.height ? a = (n = r.width) / c : n = (a = r.height) * c;
                var h = (r.height - a) / 2,
                    m = (r.width - n) / 2;
                s.css({
                    width: n,
                    height: a,
                    top: h,
                    left: m
                })
            },
            resetItemVideoFrame: function(t) {
                var i = t.index();
                if (this.video.hasVideo(i)) {
                    var e = this.video.getPlayerType(i);
                    if ("youtube" === e) {
                        var s = this.video.getPlayer(i, e);
                        "function" == typeof s.stopVideo && s.stopVideo()
                    }
                    if ("vimeo" === e) {
                        var o = this.video.getPlayer(i, e);
                        "function" == typeof o.pause && o.pause()
                    }
                    if ("html5" === e) {
                        var n = this.video.getPlayer(i, e);
                        n.paused || n.pause()
                    }
                }
            },
            updateItemStyle: function(t, i) {
                var e = this;
                if (this.animateIndicator("stop"), this.playVideoAnimation(i), "fade" === this.options.animations && (t.removeClass("active"), i.css({
                        opacity: 1
                    }), this._timeoutId2 && (clearTimeout(this._timeoutId2), this._timeoutId2 = 0), this._timeoutId2 = setTimeout((function() {
                        t.css({
                            opacity: 0
                        }), i.removeClass("next-item"), t.removeClass("prev-item"), e.animateIndicator("start")
                    }), this.options.speed), this.isAnimating = !1), "slide" === this.options.animations) {
                    var s = -1 === this.prevCoordinate.dragPointer ? 0 : this.prevCoordinate.dragPointer,
                        o = -1 === this.delta ? "-" + (100 - s) : 100 - s,
                        n = -1 === this.delta ? 100 : -100;
                    i.css({
                        "-webkit-transition-duration": "0s",
                        "-webkit-transform": "translate3D(" + o + "%,0,0)"
                    }), this._timeoutId1 && (clearTimeout(this._timeoutId1), this._timeoutId1 = 0), this._timeoutId1 = setTimeout((function() {
                        i.css({
                            "-webkit-transition-duration": e.options.speed + "ms",
                            "-webkit-transform": "translate3D(0,0,0)"
                        }), t.css({
                            "-webkit-transition-duration": e.options.speed + 1500 + "ms",
                            "-webkit-transform": "translate3D(" + n + "%,0,0)"
                        })
                    }), 50), this._timeoutId2 && (clearTimeout(this._timeoutId2), this._timeoutId2 = 0), this._timeoutId2 = setTimeout((function() {
                        var i;
                        e.isAnimating = !1, t.removeClass("active"), e.$element.find(".next-item").removeClass("next-item"), e.$element.find(".prev-item").removeClass("prev-item"), t.css(((i = {
                            "-webkit-transition-duration": "1s",
                            "-webkit-transform": "translateX(100%)"
                        })["-webkit-transform"] = "translate3D(100%,0,0)", i)), e.animateIndicator("start")
                    }), this.options.speed + 100)
                }
                if ("zoomOut" === this.options.animations || "zoomIn" === this.options.animations) {
                    var a = this.options.animations;
                    "zoomIn" === a && (this.delta = -1 * this.delta), this._timeoutId1 && (clearTimeout(this._timeoutId1), this._timeoutId1 = 0), -1 === this.delta && (i.css({
                        "-webkit-transition-duration": "0s",
                        "-webkit-transform": "scale3d(1.4,1.4,1.4)",
                        opacity: 0
                    }), this._timeoutId1 = setTimeout((function() {
                        t.css({
                            "-webkit-transition-duration": e.options.speed + "ms",
                            "-webkit-transform-origin": "50% 50% 50%",
                            "-webkit-transform": "scale3d(0.8,0.8,0.8) ",
                            opacity: 0,
                            zIndex: 2
                        }), i.css({
                            "-webkit-transition-duration": e.options.speed + "ms",
                            opacity: 1,
                            "-webkit-transform-origin": "50% 50% 50%",
                            "-webkit-transform": "scale3d(1,1,1)",
                            zIndex: 1
                        })
                    }), 100)), 1 === this.delta && (i.css({
                        "-webkit-transition-duration": "0s",
                        "-webkit-transform": "scale3d(0.8,0.8,0.8)"
                    }), this._timeoutId1 = setTimeout((function() {
                        t.css({
                            "-webkit-transition-duration": e.options.speed + "ms",
                            "-webkit-transform-origin": "50% 50% 50%",
                            "-webkit-transform": "scale3d(1.4,1.4,1.4) ",
                            opacity: 0,
                            zIndex: 1
                        }), i.css({
                            "-webkit-transition-duration": e.options.speed - 100 + "ms",
                            opacity: 1,
                            "-webkit-transform-origin": "50% 50% 50%",
                            "-webkit-transform": "scale3d(1,1,1)",
                            zIndex: 2
                        })
                    }), 100)), this._timeoutId2 && (clearTimeout(this._timeoutId2), this._timeoutId2 = 0), this._timeoutId2 = setTimeout((function() {
                        t.removeClass("active"), i.removeClass("next-item"), t.removeClass("prev-item"), e.isAnimating = !1, e.animateIndicator("start")
                    }), this.options.speed + 100)
                }
                if ("stack" === this.options.animations) {
                    this._timeoutId1 && (clearTimeout(this._timeoutId1), this._timeoutId1 = 0);
                    var r = -1 === this.prevCoordinate.dragPointer ? 0 : this.prevCoordinate.dragPointer;
                    if (1 === this.delta) {
                        var d = 100 - r,
                            l = {
                                tx: d + "%",
                                ty: 0,
                                tz: 0,
                                sx: 1,
                                sy: 1,
                                sz: 1
                            },
                            c = {
                                tx: 0,
                                ty: 0,
                                tz: 0,
                                sx: 1,
                                sy: 1,
                                sz: 1
                            };
                        !0 === this.options.vertical_mode && (l = Object.assign({}, l, {
                            tx: 0,
                            ty: d + "%",
                            sx: 1.2,
                            sy: 1.2,
                            sz: 1.2
                        }), c = Object.assign({}, c, {
                            tx: 0,
                            ty: "-" + d + "%",
                            sx: 1.2,
                            sy: 1.2,
                            sz: 1.2
                        })), i.css({
                            "-webkit-transition-duration": "0s",
                            "-webkit-transform": "translate3D(" + l.tx + "," + l.ty + "," + l.tz + ") scale3D(" + l.sx + "," + l.sy + "," + l.sz + ")"
                        }), this._timeoutId1 = setTimeout((function() {
                            i.css({
                                "-webkit-transition-duration": e.options.speed + "ms",
                                opacity: 1,
                                "-webkit-transform": "translate3D(0,0,0) scale3d(1,1,1)",
                                zIndex: 2
                            }), t.css({
                                "-webkit-transition-duration": e.options.speed + 200 + "ms",
                                "-webkit-transform": "perspective(1000px) translate3D(" + c.tx + "," + c.ty + "," + c.tz + ") scale3d(" + c.sx + "," + c.sy + "," + c.sz + ")",
                                opacity: .5,
                                zIndex: 1
                            })
                        }), 50)
                    }
                    if (-1 === this.delta) {
                        var h = r - 100,
                            m = {
                                tx: h + "%",
                                ty: 0,
                                tz: 0,
                                sx: 1,
                                sy: 1,
                                sz: 1
                            },
                            p = {
                                tx: 0,
                                ty: 0,
                                tz: 0,
                                sx: 1,
                                sy: 1,
                                sz: 1
                            };
                        this.options.vertical_mode && (m = Object.assign({}, m, {
                            tx: 0,
                            ty: h + "%",
                            sx: 1,
                            sy: 1,
                            sz: 1
                        }), p = Object.assign({}, p, {
                            tx: 0,
                            ty: -h + "%",
                            sx: 1.2,
                            sy: 1.2,
                            sz: 1.2
                        })), i.css({
                            "-webkit-transition-duration": "0s",
                            "-webkit-transform": "translate3D(" + m.tx + "," + m.ty + "," + m.tz + ") scale3D(" + m.sx + "," + m.sy + "," + m.sz + ")"
                        }), this._timeoutId1 = setTimeout((function() {
                            i.css({
                                "-webkit-transition-duration": e.options.speed + "ms",
                                "-webkit-transform": "translate3D(0,0,0) ",
                                opacity: 1,
                                zIndex: 2
                            }), t.css({
                                "-webkit-transition-duration": e.options.speed + "ms",
                                "-webkit-transform": "translate3D(" + p.tx + "," + p.ty + "," + p.tz + ") scale3d(" + p.sx + "," + p.sy + "," + p.sz + ")",
                                opacity: .5,
                                zIndex: 1
                            })
                        }), 50)
                    }
                    this._timeoutId2 && (clearTimeout(this._timeoutId2), this._timeoutId2 = 0), this._timeoutId2 = setTimeout((function() {
                        t.removeClass("active"), i.removeClass("next-item"), t.removeClass("prev-item"), e.isAnimating = !1, e.animateIndicator("start")
                    }), this.options.speed + 100)
                }
                if ("clip" === this.options.animations) {
                    var u = -1 === this.prevCoordinate.dragPointer ? 0 : this.prevCoordinate.dragPointer,
                        f = 0,
                        v = 5;
                    if (-1 !== this.prevCoordinate.dragPointer) {
                        f = (f = .001 * u) > 1 ? 1 : Math.abs(f);
                        var b = v - Math.abs(u * (v / 800));
                        v = b > v ? v : b < 0 ? 0 : b
                    }
                    this._timeoutId1 && (clearTimeout(this._timeoutId1), this._timeoutId1 = 0), 1 === this.delta && (i.css({
                        "-webkit-transition-duration": "0s",
                        "-webkit-transform": "translate3D(" + v + "%,0,0)",
                        clip: "rect(auto, " + this.outerWidth + "px, auto, 0px)",
                        zIndex: 2,
                        opacity: f
                    }), this._timeoutId1 = setTimeout((function() {
                        t.css({
                            "-webkit-transition-duration": e.options.speed + "ms",
                            "-webkit-transform": "translate3D(0,0,0)",
                            clip: "rect(auto, 0px, auto,  0px)",
                            opacity: 1,
                            zIndex: 3
                        }), i.css({
                            "-webkit-transition-duration": e.options.speed + "ms",
                            opacity: 1,
                            "-webkit-transform": "translate3D(0,0,0)"
                        })
                    }), 100)), -1 === this.delta && (i.css({
                        "-webkit-transition-duration": "0s",
                        "-webkit-transform": "translate3D(-" + v + "%,0,0)",
                        clip: "rect(auto, " + this.outerWidth + "px, auto, 0px)",
                        zIndex: 2,
                        opacity: f
                    }), this._timeoutId1 = setTimeout((function() {
                        t.css({
                            "-webkit-transition-duration": e.options.speed + "ms",
                            "-webkit-transform": "translate3D(0,0,0)",
                            clip: "rect(auto, " + e.outerWidth + "px, auto, " + e.outerWidth + "px)",
                            opacity: 1,
                            zIndex: 3
                        }), i.css({
                            "-webkit-transition-duration": e.options.speed + "ms",
                            opacity: 1,
                            "-webkit-transform": "translate3D(0,0,0)"
                        })
                    }), 100)), t.removeClass("active"), this._timeoutId2 && (clearTimeout(this._timeoutId2), this._timeoutId2 = 0), this._timeoutId2 = setTimeout((function() {
                        i.removeClass("next-item"), t.removeClass("prev-item"), e.isAnimating = !1, e.animateIndicator("start")
                    }), this.options.speed)
                }
                if ("bubble" === this.options.animations) {
                    t.css({
                        zIndex: 1
                    }), 1 === this.delta && i.css({
                        "-webkit-transition-duration": ".25s",
                        "-webkit-transform": "scale3D(1,1,1)",
                        "-webkit-transition-timing-function": "cubic-bezier(1, 0.26, 0.18, 1.22)",
                        zIndex: 2,
                        opacity: 1
                    }), -1 === this.delta && i.css({
                        "-webkit-transition-duration": ".25s",
                        "-webkit-transform": "scale3D(1,1,1)",
                        "-webkit-transition-timing-function": "cubic-bezier(1, 0.26, 0.18, 1.22)",
                        zIndex: 2,
                        opacity: 1
                    }), this._timeoutId1 = setTimeout((function() {
                        i.css({
                            "-webkit-transition-duration": e.options.speed + "ms",
                            "-webkit-transform": "scale3D(1,1,1)",
                            "-webkit-transition-timing-function": "linear",
                            opacity: 1,
                            "clip-path": "circle(100% at 50% 50%)"
                        })
                    }), 500), this._timeoutId2 && (clearTimeout(this._timeoutId2), this._timeoutId2 = 0), this._timeoutId2 = setTimeout((function() {
                        var s = Math.floor(50 * Math.random()) + 20,
                            o = Math.floor(40 * Math.random()) + 20;
                        t.css({
                            "-webkit-transition-duration": "0s",
                            "-webkit-transform": "scale3D(0,0,0)",
                            "clip-path": "circle(" + e.options.bubble_size + " at " + s + "% " + o + "%)",
                            opacity: 1,
                            visibility: "visible",
                            zIndex: 1
                        }), t.removeClass("active"), i.removeClass("next-item"), t.removeClass("prev-item"), e.isAnimating = !1, e.animateIndicator("start")
                    }), this.options.speed + 500)
                }
                this.resetItemVideoFrame(t), this.options.autoplay && 0 === this.timer && !1 === this.videoPlaying && this.startLoop(), this.updateCaption()
            },
            hideOtherItemCaptions: function() {
                var i = this,
                    e = function(e) {
                        var s = t(e).find('[data-layer="true"]');
                        s.length > 0 && s.each((function(e, s) {
                            var o = i.options.speed;
                            t(s).css({
                                transition: "opacity " + o + "ms linear",
                                opacity: 0
                            }), setTimeout((function() {
                                t(s).css({
                                    visibility: "hidden"
                                })
                            }), i.options.speed)
                        }))
                    };
                this.item.next(".sp-item").length > 0 && this.item.nextAll(".sp-item").each((function(t, i) {
                    e(i)
                }));
                this.item.prev(".sp-item").length > 0 && this.item.prevAll(".sp-item").each((function(t, i) {
                    e(i)
                }))
            },
            updateCaption: function() {
                var i = this.item.find('[data-layer="true"]');
                if (this.hideOtherItemCaptions(), i.length > 0) {
                    var e = this,
                        s = this.captionAnimation();
                    i.each((function(i) {
                        t(this).css({
                            visibility: "visible"
                        });
                        var o = t(this).attr("data-animation");
                        if (void 0 !== o) {
                            var n = Object.assign({}, e.captionAnimationProperty);
                            void 0 !== o && (o = JSON.parse(o)), (o = Object.assign(n, o)).after = parseInt(o.after), "width" === o.type && s.width(t(this), o), "text-animate" === o.type && s.text(t(this), o), "slide" === o.type && s.slider(t(this), o), "zoom" === o.type && s.zoom(t(this), o), "rotate" === o.type && s.rotate(t(this), o), "flip" === o.type && s.flip(t(this), o)
                        }
                    }))
                }
            },
            captionAnimation: function() {
                var i = {
                    text: function(i, e) {
                        var s = "0px",
                            o = "0px";
                        if ("top" === e.direction && (o = "-500px"), "bottom" === e.direction && (o = "500px"), "left" === e.direction && (s = "-500px"), "right" === e.direction && (s = "500px"), i.css({
                                visibility: "visibile",
                                opacity: 1
                            }), i.hasClass("sp-letter-trimed")) self = this, i.find("span").each((function() {
                            t(this).css({
                                transform: "translateY(" + o + ") translateX(" + s + ")",
                                display: "inline-block",
                                opacity: 0
                            })
                        }));
                        else {
                            var n = i.text().trim().split("");
                            i.empty(), t.each(n, (function(t, e) {
                                if (" " !== e) {
                                    var n = '<span class="sp-txt' + t + '" style="transform: translateY(' + o + ") translateX(" + s + '); display:inline-block; opacity:0">' + e + "</span>";
                                    i.append(n)
                                } else i.append("&nbsp;")
                            })), i.addClass("sp-letter-trimed")
                        }
                        setTimeout((function() {
                            var s = i.find("span");
                            s.each((function(i, o) {
                                var n = this,
                                    a = (i + 1) * (e.duration / s.length) + 500;
                                setTimeout((function() {
                                    t(n).css({
                                        opacity: 1,
                                        "-webkit-transition-property": "opacity transform",
                                        transform: "translateY(0px) translateX(0)",
                                        "-webkit-transition-duration": e.duration + "ms",
                                        "-webkit-transition-timing-function": e.timing_function
                                    })
                                }), a)
                            }))
                        }), e.after)
                    },
                    width: function(t, i) {
                        t.css({
                            width: i.from,
                            "-webkit-transition-duration": "0s",
                            overflow: "hidden"
                        }), setTimeout((function() {
                            t.css({
                                width: i.to,
                                "-webkit-transition-duration": i.duration + "ms",
                                "-webkit-transition-timing-function": i.timing_function,
                                "-webkit-transition-property": "width transform"
                            })
                        }), i.after)
                    },
                    slider: function(t, i) {
                        "left" === i.direction && (t.css({
                            opacity: "0",
                            "-webkit-transform": "translateX(-" + i.from + ")",
                            "-webkit-transition-duration": "0s"
                        }), this.sliderVertical(t, i)), "right" === i.direction && (t.css({
                            opacity: "0",
                            "-webkit-transform": "translateX(" + i.from + ")",
                            "-webkit-transition-duration": "0s"
                        }), this.sliderVertical(t, i)), "top" === i.direction && (t.css({
                            opacity: "0",
                            "-webkit-transform": "translateY(" + i.from + ")",
                            "-webkit-transition-duration": "0s"
                        }), this.sliderHorizontal(t, i)), "bottom" === i.direction && (t.css({
                            opacity: "0",
                            "-webkit-transform": "translateY(" + i.from + ")",
                            "-webkit-transition-duration": "0s"
                        }), this.sliderHorizontal(t, i))
                    },
                    sliderVertical: function(t, i) {
                        setTimeout((function() {
                            t.css({
                                opacity: "1",
                                "-webkit-transition-duration": i.duration + "ms",
                                "-webkit-transition-timing-function": i.timing_function,
                                "-webkit-transition-property": "opacity, transform, height, width",
                                "-webkit-transition-origin": "50% 50% 0",
                                "-webkit-transform": "translateX(" + i.to + ")"
                            })
                        }), i.after)
                    },
                    sliderHorizontal: function(t, i) {
                        setTimeout((function() {
                            t.css({
                                opacity: "1",
                                "-webkit-transition-duration": i.duration + "ms",
                                "-webkit-transition-timing-function": i.timing_function,
                                "-webkit-transition-property": "opacity, transform, height, width",
                                "-webkit-transition-origin": "50% 50% 0",
                                "-webkit-transform": "translateY(" + i.to + ")"
                            })
                        }), i.after)
                    },
                    zoom: function(t, i) {
                        "zoomIn" === i.direction && (t.css({
                            opacity: 1,
                            "-webkit-transform": "scale(" + i.from + ")",
                            "-webkit-transition-duration": "0s"
                        }), this.zooming(t, i)), "zoomOut" === i.direction && (t.css({
                            opacity: 1,
                            "-webkit-transform": "scale(" + i.from + ")",
                            "-webkit-transition-duration": "0s"
                        }), this.zooming(t, i))
                    },
                    zooming: function(t, i) {
                        setTimeout((function() {
                            t.css({
                                opacity: 1,
                                "-webkit-transition-duration": i.duration + "ms",
                                "-webkit-transition-timing-function": i.timing_function,
                                "-webkit-transition-property": "transform, scale",
                                "-webkit-transition-origin": "50% 50% 0",
                                "-webkit-transform": "scale(" + i.to + ")"
                            })
                        }), i.after)
                    },
                    rotate: function(t, i) {
                        t.css({
                            "-webkit-transform": "rotate(" + i.from + ")",
                            "-webkit-transition-duration": "0s",
                            opacity: 0
                        }), this.rotating(t, i)
                    },
                    rotating: function(t, i) {
                        setTimeout((function() {
                            t.css({
                                "-webkit-transition-duration": i.duration + "ms",
                                "-webkit-transition-timing-function": i.timing_function,
                                "-webkit-transition-property": "transform,rotate",
                                "-webkit-transition-origin": i.origin,
                                "-webkit-transform": "rotate(" + i.to + ")",
                                opacity: 1
                            })
                        }), i.after)
                    },
                    flip: function(t, i) {
                        var e = 0,
                            s = 0,
                            o = 180;
                        "x" === i.direction && (e = 1), "y" === i.direction && (s = 1, o *= -1), "x" !== i.direction && "y" !== i.direction && (e = 1), t.css({
                            "-webkit-transform": "perspective(400px) rotate3d(" + e + ", " + s + ", 0, " + o + "deg)",
                            "-webkit-transition-duration": "0s",
                            "backface-visibility": "hidden",
                            opacity: 1
                        }), this.fliping(t, i)
                    },
                    fliping: function(t, i) {
                        setTimeout((function() {
                            t.css({
                                "-webkit-transition-duration": i.duration + "ms",
                                "-webkit-transition-timing-function": i.timing_function,
                                "-webkit-transition-property": "transform,rotate,opacity",
                                "-webkit-transition-origin": i.origin,
                                "-webkit-transform": "perspective(400px) rotate3d(0, 0, 0, 0deg)",
                                opacity: 1
                            })
                        }), i.after)
                    }
                };
                return i
            },
            dragoverActionToNextItem: function(t) {
                if ("fade" === this.options.animations) {
                    if (this.item.next(".sp-item").length) this.item.next(".sp-item").addClass("next-item").css({
                        opacity: t
                    });
                    else this.$element.find(".sp-item:first-child").addClass("next-item").css({
                        opacity: t
                    });
                    this.item.addClass("prev-item").css({
                        opacity: 1 - t
                    })
                }
                if ("slide" === this.options.animations || "stack" === this.options.animations) {
                    this.$element.find(".dragenable").css({
                        "-webkit-transition-duration": "0s",
                        "-webkit-transform": "translate3D(0,0,0)"
                    }).removeClass("dragenable next-item");
                    var i = t > 100 ? 100 : t;
                    this.item.addClass("prev-item");
                    var e = "";
                    e = this.item.next(".sp-item").length ? this.item.next(".sp-item") : this.$element.find(".sp-item:first-child");
                    var s = {
                            "-webkit-transition-duration": "0s",
                            "-webkit-transform": "translate3D(-" + i + "%,0,0)"
                        },
                        o = {
                            x: 100 - i + "%",
                            y: 0,
                            z: 0
                        };
                    this.options.vertical_mode && (o = Object.assign({}, o, {
                        x: 0,
                        y: 100 - i + "%"
                    }));
                    var n = {
                        "-webkit-transition-duration": "0s",
                        "-webkit-transform": "translate3D(" + o.x + "," + o.y + "," + o.z + ")"
                    };
                    "stack" === this.options.animations && (n.opacity = 1, n.zIndex = 3), "slide" === this.options.animations && this.item.css(s), e.addClass("dragenable next-item").css(n)
                }
                if ("zoomIn" === this.options.animations || "zoomOut" === this.options.animations) {
                    var a = this.options.animations,
                        r = .1 * t;
                    "zoomOut" === a && (r = (r += 1) > 2 ? 2 : r), "zoomIn" === a && (r = (r = 1 - r) < 0 ? 0 : r), this.item.addClass("prev-item");
                    (this.item.next(".sp-item").length ? this.item.next(".sp-item") : this.$element.find(".sp-item:first-child")).addClass("dragenable next-item").css({
                        "-webkit-transition-duration": "0s",
                        "-webkit-transform-origin": "50% 50% 50%",
                        "-webkit-transform": "scale3d(1,1,1)",
                        opacity: 1,
                        zIndex: 1
                    }), this.item.css({
                        "-webkit-transition-duration": "0s",
                        "-webkit-transform-origin": "50% 50% 50%",
                        "-webkit-transform": "scale3d(" + r + "," + r + "," + r + ")",
                        opacity: 1 - .1 * t,
                        zIndex: 2
                    })
                }
                if ("clip" === this.options.animations) {
                    var d = .001 * t;
                    d = d > 1 ? 1 : d;
                    var l = t > this.outerWidth ? this.outerWidth : t,
                        c = 15,
                        h = c - Math.abs(l * (c / 1e3));
                    c = h > c ? c : h < 0 ? 0 : h, this.item.addClass("prev-item");
                    var m = "";
                    m = this.item.next(".sp-item").length ? this.item.next(".sp-item") : this.$element.find(".sp-item:first-child"), this.item.css({
                        "-webkit-transition-duration": "0s",
                        "-webkit-transform": "translate3D(0,0,0)",
                        clip: "rect(auto, " + (this.outerWidth - l) + "px, auto, 0px)",
                        opacity: 1,
                        zIndex: 3
                    }), m.addClass("next-item").css({
                        "-webkit-transition-duration": "0s",
                        "-webkit-transform": "translate3D(" + c + "%,0,0)",
                        clip: "rect(auto, " + this.outerWidth + "px, auto, 0px)",
                        zIndex: 2,
                        opacity: d
                    })
                }
            },
            dragoverActionToPrevItem: function(t) {
                if ("fade" === this.options.animations) {
                    if (this.item.prev(".sp-item").length) this.item.prev(".sp-item").addClass("next-item").css({
                        opacity: t
                    });
                    else this.$element.find(".sp-item:last-child").addClass("next-item").css({
                        opacity: t
                    });
                    this.item.addClass("prev-item").css({
                        opacity: 1 - t
                    })
                }
                if ("slide" === this.options.animations || "stack" === this.options.animations) {
                    this.$element.find(".dragenable").css({
                        "-webkit-transition-duration": "0s",
                        "-webkit-transform": "translate3D(0,0,0)"
                    }).removeClass("dragenable next-item");
                    var i = t > 100 ? 100 : t,
                        e = "";
                    this.item.addClass("prev-item"), e = this.item.prev(".sp-item").length ? this.item.prev(".sp-item") : this.$element.find(".sp-item:last-child");
                    var s = {
                        x: i - 100 + "%",
                        y: 0,
                        z: 0
                    };
                    this.options.vertical_mode && (s = Object.assign({}, s, {
                        x: 0,
                        y: i - 100 + "%"
                    }));
                    var o = {
                            "-webkit-transition-duration": "0s",
                            "-webkit-transform": "translate3D(" + s.x + "," + s.y + "," + s.z + ")"
                        },
                        n = {
                            "-webkit-transition-duration": "0s",
                            "-webkit-transform": "translate3D(" + i + "%,0,0)"
                        };
                    "stack" === this.options.animations && (o.opacity = 1, o.zIndex = 3), "slide" === this.options.animations && this.item.css(n), e.addClass("dragenable next-item").css(o)
                }
                if ("zoomIn" === this.options.animations || "zoomOut" === this.options.animations) {
                    var a = this.options.animations,
                        r = .25 * t;
                    "zoomOut" === a && (r = (r += 1) > 2 ? 2 : r), "zoomIn" === a && (r = (r = 1 - r) < .2 ? .2 : r), this.item.addClass("prev-item");
                    (this.item.prev(".sp-item").length ? this.item.prev(".sp-item") : this.$element.find(".sp-item:last-child")).addClass("dragenable next-item").css({
                        "-webkit-transition-duration": "0s",
                        "-webkit-transform-origin": "50% 50% 50%",
                        "-webkit-transform": "scale3d(1,1,1)",
                        opacity: 1,
                        zIndex: 1
                    }), this.item.css({
                        "-webkit-transition-duration": "0s",
                        "-webkit-transform-origin": "50% 50% 50%",
                        "-webkit-transform": "scale3d(" + r + "," + r + "," + r + ")",
                        opacity: 1 - .1 * t,
                        zIndex: 2
                    })
                }
                if ("clip" === this.options.animations) {
                    var d = .001 * t;
                    d = d > 1 ? 1 : Math.abs(d);
                    var l = t > this.outerWidth ? this.outerWidth : t;
                    l = Math.abs(l);
                    var c = 5,
                        h = c - Math.abs(l * (c / 1e3));
                    c = h > c ? c : h < 0 ? 0 : h, this.item.addClass("prev-item");
                    var m = "";
                    m = this.item.prev(".sp-item").length ? this.item.prev(".sp-item") : this.$element.find(".sp-item:last-child"), this.item.css({
                        "-webkit-transition-duration": "0s",
                        "-webkit-transform": "translate3D(0,0,0)",
                        clip: "rect(auto, " + this.outerWidth + "px, auto, " + l + "px)",
                        opacity: 1,
                        zIndex: 3
                    }), m.addClass("next-item").css({
                        "-webkit-transition-duration": "0s",
                        "-webkit-transform": "translate3D(-" + c + "%,0,0)",
                        clip: "rect(auto, " + this.outerWidth + "px, auto, 0px)",
                        zIndex: 2,
                        opacity: d
                    })
                }
            },
            resetCoordiante: function() {
                var t = this.prevCoordinate.diff;
                "fade" === this.options.animations && (t > 0 && (this.item.next(".sp-item").length ? this.item.next(".sp-item").css({
                    opacity: 0
                }) : this.$element.find(".sp-item:first-child").css({
                    opacity: 0
                })), t < 0 && (this.item.prev(".sp-item").length ? this.item.prev(".sp-item").css({
                    opacity: 0
                }) : this.$element.find(".sp-item:last-child").css({
                    opacity: 0
                })), this.item.css({
                    opacity: 1
                })), this.$element.find(".dragenable").removeClass("dragenable"), this.prevCoordinate = {
                    x: 0,
                    y: 0,
                    diff: 0,
                    dragPointer: -1
                }, this.coordinate = {
                    x: 0,
                    y: 0
                }, this.options.autoplay && 0 === this.timer && !1 === this.videoPlaying && this.startLoop()
            },
            backToStage: function() {
                var t = this,
                    i = this.options.animations;
                if ("zoomIn" !== i && "zoomOut" !== i || this.item.css({
                        "-webkit-transition-duration": this.options.speed + "ms",
                        "-webkit-transform": "scale3d(1,1,1)",
                        opacity: 1
                    }), "slide" === i || "stack" === i) {
                    var e = this.$element.find(".next-item"),
                        s = this.prevCoordinate.diff,
                        o = {
                            x: "100%",
                            y: 0,
                            z: 0
                        };
                    this.options.vertical_mode && (o = Object.assign({}, o, {
                        x: 0,
                        y: "100%"
                    })), s > 0 && e.css({
                        "-webkit-transition-duration": this.options.speed + "ms",
                        "-webkit-transform": "translate3d(" + o.x + "," + o.y + "," + o.z + ")"
                    }), s < 0 && e.css({
                        "-webkit-transition-duration": this.options.speed + "ms",
                        "-webkit-transform": "translate3d(-" + o.x + ",-" + o.y + "," + o.z + ")"
                    }), setTimeout((function() {
                        e.removeClass("next-item"), t.item.removeClass("prev-item")
                    }), this.options.speed), this.item.css({
                        "-webkit-transition-duration": this.options.speed + "ms",
                        "-webkit-transform": "translate3d(0,0,0)"
                    })
                }
            },
            bindEvents: function() {
                var s = this;
                s.options.nav && (s.$nextBtn.on("click." + s._name, (function(t) {
                    !1 === s.isAnimating && (s.options.autoplay && s.stopLoop("bindEvents"), s.Next(), s.checkCallBackMethod.call(s))
                })), s.$prevBtn.on("click." + s._name, (function(t) {
                    !1 === s.isAnimating && (s.Prev(), s.options.autoplay && s.stopLoop("bindEvents"), s.checkCallBackMethod.call(s))
                }))), s.options.dots && s.$dotContainer.find("li").each((function(i) {
                    t(this).on("click." + s._name, (function(e) {
                        if (t(this).hasClass("active") || !0 === s.isAnimating) return !1;
                        s.options.autoplay && s.stopLoop("bindEvents");
                        var o = t(this).parent().find("li.active"),
                            n = s.$dotContainer.find("li").index(o) > i ? -1 : 1;
                        s.slideFromPosition(i + 1, n), s.updateDotsFromPosition(i + 1), s.checkCallBackMethod.call(s)
                    }))
                })), t(e).on("click." + s._name, "#" + s.options.addon_id + " .sp-volumn-control", this.controlVideoVolumn.bind(this)), s.$outerStage.on("mouseenter." + s._name, t.proxy(s.onMouseEnter, s)), s.$outerStage.on("mouseleave." + s._name, t.proxy(s.onMouseLeave, s)), s.$outerStage.on("mousedown." + s._name, t.proxy(s.onDragStart, s)), s.$outerStage.on("mouseup." + s._name + " touchend." + s._name, t.proxy(s.onDragEnd, s)), s.$outerStage.on("touchstart." + s._name, t.proxy(s.onDragStart, s)), s.$outerStage.on("touchcancel." + s._name, t.proxy(s.onDragEnd, s)), t(i).focus((function() {
                    s.options.autoplay && 0 === s.timer && !1 === this.videoPlaying && s.startLoop()
                })), t(i).blur((function() {
                    s.options.autoplay && s.stopLoop("window.blur"), s.destroy()
                })), t(i).on("resize." + s._name, t.proxy(s.windowResize, s))
            },
            windowResize: function(t) {
                void 0 !== t && this.updateResponsiveView()
            },
            parseResponsiveViewPort: function() {
                if (void 0 === this.options.responsive) return null;
                for (var t = this.options.responsive, e = null, s = i.innerWidth, o = 0; o < t.length; o++)
                    if (s > t[o].viewport) {
                        e = t[o];
                        break
                    }
                return null === e && (e = t[t.length - 1]), e
            },
            updateResponsiveView: function() {
                var t = i.innerHeight,
                    e = this.item.find("div[data-video_src]");
                if (e.length > 0 && this.resizeVideoIframeWithAspectRatio(e), void 0 !== this.options.responsive) {
                    var s = this.parseResponsiveViewPort();
                    if ("full" === s.height) {
                        if (this._lastViewPort === t) return;
                        this._lastViewPort = t, this.$outerStage.css({
                            height: t + "px"
                        })
                    } else {
                        if (this._lastViewPort === s.height) return;
                        this._lastViewPort = s.height, this.$outerStage.css({
                            height: s.height
                        })
                    }
                } else this.$outerStage.css({
                    height: t + "px"
                })
            },
            getPosition: function(t) {
                var e = {
                    x: null,
                    y: null
                };
                return (t = (t = t.originalEvent || t || i.event).touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t).pageX ? (e.x = t.pageX, e.y = t.pageY) : (e.x = t.clientX, e.y = t.clientY), e
            },
            onMouseEnter: function(t) {
                this.options.autoplay_stop_on_hover && (this.onMouseOver = !0), this.options.autoplay && this.timer > 0 && this.options.autoplay_stop_on_hover && !1 === this.videoPlaying && this.stopLoop("onMouseEnter")
            },
            onMouseLeave: function(t) {
                this.options.autoplay_stop_on_hover && (this.onMouseOver = !1), this.options.autoplay && 0 === this.timer && !1 === this.videoPlaying && this.options.autoplay_stop_on_hover && this.startLoop()
            },
            onDragStart: function(i) {
                var s = this;
                if (3 === i.which || 2 === i.which || !0 === s.isAnimating) return !1;
                var o = s.getPosition(i);
                s.coordinate.x = o.x, s.coordinate.y = o.y, t(e).one("mousemove." + s._name + " touchmove." + s._name, t.proxy((function(i) {
                    t(e).on("mousemove." + s._name + " touchmove." + s._name, t.proxy(s.onDragMove, s)), i.preventDefault()
                }), this)), s.isDragging = !0
            },
            onDragMove: function(t) {
                if (!1 !== this.isDragging) {
                    this.options.autoplay && this.stopLoop("onDragMove");
                    var i = this.getPosition(t),
                        e = this.coordinate,
                        s = this.prevCoordinate,
                        o = this.options.vertical_mode;
                    if (s.x !== i.x && !1 === o || s.y !== i.y && !0 === o) {
                        var n = o ? e.y - i.y : e.x - i.x,
                            a = 0;
                        a = "slide" === this.options.animations || "stack" === this.options.animations ? (.099 * Math.abs(n)).toFixed(0) : "clip" === this.options.animations ? n : (.005 * Math.abs(n)).toFixed(2), this.prevCoordinate = {
                            x: i.x,
                            y: i.y,
                            diff: n,
                            dragPointer: a
                        }, n > 0 && this.dragoverActionToNextItem(a), n < 0 && this.dragoverActionToPrevItem(a)
                    }
                    t.preventDefault()
                }
            },
            onDragEnd: function(t) {
                if (this.isDragging) {
                    var i = this.prevCoordinate.diff;
                    Math.abs(i) > 100 ? (i > 0 && this.Next(), i < 0 && this.Prev()) : this.backToStage(), this.isDragging = !1
                }
                this.resetCoordiante()
            },
            controlVideoVolumn: function(i) {
                var e = t(i.target),
                    s = e.attr("data-type"),
                    o = e.attr("data-index"),
                    n = this.player["item_" + o].player;
                "html5" === s && (n.muted = !n.muted, n.volume = n.muted ? 0 : 1), "youtube" === s && (n.isMuted() ? n.unMute() : n.mute()), "vimeo" === s && n.getVolume().then((function(t) {
                    n.setVolume(t > 0 ? 0 : 1)
                })), e.hasClass("sp-sound-enabled") ? e.removeClass("sp-sound-enabled fa-volume-up").addClass("fa-volume-off") : e.addClass("sp-sound-enabled fa-volume-up").removeClass("fa-volume-off")
            },
            checkCallBackMethod: function() {
                this.callback()
            },
            callback: function() {
                var t = this.options.onChange;
                if ("function" == typeof t) {
                    var i = this.$element.find(".sp-item").length,
                        e = {
                            item: this.item,
                            items: i,
                            element: this.$element
                        };
                    t.call(this.element, e)
                }
            }
        }), t.fn.jsSlider = function(i) {
            return this.each((function() {
                t.data(this, "jsSlider") || t.data(this, "jsSlider", new o(this, i))
            })), this
        }, t.fn.jsSlider.defaults = {
            animations: "3D",
            rotate: 10,
            autoplay: !1,
            autoplay_stop_on_hover: !1,
            bubble_size: "40px",
            indicator: !0,
            indicator_type: "line",
            indicator_class: "",
            speed: 800,
            interval: 4500,
            onChange: null,
            vertical_mode: !1,
            dots: !0,
            dots_class: "",
            dot_indicator: !0,
            show_number: !1,
            slider_number_class: "",
            nav: !0,
            nav_text: ["<", ">"]
        }
    }(jQuery, window, document),
    function(t) {
        t(document).ready((function() {
            t(".sppb-addon-sp-slider").each((function(i) {
                var e = t(this),
                    s = e.data("id"),
                    o = e.data("height"),
                    n = e.data("height-sm"),
                    a = e.data("height-xs"),
                    r = e.data("slider-animation"),
                    d = e.data("slide-vertically"),
                    l = e.data("3d-rotate"),
                    c = e.data("autoplay"),
                    h = e.data("pause-hover"),
                    m = e.data("interval"),
                    p = e.data("timer"),
                    u = e.data("speed"),
                    f = e.data("dot-control"),
                    v = e.data("arrow-control"),
                    b = e.data("indecator"),
                    y = e.data("arrow-content"),
                    g = e.data("dot-style");
                g = "with_text" === g ? ".sp-slider-custom-dot-indecators" : "";
                var w = e.data("slide-count"),
                    x = "",
                    k = "";
                if ("icon_only" === y ? (x = '<i class="fa fa-angle-left"></i>', k = '<i class="fa fa-angle-right"></i>') : "long_arrow" === y ? (x = '<i class="fa fa-long-arrow-left"></i>', k = '<i class="fa fa-long-arrow-right"></i>') : "icon_with_text" === y ? (x = '<i class="fa fa-long-arrow-left"></i> Prev', k = 'Next <i class="fa fa-long-arrow-right"></i>') : (x = "Prev", k = "Next"), e.jsSlider({
                        autoplay: c,
                        autoplay_stop_on_hover: h,
                        animations: r,
                        rotate: l,
                        vertical_mode: d,
                        interval: m,
                        indicator: p,
                        speed: u,
                        dots_class: g,
                        dots: f,
                        dot_indicator: b,
                        nav: v,
                        nav_text: [x, k],
                        show_number: w,
                        addon_id: s,
                        responsive: [{
                            viewport: 1170,
                            height: o
                        }, {
                            viewport: 600,
                            height: n
                        }, {
                            viewport: 480,
                            height: "480px"
                        }, {
                            viewport: 320,
                            height: a
                        }]
                    }), t(".sp-slider-custom-dot-indecators").length > 0) {
                    var _ = t(".sp-slider-custom-dot-indecators ul li"),
                        C = _.outerWidth(!0),
                        I = _.length,
                        $ = C * I;
                    t(".sp-slider-custom-dot-indecators ul").css("width", $ + "px"), t(".sp-slider-custom-dot-indecators").outerWidth(!0) < $ && t(".sp-slider-custom-dot-indecators").css("overflowX", "scroll"), t(window).on("resize", (function() {
                        var i = C * I;
                        t(".sp-slider-custom-dot-indecators").outerWidth(!0) < i && t(".sp-slider-custom-dot-indecators").css("overflowX", "scroll")
                    }))
                }
            }));
            new MutationObserver((function(i) {
                i.forEach((function(i) {
                    var e = i.addedNodes;
                    null !== e && t(e).each((function() {
                        t(this).find(".sppb-addon-sp-slider").each((function() {
                            var i = t(this),
                                e = i.data("id"),
                                s = i.data("height"),
                                o = i.data("height-sm"),
                                n = i.data("height-xs"),
                                a = i.data("slider-animation"),
                                r = i.data("slide-vertically"),
                                d = i.data("3d-rotate"),
                                l = i.data("autoplay"),
                                c = i.data("pause-hover"),
                                h = i.data("interval"),
                                m = i.data("timer"),
                                p = i.data("speed"),
                                u = i.data("dot-control"),
                                f = i.data("arrow-control"),
                                v = i.data("indecator"),
                                b = i.data("arrow-content"),
                                y = i.data("dot-style");
                            y = "with_text" === y ? ".sp-slider-custom-dot-indecators" : "";
                            var g = i.data("slide-count"),
                                w = "",
                                x = "";
                            if ("icon_only" === b ? (w = '<i class="fa fa-angle-left"></i>', x = '<i class="fa fa-angle-right"></i>') : "long_arrow" === b ? (w = '<i class="fa fa-long-arrow-left"></i>', x = '<i class="fa fa-long-arrow-right"></i>') : "icon_with_text" === b ? (w = '<i class="fa fa-long-arrow-left"></i> Prev', x = 'Next <i class="fa fa-long-arrow-right"></i>') : (w = "Prev", x = "Next"), i.jsSlider({
                                    autoplay: l,
                                    autoplay_stop_on_hover: c,
                                    animations: a,
                                    vertical_mode: r,
                                    rotate: d,
                                    interval: h,
                                    indicator: m,
                                    speed: p,
                                    dots: u,
                                    dots_class: y,
                                    dot_indicator: v,
                                    nav: f,
                                    nav_text: [w, x],
                                    show_number: g,
                                    addon_id: e,
                                    responsive: [{
                                        viewport: 1170,
                                        height: s
                                    }, {
                                        viewport: 600,
                                        height: o
                                    }, {
                                        viewport: 480,
                                        height: "480px"
                                    }, {
                                        viewport: 320,
                                        height: n
                                    }]
                                }), t(".sp-slider-custom-dot-indecators").length > 0) {
                                var k = t(".sp-slider-custom-dot-indecators ul li"),
                                    _ = k.outerWidth(!0),
                                    C = k.length,
                                    I = _ * C;
                                t(".sp-slider-custom-dot-indecators ul").css("width", I + "px"), t(".sp-slider-custom-dot-indecators").outerWidth(!0) < I && t(".sp-slider-custom-dot-indecators").css("overflowX", "scroll"), t(window).on("resize", (function() {
                                    var i = _ * C;
                                    t(".sp-slider-custom-dot-indecators").outerWidth(!0) < i && t(".sp-slider-custom-dot-indecators").css("overflowX", "scroll")
                                }))
                            }
                        }))
                    }))
                }))
            })).observe(document.body, {
                childList: !0,
                subtree: !0
            })
        }))
    }(jQuery);