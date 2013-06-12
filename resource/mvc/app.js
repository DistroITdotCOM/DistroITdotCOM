var Siapku_Interface = {
    baseUrl: false,
    statikUrl: false,
    xdmLoader: false,
    statikVersion: false,
    statikPath: false,
    htmlCache: false,
    initXdmlLoader: function() {
        this.xdmLoader = new easyXDM.Rpc({
            remote: Siapku_Interface.statikUrl + Siapku_Interface.statikPath + "/" + Siapku_Interface.statikVersion + "/html/cors/index.html"
        }, {
            remote: {
                request: {}
            }
        })
    },
    loadHtml: function(e, b, i, j, h) {
        var d = false;
        if (i) {
            var f;
            var d = $(b).css("background");
            $(b).css({
                background: "no-repeat center"
            });
            $(b).addClass("ic-load");
            if (j) {
                $("html, body").animate({
                    scrollTop: $(b).offset().top
                }, 500)
            }
        }
        if (!this.xdmLoader) {
            this.initXdmlLoader()
        }
        var g = Siapku_Interface.statikUrl + Siapku_Interface.statikPath + "/" + Siapku_Interface.statikVersion + "/html/" + e;
        if (this.htmlCache) {
            Cache.enable()
        } else {
            Cache.disable()
        }
        if (Cache.get(g)) {
            var c = Cache.get(g);
            var a = $(c).hide();
            if (i) {
                $(b).css({
                    background: d
                });
                $(b).removeClass("ic-load")
            }
            a.appendTo($(b)).slideDown("fast");
            $(a).promise().done(function() {
                $(this).attr("style", "");
                Siapku_Interface.forceClearScreen();
                if (h) {
                    h()
                }
            })
        } else {
            this.xdmLoader.request({
                url: g,
                method: "GET"
            }, function(k) {
                var l = k.data;
                Cache.set(g, l);
                var m = $(l).hide();
                if (i) {
                    $(b).css({
                        background: d
                    });
                    $(b).removeClass("ic-load")
                }
                m.appendTo($(b)).slideDown("fast");
                $(m).promise().done(function() {
                    $(this).attr("style", "");
                    Siapku_Interface.forceClearScreen();
                    if (h) {
                        h()
                    }
                })
            })
        }
    },
    loadTemplate: function(a, e) {
        if (!this.xdmLoader) {
            this.initXdmlLoader()
        }
        var d = Siapku_Interface.statikUrl + Siapku_Interface.statikPath + "/" + Siapku_Interface.statikVersion + "/html/template/" + a;
        if (this.htmlCache) {
            Cache.enable()
        } else {
            Cache.disable()
        }
        if (Cache.get(d)) {
            var b = Cache.get(d);
            var c = _.template(b);
            if (e) {
                e(c)
            } else {
                return c
            }
        } else {
            this.xdmLoader.request({
                url: d,
                method: "GET"
            }, function(f) {
                var g = f.data;
                Cache.set(d, g);
                var h = _.template(g);
                if (e) {
                    e(h)
                } else {
                    return h
                }
            })
        }
    },
    showMessage: function(a, e, k, h, l, i, c, f) {
        var j = new Date();
        var m = j.getTime();
        var g = '<div class="warn-cont js-appmessage_' + m + '">';
        g += '<div class="warn' + (k ? " " + k: "") + '" alt="' + h + '">';
        g += '<span alt="' + l + '">' + i + "</span>";
        g += "</div>";
        g += "</div>";
        if (!f) {
            f = 200
        }
        if (!c) {
            c = "append"
        }
        if (c == "prepend") {
            $(a).prepend($(g).hide().fadeIn(f))
        } else {
            $(a).append($(g).hide().fadeIn(f))
        }
        var b = $(g);
        if (e != "n") {
            $("html, body").animate({
                scrollTop: $(b).offset().top
            }, 500)
        }
        return m
    },
    hideMessage: function(c, a, b) {
        if (!a) {
            a = 200
        }
        if (a == -1) {
            $(".js-appmessage_" + c).hide();
            $(".js-appmessage_" + c).remove();
            if (b) {
                b.call();
            }
        } else {
            $(".js-appmessage_" + c).fadeOut(a, function() {
                $(".js-appmessage_" + c).remove();
                if (b) {
                    b.call()
                }
            })
        }
    },
    generatePagingWithRoute: function(a, b, c) {
        this.loadTemplate("paging_route.html", function(d) {
            $("#pager" + b.pagerId).remove();
            $("#pager_limiter" + b.pagerId).remove();
            $("#pager_page" + b.pagerId).remove();
            b.base_url = a;
            d = d(b);
            c(d)
        })
    },
    generatePagingNonRoute: function(a, b) {
        this.loadTemplate("paging.html", function(c) {
            $("#pager" + a.pagerId).remove();
            $("#pager_limiter" + a.pagerId).remove();
            $("#pager_page" + a.pagerId).remove();
            c = c(a);
            b(c)
        })
    },
    initUi: function() {
        $("a[href]").live("click", function() {
            if ($(this).attr("href") != "" && $(this).attr("href") != "javascript:;") {
                if ($(this).attr("href").indexOf("dashboard") != -1 || $(this).attr("href").indexOf("mail") != -1 || $(this).attr("href").indexOf("!/friends") != -1 || $(this).attr("href").indexOf("!/trend") != -1) {
                    $("#global-header").find(".js-komunitas-menu").removeClass("selected");
                    $("#global-header").find(".js-komunitas-dasbor").removeClass("selected");
                    $("#global-header").find(".js-komunitas-dasbor").addClass("selected")
                } else {
                    $("#global-header").find(".js-komunitas-dasbor").removeClass("selected");
                    $("#global-header").find(".js-komunitas-menu").removeClass("selected");
                    $("#global-header").find(".js-komunitas-menu").addClass("selected")
                }
            }
        });
        $("a[href]").live("click", function() {
            if (window.location.hash == $(this).attr("href")) {
                Backbone.history.loadUrl(Backbone.history.fragment)
            }
        });
        this.forceClearScreen();
        var b;
        var a = $("#siapTooltipObj");
        $("html").live("mouseup", function(c) {
            if ($(c.target).closest("#siapTooltipObj").length == 0) {
                $("#siapTooltipObj:visible").not($(c.target).closest("#siapTooltipObj")).remove()
            }
            if ($(c.target).closest(".tips-modal").length == 0) {
                $(".tips-modal").each(function() {
                    if ((typeof $(this).attr("id") != "undefined" && $(this).attr("id").indexOf("modalcardhov") >= 0) || typeof $(this).attr("id") != "undefined" && $(this).attr("id").indexOf("modal_followers_") >= 0) {
                        $(this).remove()
                    } else {
                        $(".tips-modal:visible").not($(c.target).closest(".tips-modal")).hide()
                    }
                })
            }
            if ($(c.target).closest(".modalbox").length == 0) {
                $(".modalbox:visible").not($(c.target).closest(".modalbox")).each(function() {
                    if ($(this).not(".js-block-modal")) {
                        $(this).remove();
                        $("body").attr("style", "");
                        $("li.feed").removeClass("selected")
                    }
                })
            }
            if ($(c.target).closest("#modal_autocomplete").length == 0) {
                $("#modal_autocomplete").remove()
            }
        });
        $(".modalbox").live("mouseup", function(c) {
            if ($(c.target).closest(".modalbox-dialog").length == 0 && $(c.target).closest(".tips-modal[id*=modal_followers_]").length == 0) {
                if ($(".modalbox[id*=modal_private_]:visible").length && $(".modalbox[id*=modal_message_]:visible").length) {
                    if ($(c.target).closest(".modalbox[id*=modal_message_]").length) {
                        $(c.target).closest(".modalbox[id*=modal_message_]").remove();
                        $("li.feed").removeClass("selected")
                    }
                } else {
                    if (!$(this).is(".js-block-modal")) {
                        $(".modalbox:visible").not($(c.target).closest(".modalbox-dialog")).remove();
                        $("body").attr("style", "");
                        $("li.feed").removeClass("selected")
                    }
                }
            }
        });
        $(".modalbox-cls").die().live("click", function(c) {
            c.preventDefault();
            $(this).closest(".modalbox").remove();
            $("body").attr("style", "");
            $("li.feed").removeClass("selected")
        });
        $(".modalbox-cls2").die().live("click", function(c) {
            c.preventDefault();
            $(this).closest(".modalbox").remove();
            $("body").attr("style", "");
            $("li.feed").removeClass("selected")
        });
        $(".tips, .tips-on, .tips-m, .tips-r, .tips-t, .tips-tr, .tips-tm, .tips-ls, .tips-rs").live({
            mouseenter: function() {
                var m = $("#siapTooltipObj");
                if (typeof m.get(0) == "undefined") {
                    m = $("body").append('<div id="siapTooltipObj" class="tips-msg rnd5 sdw"><div class="msg">Pesan</div></span>')
                }
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
                m = $("#siapTooltipObj").css({
                    top: 0,
                    left: 0
                }).data("stickybubble", $(this).is(".tips-on") || $(this).is(".ic-help"));
                var k = m.find(".msg").html($(this).data("siaptip")).closest(".tips-msg").outerWidth();
                var d = m.outerHeight();
                var g = $(this).outerWidth();
                var r = $(this).innerHeight();
                var f = $(this).offset().left;
                var e = $(this).offset().top;
                var j = (f >= $("body").innerWidth() - k);
                var l = $(this).is(".list-more");
                var i = f - (j ? (k - g - 11) : (l ? (g - k) / -2: 11));
                var q = (k < g ? k - 20: g);
                if (q < 15) {
                    q = 15
                }
                var h = e + $(this).innerHeight() + 8;
                var o = 22;
                var n = d + 12;
                var c = $("body").innerWidth() - o;
                var s = $("body").innerHeight() - n;
                var p = "b";
                if ($(this).is(".tips-r")) {
                    p = "r"
                }
                if ($(this).is(".tips-m") || $(this).is(".list-more")) {
                    p = "m"
                }
                if ($(this).is(".tips-t")) {
                    p = "t"
                }
                if ($(this).is(".tips-tr")) {
                    p = "tr"
                }
                if ($(this).is(".tips-tm")) {
                    p = "tm"
                }
                if ($(this).is(".tips-ls")) {
                    p = "ls"
                }
                if ($(this).is(".tips-rs")) {
                    p = "rs"
                }
                if (p == "m" && e >= s) {
                    p = "tm"
                }
                if (p == "tm" && e <= n) {
                    p = "m"
                }
                if (p == "m" && f >= $("body").innerWidth() - k / 2) {
                    p = "r"
                }
                if (p == "tm" && f >= $("body").innerWidth() - k / 2) {
                    p = "tr"
                }
                if (p == "m" && f <= k / 2) {
                    p = "b"
                }
                if (p == "tm" && f <= k / 2) {
                    p = "t"
                }
                if (p == "b" && f >= $("body").innerWidth() - k) {
                    p = "r"
                }
                if (p == "t" && f >= $("body").innerWidth() - k) {
                    p = "tr"
                }
                if (p == "b" && e >= $("body").innerHeight() - (d + 12)) {
                    p = "t"
                }
                if (p == "t" && e <= n) {
                    p = "b"
                }
                if (p == "r" && e >= $("body").innerHeight() - (d + 12)) {
                    p = "tr"
                }
                if (p == "tr" && e <= n) {
                    p = "r"
                }
                if (p == "r" && f <= k) {
                    p = "b"
                }
                if (p == "tr" && f <= k) {
                    p = "t"
                }
                if ((p == "r" || p == "tr") && f + g / 2 >= c) {
                    p = "ls"
                }
                if ((p == "b" || p == "t") && f + g / 2 <= o) {
                    p = "rs"
                }
                var i = (f + (g / 2)) - 22;
                if (g > k) {
                    i = f
                }
                var h = e + r + 12;
                if (p == "r") {
                    i = (f + (g / 2)) - (k - 22);
                    m.addClass("tips-r")
                }
                if (p == "m") {
                    i = (f + (g / 2)) - (k / 2);
                    m.addClass("tips-m")
                }
                if (p == "t") {
                    h = e - (d + 12);
                    m.addClass("tips-t")
                }
                if (p == "tr") {
                    i = (f + (g / 2)) - (k - 22);
                    h = e - (d + 12);
                    m.addClass("tips-tr")
                }
                if (p == "tm") {
                    i = (f + (g / 2)) - (k / 2);
                    h = e - (d + 12);
                    m.addClass("tips-tm")
                }
                if (p == "ls") {
                    i = f - (k + 12);
                    h = e - ((d - r) / 2);
                    m.addClass("tips-ls")
                }
                if (p == "rs") {
                    i = f + g + 12;
                    h = e - ((d - r) / 2);
                    m.addClass("tips-rs")
                }
                m.css({
                    top: h,
                    left: i
                }).show();
                clearInterval(b);
                if (!$(this).data("sticky")) {
                    b = window.setInterval(function() {
                        m.hide();
                        clearInterval(b)
                    }, 4000)
                }
            },
            mouseleave: function() {
                clearInterval(b);
                if (!$(this).data("sticky")) {
                    $("#siapTooltipObj").remove()
                } else {
                    b = window.setInterval(function() {
                        $("#siapTooltipObj").remove();
                        clearInterval(b)
                    }, 4000)
                }
            }
        });
        $(".tips, .tips-on").live("blur", function() {
            if (!$(this).data("sticky")) {
                clearInterval(b);
                $("#siapTooltipObj").hide()
            }
        });
        a.live({
            mouseenter: function() {
                if ($(this).data("stickybubble")) {
                    clearInterval(b);
                    $(this).show()
                }
            },
            mouseleave: function() {
                if ($(this).data("stickybubble")) {
                    $(this).hide()
                }
            }
        });
        $(document).keyup(function(c) {
            if (c.keyCode == 27) {
                $(".modalbox").each(function() {
                    if (!$(this).is(".js-block-modal") && !$(this).is(".modalbox[id*=modal_repost_]")) {
                        $(".modalbox").remove();
                        $("body").attr("style", "")
                    }
                })
            }
        });
        this.hoverCard();
        this.modalPostList();
        this.modalRelationUser();
        this.modalRelationGroup();
        this.modalPrivateMessage();
        this.actionFollow();
        this.pagerModal();
        this.displaySwitcher();
        this.imageModal();
        this.videoModal();
        this.postFavAct();
        this.postDelAct();
        this.postReport();
        this.textAreaExpander();
        this.commentTrigger();
        this.formComment();
        this.deleteComment();
        this.modalCommentList();
        this.commentReport();
        this.moreComments();
        this.lazyImage();
        this.newPoster();
        this.modalPostFilter();
        this.userReport();
        this.followUser();
        this.joinGroup();
        this.groupReport();
        this.modalPrivatePost();
        this.modalFollowerPrivate();
        this.autoCompleteSelect();
        this.showReposter();
        this.triggerRepost();
        $(window).resize(function() {
            $(".direktori-thumb").filter(":visible").siapListClearFix(">li")
        })
    },
    modalFollowerPrivate: function() {
        $(".js-follower-private").die().live("click", function(c) {
            c.preventDefault();
            var f = new Date();
            var b = f.getTime();
            var a = $(this);
            Siapku_Utils.doAjax("user/followers", {
                username: Siapku_Bootstrap.siapkuUser.username ? Siapku_Bootstrap.siapkuUser.username: Siapku_Bootstrap.siapkuUser.id,
                page: 1,
                limit: 15
            }, function() {}, function(d) {
                $("body").css({
                    overflow: "hidden"
                });
                Siapku_Interface.loadTemplate("modal/follower.html", function(e) {
                    e = e({
                        modalId: b,
                        content: "",
                        data: d,
                        user_selected_id: $(a).attr("id"),
                        userAvatar: Siapku_Bootstrap.userAvatar.avatarThumb2,
                        userFullname: Siapku_Bootstrap.siapkuUser.fullname
                    });
                    $(e).hide().appendTo($(".modalbox[id*=modal_private_]"));
                    $("#modal_followers_" + b).promise().done(function() {
                        var n = $(this);
                        n.css({
                            top: 0,
                            left: 0
                        });
                        var o = n.outerWidth(true);
                        var j = $(a).outerWidth();
                        var q = $(a).innerHeight();
                        var i = $(a).offset().left;
                        var h = $(a).offset().top;
                        var m = (i >= $(".modalbox[id*=modal_followers_]").innerWidth() - o) ? true: false;
                        var l = i - (m ? (o - j - 11) + (n.is(".sdw") ? 3: 0) : 11);
                        var p = (o < j ? o - 20: j);
                        if (p < 15) {
                            p = 15
                        }
                        var k = h + q + 8;
                        n.find(".point").first().css({
                            width: p,
                            height: 9,
                            top: -9
                        });
                        if (m) {
                            n.find(".point").first().css({
                                left: "",
                                right: 10
                            })
                        } else {
                            n.find(".point").first().css({
                                left: 10,
                                right: ""
                            })
                        }
                        n.css({
                            top: k,
                            left: l
                        });
                        n.show();
                        n.css({
                            display: "block"
                        });
                        $("#pager_page_private_followers ul li a").die().live("click", function(s) {
                            s.preventDefault();
                            var r = $(this).attr("rel");
                            g(r)
                        });
                        $("#pager_private_followers .nav-group .nav .next").die().live("click", function(s) {
                            s.preventDefault();
                            var r = $("#pager_page_private_followers ul li[class=on] a").attr("rel");
                            g(parseInt(r) + 1)
                        });
                        $("#pager_private_followers .nav-group .nav .prev").die().live("click", function(s) {
                            s.preventDefault();
                            var r = $("#pager_page_private_followers ul li[class=on] a").attr("rel");
                            g(parseInt(r) - 1)
                        });
                        function g(r) {
                            Siapku_Utils.doAjax("user/followers", {
                                username: Siapku_Bootstrap.siapkuUser.username ? Siapku_Bootstrap.siapkuUser.username: Siapku_Bootstrap.siapkuUser.id,
                                page: r,
                                limit: 15
                            }, function() {}, function(u) {
                                var w = new Date();
                                var v = w.getTime();
                                var t = $(".js-follower-private");
                                var s = $(".tips-modal[id*=modal_followers_]");
                                Siapku_Interface.loadTemplate("modal/follower.html", function(x) {
                                    x = x({
                                        modalId: v,
                                        content: "",
                                        data: u,
                                        userAvatar: Siapku_Bootstrap.userAvatar.avatarThumb2,
                                        userFullname: Siapku_Bootstrap.siapkuUser.fullname
                                    });
                                    $(s).remove();
                                    $(s).promise().done(function() {
                                        $(x).hide().appendTo($(".modalbox[id*=modal_private_]"));
                                        $("#modal_followers_" + v).promise().done(function() {
                                            var E = $(this);
                                            E.css({
                                                top: 0,
                                                left: 0
                                            });
                                            var F = E.outerWidth(true);
                                            var A = $(t).outerWidth();
                                            var H = $(t).innerHeight();
                                            var z = $(t).offset().left;
                                            var y = $(t).offset().top;
                                            var D = (z >= $(".modalbox[id*=modal_private_]").innerWidth() - F) ? true: false;
                                            var C = z - (D ? (F - A - 11) + (E.is(".sdw") ? 3: 0) : 11);
                                            var G = (F < A ? F - 20: A);
                                            if (G < 15) {
                                                G = 15
                                            }
                                            var B = y + H + 8;
                                            E.find(".point").first().css({
                                                width: G,
                                                height: 9,
                                                top: -9
                                            });
                                            if (D) {
                                                E.find(".point").first().css({
                                                    left: "",
                                                    right: 10
                                                })
                                            } else {
                                                E.find(".point").first().css({
                                                    left: 10,
                                                    right: ""
                                                })
                                            }
                                            E.css({
                                                top: B,
                                                left: C
                                            });
                                            E.show();
                                            E.css({
                                                display: "block"
                                            })
                                        })
                                    })
                                })
                            }, function() {})
                        }
                    })
                })
            }, function() {});
            return false
        })
    },
    modalPrivatePost: function() {
        $(".js-new-priv-msg").die().live("click", function(g) {
            g.preventDefault();
            Siapku_Interface.forceClearScreen();
            var h = new Date();
            var f = h.getTime();
            var a = $(this).attr("id") ? $(this).attr("id").replace("user_", "") : false;
            var b = "/";
            var c = {};
            if (a) {
                b = "/user/detail";
                c = {
                    user_id: a
                }
            }
            Siapku_Utils.doAjax(b, c, function() {}, function(d) {
                var e = {};
                e.url_default_avatars = d.url_default_avatars;
                e.userLogin = Siapku_Bootstrap.siapkuUser;
                $("body").css({
                    overflow: "hidden"
                });
                Siapku_Interface.loadTemplate("modal/private.html", function(i) {
                    i = i({
                        title: "Kirim Pesan Pribadi",
                        desc: false,
                        modalId: f,
                        content: "",
                        user: a ? d: false,
                        data: e,
                        userAvatar: Siapku_Bootstrap.userAvatar.avatarThumb2,
                        userFullname: Siapku_Bootstrap.siapkuUser.fullname
                    });
                    $(i).hide().appendTo("body").show();
                    $("#modal_private_" + f).promise().done(function() {
                        $("label[for]").live("click", function() {
                            var k = $(this).closest("tr").find("input#" + $(this).attr("for"));
                            if (k.is("input[type=file]")) {
                                k.trigger("click")
                            } else {
                                k.focus()
                            }
                        });
                        $("input[type=file]").die().live("change", function() {
                            var k = this.value;
                            if ($.browser.chrome) {
                                k = k.replace(/^.*\\/, "")
                            }
                            if (k.length > 23) {
                                k = k.substring(0, 9) + " ... " + k.substring(k.length - 11, k.length)
                            }
                            $(this).siblings(".input-file-mask").find("span").text(k)
                        });
                        $("input[type=file]").addClass("hideit").after(function() {
                            var k = (typeof $(this).attr("alt") == "undefined") ? "": $(this).attr("alt");
                            return '<div class="input-file-mask input"><a class="button">Pilih file</a><span>' + k + "</span></div>"
                        });
                        $(".input-file-mask >a").die().live("click", function() {
                            $(this).closest("div").siblings("input[type=file]").trigger("click")
                        });
                        var j = $(this).find(".js-modal-content").width();
                        $(this).find(".modalbox-dialog").css({
                            width: j,
                            "margin-top": 20
                        });
                        $(this).hide().show()
                    })
                })
            }, function() {});
            return false
        })
    },
    followUser: function() {
        $(".js-follow-user").die().live("click", function() {
            var a = $(this).attr("id").replace("user_follow_", "");
            var b = $(this);
            Siapku_Utils.doAjax("/user/follow/", {
                user_id: a
            }, function() {}, function(c) {
                if (!c.error) {
                    if (b.hasClass("folow")) {
                        Siapku_Bootstrap.layoutLoaded = "";
                        Siapku_Bootstrap.widgetsLoaded = [];
                        $(window).trigger("hashchange")
                    } else {}
                } else {
                    Siapku_Interface.showModalMessage("del", c.desc)
                }
            }, function() {})
        });
        $(".js-unfollow-user").die().live("click", function() {
            var a = $(this).attr("id").replace("user_unfollow_", "");
            var b = $(this);
            Siapku_Utils.doAjax("/user/unfollow/", {
                user_id: a
            }, function() {}, function(c) {
                if (!c.error) {
                    if (b.hasClass("folow")) {
                        Siapku_Bootstrap.widgetsLoaded = [];
                        $(window).trigger("hashchange")
                    } else {}
                } else {
                    Siapku_Interface.showModalMessage("del", c.desc)
                }
            }, function() {})
        });
        $(".js-follow-user-card").die().live("click", function(b) {
            var a = $(this).attr("id").replace("user_", "");
            b.preventDefault();
            var c = $(this);
            if ($(".js-fb-recommendation").find("#user_" + a).length <= 0) {
                Siapku_Utils.doAjax("/user/follow/", {
                    user_id: a
                }, function() {}, function(d) {
                    if (!d.error) {
                        c.replaceWith('<a href="javascript:;" class="act act-del tips js-unfollow-user-card" id="user_' + a + '" title="Berhenti Ikuti dia"></a>');
                        if (window.location.href.indexOf("recommendation") >= 0) {
                            $(window).trigger("hashchange")
                        }
                    } else {
                        Siapku_Interface.showModalMessage("del", d.desc)
                    }
                }, function() {
                    $(c).closest(".tips-modal").remove()
                })
            } else {
                var a = $(this).attr("id").replace("user_", "");
                Siapku_Utils.doAjax("/user/follow/", {
                    user_id: a
                }, function() {}, function(d) {
                    if (!d.error) {
                        Siapku_Utils.doAjax("/recommendation/aggr-not-followed", {
                            page: 1,
                            limit: 5
                        }, function() {
                            $(".js-fb-recommendation").empty()
                        }, function(e) {
                            if (window.location.href.indexOf("recommendation") >= 0) {
                                $(window).trigger("hashchange")
                            }
                            Siapku_Interface.loadTemplate("widget/user/right-sidebar.html", function(g) {
                                var h = {
                                    doRecommend: true,
                                    recommendation: e,
                                    feed: false,
                                    fbAppId: Siapku_Bootstrap.environment.fb_app_id,
                                    add_berita: false,
                                    add_adv_sekolah: false
                                };
                                var f = g(h);
                                $(f).hide().appendTo($(".js-fb-recommendation")).slideDown("fast");
                                $(f).promise().done(function() {
                                    if (typeof FB == "undefined") {
                                        (function(k) {
                                            var j,
                                            l = "facebook-jssdk",
                                            i = k.getElementsByTagName("script")[0];
                                            if (k.getElementById(l)) {
                                                return
                                            }
                                            j = k.createElement("script");
                                            j.id = l;
                                            j.async = true;
                                            j.src = "//connect.facebook.net/en_US/all.js";
                                            i.parentNode.insertBefore(j, i)
                                        } (document))
                                    }
                                })
                            })
                        }, function() {
                            $(c).closest(".tips-modal").remove()
                        })
                    } else {
                        Siapku_Interface.showModalMessage("del", d.desc)
                    }
                }, function() {})
            }
            return false
        });
        $(".js-unfollow-user-card").die().live("click", function() {
            var a = $(this).attr("id").replace("user_", "");
            var b = $(this);
            Siapku_Utils.doAjax("/user/unfollow/", {
                user_id: a
            }, function() {}, function(c) {
                if (!c.error) {
                    b.replaceWith('<a href="javascript:;" class="act act-folow tips js-follow-user-card" id="user_' + a + '" title="Ikuti dia"></a>');
                    if (window.location.href.indexOf("recommendation") >= 0) {
                        $(window).trigger("hashchange")
                    }
                } else {
                    Siapku_Interface.showModalMessage("del", c.desc)
                }
            }, function() {})
        })
    },
    joinGroup: function() {
        $(".js-join-group").die().live("click", function() {
            var a = $(this).attr("id").replace("group_join_", "");
            var b = $(this);
            Siapku_Utils.doAjax("/group/join/", {
                group_id: a
            }, function() {}, function(c) {
                if (!c.error) {
                    if (b.hasClass("grup")) {
                        window.location.reload()
                    } else {}
                } else {
                    Siapku_Interface.showModalMessage("del", c.desc)
                }
            }, function() {})
        });
        $(".js-leave-group").die().live("click", function() {
            var a = $(this).attr("id").replace("group_leave_", "");
            var b = $(this);
            Siapku_Utils.doAjax("/group/leave/", {
                group_id: a
            }, function() {}, function(c) {
                if (!c.error) {
                    if (b.hasClass("grup")) {
                        window.location.reload()
                    } else {}
                } else {
                    Siapku_Interface.showModalMessage("del", c.desc)
                }
            }, function() {})
        });
        $(".js-join-group-card").die().live("click", function() {
            var a = $(this).attr("id").replace("group_", "");
            var b = $(this);
            Siapku_Utils.doAjax("/group/join/", {
                group_id: a
            }, function() {}, function(c) {
                if (!c.error) {
                    b.replaceWith('<a href="javascript:;" class="act act-del tips js-leave-group-card" id="group_' + a + '" title="Keluar dari komunitas"></a>')
                } else {
                    Siapku_Interface.showModalMessage("del", c.desc)
                }
            }, function() {})
        });
        $(".js-leave-group-card").die().live("click", function() {
            var a = $(this).attr("id").replace("group_", "");
            var b = $(this);
            Siapku_Utils.doAjax("/group/leave/", {
                group_id: a
            }, function() {}, function(c) {
                if (!c.error) {
                    b.replaceWith('<a href="javascript:;" class="act act-grup tips js-join-group-card" id="group_' + a + '" title="Bergabung dalam komunitas"></a>')
                } else {
                    Siapku_Interface.showModalMessage("del", c.desc)
                }
            }, function() {})
        })
    },
    autoCompleteRequest: false,
    autoCompleteBeforeCursorPos: 0,
    autoCompleteStart: 0,
    autoCompleteElement: false,
    autoComplete: function(a, g, d, k, h) {
        var l = "";
        var b = 0;
        var j = false;
        var e = $(g).val();
        if (!d) {
            d = 0
        }
        if (!k) {
            k = 0
        }
        if (!h) {
            h = "public"
        }
        this.autoCompleteBeforeCursorPos = g.context.selectionStart;
        if (this.autoCompleteRequest) {
            this.autoCompleteRequest.abort()
        }
        this.autoCompleteRequest = false;
        if (!$(g).val().length) {
            j = false;
            l = "";
            b = 0
        }
        if (e.charAt(g.context.selectionStart - 1).toLowerCase() == "@".toLowerCase()) {
            j = false;
            l = "";
            b = 0
        }
        var c = e.charAt(g.context.selectionStart - 2);
        if (!j) {
            if (c.toLowerCase() == "@".toLowerCase() && e.charAt(g.context.selectionStart - 1) !== " ") {
                b = g.context.selectionStart - 2;
                j = true
            }
        }
        if (j) {
            if (e.charAt(g.context.selectionStart - 1) == " ") {
                j = false;
                l = "";
                b = 0
            } else {
                l = e.substring(b, g.context.selectionStart)
            }
        }
        if (e.charAt(g.context.selectionStart - 1) != " " && g.context.selectionStart > 1) {
            for (var f = g.context.selectionStart - 1; f >= 0; f--) {
                if (e.charAt(f) == " ") {
                    break
                }
                if (e.charAt(f) == "@" && f < g.context.selectionStart - 1) {
                    j = true;
                    b = f;
                    l = e.substring(b + 1, g.context.selectionStart);
                    break
                }
            }
        }
        if (b != 0 && e.charAt(b - 1) != " ") {
            j = false;
            l = "";
            b = 0
        }
        Siapku_Interface.autoCompleteStart = b;
        if (j) {
            Siapku_Utils.doAjax("/status/mentionable", {
                post_id: d,
                group_id: k,
                type: h,
                key: l
            }, function(m, i) {
                Siapku_Interface.autoCompleteRequest = m;
                $("#modal_autocomplete").remove()
            }, function(i) {
                if (i.list) {
                    Siapku_Interface.loadTemplate("modal/autocomplete.html", function(m) {
                        var n = m(i);
                        $(n).hide().appendTo("body").slideDown("fast").css({
                            top: $(g).parent().offset().top + $(g).parent().outerHeight(),
                            left: $(g).parent().offset().left,
                            width: $(g).parent().outerWidth() - 2
                        }).show()
                    })
                }
            }, function(m, i) {})
        } else {
            $("#modal_autocomplete").remove()
        }
    },
    autoCompleteSelect: function() {
        $("#modal_autocomplete").find("a").live("click", function(f) {
            var d = $(Siapku_Interface.autoCompleteElement);
            var a = $(d).val();
            f.preventDefault();
            var e = $(this);
            var b = $(e).find("em").text();
            var g = a.substring(0, Siapku_Interface.autoCompleteStart);
            var c = a.substring(d.context.selectionStart);
            $(d).val(g + b + " " + c);
            $("#modal_autocomplete").remove();
            $("#modal_autocomplete").promise().done(function() {
                $(d).trigger("focus")
            })
        })
    },
    showReposter: function() {
        $(".js-show-reposter").live("click", function(c) {
            var a = $(this).closest("li").attr("id");
            if (typeof a == "undefined") {
                a = $(this).closest("div").attr("id")
            }
            a = a.replace("post_", "");
            var b = $(this);
            Siapku_Utils.doAjax("/status/detail", {
                post_id: a,
                type: "public"
            }, function() {}, function(e) {
                if (!e.error) {
                    $("body").css({
                        overflow: "hidden"
                    });
                    var g = new Date();
                    var f = g.getTime();
                    Siapku_Interface.loadTemplate("modal/reposters.html", function(d) {
                        d = d({
                            title: 'Daftar pengguna pengirim ulang kiriman <a href="#!/post/' + a + '">#' + a + "</a>",
                            modalId: f,
                            data: e
                        });
                        $(d).hide().appendTo("body").show();
                        $("#modal_reposters_" + f).promise().done(function() {
                            var h = $(this).find(".js-modal-content").width();
                            $(this).find(".modalbox-dialog").css({
                                width: h + 30,
                                "margin-top": (($("#modal_reposters_" + f).height() - $("#modal_reposters_" + f).find(".modalbox-dialog").height()) / 2)
                            });
                            $(this).hide().show()
                        })
                    })
                } else {
                    Siapku_Interface.showModalMessage("del", e.desc)
                }
            });
            return false
        })
    },
    newPoster: function() {
        $("form.js-form-content").find('textarea[name="post"]').live("keyup", function(b) {
            if (b.keyCode == 13 || b.keyCode == 38 || b.keyCode == 40) {
                return
            }
            var c = $(".js-poster-private-form").length ? $(".js-poster-private-form") : $(".js-poster-form");
            var a = $(c).find(".js-form-content").find("input[name=group_id]").val();
            Siapku_Interface.autoComplete(b, $(this), false, a, $(".js-poster-private-form").length ? "private": "public")
        });
        $("form.js-form-content").find('textarea[name="post"]').live("keydown", function(a) {
            Siapku_Interface.autoCompleteElement = $(this);
            var g = $(this);
            var e = $(g).val();
            if (a.keyCode == 13) {
                if ($("#modal_autocomplete").length > 0 && $("#modal_autocomplete").is(":visible")) {
                    a.preventDefault();
                    var l = $("#modal_autocomplete .search-result div a.select");
                    var h = $(l).find("em").text();
                    var b = e.substring(0, Siapku_Interface.autoCompleteStart);
                    var j = e.substring(g.context.selectionStart);
                    $(g).val(b + h + " " + j);
                    $("#modal_autocomplete").remove();
                    $("#modal_autocomplete").promise().done(function() {
                        $(g).trigger("focus")
                    });
                    return
                }
            }
            if (a.keyCode == 38) {
                if ($("#modal_autocomplete").length > 0 && $("#modal_autocomplete").is(":visible")) {
                    a.preventDefault();
                    var c = $("#modal_autocomplete .search-result div").children();
                    var d = 1;
                    for (var f = 0; f < c.length; f++) {
                        if ($(c.get(f)).hasClass("select")) {
                            d = f;
                            break
                        }
                    }
                    $(c).removeClass("select");
                    $(c.get(d - 1)).addClass("select")
                }
                return
            } else {
                if (a.keyCode == 40) {
                    if ($("#modal_autocomplete").length > 0 && $("#modal_autocomplete").is(":visible")) {
                        a.preventDefault();
                        var c = $("#modal_autocomplete .search-result div").children();
                        var d = -1;
                        for (var f = 0; f < c.length; f++) {
                            if ($(c.get(f)).hasClass("select")) {
                                d = f;
                                break
                            }
                        }
                        var k = $(c).get(d + 1);
                        if (typeof k != "undefined") {
                            $(c).removeClass("select");
                            $(c.get(d + 1)).addClass("select")
                        } else {
                            $(c).removeClass("select");
                            $(c.get(0)).addClass("select")
                        }
                    }
                    return
                }
            }
        });
        $(".js-select-user-private").die().live("click", function() {
            var c = $(this).find("img").first().attr("src");
            var a = $(this).find("a").first().text();
            var b = $(this).attr("id");
            $(".tips-modal[id*=modal_followers_]").remove();
            $(".js-follower-private").attr("id", b);
            $(".js-follower-private").find("img").first().attr("src", c);
            $(".js-follower-private").find("h3 a").first().html(a);
            $(".js-form-content").find("input[name=user_id]").val(b)
        });
        $(".js-poster-link").die().live("click", function(b) {
            b.preventDefault();
            if ($(this).find("em").text().indexOf("Mulai berbagi hal baru tentang") >= 0) {
                var a = $(this).find("em").text().replace("Mulai berbagi hal baru tentang ", "");
                $(".js-poster-form").find("textarea[name=post]").val(a)
            }
            $(this).closest("form").hide();
            $(".js-poster-form").fadeIn();
            $(".js-poster-form").find("textarea[name=post]").trigger("focus");
            return false
        });
        $(".js-poster-close").die().live("click", function(a) {
            a.preventDefault();
            $(".js-poster-form").hide();
            $(".js-poster-link").closest("form").fadeIn();
            $(".js-feed-attach-nav").show();
            $(".js-att-form").hide();
            $(".js-att-img").hide();
            $(".js-att-link").hide();
            $(".js-att-file").hide();
            $(".js-att-vid").hide();
            return false
        });
        $(".js-show-default-tags").die().live("click", function(a) {
            a.preventDefault();
            if ($(".tips-modal[id*=modal_tags_]").length > 0) {
                $(".tips-modal[id*=modal_tags_]").remove()
            }
            Siapku_Utils.modalDefaultTags($(this), Siapku_Interface);
            return false
        });
        $(".js-add-tag").die().live("click", function(b) {
            b.preventDefault();
            var a = $(this).html();
            var c = $(".js-poster-private-form").length ? $(".js-poster-private-form") : $(".js-poster-form");
            $(c).find('textarea[name="post"]').val($(".js-poster-form").find('textarea[name="post"]').val() + a);
            $(c).find('textarea[name="post"]').trigger("keyup");
            return false
        });
        $(".js-add-img").die().live("click", function(a) {
            a.preventDefault();
            var b = $(".js-poster-private-form").length ? $(".js-poster-private-form") : $(".js-poster-form");
            $(b).find(".js-feed-attach-nav").hide();
            $(b).find(".js-att-img").show();
            $(b).find(".js-att-img").promise().done(function() {
                $(b).find(".js-att-form").slideDown()
            });
            return false
        });
        $(".js-add-link").die().live("click", function(a) {
            a.preventDefault();
            var b = $(".js-poster-private-form").length ? $(".js-poster-private-form") : $(".js-poster-form");
            $(b).find(".js-feed-attach-nav").hide();
            $(b).find(".js-att-link").show();
            $(b).find(".js-att-link").promise().done(function() {
                $(b).find(".js-att-form").slideDown()
            });
            return false
        });
        $(".js-add-vid").die().live("click", function(a) {
            a.preventDefault();
            var b = $(".js-poster-private-form").length ? $(".js-poster-private-form") : $(".js-poster-form");
            $(b).find(".js-feed-attach-nav").hide();
            $(b).find(".js-att-vid").show();
            $(b).find(".js-att-vid").promise().done(function() {
                $(b).find(".js-att-form").slideDown()
            });
            return false
        });
        $(".js-add-file").die().live("click", function(a) {
            a.preventDefault();
            var b = $(".js-poster-private-form").length ? $(".js-poster-private-form") : $(".js-poster-form");
            $(b).find(".js-feed-attach-nav").hide();
            $(b).find(".js-att-file").show();
            $(b).find(".js-att-file").promise().done(function() {
                $(b).find(".js-att-form").slideDown()
            });
            return false
        });
        $(".js-att-form-closer").die().live("click", function(a) {
            a.preventDefault();
            var b = $(".js-poster-private-form").length ? $(".js-poster-private-form") : $(".js-poster-form");
            $(b).find(".js-feed-attach-nav").show();
            $(b).find(".js-att-form").hide();
            $(b).find(".js-att-img").hide();
            $(b).find(".js-att-link").hide();
            $(b).find(".js-att-file").hide();
            $(b).find(".js-att-vid").hide();
            $(b).find(".js-feed-attach-img-choose").show();
            $(b).find(".js-img-att-file").hide();
            $(b).find(".js-img-att-url").hide();
            $(b).find(".js-feed-attach-error").hide();
            $(b).find(".js-img-att-file").resetForm();
            $(b).find(".js-img-att-file").clearForm();
            $(b).find(".js-img-att-url").resetForm();
            $(b).find(".js-img-att-url").clearForm();
            $(b).find(".js-vid-att-url").resetForm();
            $(b).find(".js-vid-att-url").clearForm();
            $(b).find(".js-vid-att-url").show();
            $(b).find(".js-link-att-url").resetForm();
            $(b).find(".js-link-att-url").clearForm();
            $(b).find(".js-link-att-url").show();
            $(b).find(".js-file-att-file").resetForm();
            $(b).find(".js-file-att-file").clearForm();
            $(b).find(".js-file-att-file").show();
            $(b).find(".input-file-mask").find("span").html("");
            $(b).find(".js-form-content").find("input[name=image_name]").val("");
            $(b).find(".js-form-content").find("input[name=image_file]").val("");
            $(b).find(".js-form-content").find("input[name=image_url]").val("");
            $(b).find(".js-form-content").find("input[name=video_url]").val("");
            $(b).find(".js-form-content").find("input[name=link_url]").val("");
            $(b).find(".js-form-content").find("input[name=file_file]").val("");
            $(b).find(".js-form-content").find("input[name=file_name]").val("");
            $(b).find(".js-feed-attach-img-view").hide();
            $(b).find(".js-feed-attach-img-view").find("img").attr("src", "");
            $(b).find(".js-feed-attach-vid-view").hide();
            $(b).find(".js-feed-attach-vid-view").find("a").html("");
            $(b).find(".js-feed-attach-file-view").hide();
            $(b).find(".js-feed-attach-file-view").find("a").html("");
            $(b).find(".js-feed-attach-link-view").hide();
            $(b).find(".js-feed-attach-link-view").find("img").attr("src", "");
            $(b).find(".js-feed-attach-link-view").find("h4").html("");
            $(b).find(".js-feed-attach-link-view").find("p.sml").html("");
            $(b).find(".js-feed-attach-link-view").find("a.sml").attr("href", "");
            return false
        });
        $(".js-img-upload").die().live("click", function(a) {
            a.preventDefault();
            var b = $(".js-poster-private-form").length ? $(".js-poster-private-form") : $(".js-poster-form");
            $(b).find(".js-feed-attach-img-choose").hide();
            $(b).find(".js-img-att-file").fadeIn();
            return false
        });
        $(".js-img-link").die().live("click", function(a) {
            a.preventDefault();
            var b = $(".js-poster-private-form").length ? $(".js-poster-private-form") : $(".js-poster-form");
            $(b).find(".js-feed-attach-img-choose").hide();
            $(b).find(".js-img-att-url").fadeIn();
            return false
        });
        $(".js-img-att-file").die().live("submit", function(a) {
            a.preventDefault();
            var b = $(".js-poster-private-form").length ? $(".js-poster-private-form") : $(".js-poster-form");
            $(this).ajaxSubmit({
                url: "/upload/image",
                dataType: "json",
                data: {
                    upload_ajax: true
                },
                iframe: true,
                success: function(c) {
                    $(b).find(".js-att-load").hide();
                    $(b).find(".js-img-att-file").hide();
                    if (!c.error) {
                        $(b).find(".js-feed-attach-img-view").show();
                        $(b).find(".js-feed-attach-img-view").find("img").attr("src", c.data.preview);
                        $(b).find(".js-form-content").find("input[name=image_name]").val(c.data.filename);
                        $(b).find(".js-form-content").find("input[name=image_file]").val(c.data.file)
                    } else {
                        $(b).find(".js-feed-attach-error").show().find(".desc").html(c.desc)
                    }
                },
                error: function() {
                    $(b).find(".js-att-load").hide();
                    $(b).find(".js-img-att-file").hide();
                    $(b).find(".js-feed-attach-error").show().find(".desc").html("Maaf untuk sementara fitur upload mengalami error.")
                },
                beforeSubmit: function() {
                    $(b).find(".js-img-att-file").hide();
                    $(b).find(".js-att-load").show()
                }
            });
            return false
        });
        $(".js-img-att-url").die().live("submit", function(a) {
            a.preventDefault();
            var b = $(".js-poster-private-form").length ? $(".js-poster-private-form") : $(".js-poster-form");
            $(this).ajaxSubmit({
                url: "/upload/image",
                dataType: "json",
                data: {
                    upload_ajax: true
                },
                iframe: true,
                success: function(c) {
                    $(b).find(".js-att-load").hide();
                    $(b).find(".js-img-att-url").hide();
                    if (!c.error) {
                        $(b).find(".js-feed-attach-img-view").show();
                        $(b).find(".js-feed-attach-img-view").find("img").attr("src", c.data.preview);
                        $(b).find(".js-form-content").find("input[name=image_url]").val(c.data.filename)
                    } else {
                        $(b).find(".js-feed-attach-error").show().find(".desc").html(c.desc)
                    }
                },
                error: function() {
                    $(b).find(".js-att-load").hide();
                    $(b).find(".js-img-att-url").hide();
                    $(b).find(".js-feed-attach-error").show().find(".desc").html("Maaf untuk sementara fitur upload mengalami error.")
                },
                beforeSubmit: function() {
                    $(b).find(".js-img-att-url").hide();
                    $(b).find(".js-att-load").show()
                }
            });
            return false
        });
        $(".js-vid-att-url").die().live("submit", function(a) {
            a.preventDefault();
            var b = $(".js-poster-private-form").length ? $(".js-poster-private-form") : $(".js-poster-form");
            $(this).ajaxSubmit({
                url: "/upload/video",
                dataType: "json",
                data: {
                    upload_ajax: true
                },
                iframe: true,
                success: function(c) {
                    $(b).find(".js-att-load").hide();
                    $(b).find(".js-vid-att-url").hide();
                    if (!c.error) {
                        $(b).find(".js-feed-attach-vid-view").show();
                        $(b).find(".js-feed-attach-vid-view").find("a").html(c.data.embed_code);
                        $(b).find(".js-form-content").find("input[name=video_url]").val(c.vid_url)
                    } else {
                        $(b).find(".js-feed-attach-error").show().find(".desc").html(c.desc)
                    }
                },
                error: function() {
                    $(b).find(".js-att-load").hide();
                    $(b).find(".js-vid-att-url").hide();
                    $(b).find(".js-feed-attach-error").show().find(".desc").html("Maaf untuk sementara fitur upload mengalami error.")
                },
                beforeSubmit: function() {
                    $(b).find(".js-vid-att-url").hide();
                    $(b).find(".js-att-load").show()
                }
            });
            return false
        });
        $(".js-link-att-url").die().live("submit", function(a) {
            a.preventDefault();
            var b = $(".js-poster-private-form").length ? $(".js-poster-private-form") : $(".js-poster-form");
            $(this).ajaxSubmit({
                url: "/upload/link",
                dataType: "json",
                success: function(c) {
                    $(b).find(".js-att-load").hide();
                    $(b).find(".js-link-att-url").hide();
                    if (c && !c.error) {
                        $(b).find(".js-feed-attach-link-view").show();
                        if (c.img) {
                            $(b).find(".js-feed-attach-link-view").find("img").attr("src", c.img)
                        } else {
                            $(b).find(".js-feed-attach-link-view").find("img").attr("src", "")
                        }
                        $(b).find(".js-feed-attach-link-view").find("h4").html('<a class="ellipsis" href="' + c.link + '" target="_blank">' + c.title + "</a>");
                        $(b).find(".js-feed-attach-link-view").find("p.sml").html(c.description ? c.description: c.content);
                        $(b).find(".js-feed-attach-link-view").find("a.sml").attr("href", c.link);
                        $(b).find(".js-form-content").find("input[name=link_url]").val(c.link)
                    } else {
                        $(b).find(".js-feed-attach-error").show().find(".desc").html(c.desc)
                    }
                },
                error: function(d, f, c, e) {
                    $(b).find(".js-att-load").hide();
                    $(b).find(".js-link-att-url").hide();
                    $(b).find(".js-feed-attach-error").show().find(".desc").html("Maaf untuk sementara fitur upload mengalami error.")
                },
                beforeSubmit: function() {
                    $(b).find(".js-link-att-url").hide();
                    $(b).find(".js-att-load").show()
                }
            });
            return false
        });
        $(".js-file-att-file").die().live("submit", function(a) {
            a.preventDefault();
            var b = $(".js-poster-private-form").length ? $(".js-poster-private-form") : $(".js-poster-form");
            $(this).ajaxSubmit({
                url: "/upload/file",
                dataType: "json",
                data: {
                    upload_ajax: true
                },
                iframe: true,
                success: function(c) {
                    $(b).find(".js-att-load").hide();
                    $(b).find(".js-file-att-file").hide();
                    if (!c.error) {
                        $(b).find(".js-feed-attach-file-view").show();
                        $(b).find(".js-feed-attach-file-view").find("a").html(c.data.filename);
                        $(b).find(".js-form-content").find("input[name=file_name]").val(c.data.filename);
                        $(b).find(".js-form-content").find("input[name=file_file]").val(c.data.file)
                    } else {
                        $(b).find(".js-feed-attach-error").show().find(".desc").html(c.desc)
                    }
                },
                error: function() {
                    $(b).find(".js-att-load").hide();
                    $(b).find(".js-file-att-file").hide();
                    $(b).find(".js-feed-attach-error").show().find(".desc").html("Maaf untuk sementara fitur upload mengalami error.")
                },
                beforeSubmit: function() {
                    $(b).find(".js-file-att-file").hide();
                    $(b).find(".js-att-load").show()
                }
            });
            return false
        });
        $(".js-new-poster-submit").die().live("click", function(a) {
            a.preventDefault();
            if ($(".modalbox[id*=modal_private_]").find(".js-form-content").find("input[name=user_id]").length && !$(".modalbox[id*=modal_private_]").find(".js-form-content").find("input[name=user_id]").val()) {
                Siapku_Interface.showModalMessage("del", "Silakan pilih penerima terlebih dahulu");
                return false
            }
            var b = $(".js-poster-private-form").length ? $(".js-poster-private-form") : $(".js-poster-form");
            $(b).find(".js-form-content").ajaxSubmit({
                url: "/status/create",
                dataType: "json",
                data: {
                    upload_ajax: true
                },
                iframe: true,
                success: function(c) {
                    $(".js-poster-form .feed-load ").hide();
                    if (!c.error) {
                        if (c.type == "public") {
                            $(b).find(".js-att-form-closer").trigger("click");
                            $(b).find(".js-poster-close").trigger("click");
                            $(b).find(".js-form-content").resetForm();
                            $(b).find(".js-form-content").clearForm();
                            Siapku_Utils.doAjax("/status/detail", {
                                post_id: c.post_id,
                                type: c.type
                            }, function() {}, function(d) {
                                if (!d.error) {
                                    var g = true;
                                    var f = window.location.hash;
                                    if (f.indexOf("dashboard/tag") >= 0) {
                                        var e = f.replace("#!/dashboard/tag/", "");
                                        e = e.replace("/");
                                        if (d.formatted_message.indexOf(e) < 0) {
                                            g = false
                                        }
                                    }
                                    if (g) {
                                        Siapku_Interface.loadTemplate("status/single.html", function(i) {
                                            i = i({
                                                value: d,
                                                user_avatar: d.user_avatar
                                            });
                                            var h = i;
                                            if ($(".js-timeline-content")) {
                                                $(".js-timeline-content").prepend($(i))
                                            } else {
                                                var h = "<ul class=js-timeline-content>" + $(i).html() + "</ul>";
                                                $(h).appendTo($(".work-main"))
                                            }
                                            $(h).promise().done(function() {
                                                Siapku_Interface.lazyImage()
                                            })
                                        })
                                    }
                                } else {}
                            }, function() {})
                        } else {
                            $(b).find(".js-att-form-closer").trigger("click");
                            $(b).find(".js-poster-close").trigger("click");
                            $(b).find(".js-form-content").resetForm();
                            $(b).find(".js-form-content").clearForm();
                            $(".modalbox[id*=modal_private_]").remove();
                            $("body").attr("style", "");
                            Siapku_Interface.showFlashMessage("ok", "Pesan berhasil terkirim.", function() {
                                if ((window.location.hash).indexOf("#!/mail") != -1) {
                                    window.location.hash = "#!/mail";
                                    $(window).trigger("hashchange")
                                }
                            })
                        }
                    } else {
                        Siapku_Interface.showModalMessage("del", c.desc)
                    }
                },
                error: function() {
                    $(b).find(".js-poster-form .feed-load ").hide();
                    Siapku_Interface.showModalMessage("del", "Maaf untuk sementara aplikasi tidak dapat menyimpan pesan anda")
                },
                beforeSubmit: function() {
                    $(b).find(".feed-load ").show()
                }
            });
            return false
        })
    },
    lazyImage: function() {
        $(".lazy").lazyload({
            skip_invisible: false
        })
    },
    hoverCard: function() {
        var b = $(".js-cardhov").hoverIntent({
            interval: 600,
            timeout: 600,
            over: function() {
                $(".tips-modal").each(function() {
                    if (typeof $(this).attr("id") != "undefined" && $(this).attr("id").indexOf("modalcardhov") >= 0) {
                        $(this).remove()
                    }
                });
                if ($(this).attr("id").indexOf("user_") != -1) {
                    Siapku_Utils.userCard($(this).attr("id").replace("user_", ""), $(this), Siapku_Interface)
                } else {
                    if ($(this).attr("id").indexOf("group_") != -1) {
                        Siapku_Utils.groupCard($(this).attr("id").replace("group_", ""), $(this), Siapku_Interface)
                    }
                }
            },
            out: function() {
                return false
            }
        })
    },
    modalPostList: function() {
        $(".js-modal-post-list").live("click", function() {
            var a = $(this).attr("id");
            if ($("#modal_post_" + a).length > 0) {
                $("#modal_post_" + a).remove()
            }
            Siapku_Utils.modalPostList(a, $(this), Siapku_Interface)
        })
    },
    modalCommentList: function() {
        $(".js-modal-comment-list").live("click", function() {
            var a = $(this).attr("id");
            if ($("#modal_comment_" + a).length > 0) {
                $("#modal_comment_" + a).remove()
            }
            Siapku_Utils.modalCommentList(a, $(this), Siapku_Interface)
        })
    },
    modalPostFilter: function() {
        $(".js-post-filter").die().live("click", function(b) {
            b.preventDefault();
            if ($(".tips-modal[id*=modal_postfilter_]").length > 0) {
                $(".tips-modal[id*=modal_postfilter_]").remove()
            } else {
                if ($(".tips-modal[id*=modal_postfilter_]").is(":hidden")) {
                    $(".tips-modal[id*=modal_postfilter_]").remove()
                }
            }
            var a = $(this).attr("rel");
            Siapku_Utils.modalPostFilter($(this), a, Siapku_Interface);
            return false
        })
    },
    imageModal: function() {
        var a = this;
        $(".js-modal-image-simple").die().live("click", function(f) {
            f.preventDefault();
            var b = $(this).find("img");
            var g = new Date();
            var c = g.getTime();
            $("body").css({
                overflow: "hidden"
            });
            a.loadTemplate("modal/image.html", function(d) {
                d = d({
                    title: "",
                    desc: false,
                    modalId: "_simple_image_" + c,
                    width: (parseInt($(b).width()) + 73) + "px",
                    widthCont: (parseInt($(b).width()) + 50) + "px",
                    content: '<img src="' + $(b).attr("src") + '" />'
                });
                $(d).hide().appendTo("body").show();
                $("#modal_image_simple_image_" + c).promise().done(function() {
                    var h = $(this).find(".js-modal-content").width();
                    var e = $(this).find(".js-modal-content").height();
                    $(this).find(".modalbox-dialog").css({
                        width: h,
                        height: e - 5,
                        "margin-top": (($("#modal_image_simple_image_" + c).height() - $("#modal_image_simple_image_" + c).find(".modalbox-dialog").height()) / 2)
                    });
                    $(this).hide().show()
                })
            });
            return false
        });
        $(".js-modal-image-attach").die().live("click", function() {
            var b = $(this).find("img");
            var e = new Date();
            var c = e.getTime();
            $("body").css({
                overflow: "hidden"
            });
            a.loadTemplate("modal/image.html", function(d) {
                d = d({
                    title: "",
                    desc: false,
                    modalId: "_attach_image_" + c,
                    content: '<img src="' + $(b).attr("rel") + '" style="max-width:700px;max-height:600px"/>'
                });
                $(d).hide().appendTo("body");
                $("#modal_image_attach_image_" + c).find("img").load(function() {
                    $("#modal_image_attach_image_" + c).show();
                    $("#modal_image_attach_image_" + c).promise().done(function() {
                        var g = $(this).find(".js-modal-content").width();
                        var f = $(this).find(".js-modal-content").height();
                        $(this).find(".modalbox-dialog").css({
                            width: g - 3,
                            height: f - 5,
                            "margin-top": (($("#modal_image_attach_image_" + c).height() - $("#modal_image_attach_image_" + c).find(".modalbox-dialog").height()) / 2)
                        });
                        $(this).hide().show()
                    })
                })
            })
        })
    },
    videoModal: function() {},
    pagerModal: function() {
        $(".js-pager-limiter").die().live("click", function() {
            var a = $(this).attr("id").replace("pager", "");
            var b = $("#pager_limiter" + a);
            var g = $(b);
            var f = $(this),
            e = ($(".modalbox:visible").length > 0 ? f.offset() : f.offset()),
            d = Math.floor(e.left - 19 + f.outerWidth() / 2),
            c = Math.floor(e.top + f.outerHeight() + 12);
            $(g).show().offset({
                left: d,
                top: c
            })
        });
        $(".nav-pages .nav-no ul li a").die().live("click", function() {
            $(this).closest("div[id*=pager]").hide()
        });
        $(".js-pager-page").die().live("click", function() {
            var a = $(this).attr("id").replace("pager", "");
            var b = $("#pager_page" + a);
            var d = $(b);
            var c = $(this);
            $(d).appendTo("body").show();
            $(d).promise().done(function() {
                var k = $(this).outerWidth();
                var g = $(c).outerWidth();
                var l = $(c).innerHeight();
                var f = $(c).offset().left;
                var e = $(c).offset().top;
                var j = (f >= $("body").innerWidth() - k) ? true: false;
                var i = f - (j ? (k - g - 11) + ($(this).is(".sdw") ? 3: 0) : 11);
                var m = (k < g ? k - 20: g);
                if (m < 15) {
                    m = 15
                }
                var h = e + l + 8;
                $(this).find(".point").css({
                    width: m,
                    height: 9,
                    top: -9
                });
                if (j) {
                    $(this).find(".point").css({
                        left: "",
                        right: 10
                    })
                } else {
                    $(this).find(".point").css({
                        left: 10,
                        right: ""
                    })
                }
                $(this).css({
                    top: h,
                    left: i
                }).hide().show()
            })
        });
        $(".js-lowup-pager a").die().live("click", function(d) {
            d.preventDefault();
            var a = $(this).closest(".nav-pages-nav").siblings(".nav-pages").find(".nav-no");
            var b = parseFloat(a.closest(".nav-pages").css("max-height"));
            var f = Math.floor(a.height() / b) * -1;
            f = a.height() % b == 0 ? f + 1: f;
            var c = Math.floor(parseFloat(a.css("margin-top")) / b);
            if ($(this).is(".ic-p-d")) {
                c--;
                if (c <= f) {
                    c = f
                }
            }
            if ($(this).is(".ic-p-u")) {
                c++;
                if (c >= 0) {
                    c = 0
                }
            }
            if (c <= 0 && c >= f) {
                a.css("margin-top", c * b)
            }
            return false
        })
    },
    modalRelationUser: function() {
        $(".js-relation-user").die().live("click", function(a) {
            a.preventDefault();
            Siapku_Interface.forceClearScreen();
            Siapku_Utils.modalRelationUser($(this).attr("id").replace("user_", ""), $(this), Siapku_Interface)
        });
        $(".js-relation-user-on-group").die().live("click", function(a) {
            a.preventDefault();
            Siapku_Interface.forceClearScreen();
            Siapku_Utils.modalRelationUserOnGroup($(this).attr("id").replace("group_", ""), $(this), Siapku_Interface)
        })
    },
    modalRelationGroup: function() {
        $(".js-relation-group").live("click", function(a) {
            a.preventDefault();
            Siapku_Interface.forceClearScreen();
            Siapku_Utils.modalRelationGroup($(this).attr("id").replace("user_", ""), $(this), Siapku_Interface)
        })
    },
    modalPrivateMessage: function() {
        $(".js-priv-msg").live("click", function() {})
    },
    actionFollow: function() {
        $(".js-follow-user-no-replace, .js-follow-user").live("click", function() {})
    },
    displaySwitcher: function() {
        $(".js-switch-display-type a").die("click").live("click", function(c) {
            c.preventDefault();
            var d = $(this);
            var b = $("#js-direktori_" + $(d).parent().attr("id").replace("js-switch-display-type_", ""));
            var a = $(this).attr("rel");
            $(this).siblings().removeClass("on");
            $(this).addClass("on");
            $(b).removeClass("direktori-thumb");
            $(b).removeClass("direktori-list");
            $(b).removeClass("direktori-tbl");
            $(b).addClass("direktori-" + a);
            if (a == "thumb") {
                $(".direktori-thumb").filter(":visible").siapListClearFix(">li")
            }
        })
    },
    postFavAct: function() {
        var a = this;
        $('.act-fav[id*="post_faver_"]').die().live("click", function(c) {
            c.preventDefault();
            var b = $(this).attr("id").replace("post_faver_", "");
            var d = $(this);
            Siapku_Utils.doAjax("status/favorite", {
                post_id: b,
                type: "public",
                is_fav: 1
            }, function() {
                d.removeClass("act-fav");
                d.addClass("ic-load")
            }, function(e) {
                if (!e.error) {
                    d.addClass("act-fav-rev");
                    d.html("Hapus dari favorit");
                    d.attr("id", "post_unfaver_" + b)
                } else {
                    d.addClass("act-fav");
                    $("#modal_post_public_" + b).remove();
                    a.showModalMessage("del", e.desc)
                }
            }, function() {
                d.removeClass("ic-load")
            });
            return false
        });
        $('.act-fav-rev[id*="post_unfaver_"]').die().live("click", function(c) {
            c.preventDefault();
            var b = $(this).attr("id").replace("post_unfaver_", "");
            var d = $(this);
            Siapku_Utils.doAjax("status/favorite", {
                post_id: b,
                type: "public",
                is_fav: 0
            }, function() {
                d.removeClass("act-fav-rev");
                d.addClass("ic-load")
            }, function(e) {
                if (!e.error) {
                    d.addClass("act-fav");
                    d.html("Jadikan favorit");
                    d.attr("id", "post_faver_" + b)
                } else {
                    d.addClass("act-fav-rev");
                    $("#modal_post_public_" + b).remove();
                    a.showModalMessage("del", e.desc)
                }
            }, function() {
                d.removeClass("ic-load")
            });
            return false
        })
    },
    triggerRepost: function() {
        $("a[id*=post_reposter_]").live("click", function(b) {
            b.preventDefault;
            var a = $(this).attr("id").replace("post_reposter_", "");
            var c = $(this);
            $("#modal_post_public_" + a).remove();
            Siapku_Utils.doAjax("/status/detail", {
                post_id: a,
                type: "public"
            }, function() {}, function(e) {
                if (!e.error) {
                    $("body").css({
                        overflow: "hidden"
                    });
                    var g = new Date();
                    var f = g.getTime();
                    Siapku_Interface.loadTemplate("modal/repost.html", function(d) {
                        d = d({
                            title: 'Kirim ulang kiriman <a href="#!/post/' + a + '">#' + a + "</a>",
                            modalId: f,
                            value: e,
                            user_avatar: e.user_avatar,
                            userAvatar: Siapku_Bootstrap.userAvatar.avatarThumb1,
                            userFullname: Siapku_Bootstrap.siapkuUser.fullname
                        });
                        $(d).hide().appendTo("body").show();
                        $("#modal_repost_" + f).promise().done(function() {
                            var h = $(this).find(".js-modal-content").width();
                            $(this).find(".modalbox-dialog").css({
                                width: h + 30,
                                "margin-top": 20
                            });
                            $(this).hide().show()
                        })
                    })
                } else {
                    Siapku_Interface.showModalMessage("del", e.desc)
                }
            });
            return false
        });
        $(".js-repost-submit").die().live("click", function(a) {
            a.preventDefault();
            Siapku_Utils.doAjax("/status/repost", {
                post_id: $(".js-repost-content").find("input[name=post_id_repost]").val(),
                message: $(".js-repost-content").find(".js-text-expand").val()
            }, function() {
                if (typeof errorReportId != "undefined" && errorReportId) {
                    Siapku_Interface.hideMessage(errorReportId, -1);
                    errorReportId = false
                }
                $('.modalbox[id*="modal_repost_"]').find(".feed-load").show()
            }, function(b) {
                $('.modalbox[id*="modal_repost_"]').find(".feed-load").hide();
                if (!b.error) {
                    $('.modalbox[id*="modal_repost_"]').remove();
                    Siapku_Interface.showFlashMessage("ok", "Kirim ulang berhasil.");
                    $("body").attr("style", "");
                    Siapku_Interface.loadTemplate("status/single.html", function(d) {
                        d = d({
                            value: b,
                            user_avatar: b.user_avatar
                        });
                        var c = d;
                        if ($(".js-timeline-content")) {
                            $(".js-timeline-content").prepend($(d))
                        } else {
                            var c = "<ul class=js-timeline-content>" + $(d).html() + "</ul>";
                            $(c).appendTo($(".work-main"))
                        }
                        $(c).promise().done(function() {
                            Siapku_Interface.lazyImage()
                        })
                    })
                } else {
                    errorReportId = Siapku_Interface.showMessage($('.modalbox[id*="modal_repost_"]').find(".feed-poster"), "n", "full", "err", "", b.desc, "prepend")
                }
            });
            return false
        })
    },
    postDelAct: function() {
        var a = this;
        $('.act-del[id*="post_deler_"]').die().live("click", function(c) {
            c.preventDefault();
            var b = $(this).attr("id").replace("post_deler_", "");
            var d = $(this);
            $("#modal_post_public_" + b).remove();
            $("li#post_" + b).addClass("selected");
            a.showConfirmMessage("Apakah Anda yakin akan menghapus kiriman ini ?", "del", "Dengan menghapus kiriman ini, maka anda dan semua pengguna SIAPKu tidak dapat lagi melihat kiriman ini, dan kami tidak dapat mengembalikannya lagi.", function() {
                Siapku_Utils.doAjax("status/delete", {
                    post_id: b,
                    type: "public"
                }, function() {
                    $('.mod-confirm[id*="modal_confirm_"]').remove();
                    $("body").attr("style", "")
                }, function(e) {
                    if (!e.error) {
                        $("#comen_post_" + b).fadeOut("slow");
                        $("#comen_post_" + b).promise().done(function() {
                            $("#comen_post_" + b).remove()
                        });
                        $("#post_" + b).fadeOut("slow");
                        $("#post_" + b).promise().done(function() {
                            $("#post_" + b).remove()
                        })
                    } else {
                        a.showModalMessage("del", e.desc)
                    }
                }, function() {})
            }, function() {
                $("li#post_" + b).removeClass("selected");
                $('.mod-confirm[id*="modal_confirm_"]').remove();
                $("body").attr("style", "")
            });
            return false
        })
    },
    postReport: function() {
        var a = this;
        $('.act-bad[id*="post_reporter_"]').die().live("click", function(d) {
            d.preventDefault();
            var c = $(this).attr("id").replace("post_reporter_", "");
            var f = $(this);
            $("#modal_post_public_" + c).remove();
            var b = '<div class="feed">' + $("li#post_" + c).html() + "</div>";
            a.showReportForm("Pelaporan Kiriman", "post", {
                htmlReported: b,
                Siapku_Bootstrap: Siapku_Bootstrap
            }, function() {
                var e = $('.modalbox[id*="modal_report_"]').find("form").find("textarea[name=reason]").val();
                Siapku_Utils.doAjax("/report/create", {
                    object_id: c,
                    type: "post",
                    reason: e
                }, function() {
                    if (typeof errorReportId != "undefined" && errorReportId) {
                        Siapku_Interface.hideMessage(errorReportId, -1);
                        errorReportId = false
                    }
                    $('.modalbox[id*="modal_report_"]').find(".feed-load").show();
                    $('.modalbox[id*="modal_report_"]').find("form").find("textarea[name=reason]").attr("disabled", "disabled");
                    $('.modalbox[id*="modal_report_"]').find("form").find("input[type=submit]").attr("disabled", "disabled")
                }, function(g) {
                    if (!g.error) {
                        $('.modalbox[id*="modal_report_"]').remove();
                        $("body").attr("style", "");
                        Siapku_Interface.showFlashMessage("ok", "Laporan berhasil disimpan.")
                    } else {
                        errorReportId = Siapku_Interface.showMessage($('.modalbox[id*="modal_report_"]').find(".feed-poster"), "n", "full", "err", "", g.desc, "prepend")
                    }
                }, function() {
                    $('.modalbox[id*="modal_report_"]').find(".feed-load").hide();
                    $('.modalbox[id*="modal_report_"]').find("form").find("textarea[name=reason]").removeAttr("disabled");
                    $('.modalbox[id*="modal_report_"]').find("form").find("input[type=submit]").removeAttr("disabled")
                })
            }, function() {
                $('.modalbox[id*="modal_report_"]').remove();
                $("body").attr("style", "")
            });
            return false
        })
    },
    showModalMessage: function(a, b) {
        var f = this;
        var e = new Date();
        var c = e.getTime();
        $("body").css({
            overflow: "hidden"
        });
        f.loadTemplate("modal/message.html", function(d) {
            d = d({
                title: "",
                desc: false,
                modalId: "_message_" + c,
                type: a,
                message: b
            });
            $(d).hide().appendTo("body").show();
            $("#modal_message_message_" + c).promise().done(function() {
                var g = $(this).find(".js-modal-content").width();
                $(this).find(".modalbox-dialog").css({
                    width: g + 10,
                    "margin-top": (($("#modal_message_message_" + c).height() - $("#modal_message_message_" + c).find(".modalbox-dialog").height()) / 2)
                });
                $(this).hide().show()
            })
        })
    },
    showFlashMessage: function(a, b, g) {
        var f = this;
        var e = new Date();
        var c = e.getTime();
        $("body").css({
            overflow: "hidden"
        });
        f.loadTemplate("modal/message.html", function(d) {
            d = d({
                title: "",
                desc: false,
                modalId: "_message_" + c,
                type: a,
                message: b
            });
            $(d).hide().appendTo("body").show();
            $("#modal_message_message_" + c).promise().done(function() {
                var h = $(this).find(".js-modal-content").width();
                $(this).find(".modalbox-dialog").css({
                    width: h + 30,
                    "margin-top": (($("#modal_message_message_" + c).height() - $("#modal_message_message_" + c).find(".modalbox-dialog").height()) / 2)
                });
                $(this).show().delay(1200).fadeOut(function() {
                    $(this).remove();
                    $("body").attr("style", "");
                    if (g) {
                        g.call()
                    }
                })
            })
        })
    },
    showConfirmMessage: function(e, b, h, a, c) {
        var i = this;
        var g = new Date();
        var f = g.getTime();
        $("body").css({
            overflow: "hidden"
        });
        i.loadTemplate("modal/confirm.html", function(d) {
            d = d({
                title: "",
                desc: false,
                modalId: "_confirm_" + f,
                message: e,
                type: b,
                desc: h,
                callbackYes: a,
                callbackNo: c
            });
            $(d).hide().appendTo("body").show();
            $("#modal_confirm_confirm_" + f).promise().done(function() {
                var j = $(this).find(".js-modal-content").width();
                $(this).find(".modalbox-dialog").css({
                    width: j + 25,
                    "margin-top": 20
                });
                $(this).hide().show()
            })
        })
    },
    showReportForm: function(g, b, c, a, i) {
        var h = this;
        var f = new Date();
        var e = f.getTime();
        $("body").css({
            overflow: "hidden"
        });
        h.loadTemplate("modal/report.html", function(d) {
            d = d({
                title: g,
                type: b,
                modalId: "_" + b + "_" + e,
                data: c,
                callbackCancel: i,
                callbackSubmit: a
            });
            $(d).hide().appendTo("body").show();
            $("#modal_report_" + b + "_" + e).promise().done(function() {
                var j = $(this).find(".js-modal-content").width();
                $(this).find(".modalbox-dialog").css({
                    width: j + 0
                });
                $(this).hide().show()
            })
        })
    },
    showNewGroupForm: function(f, b, a, h) {
        var g = this;
        var e = new Date();
        var c = e.getTime();
        $("body").css({
            overflow: "hidden"
        });
        g.loadTemplate("modal/group/create.html", function(d) {
            d = d({
                title: f,
                modalId: "_" + c,
                siapkuUrl: b,
                callbackCancel: h,
                callbackSubmit: a
            });
            $(d).hide().appendTo("body").show();
            $("#modal_new_group_" + c).promise().done(function() {
                var i = $(this).find(".js-modal-content").width();
                $(this).find(".modalbox-dialog").css({
                    width: i + 10,
                    "margin-top": 20
                });
                $(this).hide().show()
            })
        })
    },
    textAreaExpander: function() {
        var a = !($.browser.msie || $.browser.opera);
        $(".js-text-expand").die().live("keyup", function(d) {
            d = d.target || d;
            d.expandMin = 12;
            d.expandMax = 200;
            var f = d.value.length,
            c = d.offsetWidth;
            if (f != d.valLength || c != d.boxWidth) {
                if (a && (f < d.valLength || c != d.boxWidth)) {
                    d.style.height = "0px"
                }
                var b = Math.max(d.expandMin, Math.min(d.scrollHeight, d.expandMax));
                d.style.overflow = (d.scrollHeight > b ? "auto": "hidden");
                d.style.height = b + "px";
                $(d).closest(".input-expand-wrap").addClass("on");
                if (f <= 0) {
                    $(d).closest(".input-expand-wrap").removeClass("on")
                }
                d.valLength = f;
                d.boxWidth = c
            }
            return true
        }).live("focus", function(d) {
            d = d.target || d;
            d.expandMin = 12;
            d.expandMax = 200;
            var f = d.value.length,
            c = d.offsetWidth;
            if (f != d.valLength || c != d.boxWidth) {
                if (a && (f < d.valLength || c != d.boxWidth)) {
                    d.style.height = "0px"
                }
                var b = Math.max(d.expandMin, Math.min(d.scrollHeight, d.expandMax));
                d.style.overflow = (d.scrollHeight > b ? "auto": "hidden");
                d.style.height = b + "px";
                $(d).closest(".input-expand-wrap").addClass("on");
                if (f <= 0) {
                    $(d).closest(".input-expand-wrap").removeClass("on")
                }
                d.valLength = f;
                d.boxWidth = c
            }
            return true
        })
    },
    commentTrigger: function() {
        $(".js-trigger-comment").die().live("click", function(b) {
            b.preventDefault();
            var a = $(this).attr("id");
            if ($("#form_new_comment_" + a).hasClass("hide")) {
                $("#form_new_comment_" + a).removeClass("hide").hide().slideDown()
            }
            $("#modal_post_" + a).remove();
            $("#form_new_comment_" + a).find(".js-text-expand").focus();
            return false
        })
    },
    formComment: function() {
        $(".js-form-comment-content").find(".js-text-expand").live("keyup", function(f) {
            if (f.keyCode == 13 || f.keyCode == 38 || f.keyCode == 40) {
                return
            }
            var d = $(this).closest("form");
            var c = $(d).find('input[name="post_id"]').val();
            var a = c.replace("public_", "");
            var a = a.replace("private_", "");
            var b = c.replace("_" + a, "");
            Siapku_Interface.autoComplete(f, $(this), a, false, b)
        });
        $(".js-form-comment-content").find(".js-text-expand").live("keydown", function(a) {
            Siapku_Interface.autoCompleteElement = $(this);
            var g = $(this);
            var e = $(g).val();
            if (a.keyCode == 13) {
                if ($("#modal_autocomplete").length > 0 && $("#modal_autocomplete").is(":visible")) {
                    a.preventDefault();
                    var l = $("#modal_autocomplete .search-result div a.select");
                    var h = $(l).find("em").text();
                    var b = e.substring(0, Siapku_Interface.autoCompleteStart);
                    var j = e.substring(g.context.selectionStart);
                    $(g).val(b + h + " " + j);
                    $("#modal_autocomplete").remove();
                    $("#modal_autocomplete").promise().done(function() {
                        $(g).trigger("focus")
                    });
                    return
                }
            }
            if (a.keyCode == 38) {
                if ($("#modal_autocomplete").length > 0 && $("#modal_autocomplete").is(":visible")) {
                    a.preventDefault();
                    var c = $("#modal_autocomplete .search-result div").children();
                    var d = 1;
                    for (var f = 0; f < c.length; f++) {
                        if ($(c.get(f)).hasClass("select")) {
                            d = f;
                            break
                        }
                    }
                    $(c).removeClass("select");
                    $(c.get(d - 1)).addClass("select")
                }
                return
            } else {
                if (a.keyCode == 40) {
                    if ($("#modal_autocomplete").length > 0 && $("#modal_autocomplete").is(":visible")) {
                        a.preventDefault();
                        var c = $("#modal_autocomplete .search-result div").children();
                        var d = -1;
                        for (var f = 0; f < c.length; f++) {
                            if ($(c.get(f)).hasClass("select")) {
                                d = f;
                                break
                            }
                        }
                        var k = $(c).get(d + 1);
                        if (typeof k != "undefined") {
                            $(c).removeClass("select");
                            $(c.get(d + 1)).addClass("select")
                        } else {
                            $(c).removeClass("select");
                            $(c.get(0)).addClass("select")
                        }
                    }
                    return
                }
            }
        });
        $(".js-form-comment-content").find(".input-expand-wrap").die().live("click", function(a) {
            a.preventDefault();
            $(this).find("textarea").trigger("focus");
            return false
        });
        $(".js-feed-comen-submit").die().live("click", function(g) {
            g.preventDefault;
            var f = $(this).closest("form");
            var d = $(f).find('input[name="post_id"]').val();
            var c = $(f).find('textarea[class="js-text-expand"]').val();
            if (c.replace(/ /gi, "").length > 0) {
                var a = d.replace("public_", "");
                var a = a.replace("private_", "");
                var b = d.replace("_" + a, "");
                Siapku_Utils.doAjax("comment/create", {
                    post_id: a,
                    msg: c,
                    type: b
                }, function() {
                    if (typeof errCommentId != "undefined" && errCommentId) {
                        Siapku_Interface.hideMessage(errCommentId, -1);
                        errCommentId = false
                    }
                    $(f).find(".input-expand-wrap").hide();
                    $(f).addClass("ic-load")
                }, function(k) {
                    if (!k.error) {
                        if (b == "public") {
                            var j = '<li class="feed act-grp-data" id="comment_' + k.id + '">';
                            j += '<a href="#!/user/' + (k.user.username ? k.user.username: k.user.id) + '" id="user_' + k.user.id + '" class="js-cardhov"><img src="' + k.user.avatar + '"></a>';
                            j += '<h4><a href="#!/user/' + (k.user.username ? k.user.username: k.user.id) + '" id="user_' + k.user.id + '" class="js-cardhov">' + k.user.fullname + "</a></h4>";
                            j += "<p>";
                            j += k.message;
                            j += "</p>";
                            j += '<dd class="desc">';
                            j += "<em>" + k.relative_time + "</em>";
                            j += "</dd>";
                            j += "<dt>";
                            j += '<a href="javascript:;" class="act-grp fr js-modal-comment-list" id="' + b + "_" + k.id + '"></a>';
                            j += "</dt>";
                            j += "</li>";
                            var i = false;
                            if ($("#form_new_comment_" + d).prev(".js-comment-list").length > 0) {} else {
                                i = $('<ul class="js-comment-list"></ul>');
                                $(i).insertBefore($("#form_new_comment_" + d))
                            }
                            if (i) {
                                $(i).promise().done(function() {
                                    $(j).appendTo($("#form_new_comment_" + d).prev(".js-comment-list")).hide().show("slide", {
                                        direction: "down"
                                    }, 500)
                                })
                            } else {
                                $(j).appendTo($("#form_new_comment_" + d).prev(".js-comment-list")).hide().show("slide", {
                                    direction: "down"
                                }, 500)
                            }
                            $(f).find(".input-expand-wrap").show();
                            $(f).find('textarea[class="js-text-expand"]').val("").trigger("focus");
                            var e = $("#comen_post_" + a);
                            if ($(e).find("a").length > 0 && $($(e).find("a").get(0)).hasClass("js-trigger-comment")) {
                                $($(e).find("a").get(0)).remove();
                                $($(e).find(".desc").get(0)).append('<em class="ics ic-post-d lbl fl"><span>1 dari</span> 1 komentar</em>')
                            } else {
                                var l = parseInt($($(e).find("em").get(0)).find("span").text().replace(" dari", ""));
                                var h = $($(e).find("em").get(0)).html().replace("<span>" + l + " dari</span> ", "");
                                var h = parseInt(h.replace(" komentar", ""));
                                $($(e).find("em").get(0)).html("<span>" + (l + 1) + " dari</span> " + (h + 1) + " komentar</em>")
                            }
                        } else {
                            var j = '<li class="feed pointed-t" id="comment_' + k.id + '">';
                            j += '<a href="#!/user/' + (k.user.username ? k.user.username: k.user.id) + '" id="user_' + k.user.id + '" class="js-cardhov"><img src="' + k.user.avatar + '"></a>';
                            j += '<h4><a href="#!/user/' + (k.user.username ? k.user.username: k.user.id) + '" id="user_' + k.user.id + '" class="js-cardhov">' + k.user.fullname + "</a></h4>";
                            j += "<p>";
                            j += k.message;
                            j += "</p>";
                            j += '<dt class="desc sml nowrap">';
                            j += "<em>" + k.relative_time + "</em>";
                            j += "</dt>";
                            j += "</li>";
                            $(j).insertBefore($("#form_new_comment_" + d)).hide().show("slide", {
                                direction: "down"
                            }, 500);
                            $(f).find(".input-expand-wrap").show();
                            $(f).find('textarea[class="js-text-expand"]').val("").trigger("focus")
                        }
                    } else {
                        $(f).find(".input-expand-wrap").show();
                        errCommentId = Siapku_Interface.showMessage($(f).find(".js-form-comment-content"), "n", "", "err", "", k.desc, "prepend")
                    }
                }, function() {
                    $(f).removeClass("ic-load")
                })
            }
            return false
        })
    },
    deleteComment: function() {
        var a = this;
        $(".js-delete-comment").die().live("click", function(g) {
            g.preventDefault();
            var h = $(this).attr("id");
            var f = h.replace("comment_", "");
            f = f.substring(0, f.indexOf("_"));
            var b = h.replace("comment_" + f + "_of_", "");
            var d = b.substring(0, b.indexOf("_"));
            var c = b.replace(d + "_", "");
            $("#modal_comment_" + d + "_" + f).remove();
            $("li#comment_" + f).addClass("selected");
            a.showConfirmMessage("Apakah Anda yakin akan menghapus komentar ini ?", "del", "Dengan menghapus komentar ini, maka anda dan semua pengguna SIAPKu tidak dapat lagi melihat komentar ini, dan kami tidak dapat mengembalikannya lagi.", function() {
                Siapku_Utils.doAjax("comment/delete", {
                    post_id: c,
                    type: d,
                    comment_id: f
                }, function() {
                    $('.mod-confirm[id*="modal_confirm_"]').remove();
                    $("body").attr("style", "")
                }, function(i) {
                    if (!i.error) {
                        var j = parseInt($($("#comen_post_" + c + " .desc em").get(0)).find("span").text().replace(" dari", ""));
                        if (j > 1) {
                            var e = $($("#comen_post_" + c + " .desc em").get(0)).html().replace("<span>" + j + " dari</span> ", "");
                            var e = parseInt(e.replace(" komentar", ""));
                            $($("#comen_post_" + c + " .desc em").get(0)).html("<span>" + (j - 1) + " dari</span> " + (e - 1) + " komentar</em>")
                        } else {
                            $($("#comen_post_" + c + " .desc").get(0)).html('<a href="" id="public_' + c + '" class="ics ic-post-d lbl fl js-trigger-comment"><em>beri komentar</em></a>')
                        }
                        $('li[id="comment_' + f + '"]').fadeOut("slow");
                        $('li[id="comment_' + f + '"]').promise().done(function() {
                            $(this).remove()
                        })
                    } else {
                        a.showModalMessage("del", i.desc)
                    }
                }, function() {})
            }, function() {
                $('.mod-confirm[id*="modal_confirm_"]').remove();
                $("body").attr("style", "");
                $("li#comment_" + f).removeClass("selected")
            });
            return false
        })
    },
    commentReport: function() {
        var a = this;
        $('.act-bad[id*="comment_reporter_"]').die().live("click", function(d) {
            d.preventDefault();
            var c = $(this).attr("id").replace("comment_reporter_", "");
            var f = $(this);
            $("#modal_comment_public_" + c).remove();
            var b = '<div class="feed">' + $("li#comment_" + c).html() + "</div>";
            a.showReportForm("Pelaporan Komentar", "comment", {
                htmlReported: b,
                Siapku_Bootstrap: Siapku_Bootstrap
            }, function() {
                var e = $('.modalbox[id*="modal_report_"]').find("form").find("textarea[name=reason]").val();
                Siapku_Utils.doAjax("/report/create", {
                    object_id: c,
                    type: "comment",
                    reason: e
                }, function() {
                    if (typeof errorReportId != "undefined" && errorReportId) {
                        Siapku_Interface.hideMessage(errorReportId, -1);
                        errorReportId = false
                    }
                    $('.modalbox[id*="modal_report_"]').find(".feed-load").show();
                    $('.modalbox[id*="modal_report_"]').find("form").find("textarea[name=reason]").attr("disabled", "disabled");
                    $('.modalbox[id*="modal_report_"]').find("form").find("input[type=submit]").attr("disabled", "disabled")
                }, function(g) {
                    if (!g.error) {
                        $('.modalbox[id*="modal_report_"]').remove();
                        $("body").attr("style", "");
                        Siapku_Interface.showFlashMessage("ok", "Laporan berhasil disimpan.")
                    } else {
                        errorReportId = Siapku_Interface.showMessage($('.modalbox[id*="modal_report_"]').find(".feed-poster"), "n", "full", "err", "", g.desc, "prepend")
                    }
                }, function() {
                    $('.modalbox[id*="modal_report_"]').find(".feed-load").hide();
                    $('.modalbox[id*="modal_report_"]').find("form").find("textarea[name=reason]").removeAttr("disabled");
                    $('.modalbox[id*="modal_report_"]').find("form").find("input[type=submit]").removeAttr("disabled")
                })
            }, function() {
                $('.modalbox[id*="modal_report_"]').remove();
                $("body").attr("style", "")
            });
            return false
        })
    },
    userReport: function() {
        var a = this;
        $('.js-report-user[id*="user_reporter_"]').die().live("click", function(d) {
            d.preventDefault();
            var c = $(this).attr("id").replace("user_reporter_", "");
            var f = $(this);
            var b = '<div class="head-avatar size-80">' + $(".head-avatar").html() + "</div>";
            a.showReportForm("Pelaporan Pengguna", "user", {
                htmlReported: b,
                Siapku_Bootstrap: Siapku_Bootstrap
            }, function() {
                var e = $('.modalbox[id*="modal_report_"]').find("form").find("textarea[name=reason]").val();
                Siapku_Utils.doAjax("/report/create", {
                    object_id: c,
                    type: "user",
                    reason: e
                }, function() {
                    if (typeof errorReportId != "undefined" && errorReportId) {
                        Siapku_Interface.hideMessage(errorReportId, -1);
                        errorReportId = false
                    }
                    $('.modalbox[id*="modal_report_"]').find(".feed-load").show();
                    $('.modalbox[id*="modal_report_"]').find("form").find("textarea[name=reason]").attr("disabled", "disabled");
                    $('.modalbox[id*="modal_report_"]').find("form").find("input[type=submit]").attr("disabled", "disabled")
                }, function(g) {
                    if (!g.error) {
                        $('.modalbox[id*="modal_report_"]').remove();
                        $("body").attr("style", "");
                        f.remove();
                        Siapku_Interface.showFlashMessage("ok", "Laporan berhasil disimpan.")
                    } else {
                        errorReportId = Siapku_Interface.showMessage($('.modalbox[id*="modal_report_"]').find(".feed-poster"), "n", "full", "err", "", g.desc, "prepend")
                    }
                }, function() {
                    $('.modalbox[id*="modal_report_"]').find(".feed-load").hide();
                    $('.modalbox[id*="modal_report_"]').find("form").find("textarea[name=reason]").removeAttr("disabled");
                    $('.modalbox[id*="modal_report_"]').find("form").find("input[type=submit]").removeAttr("disabled")
                })
            }, function() {
                $('.modalbox[id*="modal_report_"]').remove();
                $("body").attr("style", "")
            });
            return false
        })
    },
    groupReport: function() {
        var a = this;
        $('.js-report-group[id*="group_reporter_"]').die().live("click", function(d) {
            d.preventDefault();
            var c = $(this).attr("id").replace("group_reporter_", "");
            var f = $(this);
            var b = '<div class="head-avatar size-80">' + $(".head-avatar").html() + "</div>";
            a.showReportForm("Pelaporan Komunitas", "group", {
                htmlReported: b,
                Siapku_Bootstrap: Siapku_Bootstrap
            }, function() {
                var e = $('.modalbox[id*="modal_report_"]').find("form").find("textarea[name=reason]").val();
                Siapku_Utils.doAjax("/report/create", {
                    object_id: c,
                    type: "group",
                    reason: e
                }, function() {
                    if (typeof errorReportId != "undefined" && errorReportId) {
                        Siapku_Interface.hideMessage(errorReportId, -1);
                        errorReportId = false
                    }
                    $('.modalbox[id*="modal_report_"]').find(".feed-load").show();
                    $('.modalbox[id*="modal_report_"]').find("form").find("textarea[name=reason]").attr("disabled", "disabled");
                    $('.modalbox[id*="modal_report_"]').find("form").find("input[type=submit]").attr("disabled", "disabled")
                }, function(g) {
                    if (!g.error) {
                        $('.modalbox[id*="modal_report_"]').remove();
                        $("body").attr("style", "");
                        f.remove();
                        Siapku_Interface.showFlashMessage("ok", "Laporan berhasil disimpan.")
                    } else {
                        errorReportId = Siapku_Interface.showMessage($('.modalbox[id*="modal_report_"]').find(".feed-poster"), "n", "full", "err", "", g.desc, "prepend")
                    }
                }, function() {
                    $('.modalbox[id*="modal_report_"]').find(".feed-load").hide();
                    $('.modalbox[id*="modal_report_"]').find("form").find("textarea[name=reason]").removeAttr("disabled");
                    $('.modalbox[id*="modal_report_"]').find("form").find("input[type=submit]").removeAttr("disabled")
                })
            }, function() {
                $('.modalbox[id*="modal_report_"]').remove();
                $("body").attr("style", "")
            });
            return false
        })
    },
    moreComments: function() {
        var a = this;
        $(".js-more-comment").die().live("click", function() {
            var b = $(this).attr("id");
            var d = b.substring(0, b.indexOf("_"));
            var c = b.replace(d + "_", "");
            var e = $(this);
            Siapku_Utils.doAjax("/status/comments", {
                post_id: c,
                type: d,
                mode: "newest"
            }, function() {
                $(e).addClass("ic-load")
            }, function(f) {
                if (!f.error) {
                    $(e).hide();
                    a.loadTemplate("comment/list.html", function(h) {
                        h = h(f);
                        $(h).each(function() {
                            if ($(this).is("li")) {
                                $(this).prependTo($("#comen_post_" + c).find(".js-comment-list")).hide().show("slide", {
                                    direction: "up"
                                }, 100)
                            }
                        });
                        var i = parseInt($($("#comen_post_" + c + " .desc em").get(0)).find("span").text().replace(" dari", ""));
                        var g = $($("#comen_post_" + c + " .desc em").get(0)).html().replace("<span>" + i + " dari</span> ", "");
                        var g = parseInt(g.replace(" komentar", ""));
                        $($("#comen_post_" + c + " .desc em").get(0)).html("<span>" + g + " dari</span> " + g + " komentar</em>")
                    })
                } else {}
            }, function() {
                $(e).removeClass("ic-load")
            })
        })
    },
    forceClearScreen: function() {
        $(".tips-modal").each(function() {
            if (typeof $(this).attr("id") != "undefined" && $(this).attr("id").indexOf("modalcardhov") >= 0) {
                $(this).remove()
            }
            if (typeof $(this).attr("id") != "undefined" && $(this).attr("id").indexOf("modal_post") >= 0) {
                $(this).remove()
            }
        });
        $("#siapTooltipObj:visible").remove();
        $(".modalbox").remove();
        $(".js-cardhov").die();
        hoverTimeOut = typeof hoverTimeOut != "undefined" ? hoverTimeOut: {};
        for (key in hoverTimeOut) {
            clearTimeout(hoverTimeOut[key])
        }
        this.hoverCard()
    }
};
$.fn.siapAnim = function() {
    var d = $(this).find(".feed-pop");
    var b = $(this);
    var g = b.width();
    var a = g / 2;
    var h = Array();
    h[0] = Array(83, 90, "siswa", "Siswa", "Hi semuanya :)");
    h[1] = Array(442, 265, "guru", "Guru", "Halo, anak-anak");
    h[2] = Array(307, 150, "sekolah", "Sekolah", "Selamat belajar");
    h[3] = Array(647, 144, "ortu", "Ortu / Wali", "Titip anak kami ya, bu");
    h[4] = Array(201, 225, "dinas", "Dinas Pendidikan", "Tingkatkan Mutu pendidikan");
    d.find("h4").text(h[0][3]).end().find("p").text(h[0][4]).end().addClass(h[0][0] > a ? h[0][2] + " right": h[0][2]).css({
        left: (h[0][0] > a ? h[0][0] - (d.outerWidth() - 21) : h[0][0] - 22),
        top: (h[0][1] - (d.outerHeight() + 8))
    });
    for (var c = 1; c < h[0].length; c++) {
        var f = d.clone().appendTo(b);
        f.find("h4").text(h[c][3]).end().find("p").text(h[c][4]).end().addClass(h[c][0] > a ? h[c][2] + " right": h[c][2]).css({
            left: (h[c][0] > a ? h[c][0] - (f.outerWidth() - 21) : h[c][0] - 22),
            top: (h[c][1] - (d.outerHeight() + 8))
        })
    }
    function e(i) {
        if (i.is(":first-child")) {
            i.siblings(":last-child").fadeOut()
        } else {
            i.prev().fadeOut()
        }
        if (i.is(":last-child")) {
            i.show().delay(2000).show("fast", function() {
                e($(this).siblings(":first-child"))
            })
        } else {
            i.show().delay(2000).show("fast", function() {
                e($(this).next())
            })
        }
    }
    e(d)
};
$.fn.siapListClearFix = function(i) {
    var e = $(this).find(i).filter(":visible");
    if (e.length < 1) {
        return $(this)
    }
    if ($.browser.chrome) {
        var g = $("html").attr("style");
        $("html").css("overflow-y", "scroll !important")
    }
    e.filter(".clr-l").removeClass("clr-l");
    var f = e.first().position().top;
    var h = false;
    e.filter(function(a) {
        if ($(this).position().top > f && !h) {
            return h = a
        } else {
            return a % h == 0
        }
    }).addClass("clr-l");
    if ($.browser.chrome) {
        if (typeof g == "undefined") {
            $("html").removeAttr("style")
        } else {
            $("html").css("overflow-y", "")
        }
    }
    return $(this)
};
var Siapku_View_Portal = {
    aktivitasAnggota: function(a) {
        if (a.list.length > 0) {
            Siapku_Interface.loadTemplate("status/user_nologin.html", function(c) {
                var b = c(a);
                $(b).hide().appendTo($(".js-aktivitas-anggota-container")).slideDown("fast")
            })
        }
    },
    aktivitasKomunitas: function(a) {
        $(".js-aktivitas-komunitas-container").empty();
        if (a.list.length > 0) {
            Siapku_Interface.loadTemplate("status/group_nologin.html", function(c) {
                var b = c(a);
                $(b).hide().appendTo($(".js-aktivitas-komunitas-container")).slideDown("fast")
            })
        }
    },
    anggota: function(b) {
        $(".js-widget-right-anggota .section .user-list").empty();
        var a = "";
        $.each(b.list, function(c, d) {
            a += '<a class="tips" href="#!/user/' + (d.username ? d.username: d.id) + '" title="' + d.fullname + '"><img src="' + d.profile_image_url + '"></a>'
        });
        a += '<a class="rnd5" href="/login">bergabung dengan Kami</a>';
        $(a).hide().appendTo($(".js-widget-right-anggota .section .user-list")).slideDown("fast")
    },
    cs: function(a) {
        $(".js-widget-right-helpdesk .js-cs1 b").removeClass("ic-load");
        $(".js-widget-right-helpdesk .js-cs1 b").addClass("ic-post-d");
        $(".js-widget-right-helpdesk .js-cs2 b").removeClass("ic-load");
        $(".js-widget-right-helpdesk .js-cs2 b").addClass("ic-post-d");
        if (a.cs1.isOnline) {
            $(".js-widget-right-helpdesk .js-cs1").removeAttr("disabled");
            $(".js-widget-right-helpdesk .js-cs1").attr("href", a.cs1.link);
            $(".js-widget-right-helpdesk .js-cs1 b").removeClass("ic-post-d");
            $(".js-widget-right-helpdesk .js-cs1 b").addClass("ic-post")
        }
        if (a.cs2.isOnline) {
            $(".js-widget-right-helpdesk .js-cs2").removeAttr("disabled");
            $(".js-widget-right-helpdesk .js-cs2").attr("href", a.cs2.link);
            $(".js-widget-right-helpdesk .js-cs2 b").removeClass("ic-post-d");
            $(".js-widget-right-helpdesk .js-cs2 b").addClass("ic-post")
        }
    }
};
var Siapku_View_Dashboard = {
    activity: function(a, b) {
        Siapku_Interface.loadTemplate("widget/dashboard/activity.html", function(d) {
            var c = d(b);
            $(c).appendTo($(a));
            $(c).promise().done(function() {
                Siapku_Interface.lazyImage();
                if (b.is_my_section || b.section.indexOf("search") >= 0) {
                    Siapku_Interface.loadTemplate("status/form.html", function(f) {
                        var e = {
                            userAvatar: Siapku_Bootstrap.userAvatar.avatarThumb4,
                            userFullname: Siapku_Bootstrap.siapkuUser.fullname
                        };
                        var g = f(e);
                        $(g).insertAfter($(".work-main .section"));
                        $(g).promise().done(function() {
                            $("label[for]").live("click", function() {
                                var i = $(this).closest("tr").find("input#" + $(this).attr("for"));
                                if (i.is("input[type=file]")) {
                                    i.trigger("click")
                                } else {
                                    i.focus()
                                }
                            });
                            $("input[type=file]").die().live("change", function() {
                                var i = this.value;
                                if ($.browser.chrome) {
                                    i = i.replace(/^.*\\/, "")
                                }
                                if (i.length > 23) {
                                    i = i.substring(0, 9) + " ... " + i.substring(i.length - 11, i.length)
                                }
                                $(this).siblings(".input-file-mask").find("span").text(i)
                            });
                            $("input[type=file]").addClass("hideit").after(function() {
                                var i = (typeof $(this).attr("alt") == "undefined") ? "": $(this).attr("alt");
                                return '<div class="input-file-mask input"><a class="button">Pilih file</a><span>' + i + "</span></div>"
                            });
                            $(".input-file-mask >a").die().live("click", function() {
                                $(this).closest("div").siblings("input[type=file]").trigger("click")
                            });
                            if (b.section.indexOf("search") >= 0) {
                                var h = b.section.replace("search_", "");
                                $(".feed-poster").find(".js-poster-link").find("em").html("Mulai berbagi hal baru tentang " + h);
                                $(".js-form-content textarea[name=post]").val(h)
                            }
                            $(".js-auto-post-trigger").show()
                        })
                    })
                }
            })
        })
    }
};
var Siapku_View_User = {
    card: function(a, b) {
        Siapku_Interface.loadTemplate("user/card.html", function(d) {
            var c = d(b);
            $(c).appendTo($(a))
        })
    },
    simpleProfil: function(a, b, c) {
        Siapku_Interface.loadTemplate("widget/user/left-sidebar.html", function(e) {
            var d = e(b);
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                c()
            })
        })
    },
    rssSekolah: function(a, d, h) {
        var g = d.feed;
        var b = d.fb_app_id;
        var e = "";
        var f = 1;
        var c = 5;
        var i = false;
        if (window.location.href.indexOf("recommendation") == -1) {
            f = 1;
            c = 5
        }
        Siapku_Utils.doAjax("/recommendation/aggr-not-followed", {
            page: f,
            limit: c
        }, function() {}, function(k) {
            if (!Siapku_Bootstrap.isLogged) {
                i = false
            } else {
                i = true
            }
            var j = Siapku_Utils.readCookie("fb_authed");
            var l = Siapku_Utils.readCookie("tw_authed");
            Siapku_Interface.loadTemplate("widget/user/right-sidebar.html", function(n) {
                var o = {
                    doRecommend: i,
                    recommendation: k,
                    feed: g,
                    fbAppId: b,
                    add_berita: true,
                    add_adv_sekolah: true,
                    statik_img_path: Siapku_Bootstrap.environment.statik_url + Siapku_Bootstrap.environment.statik_path + "/" + Siapku_Bootstrap.environment.statik_version + "/img/"
                };
                var m = n(o);
                $(m).hide().appendTo($(a)).slideDown("fast");
                $(m).promise().done(function() {
                    if (typeof FB == "undefined") {
                        (function(t) {
                            var s,
                            u = "facebook-jssdk",
                            r = t.getElementsByTagName("script")[0];
                            if (t.getElementById(u)) {
                                return
                            }
                            s = t.createElement("script");
                            s.id = u;
                            s.async = true;
                            s.src = "//connect.facebook.net/en_US/all.js";
                            r.parentNode.insertBefore(s, r)
                        } (document))
                    }
                    var p = Siapku_Utils.readCookie("fb_authed");
                    var q = Siapku_Utils.readCookie("tw_authed");
                    if (j == "false" && p == "true" && window.location.href.indexOf("recommendation") == -1) {
                        Siapku_Interface.showConfirmMessage("Otorisasi SIAPKu dengan Facebook berhasil", "info", "Apakah anda ingin melihat rekomendasi teman berdasarkan data pertemanan anda di facebook ?", function() {
                            window.location.hash = "#!/friends/recommendation/fb"
                        }, function() {
                            $('.mod-confirm[id*="modal_confirm_"]').remove();
                            $("body").attr("style", "")
                        })
                    }
                    if (l == "false" && q == "true" && window.location.href.indexOf("recommendation") == -1) {
                        Siapku_Interface.showConfirmMessage("Otorisasi SIAPKu dengan Twitter berhasil", "info", "Apakah anda ingin melihat rekomendasi teman berdasarkan data pertemanan anda di twitter ?", function() {
                            window.location.hash = "#!/friends/recommendation/tw"
                        }, function() {
                            $('.mod-confirm[id*="modal_confirm_"]').remove();
                            $("body").attr("style", "")
                        })
                    }
                    if (h) {
                        h()
                    }
                })
            })
        }, function() {})
    },
    publicProfil: function(a, b, c) {
        Siapku_Interface.loadTemplate("layout/profil_user_public.html", function(e) {
            b.STATIK_IMG_PATH = Siapku_Interface.statikUrl + Siapku_Interface.statikPath + "/" + Siapku_Interface.statikVersion + "/img/";
            var d = e(b);
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                if (c) {
                    c()
                }
            })
        })
    },
    profil: function(a, b) {
        Siapku_Interface.loadTemplate("widget/user/main-profil.html", function(d) {
            b.STATIK_IMG_PATH = Siapku_Interface.statikUrl + Siapku_Interface.statikPath + "/" + Siapku_Interface.statikVersion + "/img/";
            var c = d(b);
            $(c).hide().appendTo($(a)).slideDown("fast");
            $(c).promise().done(function() {
                Siapku_Interface.lazyImage();
                $(".zoom-in").trigger("hover")
            })
        })
    },
    contact: function(a, b) {
        Siapku_Interface.loadTemplate("widget/user/main-contact.html", function(d) {
            b.STATIK_IMG_PATH = Siapku_Interface.statikUrl + Siapku_Interface.statikPath + "/" + Siapku_Interface.statikVersion + "/img/";
            var c = d(b);
            $(c).hide().appendTo($(a)).slideDown("fast");
            $(c).promise().done(function() {
                if (!window.google && !b.error) {
                    var e = document.createElement("script");
                    e.type = "text/javascript";
                    e.src = Siapku_Interface.statikUrl + Siapku_Interface.statikPath + "/" + Siapku_Interface.statikVersion + "/js/lib/siap-gmap.js";
                    $("body").append(e)
                }
                if (!b.error) {
                    var f = window.setInterval(function() {
                        if (window.GMap) {
                            window.clearInterval(f);
                            GMap.execute(function() {
                                if (!b.error && b.user_lokasi && b.user_lokasi.lintang != "0" && b.user_lokasi.bujur != "0") {
                                    var j = b.user_lokasi.lintang;
                                    var l = b.user_lokasi.bujur;
                                    var m = new google.maps.LatLng(j, l);
                                    var g = {
                                        zoom: 8,
                                        center: m,
                                        panControl: false,
                                        zoomControl: true,
                                        mapTypeControl: true,
                                        scaleControl: false,
                                        streetViewControl: false,
                                        mapTypeId: google.maps.MapTypeId.ROADMAP
                                    };
                                    map = new google.maps.Map(document.getElementById("school_loc"), g);
                                    var h = document.createElement("div");
                                    h.className = "mapcard umum";
                                    h.innerHTML = '<div class="profil"><img src=" ' + b.user_avatar.avatarThumb1 + ' " /><div class="msg"><h3><a href="" class="tips" title="lihat profil lengkap">' + _.escape(b.user_detail.fullname) + "</a></h3>" + (b.user_detail.about_me ? "<p><em>" + (b.user_detail.about_me.length > 100 ? b.user_detail.about_me.substring(0, 100) + "...": b.user_detail.about_me) + "</em></p>": "") + '</div></div><dd></dd><div class="stats rnd3 rnd-b" align="right"><a href="#!/user/' + (b.user_detail.username ? b.user_detail.username: b.user_detail.id) + '" class="ic act-kontak tips" title="lihat profil lengkap"></a> ' + (b.i_can_pm && !b.is_my_profile ? '<a href="javascript:;" class="ic act-post tips js-priv-msg" title="kirim pesan"></a>': "") + "</div>";
                                    marker = new google.maps.Marker({
                                        position: m,
                                        map: map,
                                        icon: new google.maps.MarkerImage(b.STATIK_IMG_PATH + "gmap/ic20-umum.png", new google.maps.Size(20, 25), new google.maps.Point(0, 0), new google.maps.Point(10, 25)),
                                        title: _.escape(b.user_detail.fullname),
                                        ibCont: {
                                            html: h
                                        },
                                        animation: google.maps.Animation.DROP
                                    });
                                    var k = document.createElement("div");
                                    var i = {
                                        content: k,
                                        maxWidth: 0,
                                        pixelOffset: new google.maps.Size( - 32, -7),
                                        closeBoxMargin: "0;float:right;margin-top:5px;margin-right:5px",
                                        closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
                                        infoBoxClearance: new google.maps.Size(5, 35),
                                        isHidden: false,
                                        enableEventPropagation: false,
                                        alignBottom: true
                                    };
                                    ib = new InfoBox(i);
                                    google.maps.event.addListener(marker, "click", function() {
                                        ib.setContent(this.ibCont.html);
                                        ib.open(map, this)
                                    });
                                    google.maps.event.addListener(map, "click", function() {
                                        ib.close()
                                    })
                                }
                            })
                        }
                    }, 1)
                }
            })
        })
    },
    activity: function(a, b, c) {
        Siapku_Interface.loadTemplate("widget/user/activity.html", function(e) {
            var d = e(b);
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                c();
                Siapku_Interface.lazyImage();
                var f = false;
                if (Siapku_Bootstrap.siapkuUser.follow_users && _.size(Siapku_Bootstrap.siapkuUser.follow_users) > 0) {
                    if (typeof Siapku_Bootstrap.siapkuUser.follow_users[b.user_detail.id] !== "undefined") {
                        f = true
                    }
                }
                if (Siapku_Bootstrap.siapkuUser.id == b.user_detail.id || (f && ((Siapku_Bootstrap.siapkuUser.id != b.user_detail.id && b.user_detail.username)))) {
                    Siapku_Interface.loadTemplate("status/form.html", function(h) {
                        var g = {
                            userAvatar: Siapku_Bootstrap.userAvatar.avatarThumb4,
                            userFullname: Siapku_Bootstrap.siapkuUser.fullname
                        };
                        var i = h(g);
                        $(i).insertAfter($(".work-main .section .section"));
                        $(i).promise().done(function() {
                            $("label[for]").live("click", function() {
                                var j = $(this).closest("tr").find("input#" + $(this).attr("for"));
                                if (j.is("input[type=file]")) {
                                    j.trigger("click")
                                } else {
                                    j.focus()
                                }
                            });
                            $("input[type=file]").die().live("change", function() {
                                var j = this.value;
                                if ($.browser.chrome) {
                                    j = j.replace(/^.*\\/, "")
                                }
                                if (j.length > 23) {
                                    j = j.substring(0, 9) + " ... " + j.substring(j.length - 11, j.length)
                                }
                                $(this).siblings(".input-file-mask").find("span").text(j)
                            });
                            $("input[type=file]").addClass("hideit").after(function() {
                                var j = (typeof $(this).attr("alt") == "undefined") ? "": $(this).attr("alt");
                                return '<div class="input-file-mask input"><a class="button">Pilih file</a><span>' + j + "</span></div>"
                            });
                            $(".input-file-mask >a").die().live("click", function() {
                                $(this).closest("div").siblings("input[type=file]").trigger("click")
                            });
                            $(".js-auto-post-trigger").show();
                            if (Siapku_Bootstrap.siapkuUser.id != b.user_detail.id) {
                                $(".feed-poster").find(".js-poster-link").find("em").html("Mulai berbagi hal baru dengan " + b.user_detail.fullname);
                                $(".js-form-content textarea[name=post]").val("@" + b.user_detail.username)
                            }
                        })
                    })
                }
            })
        })
    },
    overviewActivity: function(a, b, c) {
        Siapku_Interface.loadTemplate("widget/user/overview_activity.html", function(e) {
            var d = e(b);
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                c()
            })
        })
    },
    overviewFriend: function(a, b, c) {
        Siapku_Interface.loadTemplate("widget/user/overview_friend.html", function(e) {
            var d = e(b);
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                c()
            })
        })
    },
    overviewGroup: function(a, b, c) {
        Siapku_Interface.loadTemplate("widget/user/overview_group.html", function(e) {
            var d = e(b);
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                c()
            })
        })
    },
    moreActivity: function(a, b, c) {
        if (b.user_timeline) {
            b.list = b.user_timeline.list;
            Siapku_Interface.loadTemplate("status/list.html", function(e) {
                var d = e(b);
                if (d.indexOf("li") > 0) {
                    $(d).hide().appendTo($(a)).slideDown("fast");
                    $(d).promise().done(function() {
                        c()
                    })
                }
            })
        }
    },
    friends: function(a, b, c) {
        Siapku_Interface.loadTemplate("widget/user/friends.html", function(e) {
            if (b.friendType == "followed") {
                b.friends = b.followed
            } else {
                b.friends = b.followers
            }
            var d = e(b);
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                if (b.display == "thumb") {
                    $(".direktori-thumb").filter(":visible").siapListClearFix(">li")
                }
                c()
            })
        })
    },
    groups: function(a, b, c) {
        Siapku_Interface.loadTemplate("widget/user/groups.html", function(e) {
            var d = e(b);
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                if (b.display == "thumb") {
                    $(".direktori-thumb").filter(":visible").siapListClearFix(">li")
                }
                c()
            })
        })
    },
    collection: function(a, b, c) {
        Siapku_Interface.loadTemplate("widget/user/collection.html", function(e) {
            var d = e(b);
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                c()
            })
        })
    },
    wacana: function(a, b, c) {
        Siapku_Interface.loadTemplate("widget/user/wacana.html", function(e) {
            var d = e(b);
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                c()
            })
        })
    }
};
var Siapku_View_Group = {
    card: function(a, b) {
        Siapku_Interface.loadTemplate("group/card.html", function(d) {
            var c = d(b);
            $(c).appendTo($(a))
        })
    },
    simpleProfil: function(a, b, c) {
        Siapku_Interface.loadTemplate("widget/group/left-sidebar.html", function(e) {
            var d = e(b);
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                c()
            })
        })
    },
    profil: function(a, b) {
        Siapku_Interface.loadTemplate("widget/group/main-profil.html", function(d) {
            b.STATIK_IMG_PATH = Siapku_Interface.statikUrl + Siapku_Interface.statikPath + "/" + Siapku_Interface.statikVersion + "/img/";
            var c = d(b);
            $(c).hide().appendTo($(a)).slideDown("fast");
            $(c).promise().done(function() {
                Siapku_Interface.lazyImage();
                $(".zoom-in").trigger("hover")
            })
        })
    },
    deleteProfil: function(a, b) {
        Siapku_Interface.loadTemplate("widget/group/delete.html", function(d) {
            b.STATIK_IMG_PATH = Siapku_Interface.statikUrl + Siapku_Interface.statikPath + "/" + Siapku_Interface.statikVersion + "/img/";
            var c = d(b);
            $(c).hide().appendTo($(a)).slideDown("fast");
            $(c).promise().done(function() {
                Siapku_Interface.lazyImage();
                $(".zoom-in").trigger("hover")
            })
        })
    },
    activity: function(a, b, c) {
        Siapku_Interface.loadTemplate("widget/group/activity.html", function(e) {
            var d = e(b);
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                c();
                Siapku_Interface.lazyImage();
                if (b.i_member) {
                    Siapku_Interface.loadTemplate("status/form.html", function(g) {
                        var f = {
                            userAvatar: Siapku_Bootstrap.userAvatar.avatarThumb4,
                            userFullname: Siapku_Bootstrap.siapkuUser.fullname
                        };
                        var h = g(f);
                        $(h).insertAfter($(".work-main .section .section"));
                        $(h).promise().done(function() {
                            $("label[for]").live("click", function() {
                                var i = $(this).closest("tr").find("input#" + $(this).attr("for"));
                                if (i.is("input[type=file]")) {
                                    i.trigger("click")
                                } else {
                                    i.focus()
                                }
                            });
                            $("input[type=file]").die().live("change", function() {
                                var i = this.value;
                                if ($.browser.chrome) {
                                    i = i.replace(/^.*\\/, "")
                                }
                                if (i.length > 23) {
                                    i = i.substring(0, 9) + " ... " + i.substring(i.length - 11, i.length)
                                }
                                $(this).siblings(".input-file-mask").find("span").text(i)
                            });
                            $("input[type=file]").addClass("hideit").after(function() {
                                var i = (typeof $(this).attr("alt") == "undefined") ? "": $(this).attr("alt");
                                return '<div class="input-file-mask input"><a class="button">Pilih file</a><span>' + i + "</span></div>"
                            });
                            $(".input-file-mask >a").die().live("click", function() {
                                $(this).closest("div").siblings("input[type=file]").trigger("click")
                            });
                            $(".feed-poster").find(".js-poster-link").find("em").html("Mulai berbagi hal baru dengan " + b.group_info.title);
                            $(".feed-poster").find(".js-form-content").find("input[name=group_id]").val(b.group_info.id);
                            if (b.group_info.isPublic) {
                                $(".js-auto-post-trigger").show()
                            }
                        })
                    })
                }
            })
        })
    },
    reports: function(a, b, c) {
        Siapku_Interface.loadTemplate("widget/group/reports.html", function(e) {
            var d = e(b);
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                c();
                Siapku_Interface.lazyImage()
            })
        })
    },
    moreActivity: function(a, b, c) {
        if (b.group_timeline) {
            b.list = b.group_timeline.list;
            Siapku_Interface.loadTemplate("status/list.html", function(e) {
                var d = e(b);
                if (d.indexOf("li") > 0) {
                    $(d).hide().appendTo($(a)).slideDown("fast");
                    $(d).promise().done(function() {
                        c()
                    })
                }
            })
        }
    },
    members: function(a, b, c) {
        Siapku_Interface.loadTemplate("widget/group/members.html", function(e) {
            if (b.friendType == "members") {
                b.friends = b.members
            } else {
                b.friends = b.admins
            }
            var d = e(b);
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                if (b.display == "thumb") {
                    $(".direktori-thumb").filter(":visible").siapListClearFix(">li")
                }
                c()
            })
        })
    },
    collection: function(a, b, c) {
        Siapku_Interface.loadTemplate("widget/group/collection.html", function(e) {
            var d = e(b);
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                c()
            })
        })
    }
};
$(".js-profil-group-edit").die().live("click", function(a) {
    a.preventDefault();
    $(".js-group-data").hide();
    $(".js-group-edit").slideDown();
    return false
});
$(".js-group-edit-cancel").die().live("click", function(a) {
    a.preventDefault();
    $(".js-group-edit").hide();
    $(".js-group-data").slideDown();
    return false
});
$(".js-profil-group").die().live("submit", function() {
    var e = $(this).find("input[name=title]").val();
    var f = $(this).find("input[name=group_name]").val();
    var a = $(this).find("textarea[name=about_me]").val();
    var b = $(this).find("input[name=tipe]:checked").val();
    var c = $(this).find("input[name=group_id]").val();
    var d = $(this);
    Siapku_Utils.doAjax("group/update-info", {
        title: e,
        group_name: f,
        about_me: a,
        tipe: b,
        group_id: c
    }, function() {
        if (typeof errMainId != "undefined" && errMainId) {
            Siapku_Interface.hideMessage(errMainId, -1);
            errMainId = false
        }
        loadMainId = Siapku_Interface.showMessage($(".tbl-form.full.vt.section"), "n", "full", "load", "Harap tunggu... ", "Data sedang disimpan", "prepend");
        $(d).find("input[name=title]").attr("disabled", "disabled");
        $(d).find("input[name=group_name]").attr("disabled", "disabled");
        $(d).find("textarea[name=about_me]").attr("disabled", "disabled");
        $(d).find("input[name=tipe]").attr("disabled", "disabled");
        $(d).find("input[name=group_id]").attr("disabled", "disabled");
        $(d).find("input[type=submit]").attr("disabled", "disabled")
    }, function(g) {
        if (!g.error) {
            if (g.is_reload) {
                window.location.hash = "!/group/" + f
            } else {
                Siapku_Bootstrap.layoutLoaded = "";
                Siapku_Bootstrap.widgetsLoaded = [];
                $(window).trigger("hashchange")
            }
        } else {
            errMainId = Siapku_Interface.showMessage($(".tbl-form.full.vt.section"), "n", "", "err", "", g.desc, "prepend")
        }
    }, function() {
        if (typeof loadMainId != "undefined" && loadMainId) {
            Siapku_Interface.hideMessage(loadMainId, -1);
            loadMainId = false
        }
        $(d).find("input[name=title]").removeAttr("disabled");
        $(d).find("input[name=group_name]").removeAttr("disabled");
        $(d).find("textarea[name=about_me]").removeAttr("disabled");
        $(d).find("input[name=tipe]").removeAttr("disabled");
        $(d).find("input[name=group_id]").removeAttr("disabled");
        $(d).find("input[type=submit]").removeAttr("disabled")
    });
    return false
});
$(".js-avatar-group-edit").die().live("click", function(c) {
    c.preventDefault();
    var f = new Date();
    var b = f.getTime();
    var a = $(this).attr("id");
    $("body").css({
        overflow: "hidden"
    });
    Siapku_Interface.loadTemplate("modal/group/avatar.html", function(d) {
        d = d({
            title: "Gambar Profil Komunitas",
            desc: false,
            modalId: "avatar_" + b,
            content: ""
        });
        $(d).hide().appendTo("body").show();
        $("#modal_group_avatar_" + b).promise().done(function() {
            var e = $(this).find(".js-modal-content").width();
            $(this).find(".modalbox-dialog").css({
                width: e,
                "margin-top": 20
            });
            $(this).hide().show();
            $(this).find(".js-close-modal").die().live("click", function(g) {
                g.preventDefault();
                $("#modal_group_avatar_" + b).find(".modalbox-cls").trigger("click");
                return false
            });
            Siapku_Utils.initUpload({
                dropEl: "drop_avatar_" + b,
                browseBtn: "browse_avatar_" + b,
                uploadBtn: "upload_avatar_" + b,
                listEl: "list_avatar_" + b,
                group_id: a,
                url: "/group/upload-avatar",
                filters: [{
                    title: "Image files",
                    extensions: "jpg,gif,png"
                }],
                init: function(g) {},
                callback: function(h) {
                    if (h.error) {
                        var g = Siapku_Interface.showMessage($("#modal_group_avatar_" + b).find(".js-modal-content"), "n", "full", "err", "", h.desc, "prepend");
                        return
                    } else {
                        if (typeof g != "undefined" && g) {
                            Siapku_Interface.hideMessage(g, -1);
                            g = false
                        }
                        $("#modal_group_avatar_" + b).find(".modalbox-cls").trigger("click");
                        Siapku_Bootstrap.layoutLoaded = "";
                        Siapku_Bootstrap.widgetsLoaded = [];
                        $(window).trigger("hashchange")
                    }
                }
            })
        })
    });
    return false
});
$(".js-act-user-group").die().live("click", function(b) {
    b.preventDefault();
    var c = $(this).attr("id");
    var a = $(this).attr("id").replace("action_", "modal_");
    $("#" + a).show();
    return false
});
$(".js-remove-user-from-group").die().live("click", function(d) {
    d.preventDefault();
    var c = $(this).attr("id").split("_");
    var a = c[0];
    var b = c[1];
    Siapku_Interface.showConfirmMessage("Apakah Anda yakin akan mengeluarkan pengguna ini dari komunitas?", "del", "Dengan mengeluarkan pengguna ini dari komunitas, maka pengguna akan dihilangkan dari daftar anggota komunitas ini.", function() {
        Siapku_Utils.doAjax("group/delete-member", {
            group_id: b,
            user_id: a
        }, function() {
            $('.mod-confirm[id*="modal_confirm_"]').remove();
            $("body").attr("style", "")
        }, function(e) {
            if (!e.error) {
                $(window).trigger("hashchange")
            } else {
                Siapku_Interface.showModalMessage("del", e.desc)
            }
        }, function() {})
    }, function() {
        $('.mod-confirm[id*="modal_confirm_"]').remove();
        $("body").attr("style", "")
    });
    return false
});
$(".js-remove-user-from-admingroup").die().live("click", function(d) {
    d.preventDefault();
    var c = $(this).attr("id").split("_");
    var a = c[0];
    var b = c[1];
    Siapku_Interface.showConfirmMessage("Apakah Anda yakin akan mengeluarkan pengguna ini dari administrator komunitas?", "del", "Dengan mengeluarkan pengguna ini daftar administrator komunitas, maka pengguna tidak lagi menjadi administrator komunitas, dan hanya akan menjadi anggota komunitas ini.", function() {
        Siapku_Utils.doAjax("group/delete-admin", {
            group_id: b,
            user_id: a
        }, function() {
            $('.mod-confirm[id*="modal_confirm_"]').remove();
            $("body").attr("style", "")
        }, function(e) {
            if (!e.error) {
                $(window).trigger("hashchange")
            } else {
                Siapku_Interface.showModalMessage("del", e.desc)
            }
        }, function() {})
    }, function() {
        $('.mod-confirm[id*="modal_confirm_"]').remove();
        $("body").attr("style", "")
    });
    return false
});
$(".js-add-user-to-admingroup").die().live("click", function(d) {
    d.preventDefault();
    var c = $(this).attr("id").split("_");
    var a = c[0];
    var b = c[1];
    Siapku_Utils.doAjax("group/add-admin", {
        group_id: b,
        user_id: a
    }, function() {
        $('.mod-confirm[id*="modal_confirm_"]').remove();
        $("body").attr("style", "")
    }, function(e) {
        if (!e.error) {
            $(window).trigger("hashchange")
        } else {
            Siapku_Interface.showModalMessage("del", e.desc)
        }
    }, function() {});
    return false
});
$(".js-delete-group").die().live("submit", function() {
    var a = $(this);
    Siapku_Utils.doAjax("group/delete", {
        group_id: $(a).find("input[name=group_id]").val(),
        password: $(a).find("input[name=password]").val(),
        is_keep_post: $(a).find("input[name=is_keep_post]:checked").val()
    }, function() {}, function(b) {
        if (!b.error) {
            window.location.hash = "#!/groups"
        } else {
            Siapku_Interface.showModalMessage("del", b.desc)
        }
    }, function() {});
    return false
});
$(".js-invite-to-group").die().live("click", function(g) {
    g.preventDefault();
    var h = new Date();
    var f = h.getTime();
    var a = $(this);
    var b = $(this).attr("id");
    var c = [];
    $(".js-select-invite").die().live("click", function(i) {
        i.preventDefault();
        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
            var d = _.indexOf(c, $(this).attr("id"));
            c[d] = 0
        } else {
            $(this).addClass("on");
            if (!_.include(c, $(this).attr("id"))) {
                c.push($(this).attr("id"))
            }
        }
        return false
    });
    $(".js-send-invites").die().live("click", function(d) {
        d.preventDefault();
        c = _.uniq(c);
        if ((c.length > 1 && _.include(c, 0)) || (c.length == 1 && !_.include(c, 0)) || (c.length > 0 && !_.include(c, 0))) {
            Siapku_Utils.doAjax("group/send-invites", {
                group_id: b,
                user_ids: c
            }, function() {
                $('.modalbox[id*="modal_group_invites_"]').remove();
                $("body").attr("style", "")
            }, function(e) {
                if (!e.error) {
                    Siapku_Interface.showFlashMessage("ok", "Undangan berhasil terkirim.")
                } else {
                    Siapku_Interface.showModalMessage("del", e.desc)
                }
            }, function() {})
        } else {
            Siapku_Interface.showModalMessage("del", "Anda belum memilih anggota yang diundang.")
        }
        return false
    });
    Siapku_Utils.doAjax("group/can-invited", {
        group_id: b,
        page: 1,
        limit: 15
    }, function() {}, function(d) {
        $("body").css({
            overflow: "hidden"
        });
        Siapku_Interface.loadTemplate("modal/group/invites.html", function(e) {
            e = e({
                modalId: f,
                content: "",
                data: d,
                to_be_invited_ids: c
            });
            $(e).hide().appendTo("body").show();
            $("#modal_group_invites_" + f).promise().done(function() {
                var j = $(this).find(".box-cont").width();
                $(this).find(".modalbox-dialog").css({
                    width: j + 20,
                    "margin-top": 20
                });
                $(this).hide().show();
                $("#pager_page_group_invites ul li a").die().live("click", function(l) {
                    l.preventDefault();
                    var k = $(this).attr("rel");
                    i(k)
                });
                $("#pager_group_invites .nav-group .nav .next").die().live("click", function(l) {
                    l.preventDefault();
                    var k = $("#pager_page_group_invites ul li[class=on] a").attr("rel");
                    i(parseInt(k) + 1)
                });
                $("#pager_group_invites .nav-group .nav .prev").die().live("click", function(l) {
                    l.preventDefault();
                    var k = $("#pager_page_group_invites ul li[class=on] a").attr("rel");
                    i(parseInt(k) - 1)
                });
                function i(k) {
                    Siapku_Utils.doAjax("group/can-invited", {
                        group_id: b,
                        page: k,
                        limit: 15
                    }, function() {}, function(n) {
                        var p = new Date();
                        var o = p.getTime();
                        var m = $("body");
                        var l = $(".modalbox[id*=modal_group_invites_]");
                        Siapku_Interface.loadTemplate("modal/group/invites.html", function(q) {
                            q = q({
                                modalId: o,
                                content: "",
                                data: n,
                                to_be_invited_ids: c
                            });
                            $(l).remove();
                            $(l).promise().done(function() {
                                $(q).hide().appendTo($("body")).show();
                                $("#modal_group_invites_" + o).promise().done(function() {
                                    var r = $(this).find(".box-cont").width();
                                    $(this).find(".modalbox-dialog").css({
                                        width: r + 20,
                                        "margin-top": 20
                                    });
                                    $(this).hide().show()
                                })
                            })
                        })
                    }, function() {})
                }
            })
        })
    }, function() {});
    return false
});
$(".js-multi-reports-action").die().live("click", function() {
    if ($(".js-form-checkall").is(":checked")) {
        $("#js-modal-checkall-selected").show()
    } else {
        $("#js-modal-checkall-none-selected").show()
    }
});
$(".js-report-detail").die().live("click", function(d) {
    d.preventDefault();
    var a = ($(this).attr("id")).split("_", 3);
    var c = a[1];
    var b = a[2];
    Siapku_Utils.doAjax("report/detail", {
        groupname: b,
        report_id: c
    }, function() {}, function(e) {
        $(".modalbox").remove();
        var g = new Date();
        var f = g.getTime();
        Siapku_Interface.loadTemplate("modal/report-default.html", function(h) {
            h = h({
                title: ((e.report.objectType == "post") ? "Kiriman": "Komentar") + " yang dilaporkan",
                data: e.report,
                modalId: f,
                dataDisplay: "detail",
                groupname: b
            });
            $(h).hide().appendTo("body").show();
            $("#modal_report_detail_" + f).promise().done(function() {
                var i = $(this).find(".js-modal-content").width();
                $(this).find(".modalbox-dialog").css({
                    width: i
                });
                $(this).hide().show()
            })
        })
    }, function() {});
    return false
});
$(".js-show-reporters").die().live("click", function(f) {
    f.preventDefault();
    var b = ($(this).attr("id")).split("_", 4);
    var d = b[1];
    var a = b[2];
    var c = b[3];
    Siapku_Utils.doAjax("report/get-reporters", {
        groupname: c,
        report_id: d,
        page: 1,
        limit: 5
    }, function() {}, function(e) {
        $(".modalbox").remove();
        if (!e.error) {
            var h = new Date();
            var g = h.getTime();
            Siapku_Interface.loadTemplate("modal/reporters.html", function(i) {
                i = i({
                    title: "Komentar Pelapor",
                    data: e.reporters,
                    modalId: g,
                    groupname: c,
                    report_id: d,
                    report_type: a
                });
                $(i).hide().appendTo("body").show();
                $("#modal_reporters_" + g).promise().done(function() {
                    var l = $(this).find(".js-modal-content").width();
                    $(this).find(".modalbox-dialog").css({
                        width: l
                    });
                    var k = $(this);
                    var j = {
                        pagerId: "_reporters-" + d + "-" + a + "-" + c,
                        page: e.reporters.page,
                        limit: e.reporters.limit,
                        pages: e.reporters.pages,
                        rows: e.reporters.rows,
                        limiter: [5, 10, 20]
                    };
                    if (e.reporters.rows > e.reporters.limit) {
                        Siapku_Interface.generatePagingNonRoute(j, function(m) {
                            $(m).insertAfter(k.find(".report-cont"))
                        })
                    } else {
                        $('<div class="nav-cont rnd5 clear"></div>').insertAfter(k.find(".report-cont"))
                    }
                    if (e.reporters.rows > e.reporters.limit) {
                        Siapku_Interface.generatePagingNonRoute(j, function(m) {
                            $(m).insertAfter(k.find(".report-cont"))
                        })
                    }
                    $(this).hide().show()
                })
            })
        } else {
            Siapku_Interface.showModalMessage("del", e.desc)
        }
    }, function() {});
    return false
});
$("[id*=pager_limiter_reporters-] ul li a").die().live("click", function(h) {
    h.preventDefault();
    var g = 1;
    var c = $(this).attr("rel");
    var b = ($("[id*=_reporters-]").attr("id")).split("-", 4);
    var f = b[1];
    var a = b[2];
    var d = b[3];
    reloadReporters(f, a, d, g, c)
});
$("[id*=pager_page_reporters-] ul li a").die().live("click", function(h) {
    h.preventDefault();
    var c = $("[id*=pager_limiter_reporters-] ul li[class=on] a").attr("rel");
    var g = $(this).attr("rel");
    var b = ($("[id*=_reporters-]").attr("id")).split("-", 4);
    var f = b[1];
    var a = b[2];
    var d = b[3];
    reloadReporters(f, a, d, g, c)
});
$("[id*=pager_reporters-] .nav-group .nav .next").die().live("click", function(h) {
    h.preventDefault();
    var c = $("[id*=pager_limiter_reporters-] ul li[class=on] a").attr("rel");
    var g = $("[id*=pager_page_reporters-] ul li[class=on] a").attr("rel");
    var b = ($("[id*=_reporters-]").attr("id")).split("-", 4);
    var f = b[1];
    var a = b[2];
    var d = b[3];
    reloadReporters(f, a, d, parseInt(g) + 1, c)
});
$("[id*=pager_reporters-] .nav-group .nav .prev").die().live("click", function(h) {
    h.preventDefault();
    var c = $("[id*=pager_limiter_reporters-] ul li[class=on] a").attr("rel");
    var g = $("[id*=pager_page_reporters-] ul li[class=on] a").attr("rel");
    var b = ($("[id*=_reporters-]").attr("id")).split("-", 4);
    var f = b[1];
    var a = b[2];
    var d = b[3];
    reloadReporters(f, a, d, parseInt(g) - 1, c)
});
function reloadReporters(d, b, c, e, a) {
    Siapku_Utils.doAjax("report/get-reporters", {
        groupname: c ? c: "",
        report_id: d,
        page: e,
        limit: a
    }, function() {}, function(f) {
        $(".modalbox").remove();
        if (!f.error) {
            var h = new Date();
            var g = h.getTime();
            Siapku_Interface.loadTemplate("modal/reporters.html", function(i) {
                i = i({
                    title: "Komentar Pelapor",
                    data: f.reporters,
                    modalId: g,
                    groupname: c ? c: "",
                    report_id: d,
                    report_type: b
                });
                $(i).hide().appendTo("body").show();
                $("#modal_reporters_" + g).promise().done(function() {
                    var l = $(this).find(".js-modal-content").width();
                    $(this).find(".modalbox-dialog").css({
                        width: l
                    });
                    var k = $(this);
                    var j = {
                        pagerId: "_reporters-" + d + "-" + b + "-" + c,
                        page: f.reporters.page,
                        limit: f.reporters.limit,
                        pages: f.reporters.pages,
                        rows: f.reporters.rows,
                        limiter: [5, 10, 20]
                    };
                    if (f.reporters.rows > f.reporters.limit) {
                        Siapku_Interface.generatePagingNonRoute(j, function(m) {
                            $(m).insertAfter(k.find(".report-cont"))
                        })
                    } else {
                        $('<div class="nav-cont rnd5 clear"></div>').insertAfter(k.find(".report-cont"))
                    }
                    $(this).hide().show()
                })
            })
        } else {
            Siapku_Interface.showModalMessage("del", f.desc)
        }
    }, function() {})
}
$(".js-show-report-handle-modal").die().live("click", function(j) {
    j.preventDefault();
    var h = $(this).next();
    var i = h.outerWidth(true);
    var c = $(this).outerWidth();
    var l = $(this).innerHeight();
    var b = $(this).offset().left;
    var a = $(this).offset().top;
    var g = (b >= $("body").innerWidth() - i) ? true: false;
    var f = b - (g ? (i - c - 11) + (h.is(".sdw") ? 3: 0) : 11);
    var k = (i < c ? i - 20: c);
    if (k < 15) {
        k = 15
    }
    var d = a + l + 8;
    $(this).next().css({
        top: d,
        left: f
    });
    $(this).next().toggle();
    return false
});
$(".js-report-edit").die().live("click", function(a) {
    a.preventDefault();
    $(".js-show-report-handle-modal").show();
    $(".act-grp-data").removeClass("selected");
    $("[id*=report_edit_]").addClass("hide");
    $(this).closest("#js-omni-tips_modal").hide();
    $(".js-show-report-handle-modal[id=" + $(this).attr("id") + "]").hide();
    $("#report_edit_" + $(this).attr("id")).removeClass("hide");
    $(".act-grp-data[id=" + $(this).attr("id") + "]").addClass("selected");
    return false
});
$(".js-cancel-edit-report").die().live("click", function(a) {
    a.preventDefault();
    $(".js-show-report-handle-modal[id=" + $(this).attr("id") + "]").show();
    $("#report_edit_" + $(this).attr("id")).addClass("hide");
    $(".act-grp-data[id=" + $(this).attr("id") + "]").removeClass("selected");
    return false
});
$(".js-form-edit-reports").die().live("submit", function() {
    if ($(this).find("input[name=type]").val() == "post") {
        var d = $(this).find("input[name=report_id]").val();
        var a = $(this).find("input[name=groupname]").val();
        var c = $(this).find("textarea[name=replace_msg]").val();
        var b = 0;
        if ($(this).find("input[name=remove_attach]").length > 0) {
            b = $(this).find("input[name=remove_attach]").is(":checked") ? 1: 0
        }
        Siapku_Utils.doAjax("report/post/edit", {
            groupname: a ? a: "",
            report_id: d,
            replace_msg: c,
            remove_attach: b
        }, function() {}, function(e) {
            if (!e.error) {
                Siapku_Interface.showFlashMessage("ok", "Pesan berhasil disunting", function() {
                    $("body").attr("style", "")
                });
                Backbone.history.loadUrl(Backbone.history.fragment)
            } else {
                Siapku_Interface.showModalMessage("del", e.desc)
            }
        }, function() {})
    }
    if ($(this).find("input[name=type]").val() == "comment") {
        var d = $(this).find("input[name=report_id]").val();
        var a = $(this).find("input[name=groupname]").val();
        var c = $(this).find("textarea[name=replace_msg]").val();
        Siapku_Utils.doAjax("report/comment/edit", {
            groupname: a ? a: "",
            report_id: d,
            replace_msg: c
        }, function() {}, function(e) {
            if (!e.error) {
                Siapku_Interface.showFlashMessage("ok", "Komentar berhasil disunting", function() {
                    $("body").attr("style", "")
                });
                Backbone.history.loadUrl(Backbone.history.fragment)
            } else {
                Siapku_Interface.showModalMessage("del", e.desc)
            }
        }, function() {})
    }
    return false
});
$(".js-report-ignore").die().live("click", function(f) {
    f.preventDefault();
    $(this).closest("#js-omni-tips_modal").hide();
    var b = ($(this).attr("id")).split("_", 3);
    var d = b[0];
    var a = b[1];
    var c = b[2];
    Siapku_Interface.showConfirmMessage("Abaikan laporan", "del", "Apakah Anda ingin mengabaikan laporan ini?", function() {
        if (a == "post") {
            Siapku_Utils.doAjax("report/post/ignore", {
                groupname: c ? c: "",
                report_id: d,
                ignore: 1
            }, function() {}, function(e) {
                if (!e.error) {
                    $('.mod-confirm[id*="modal_confirm_"]').remove();
                    $("body").attr("style", "");
                    Siapku_Interface.showFlashMessage("ok", "Laporan berhasil diabaikan", function() {
                        $("body").attr("style", "")
                    });
                    Backbone.history.loadUrl(Backbone.history.fragment)
                } else {
                    Siapku_Interface.showModalMessage("del", e.desc)
                }
            }, function() {})
        } else {
            Siapku_Utils.doAjax("report/comment/ignore", {
                groupname: c ? c: "",
                report_id: d,
                ignore: 1
            }, function() {}, function(e) {
                if (!e.error) {
                    Siapku_Interface.showFlashMessage("ok", "Laporan berhasil diabaikan", function() {
                        $("body").attr("style", "")
                    });
                    Backbone.history.loadUrl(Backbone.history.fragment)
                } else {
                    Siapku_Interface.showModalMessage("del", e.desc)
                }
            }, function() {})
        }
    }, function() {
        $('.mod-confirm[id*="modal_confirm_"]').remove();
        $("body").attr("style", "");
        return false
    });
    return false
});
$(".js-report-delete").die().live("click", function(f) {
    f.preventDefault();
    $(this).closest("#js-omni-tips_modal").hide();
    var b = ($(this).attr("id")).split("_", 3);
    var d = b[0];
    var a = b[1];
    var c = b[2];
    Siapku_Interface.showConfirmMessage("Hapus " + (a == "post" ? "pesan": "komentar") + " ini ?", "del", "Dengan menghapus " + (a == "post" ? "pesan": "komentar") + " ini, maka anda dan semua pengguna SIAPKu tidak dapat lagi melihat " + (a == "post" ? "pesan": "komentar") + " ini, dan kami tidak dapat mengembalikannya lagi.", function() {
        if (a == "post") {
            Siapku_Utils.doAjax("report/post/delete", {
                groupname: c,
                report_id: d
            }, function() {}, function(e) {
                if (!e.error) {
                    $('.mod-confirm[id*="modal_confirm_"]').remove();
                    $("body").attr("style", "");
                    Siapku_Interface.showFlashMessage("ok", "Pesan berhasil dihapus", function() {
                        $("body").attr("style", "")
                    });
                    Backbone.history.loadUrl(Backbone.history.fragment)
                } else {
                    Siapku_Interface.showModalMessage("del", e.desc)
                }
            }, function() {})
        } else {
            Siapku_Utils.doAjax("report/comment/delete", {
                groupname: c ? c: "",
                report_id: d
            }, function() {}, function(e) {
                if (!e.error) {
                    Siapku_Interface.showFlashMessage("ok", "Komentar berhasil dihapus", function() {
                        $("body").attr("style", "")
                    });
                    Backbone.history.loadUrl(Backbone.history.fragment)
                } else {
                    Siapku_Interface.showModalMessage("del", e.desc)
                }
            }, function() {})
        }
    }, function() {
        $('.mod-confirm[id*="modal_confirm_"]').remove();
        $("body").attr("style", "");
        return false
    });
    return false
});
$(".js-select-report").die().live("click", function(b) {
    var a = $(this).attr("id");
    if ($(this).is(":checked")) {
        $(".act-grp-data[id=" + a + "]").addClass("selected");
        $(".js-show-report-handle-modal[id=" + a + "]").hide()
    } else {
        $(".act-grp-data[id=" + a + "]").removeClass("selected");
        $(".js-show-report-handle-modal[id=" + a + "]").show()
    }
    if ($(".js-select-report").not(":checked").length > 0) {
        if ($(".js-select-report").is(":checked")) {
            $(".js-form-checkall").css({
                opacity: 0.3
            });
            $(".js-form-checkall").attr("checked", "checked")
        } else {
            $(".js-form-checkall").css({
                opacity: 1
            });
            $(".js-form-checkall").removeAttr("checked")
        }
    } else {
        $(".js-form-checkall").css({
            opacity: 1
        });
        $(".js-form-checkall").attr("checked", "checked")
    }
});
$(".js-form-checkall").die().live("click", function() {
    $(".js-form-checkall").css({
        opacity: 1
    });
    if ($(this).is(":checked")) {
        $(".js-select-report").attr("checked", "checked");
        $(".act-grp-data").addClass("selected");
        $(".js-show-report-handle-modal").hide()
    } else {
        $(".js-select-report").removeAttr("checked");
        $(".act-grp-data").removeClass("selected");
        $(".js-show-report-handle-modal").show()
    }
});
$(".js-ignore-all-report").die().live("click", function(c) {
    c.preventDefault();
    var b = [];
    $(".js-select-report:checked").each(function() {
        b.push($(this).attr("id"))
    });
    $(this).closest(".tips-modal").hide();
    var a = $(this).attr("id");
    Siapku_Interface.showConfirmMessage("Abaikan laporan-laporan", "del", "Apakah Anda ingin mengabaikan laporan-laporan ini?", function() {
        Siapku_Utils.doAjax("report/post/ignore", {
            groupname: a ? a: "",
            report_id: b,
            ignore: 1
        }, function() {}, function(d) {
            if (!d.error) {
                $('.mod-confirm[id*="modal_confirm_"]').remove();
                $("body").attr("style", "");
                Siapku_Interface.showFlashMessage("ok", "Laporan berhasil diabaikan", function() {
                    $("body").attr("style", "")
                });
                Backbone.history.loadUrl(Backbone.history.fragment)
            } else {
                Siapku_Interface.showModalMessage("del", d.desc)
            }
        }, function() {})
    }, function() {
        $('.mod-confirm[id*="modal_confirm_"]').remove();
        $("body").attr("style", "");
        return false
    });
    return false
});
var Siapku_View_Direktori = {
    listUser: function(b, d, e, c, f, a, g) {
        Siapku_Interface.loadTemplate("widget/users/list.html", function(i) {
            var j = d;
            if (e == "guru") {
                j.section = "Guru";
                j.little = "guru"
            } else {
                if (e == "siswa") {
                    j.section = "Siswa";
                    j.little = "siswa"
                } else {
                    if (e == "staf") {
                        j.section = "Staf";
                        j.little = "staf"
                    } else {
                        if (e == "alumni") {
                            j.section = "Alumni";
                            j.little = "alumni"
                        } else {
                            if (e == "ortu") {
                                j.section = "Orang tua";
                                j.little = "orang tua"
                            } else {
                                if (e == "umum") {
                                    j.section = "Umum";
                                    j.little = "umum"
                                } else {
                                    if (e == "mahasiswa") {
                                        j.section = "Mahasiswa";
                                        j.little = "mahasiswa"
                                    } else {
                                        if (e == "dosen") {
                                            j.section = "Dosen";
                                            j.little = "dosen"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            d.filter = e;
            d.key = (c != "" ? c: "");
            d.page = f;
            d.limit = a;
            d.display = g;
            var h = i(j);
            $(h).hide().appendTo($(b)).slideDown("fast");
            $(h).promise().done(function() {
                if (g == "thumb") {
                    $(".direktori-thumb").filter(":visible").siapListClearFix(">li")
                }
                var k = {};
                k.display = g;
                k.page = d.users.page;
                k.pages = d.users.pages;
                k.limit = d.users.limit;
                k.limiter = false;
                k.pagerId = "_users";
                Siapku_Interface.generatePagingWithRoute("/#!/users/filter/" + e + (c ? "/key/" + c: ""), k, function(l) {
                    $(l).appendTo(".js-users-container")
                })
            })
        })
    },
    listGroup: function(b, d, e, c, f, a, g) {
        Siapku_Interface.loadTemplate("widget/groups/list.html", function(i) {
            var j = d;
            if (e == "umum") {
                j.section = "Komunitas Umum";
                j.sectionDesc = "Daftar komunitas Umum yang terdaftar di SIAP Online. <br> Komunitas ini dibentuk secara mandiri oleh anggota SIAP Online.";
                j.little = "komunitas umum"
            } else {
                if (e == "departemen") {
                    j.section = "Komunitas Departemen Pendidikan";
                    j.sectionDesc = "Daftar komunitas Departemen Pendidikan yang terdaftar di SIAP Online. <br> Komunitas ini bersifat resmi dan terbentuk otomatis saat pendaftaran Departemen Pendidikan.";
                    j.little = "komunitas departemen pendidikan"
                }
            }
            d.filter = e;
            d.key = (c != "" ? c: "");
            d.page = f;
            d.limit = a;
            d.display = g;
            var h = i(j);
            $(h).hide().appendTo($(b)).slideDown("fast");
            $(h).promise().done(function() {
                if (g == "thumb") {
                    $(".direktori-thumb").filter(":visible").siapListClearFix(">li")
                }
                var k = {};
                k.display = g;
                k.page = d.groups.page;
                k.pages = d.groups.pages;
                k.limit = d.groups.limit;
                k.limiter = false;
                k.pagerId = "_groups";
                Siapku_Interface.generatePagingWithRoute("/#!/groups/filter/" + e + (c ? "/key/" + c: ""), k, function(l) {
                    $(l).appendTo(".js-groups-container")
                })
            })
        })
    },
    listGroupSekolah: function(a, j, c, i, k, b, g, h, f, d, e) {
        Siapku_Interface.loadTemplate("widget/groups/list.html", function(n) {
            var o = j;
            o.form = c;
            o.section = c.jenjang[i];
            if (i == 0) {
                o.sectionDesc = "Daftar komunitas Taman Kanak-Kanak yang terdaftar di SIAP Online. <br/> Komunitas bersifat resmi dan terbentuk otomatis saat pendaftaran Taman Kanak-Kanak."
            } else {
                if (i == 1) {
                    o.sectionDesc = "Daftar komunitas Sekolah Dasar yang terdaftar di SIAP Online. <br/> Komunitas ini bersifat resmi dan terbentuk otomatis saat pendaftaran Sekolah Dasar."
                } else {
                    if (i == 2) {
                        o.sectionDesc = "Daftar komunitas Sekolah Menengah Pertama yang terdaftar di SIAP Online. <br/> Komunitas ini bersifat resmi dan terbentuk otomatis saat pendaftaran Sekolah Menengah Pertama."
                    } else {
                        if (i == 3) {
                            o.sectionDesc = "Daftar komunitas Sekolah Menengah Atas yang terdaftar di SIAP Online. <br/> Komunitas ini bersifat resmi dan terbentuk otomatis saat pendaftaran Sekolah Menengah Atas."
                        }
                    }
                }
            }
            o.little = c.jenjang[i].toLowerCase();
            var m = "sekolah";
            j.filter = "sekolah";
            j.k_jenjang = i;
            j.k_propinsi = k;
            j.k_kota = b;
            j.k_status = g;
            j.key = (h != "" ? h: "");
            j.page = f;
            j.limit = d;
            j.display = e;
            var l = n(o);
            $(l).hide().appendTo($(a)).slideDown("fast");
            $(l).promise().done(function() {
                if (e == "thumb") {
                    $(".direktori-thumb").filter(":visible").siapListClearFix(">li")
                }
                var q = "tk";
                if (i == 1) {
                    q = "sd"
                } else {
                    if (i == 2) {
                        q = "smp"
                    } else {
                        if (i == 3) {
                            q = "sma"
                        }
                    }
                }
                var p = {};
                p.display = e;
                p.page = j.groups.page;
                p.pages = j.groups.pages;
                p.limit = j.groups.limit;
                p.limiter = false;
                p.pagerId = "_groups";
                Siapku_Interface.generatePagingWithRoute("/#!/groups/sekolah/" + q + "/" + k + "/" + b + "/" + g + (h ? "/" + h: ""), p, function(r) {
                    $(r).appendTo(".js-groups-container")
                })
            })
        })
    }
};
$(".js-user-search-form").die().live("submit", function(b) {
    b.preventDefault;
    var a = $(".js-user-search-input").val();
    if (a.replace(/ /gi, "").length > 0) {
        window.location = "#!/users/filter/" + $(".js-user-search-filter").val() + "/key/" + a
    } else {
        window.location = "#!/users/filter/" + $(".js-user-search-filter").val()
    }
    return false
});
$(".js-search-users").die().live("click", function(a) {
    a.preventDefault();
    $(".js-user-search-form").submit();
    return false
});
$(".js-group-search-form").die().live("submit", function(b) {
    b.preventDefault;
    var a = $(".js-group-search-input").val();
    if (a.replace(/ /gi, "").length > 0) {
        window.location = "#!/groups/filter/" + $(".js-group-search-filter").val() + "/key/" + a
    } else {
        window.location = "#!/groups/filter/" + $(".js-group-search-filter").val()
    }
    return false
});
$(".js-search-groups").live("click", function(a) {
    a.preventDefault();
    $(".js-group-search-form").submit();
    return false
});
$(".js-search-sekolah").die().live("submit", function(c) {
    c.preventDefault();
    var b = "tk";
    var a = "";
    if ($("input[name=k_jenjang]").val() == 1) {
        b = "sd"
    } else {
        if ($("input[name=k_jenjang]").val() == 2) {
            b = "smp"
        } else {
            if ($("input[name=k_jenjang]").val() == 3) {
                b = "sma"
            }
        }
    }
    if ($("input[name=key]").val().replace(/ /gi, "").length > 0) {
        a = $("input[name=key]").val()
    } else {
        $("input[name=key]").val("")
    }
    window.location = "#!/groups/sekolah/" + b + "/" + $("select[id=propinsi]").val() + "/" + $("select[id=kota]").val() + "/" + $("select[id=status]").val() + "/" + a + "";
    return false
});
$(".js-create-new-group").die().live("click", function() {
    Siapku_Interface.showNewGroupForm("Buat Komunitas Umum Baru", Siapku_Bootstrap.siapkuUrl, function() {
        var c = $('.modalbox[id*="modal_new_group_"]').find("form").find("input[name=title]").val();
        var d = $('.modalbox[id*="modal_new_group_"]').find("form").find("input[name=groupname]").val();
        var b = $('.modalbox[id*="modal_new_group_"]').find("form").find("input[name=tipe]:checked").val();
        var a = $('.modalbox[id*="modal_new_group_"]').find("form").find("textarea[name=about_me]").val();
        Siapku_Utils.doAjax("/group/create", {
            title: c,
            group_name: d,
            tipe: b,
            about_me: a
        }, function() {
            if (typeof errorNewGroupId != "undefined" && errorNewGroupId) {
                Siapku_Interface.hideMessage(errorNewGroupId, -1);
                errorNewGroupId = false
            }
            loadNewGroupId = Siapku_Interface.showMessage($('.modalbox[id*="modal_new_group_"]').find(".js-modal-content"), "n", "full", "load", "Harap tunggu... ", "Data sedang diproses", "prepend");
            $('.modalbox[id*="modal_new_group_"]').find("form").find("input[name=title]").attr("disabled", "disabled");
            $('.modalbox[id*="modal_new_group_"]').find("form").find("input[name=groupname]").attr("disabled", "disabled");
            $('.modalbox[id*="modal_new_group_"]').find("form").find("input[name=tipe]").attr("disabled", "disabled");
            $('.modalbox[id*="modal_new_group_"]').find("form").find("textarea[name=about_me]").attr("disabled", "disabled");
            $('.modalbox[id*="modal_new_group_"]').find("form").find("input[type=submit]").attr("disabled", "disabled")
        }, function(e) {
            if (!e.error) {
                $('.modalbox[id*="modal_new_group_"]').remove();
                $("body").attr("style", "");
                window.location.hash = "#!/group/" + e.groupname
            } else {
                errorNewGroupId = Siapku_Interface.showMessage($('.modalbox[id*="modal_new_group_"]').find(".js-modal-content"), "n", "full", "err", "", e.desc, "prepend")
            }
        }, function() {
            if (typeof loadNewGroupId != "undefined" && loadNewGroupId) {
                Siapku_Interface.hideMessage(loadNewGroupId, -1);
                loadNewGroupId = false
            }
            $('.modalbox[id*="modal_new_group_"]').find("form").find("input[name=title]").removeAttr("disabled");
            $('.modalbox[id*="modal_new_group_"]').find("form").find("input[name=groupname]").removeAttr("disabled");
            $('.modalbox[id*="modal_new_group_"]').find("form").find("input[name=tipe]").removeAttr("disabled");
            $('.modalbox[id*="modal_new_group_"]').find("form").find("textarea[name=about_me]").removeAttr("disabled");
            $('.modalbox[id*="modal_new_group_"]').find("form").find("input[type=submit]").removeAttr("disabled")
        })
    }, function() {
        $('.modalbox[id*="modal_new_group_"]').remove();
        $("body").attr("style", "")
    })
});
var Siapku_View_Post = {
    detail: function(a, b) {
        Siapku_Interface.loadTemplate("status/single.html", function(d) {
            var c = d({
                value: b,
                user_avatar: b.user_avatar
            });
            $(c).hide().appendTo($(a)).slideDown("fast");
            $(c).promise().done(function() {
                $("li.feed").css({
                    display: "block"
                });
                Siapku_Interface.lazyImage()
            })
        })
    }
};
var Siapku_View_Mail = {
    list: function(a, b, c) {
        Siapku_Interface.loadTemplate("widget/mail/list.html", function(e) {
            var d = e(b);
            $(d).appendTo($(a));
            $(d).promise().done(function() {
                c()
            })
        })
    },
    detail: function(a, b, c) {
        Siapku_Interface.loadTemplate("mail/single.html", function(e) {
            var d = e({
                value: b,
                user_avatar: b.user_avatar
            });
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                Siapku_Interface.lazyImage();
                c()
            })
        })
    },
    comment: function(a, b) {
        Siapku_Interface.loadTemplate("mail/comment.html", function(d) {
            var c = d({
                value: b,
                user_avatar: b.user_avatar
            });
            $(c).hide().prependTo($(a)).slideDown("fast");
            $(c).promise().done(function() {})
        })
    }
};
$(".js-mail-search-form").die().live("submit", function(b) {
    b.preventDefault;
    var a = $(".js-mail-search-input").val();
    if (a.replace(/ /gi, "").length > 0) {
        window.location = "#!/mail/search/" + a
    } else {
        window.location = "#!/mail"
    }
    return false
});
$(".js-search-mail").die().live("click", function(a) {
    a.preventDefault();
    $(".js-mail-search-form").submit();
    return false
});
var Siapku_View_Notification = {
    list: function(a, b, c) {
        Siapku_Interface.loadTemplate("widget/notification/list.html", function(e) {
            var d = e(b);
            $(d).appendTo($(a));
            $(d).promise().done(function() {
                c()
            })
        })
    }
};
var Siapku_View_Friends = {
    fbList: function(b, c, d, e, a, f, g) {
        Siapku_Interface.loadTemplate("widget/friends/list_recommendation.html", function(i) {
            c.filter = d;
            c.page = e;
            c.limit = a;
            c.display = f;
            var j = c;
            var h = i(j);
            $(h).hide().appendTo($(b)).slideDown("fast");
            $(h).promise().done(function() {
                if (f == "thumb") {
                    $(".direktori-thumb").filter(":visible").siapListClearFix(">li")
                }
                var k = {};
                k.display = f;
                k.page = c.page;
                k.pages = c.pages;
                k.limit = c.limit;
                k.limiter = false;
                k.pagerId = "_users_recommendation_";
                if (typeof c.list != "undefined" && c.list) {
                    Siapku_Interface.generatePagingWithRoute("/#!/friends/recommendation/fb/" + d.replace("fb-", ""), k, function(l) {
                        $(l).appendTo(".js-users-container")
                    })
                }
                if (g) {
                    g()
                }
            })
        })
    },
    twList: function(b, c, d, e, a, f, g) {
        Siapku_Interface.loadTemplate("widget/friends/list_recommendation.html", function(i) {
            c.filter = d;
            c.page = e;
            c.limit = a;
            c.display = f;
            var j = c;
            var h = i(j);
            $(h).hide().appendTo($(b)).slideDown("fast");
            $(h).promise().done(function() {
                if (f == "thumb") {
                    $(".direktori-thumb").filter(":visible").siapListClearFix(">li")
                }
                var k = {};
                k.display = f;
                k.page = c.page;
                k.pages = c.pages;
                k.limit = c.limit;
                k.limiter = false;
                k.pagerId = "_users_recommendation_";
                if (typeof c.list != "undefined" && c.list) {
                    Siapku_Interface.generatePagingWithRoute("/#!/friends/recommendation/tw/" + d.replace("tw-", ""), k, function(l) {
                        $(l).appendTo(".js-users-container")
                    })
                }
                if (g) {
                    g()
                }
            })
        })
    },
    intList: function(b, c, d, e, a, f, g) {
        Siapku_Interface.loadTemplate("widget/friends/list_recommendation.html", function(i) {
            c.filter = d;
            c.page = e;
            c.limit = a;
            c.display = f;
            var j = c;
            var h = i(j);
            $(h).hide().appendTo($(b)).slideDown("fast");
            $(h).promise().done(function() {
                if (f == "thumb") {
                    $(".direktori-thumb").filter(":visible").siapListClearFix(">li")
                }
                var k = {};
                k.display = f;
                k.page = c.page;
                k.pages = c.pages;
                k.limit = c.limit;
                k.limiter = false;
                k.pagerId = "_users_recommendation_";
                if (typeof c.list != "undefined" && c.list) {
                    Siapku_Interface.generatePagingWithRoute("/#!/friends/recommendation/int/" + d.replace("int-", ""), k, function(l) {
                        $(l).appendTo(".js-users-container")
                    })
                }
                if (g) {
                    g()
                }
            })
        })
    },
    followers: function(b, c, d, e, a, f, g) {
        Siapku_Interface.loadTemplate("widget/friends/list.html", function(i) {
            c.filter = d;
            c.page = e;
            c.limit = a;
            c.display = f;
            var j = c;
            j.friends = c.followers;
            j.friendType = "followers";
            var h = i(j);
            $(h).hide().appendTo($(b)).slideDown("fast");
            $(h).promise().done(function() {
                if (f == "thumb") {
                    $(".direktori-thumb").filter(":visible").siapListClearFix(">li")
                }
                var k = {};
                k.display = f;
                k.page = c.followers.page;
                k.pages = c.followers.pages;
                k.limit = c.followers.limit;
                k.limiter = false;
                k.pagerId = "_users_recommendation_";
                if (typeof c.followers.list != "undefined" && c.followers.list) {
                    Siapku_Interface.generatePagingWithRoute("/#!/friends/followers", k, function(l) {
                        $(l).appendTo(".js-user-friends-container")
                    })
                }
                if (g) {
                    g()
                }
            })
        })
    },
    followed: function(b, c, d, e, a, f, g) {
        Siapku_Interface.loadTemplate("widget/friends/list.html", function(i) {
            c.filter = d;
            c.page = e;
            c.limit = a;
            c.display = f;
            var j = c;
            j.friends = c.followed;
            j.friendType = "followed";
            var h = i(j);
            $(h).hide().appendTo($(b)).slideDown("fast");
            $(h).promise().done(function() {
                if (f == "thumb") {
                    $(".direktori-thumb").filter(":visible").siapListClearFix(">li")
                }
                var k = {};
                k.display = f;
                k.page = c.followed.page;
                k.pages = c.followed.pages;
                k.limit = c.followed.limit;
                k.limiter = false;
                k.pagerId = "_users_recommendation_";
                if (typeof c.followed.list != "undefined" && c.followed.list) {
                    Siapku_Interface.generatePagingWithRoute("/#!/friends/followed", k, function(l) {
                        $(l).appendTo(".js-user-friends-container")
                    })
                }
                if (g) {
                    g()
                }
            })
        })
    }
};
$(".js-act-user-recommendation").die().live("click", function(a) {
    a.preventDefault();
    $(this).parent().find(".tips-modal").show();
    return false
});
$(".js-invite-user-recommendation").die().live("click", function(b) {
    b.preventDefault();
    var a = $(this).attr("id");
    $(this).closest(".tips-modal").hide();
    FB.ui({
        app_id: Siapku_Bootstrap.environment.fb_app_id,
        method: "send",
        link: "http://siapku.com",
        to: a
    });
    return false
});
$(".js-invite-user-recommendation-tw").die().live("click", function(c) {
    c.preventDefault();
    var a = $(this).attr("id");
    var b = "@" + a + " berbagi, berkolaborasi, berkomunikasi dan berintegrasi untuk mendukung, kemajuan pendidikan Indonesia";
    SIAPKu = window.open(_.string.sprintf("http://twitter.com/intent/tweet?url=%s&text=%s", "http://siapku.com", String(b)), "SIAPKu", "toolbar=no,location=no,directories=no,status=no, menubar=no,scrollbars=no,resizable=no,width=620,height=350");
    return false
});
var Siapku_View_Trend = {
    postMostComment: function(a, b, c) {
        Siapku_Interface.loadTemplate("trend/post.html", function(e) {
            b.title = "Pesan Teramai";
            b.section = "comment";
            var d = e(b);
            d = '<div class="section">' + d + "</div>";
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                c()
            })
        })
    },
    postMostNew: function(a, b, c) {
        Siapku_Interface.loadTemplate("trend/post.html", function(e) {
            b.title = "Pesan Terbaru";
            b.section = "";
            var d = e(b);
            d = '<div class="section">' + d + "</div>";
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                c()
            })
        })
    },
    postMostFav: function(a, b, c) {
        Siapku_Interface.loadTemplate("trend/post.html", function(e) {
            b.title = "Pesan Terfavorit";
            b.section = "favorit";
            var d = e(b);
            d = '<div class="section">' + d + "</div>";
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                c()
            })
        })
    },
    userMostFollowed: function(a, b, c) {
        Siapku_Interface.loadTemplate("trend/user.html", function(e) {
            b.title = "Terpopuler";
            b.section = "followed";
            var d = e(b);
            d = '<div class="app-menu2 fr clear"><h3 class="fl">Anggota</h3></div><div class="section adv clear js-trend-anggota-content">' + d + "</div></div>";
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                c()
            })
        })
    },
    userMostPost: function(a, b, c) {
        Siapku_Interface.loadTemplate("trend/user.html", function(e) {
            b.title = "Aktif menulis pesan";
            b.section = "";
            var d = e(b);
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                c()
            })
        })
    },
    userMostComment: function(a, b, c) {
        Siapku_Interface.loadTemplate("trend/user.html", function(e) {
            b.title = "Aktif berkomentar";
            b.section = "";
            var d = e(b);
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                c()
            })
        })
    },
    userMostNew: function(a, b, c) {
        Siapku_Interface.loadTemplate("trend/user.html", function(e) {
            b.title = "Terbaru";
            b.section = "";
            var d = e(b);
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                c()
            })
        })
    },
    groupMostMember: function(a, b, c) {
        Siapku_Interface.loadTemplate("trend/group.html", function(e) {
            b.title = "Terpopuler";
            b.section = "member";
            var d = e(b);
            d = '<div class="app-menu2 fr clear"><h3 class="fl">Komunitas</h3></div><div class="section adv clear js-trend-group-content">' + d + "</div></div>";
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                c()
            })
        })
    },
    groupMostPost: function(a, b, c) {
        Siapku_Interface.loadTemplate("trend/group.html", function(e) {
            b.title = "Teraktif";
            b.section = "";
            var d = e(b);
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                c()
            })
        })
    },
    groupMostNew: function(a, b, c) {
        Siapku_Interface.loadTemplate("trend/group.html", function(e) {
            b.title = "Terbaru";
            b.section = "";
            var d = e(b);
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                c()
            })
        })
    }
};
var Siapku_View_Admin = {
    left: function(a, b) {
        Siapku_Interface.loadTemplate("widget/admin/left-sidebar.html", function(d) {
            var c = d({
                data: b
            });
            $(c).hide().appendTo($(a)).slideDown("fast")
        })
    },
    statistic: function(a, b) {
        Siapku_Interface.loadTemplate("widget/admin/statistic.html", function(d) {
            var c = d({
                data: b
            });
            $(c).hide().appendTo($(a)).slideDown("fast")
        })
    },
    reports: function(a, b, c) {
        Siapku_Interface.loadTemplate("widget/admin/reports.html", function(e) {
            var d = e(b);
            $(d).hide().appendTo($(a)).slideDown("fast");
            $(d).promise().done(function() {
                c();
                Siapku_Interface.lazyImage()
            })
        })
    }
};
var Siapku_Controller_Portal = {
    routes: {
        "!/portal/aktivitas/anggota/:position": "aktivitasAnggota",
        "!/portal/aktivitas/anggota/:position/": "aktivitasAnggota",
        "!/portal/aktivitas/komunitas/:type/": "aktivitasKomunitas",
        "!/portal/aktivitas/komunitas/:type/": "aktivitasKomunitas",
        "!/inactive": "inactiveAction",
        "!/inactive/": "inactiveAction",
        "!/": "indexAction",
        "!": "indexAction",
        "": "indexAction",
        "*action": "defaultAction"
    },
    initIndex: function(c, a) {
        var b = this;
        $(".js-app-container").empty();
        if (Siapku_Bootstrap.isLogged) {
            window.location = "#!/dashboard"
        } else {
            document.title = "Komunitas \u00bb Portal";
            Siapku_Interface.loadHtml("layouts/portal.html", $(".js-app-container"), false, false, function() {
                $(".anim").siapAnim();
                Siapku_Interface.loadHtml("widgets/portal/aktivitas.anggota.html", $(".js-widget-feed-anggota"), true, false, function() {
                    Siapku_Bootstrap.widgetsLoaded.push("widgets/portal/aktivitas.anggota.html");
                    b.aktivitasAnggota(c ? c: "umum")
                });
                Siapku_Interface.loadHtml("widgets/portal/aktivitas.komunitas.html", $(".js-widget-feed-komunitas"), true, false, function() {
                    Siapku_Bootstrap.widgetsLoaded.push("widgets/portal/aktivitas.komunitas.html");
                    b.aktivitasKomunitas(a ? a: "umum")
                });
                Siapku_Interface.loadHtml("widgets/portal/anggota.html", $(".js-widget-right-anggota"), true, false, function() {
                    Siapku_Bootstrap.widgetsLoaded.push("widgets/portal/anggota.html");
                    Siapku_Utils.doAjax("/users/random", [], function() {
                        if (typeof anggotaError != "undefined" && anggotaError) {
                            Siapku_Interface.hideMessage(anggotaError, -1);
                            anggotaError = false
                        }
                        anggotaLoad = Siapku_Interface.showMessage($(".js-widget-right-anggota .section"), "n", "full", "load", "Harap tunggu... ", " Data sedang dimuat", "prepend")
                    }, function(d) {
                        if (!d.error) {
                            Siapku_View_Portal.anggota(d)
                        } else {
                            anggotaError = Siapku_Interface.showMessage($(".js-widget-right-anggota .section"), "n", "full", "warn", "Maaf, ", d.desc, "prepend")
                        }
                    }, function() {
                        if (typeof anggotaLoad != "undefined") {
                            Siapku_Interface.hideMessage(anggotaLoad, -1);
                            anggotaLoad = false
                        }
                    });
                    Siapku_Interface.loadHtml("widgets/portal/helpdesk.html", $(".js-widget-right-helpdesk"), true, false, function() {
                        Siapku_Bootstrap.widgetsLoaded.push("widgets/portal/helpdesk.html");
                        Siapku_Utils.doAjax("/get-cs", [], false, function(d) {
                            if (!d.error) {
                                Siapku_View_Portal.cs(d)
                            }
                        }, false)
                    })
                })
            })
        }
        Siapku_Bootstrap.layoutLoaded = "layouts/portal.html"
    },
    indexAction: function() {
        this.initIndex();
        Siapku_Interface.forceClearScreen()
    },
    aktivitasAnggota: function(a) {
        if (Siapku_Bootstrap.isLogged) {
            window.location = "#!/dashboard";
            return true
        }
        if (!_.include(["umum", "guru", "siswa", "ortu", "alumni"], a)) {
            a = "umum"
        }
        if (Siapku_Bootstrap.layoutLoaded != "layouts/portal.html" || !_.include(Siapku_Bootstrap.widgetsLoaded, "widgets/portal/aktivitas.anggota.html")) {
            this.initIndex(a, false);
            Siapku_Interface.forceClearScreen()
        } else {
            $(".js-widget-feed-anggota .app-menu2 ul li").removeClass("on");
            $(".js-widget-feed-anggota .js-" + a).parent().addClass("on");
            a = (a == "guru") ? "Guru": a;
            a = (a == "siswa") ? "Siswa": a;
            a = (a == "ortu") ? "Orangtua": a;
            a = (a == "alumni") ? "Alumni": a;
            a = (a == "umum") ? "public": a;
            Siapku_Utils.doAjax("/status/public-timeline", {
                position: a
            }, function() {
                $(".js-aktivitas-anggota-container").empty();
                if (typeof aktivitasAnggotaErr != "undefined" && aktivitasAnggotaErr) {
                    Siapku_Interface.hideMessage(aktivitasAnggotaErr, -1);
                    aktivitasAnggotaErr = false
                }
                aktivitasAnggotaLoad = Siapku_Interface.showMessage($(".js-aktivitas-anggota"), "n", "full", "load", "Harap tunggu... ", " Data sedang dimuat", "prepend")
            }, function(b) {
                if (!b.error) {
                    Siapku_View_Portal.aktivitasAnggota(b)
                } else {
                    aktivitasAnggotaErr = Siapku_Interface.showMessage($(".js-aktivitas-anggota"), "n", "full", "warn", "Maaf, ", b.desc, "prepend")
                }
            }, function() {
                if (typeof aktivitasAnggotaLoad != "undefined") {
                    Siapku_Interface.hideMessage(aktivitasAnggotaLoad, -1);
                    aktivitasAnggotaLoad = false
                }
            })
        }
        Siapku_Interface.forceClearScreen()
    },
    aktivitasKomunitas: function(a) {
        if (Siapku_Bootstrap.isLogged) {
            window.location = "#!/dashboard";
            return true
        }
        if (!_.include(["umum", "sekolah", "dinas"], a)) {
            a = "umum"
        }
        if (Siapku_Bootstrap.layoutLoaded != "layouts/portal.html" || !_.include(Siapku_Bootstrap.widgetsLoaded, "widgets/portal/aktivitas.komunitas.html")) {
            this.initIndex(false, a);
            Siapku_Interface.forceClearScreen()
        } else {
            $(".js-widget-feed-komunitas .app-menu2 ul li").removeClass("on");
            $(".js-widget-feed-komunitas .js-" + a).parent().addClass("on");
            a = (a == "umum") ? "public": a;
            Siapku_Utils.doAjax("/status/groups-timeline", {
                type: a
            }, function() {
                $(".js-aktivitas-komunitas-container").empty();
                if (typeof aktivitasKomunitasErr != "undefined" && aktivitasKomunitasErr) {
                    Siapku_Interface.hideMessage(aktivitasKomunitasErr, -1);
                    aktivitasKomunitasErr = false
                }
                aktivitasKomunitasLoad = Siapku_Interface.showMessage($(".js-aktivitas-komunitas"), "n", "full", "load", "Harap tunggu... ", " Data sedang dimuat", "prepend")
            }, function(b) {
                if (!b.error) {
                    Siapku_View_Portal.aktivitasKomunitas(b)
                } else {
                    aktivitasKomunitasErr = Siapku_Interface.showMessage($(".js-aktivitas-komunitas"), "n", "full", "warn", "Maaf, ", b.desc, "prepend")
                }
            }, function() {
                if (typeof aktivitasKomunitasLoad != "undefined") {
                    Siapku_Interface.hideMessage(aktivitasKomunitasLoad, 1);
                    aktivitasKomunitasLoad = false
                }
            })
        }
    },
    inactiveAction: function() {
        if (!Siapku_Utils.denyNoLogin()) {
            return false
        }
        document.title = "Komunitas \u00bb Pengguna Tidak Aktif";
        if (Siapku_Bootstrap.siapkuUser.active == 1) {
            window.location.hash = "!/404/"
        } else {
            if (Siapku_Bootstrap.layoutLoaded == "layouts/inactive.html") {} else {
                $(".js-app-container").empty();
                $(".js-app-container").promise().done(function() {
                    Siapku_Interface.loadHtml("layouts/inactive.html", $(".js-app-container"), false, false, function() {})
                })
            }
            Siapku_Bootstrap.layoutLoaded = "layouts/inactive.html";
            Siapku_Bootstrap.widgetsLoaded = Array()
        }
    },
    defaultAction: function() {
        document.title = "Komunitas \u00bb 404 Not Found";
        if (Siapku_Bootstrap.layoutLoaded == "layouts/404.html") {
            if (Siapku_Bootstrap.isLogged) {
                $(".js-link-back").html('<a href="#!/user/' + (Siapku_Bootstrap.siapkuUser.username ? Siapku_Bootstrap.siapkuUser.username: Siapku_Bootstrap.siapkuUser.id) + '">Lihat Profil Saya</a>')
            } else {
                $(".js-link-back").html('<a href="#!/">Kembali ke Portal</a>')
            }
        } else {
            $(".js-app-container").empty();
            Siapku_Interface.loadHtml("layouts/404.html", $(".js-app-container"), false, false, function() {
                if (Siapku_Bootstrap.isLogged) {
                    $(".js-link-back").html('<a href="#!/user/' + (Siapku_Bootstrap.siapkuUser.username ? Siapku_Bootstrap.siapkuUser.username: Siapku_Bootstrap.siapkuUser.id) + '">Lihat Profil Saya</a>')
                } else {
                    $(".js-link-back").html('<a href="#!/">Kembali ke Portal</a>')
                }
            })
        }
        Siapku_Bootstrap.layoutLoaded = "layouts/404.html";
        Siapku_Bootstrap.widgetsLoaded = Array()
    }
};
var Siapku_Router_Portal = Backbone.Router.extend(Siapku_Controller_Portal);
var Siapku_Controller_Dashbord = {
    currentUsername: false,
    routes: {
        "!/dashboard": "indexAction",
        "!/dashboard/": "indexAction",
        "!/dashboard/position": "indexPositionAction",
        "!/dashboard/position/": "indexPositionAction",
        "!/dashboard/filter/:filter": "indexFilterAction",
        "!/dashboard/filter/:filter/": "indexFilterAction",
        "!/dashboard/aktivitas/:section": "aktivitasAction",
        "!/dashboard/aktivitas/:section/": "aktivitasAction",
        "!/dashboard/aktivitas/:section/filter/:filter": "aktivitasFilterAction",
        "!/dashboard/aktivitas/:section/filter/:filter/": "aktivitasFilterAction",
        "!/dashboard/tag/:tag": "tagAction",
        "!/dashboard/tag/:tag/": "tagAction",
        "!/dashboard/tag/:tag/filter/": "tagAction",
        "!/dashboard/tag/:tag/filter": "tagAction",
        "!/dashboard/tag/:tag/filter/:filter": "tagAction",
        "!/dashboard/tag/:tag/filter/:filter/": "tagAction"
    },
    dashboardLayoutBuilder: function(b) {
        var a = [];
        $.each(Siapku_Bootstrap.widgetsLoaded, function(c, d) {
            if (d != "widget/dashboard/left-sidebar.html" && d != "widget/dashboard/right-sidebar.html") {} else {
                a.push(d)
            }
        });
        Siapku_Bootstrap.widgetsLoaded = a;
        if (Siapku_Bootstrap.layoutLoaded != "layouts/dashboard.html") {
            $(".js-app-container").empty();
            Siapku_Bootstrap.layoutLoaded = false;
            Siapku_Bootstrap.widgetsLoaded = [];
            Siapku_Utils.doAjax("user/simple-profil", {
                username: "current"
            }, function() {}, function(c) {
                if (!c.error) {
                    Siapku_Interface.loadTemplate("layout/dashboard.html", function(e) {
                        var d = e(c);
                        $(d).hide().appendTo($(".js-app-container")).slideDown("fast");
                        $(d).promise().done(function() {
                            b();
                            $(".app-head-menu ul li").removeClass("on");
                            $(".app-head-menu ul li a[href*=dashboard]").parent().addClass("on");
                            if ($(".work-sidebar-l").length == 0) {
                                $(".workspc-l .workspc").prepend('<div style="width:140px" class="work-sidebar-l"></div>')
                            }
                        })
                    })
                } else {}
                Siapku_Bootstrap.layoutLoaded = "layouts/dashboard.html"
            }, function() {})
        } else {
            $(".app-head-menu ul li").removeClass("on");
            $(".app-head-menu ul li a[href*=dashboard]").parent().addClass("on");
            if ($(".work-sidebar-l").length == 0) {
                $(".workspc-l .workspc").prepend('<div style="width:140px" class="work-sidebar-l"></div>')
            }
            b()
        }
    },
    dashboardWidgetBuilder: function(b, c) {
        if (!_.include(Siapku_Bootstrap.widgetsLoaded, "widget/dashboard/left-sidebar.html")) {
            $(".work-sidebar-l").empty();
            Siapku_Utils.doAjax("/status/trend/tags", {
                limit: 5
            }, function() {
                loadLeftId = Siapku_Interface.showMessage($(".work-sidebar-l"), "n", "full", "load", "Harap tunggu... ", "")
            }, function(d) {
                if (!d.error) {
                    var e = {};
                    e.tags = d;
                    Siapku_Utils.doAjax("/user/groups", {
                        limit: 3,
                        page: 1,
                        username: Siapku_Bootstrap.siapkuUser.username ? Siapku_Bootstrap.siapkuUser.username: Siapku_Bootstrap.siapkuUser.id
                    }, function() {}, function(f) {
                        e.groups = f;
                        Siapku_Interface.loadTemplate("widget/dashboard/left-sidebar.html", function(h) {
                            var g = h(e);
                            $(g).hide().appendTo($(".work-sidebar-l")).slideDown("fast");
                            $(g).promise().done(function() {
                                $(".menu-l ul li").removeClass("on");
                                if (b == "my") {
                                    $(".menu-l ul li .js-left-my").parent().addClass("on")
                                } else {
                                    if (b == "all") {
                                        $(".menu-l ul li .js-left-all").parent().addClass("on")
                                    } else {
                                        if (b == "guru") {
                                            $(".menu-l ul li .js-left-guru").parent().addClass("on")
                                        } else {
                                            if (b == "siswa") {
                                                $(".menu-l ul li .js-left-siswa").parent().addClass("on")
                                            } else {
                                                if (b == "staf") {
                                                    $(".menu-l ul li .js-left-staf").parent().addClass("on")
                                                } else {
                                                    if (b == "alumni") {
                                                        $(".menu-l ul li .js-left-alumni").parent().addClass("on")
                                                    } else {
                                                        if (b == "ortu") {
                                                            $(".menu-l ul li .js-left-ortu").parent().addClass("on")
                                                        } else {
                                                            if (b == "mahasiswa") {
                                                                $(".menu-l ul li .js-left-mahasiswa").parent().addClass("on")
                                                            } else {
                                                                if (b == "dosen") {
                                                                    $(".menu-l ul li .js-left-dosen").parent().addClass("on")
                                                                } else {
                                                                    if (b == "umum") {
                                                                        $(".menu-l ul li .js-left-umum").parent().addClass("on")
                                                                    } else {
                                                                        if (b.indexOf("search") != -1) {
                                                                            var i = b.replace("search_", "");
                                                                            $(".menu-l ul li a[href*=" + i + "]").parent().addClass("on")
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            })
                        })
                    }, function() {
                        if (typeof loadLeftId != "undefined" && loadLeftId) {
                            Siapku_Interface.hideMessage(loadLeftId, -1);
                            loadLeftId = false
                        }
                    })
                } else {
                    if (typeof loadLeftId != "undefined" && loadLeftId) {
                        Siapku_Interface.hideMessage(loadLeftId, -1);
                        loadLeftId = false
                    }
                }
                Siapku_Bootstrap.widgetsLoaded.push("widget/dashboard/left-sidebar.html")
            }, function() {})
        } else {
            $(".menu-l ul li").removeClass("on");
            if (b == "my") {
                $(".menu-l ul li .js-left-my").parent().addClass("on")
            } else {
                if (b == "all") {
                    $(".menu-l ul li .js-left-all").parent().addClass("on")
                } else {
                    if (b == "guru") {
                        $(".menu-l ul li .js-left-guru").parent().addClass("on")
                    } else {
                        if (b == "siswa") {
                            $(".menu-l ul li .js-left-siswa").parent().addClass("on")
                        } else {
                            if (b == "staf") {
                                $(".menu-l ul li .js-left-staf").parent().addClass("on")
                            } else {
                                if (b == "alumni") {
                                    $(".menu-l ul li .js-left-alumni").parent().addClass("on")
                                } else {
                                    if (b == "ortu") {
                                        $(".menu-l ul li .js-left-ortu").parent().addClass("on")
                                    } else {
                                        if (b == "mahasiswa") {
                                            $(".menu-l ul li .js-left-mahasiswa").parent().addClass("on")
                                        } else {
                                            if (b == "dosen") {
                                                $(".menu-l ul li .js-left-dosen").parent().addClass("on")
                                            } else {
                                                if (b == "umum") {
                                                    $(".menu-l ul li .js-left-umum").parent().addClass("on")
                                                } else {
                                                    if (b.indexOf("search") != -1) {
                                                        var a = b.replace("search_", "");
                                                        $(".menu-l ul li a[href*=" + a + "]").parent().addClass("on")
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (!_.include(Siapku_Bootstrap.widgetsLoaded, "widget/dashboard/right-sidebar.html")) {
            $(".js-right-cont").empty();
            Siapku_Utils.doAjax("rss-sekolah/", false, function() {
                loadRightId = Siapku_Interface.showMessage($(".js-right-cont"), "n", "full", "load", "Harap tunggu... ", "")
            }, function(d) {
                if (!d.error) {
                    d.fb_app_id = Siapku_Bootstrap.environment.fb_app_id;
                    Siapku_View_User.rssSekolah($(".js-right-cont"), d, function() {
                        if (typeof loadRightId != "undefined" && loadRightId) {
                            Siapku_Interface.hideMessage(loadRightId, -1);
                            loadRightId = false
                        }
                    })
                }
                Siapku_Bootstrap.widgetsLoaded.push("widget/dashboard/right-sidebar.html")
            }, function() {})
        }
        c()
    },
    dashboardDataBuilder: function(d, a, e) {
        if (d == "my") {
            Siapku_Utils.doAjax("status/activity-timeline", {
                filter: a
            }, function() {
                $(".work-main").empty();
                loadActivityId = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", "Data sedang dimuat", "prepend")
            }, function(c) {
                c.activity_title = "Aktivitas Sekitarku";
                c.activity = c;
                c.section = d;
                c.is_my_section = true;
                c.filter = a;
                Siapku_View_Dashboard.activity($(".work-main"), c);
                $(".js-more-activity").die().live("click", function() {
                    var f = $(this).attr("rel");
                    var g = $(this);
                    Siapku_Utils.doAjax("status/activity-timeline", {
                        filter: a,
                        page: f
                    }, function() {
                        $(g).addClass("ic-load")
                    }, function(h) {
                        Siapku_Interface.loadTemplate("status/list.html", function(j) {
                            var i = j(h);
                            if (i.indexOf("li") > 0) {
                                $(i).hide().appendTo($(".js-timeline-content")).slideDown("fast");
                                $(i).promise().done(function() {
                                    $(g).attr("rel", parseInt(f) + 1);
                                    Siapku_Interface.lazyImage()
                                })
                            }
                        })
                    }, function() {
                        $(g).removeClass("ic-load")
                    })
                })
            }, function() {
                if (typeof loadActivityId != "undefined" && loadActivityId) {
                    Siapku_Interface.hideMessage(loadActivityId, -1);
                    loadActivityId = false
                }
            })
        } else {
            if (d.indexOf("search") != -1) {
                var b = "Ramai Dibicarakan";
                Siapku_Utils.doAjax("status/search", {
                    search: d.replace("search_", ""),
                    filter: a,
                    page: 1,
                    limit: 10
                }, function() {
                    $(".work-main").empty();
                    loadActivityId = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", "Data sedang dimuat", "prepend")
                }, function(c) {
                    c.activity_title = "Ramai Dibicarakan";
                    c.activity = c;
                    c.section = d;
                    c.filter = a;
                    Siapku_View_Dashboard.activity($(".work-main"), c);
                    $(".js-more-activity").die().live("click", function() {
                        var f = $(this).attr("rel");
                        var g = $(this);
                        Siapku_Utils.doAjax("status/search", {
                            search: d.replace("search_", ""),
                            filter: a,
                            page: f,
                            limit: 10
                        }, function() {
                            $(g).addClass("ic-load")
                        }, function(h) {
                            h.section = "search";
                            Siapku_Interface.loadTemplate("status/list.html", function(j) {
                                var i = j(h);
                                if (i.indexOf("li") > 0) {
                                    $(i).hide().appendTo($(".js-timeline-content")).slideDown("fast");
                                    $(i).promise().done(function() {
                                        $(g).attr("rel", parseInt(f) + 1);
                                        Siapku_Interface.lazyImage()
                                    })
                                }
                            })
                        }, function() {
                            $(g).removeClass("ic-load")
                        })
                    })
                }, function() {
                    if (typeof loadActivityId != "undefined" && loadActivityId) {
                        Siapku_Interface.hideMessage(loadActivityId, -1);
                        loadActivityId = false
                    }
                })
            } else {
                var b = "Guru";
                if (d == "staf") {
                    b = "Tenaga Kependidikan"
                } else {
                    if (d == "all") {
                        b = "all"
                    } else {
                        if (d == "siswa") {
                            b = "Siswa"
                        } else {
                            if (d == "ortu") {
                                b = "Orangtua"
                            } else {
                                if (d == "alumni") {
                                    b = "Alumni"
                                } else {
                                    if (d == "umum") {
                                        b = "public"
                                    } else {
                                        if (d == "mahasiswa") {
                                            b = "Mahasiswa"
                                        } else {
                                            if (d == "dosen") {
                                                b = "Dosen"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                Siapku_Utils.doAjax("status/public-timeline", {
                    position: b,
                    filter: a,
                    page: 1,
                    limit: 10
                }, function() {
                    $(".work-main").empty();
                    loadActivityId = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", "Data sedang dimuat", "prepend")
                }, function(c) {
                    if (d == "guru") {
                        c.activity_title = "Aktivitas Guru"
                    } else {
                        if (d == "all") {
                            c.activity_title = "Aktivitas Semua Anggota"
                        } else {
                            if (d == "staf") {
                                c.activity_title = "Aktivitas Tenaga Kependidikan"
                            } else {
                                if (d == "siswa") {
                                    c.activity_title = "Aktivitas Siswa"
                                } else {
                                    if (d == "ortu") {
                                        c.activity_title = "Aktivitas Orang Tua"
                                    } else {
                                        if (d == "alumni") {
                                            c.activity_title = "Aktivitas Alumni"
                                        } else {
                                            if (d == "umum") {
                                                c.activity_title = "Aktivitas Umum"
                                            } else {
                                                if (d == "mahasiswa") {
                                                    c.activity_title = "Aktivitas Mahasiswa"
                                                } else {
                                                    if (d == "dosen") {
                                                        c.activity_title = "Aktivitas Dosen"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    c.activity = c;
                    c.section = d;
                    c.filter = a;
                    Siapku_View_Dashboard.activity($(".work-main"), c);
                    $(".js-more-activity").die().live("click", function() {
                        var f = $(this).attr("rel");
                        var g = $(this);
                        Siapku_Utils.doAjax("status/public-timeline", {
                            position: b,
                            filter: a,
                            page: f,
                            limit: 10
                        }, function() {
                            $(g).addClass("ic-load")
                        }, function(h) {
                            Siapku_Interface.loadTemplate("status/list.html", function(j) {
                                var i = j(h);
                                if (i.indexOf("li") > 0) {
                                    $(i).hide().appendTo($(".js-timeline-content")).slideDown("fast");
                                    $(i).promise().done(function() {
                                        $(g).attr("rel", parseInt(f) + 1);
                                        Siapku_Interface.lazyImage()
                                    })
                                }
                            })
                        }, function() {
                            $(g).removeClass("ic-load")
                        })
                    })
                }, function() {
                    if (typeof loadActivityId != "undefined" && loadActivityId) {
                        Siapku_Interface.hideMessage(loadActivityId, -1);
                        loadActivityId = false
                    }
                })
            }
        }
    },
    indexAction: function() {
        $("#global-header .js-komunitas-dasbor").addClass("selected");
        $("#global-header .js-komunitas-menu").removeClass("selected");
        this.aktivitasAction("my")
    },
    indexPositionAction: function() {
        Siapku_Utils.denyNoLogin();
        var a = "all";
        switch (Siapku_Bootstrap.siapkuUser.position) {
            case "Guru":
                a = "guru";
                break;
            case "Tenaga Kependidikan":
                a = "staf";
                break;
            case "Siswa":
                a = "siswa";
                break;
            case "Orangtua":
                a = "ortu";
                break;
            case "Alumni":
                a = "alumni";
                break;
            case "Mahasiswa":
                a = "mahasiswa";
                break;
            case "Dosen":
                a = "dosen";
                break
        }
        window.location.hash = "#!/dashboard/aktivitas/" + a
    },
    indexFilterAction: function(a) {
        a = a.split(",");
        if (!_.isArray(a)) {
            var b = [];
            b.push(a);
            a = b
        }
        $("#global-header .js-komunitas-dasbor").addClass("selected");
        $("#global-header .js-komunitas-menu").removeClass("selected");
        this.aktivitasFilterAction("my", a)
    },
    aktivitasAction: function(b) {
        if (!Siapku_Utils.denyNoLogin()) {
            return false
        }
        if (!_.include(["my", "guru", "ortu", "siswa", "umum", "alumni", "staf", "all", "mahasiswa", "dosen"], b)) {
            b = "my"
        }
        document.title = "Komunitas \u00bb Dasborku";
        var a = this;
        this.dashboardLayoutBuilder(function() {
            a.dashboardWidgetBuilder(b, function() {
                a.dashboardDataBuilder(b, ["all"], false)
            })
        })
    },
    aktivitasFilterAction: function(c, b) {
        if (!Siapku_Utils.denyNoLogin()) {
            return false
        }
        if (!_.isArray(b)) {
            b = b.split(",");
            if (!_.isArray(b)) {
                var d = [];
                d.push(b);
                b = d
            }
        }
        if (!_.include(["my", "guru", "ortu", "siswa", "umum", "alumni", "staf", "all", "mahasiswa", "dosen"], c)) {
            c = "my"
        }
        document.title = "Komunitas \u00bb Dasborku";
        var a = this;
        this.dashboardLayoutBuilder(function() {
            a.dashboardWidgetBuilder(c, function() {
                a.dashboardDataBuilder(c, b, false)
            })
        })
    },
    tagAction: function(a, c) {
        var d = "search_" + a;
        if (!Siapku_Utils.denyNoLogin()) {
            return false
        }
        if (!c) {
            c = "all"
        }
        if (!_.isArray(c)) {
            c = c.split(",");
            if (!_.isArray(c)) {
                var e = [];
                e.push(c);
                c = e
            }
        }
        document.title = "Komunitas \u00bb Ramai Dibicarakan";
        var b = this;
        this.dashboardLayoutBuilder(function() {
            b.dashboardWidgetBuilder(d, function() {
                b.dashboardDataBuilder(d, c, false)
            })
        })
    }
};
var Siapku_Router_Dashboard = Backbone.Router.extend(Siapku_Controller_Dashbord);
var Siapku_Controller_User = {
    currentUsername: false,
    routes: {
        "!/me/": "meAction",
        "!/me": "meAction",
        "!/user/:username": "indexAction",
        "!/user/:username/": "indexAction",
        "!/user/:username/contact": "contactAction",
        "!/user/:username/contact/": "contactAction",
        "!/user/:username/activity/filter/:filter": "activityAction",
        "!/user/:username/activity/filter/:filter/": "activityAction",
        "!/user/:username/activity/filter/": "activityAction",
        "!/user/:username/activity/filter": "activityAction",
        "!/user/:username/activity": "activityAction",
        "!/user/:username/activity/": "activityAction",
        "!/user/:username/friends/followed/:page/:limit/:display": "followedAction",
        "!/user/:username/friends/followed/:page/:limit/:display/": "followedAction",
        "!/user/:username/friends/followed": "followedAction",
        "!/user/:username/friends/followed/": "followedAction",
        "!/me/friends/followed": "meFollowedAction",
        "!/me/friends/followed/": "meFollowedAction",
        "!/user/:username/friends/followers/:page/:limit/:display": "followersAction",
        "!/user/:username/friends/followers/:page/:limit/:display/": "followersAction",
        "!/user/:username/friends/followers": "followersAction",
        "!/user/:username/friends/followers/": "followersAction",
        "!/user/:username/groups/:page/:limit/:display": "groupsAction",
        "!/user/:username/groups/:page/:limit/:display/": "groupsAction",
        "!/user/:username/groups": "groupsAction",
        "!/user/:username/groups/": "groupsAction",
        "!/me/groups": "meGroupsAction",
        "!/me/groups/": "meGroupsAction",
        "!/user/:username/collection/:filter/:page/:limit": "collectionAction",
        "!/user/:username/collection/:filter/:page/:limit/": "collectionAction",
        "!/user/:username/collection/:filter": "collectionAction",
        "!/user/:username/collection/:filter/": "collectionAction",
        "!/user/:username/collection/": "collectionAction",
        "!/user/:username/collection": "collectionAction",
        "!/user/:username/wacana": "wacanaAction",
        "!/user/:username/wacana/": "wacanaAction",
        "!/user/:username/wacana/:page/:limit": "wacanaAction",
        "!/user/:username/wacana/:page/:limit/": "wacanaAction"
    },
    meAction: function() {
        var a = this;
        if (!Siapku_Bootstrap.isLogged) {
            window.location = "/login"
        } else {
            a.indexLogin(Siapku_Bootstrap.siapkuUser.username ? Siapku_Bootstrap.siapkuUser.username: Siapku_Bootstrap.siapkuUser.id)
        }
    },
    meFollowedAction: function() {
        var a = this;
        if (!Siapku_Bootstrap.isLogged) {
            window.location = "/login"
        } else {
            a.followedAction(Siapku_Bootstrap.siapkuUser.username ? Siapku_Bootstrap.siapkuUser.username: Siapku_Bootstrap.siapkuUser.id)
        }
    },
    meGroupsAction: function() {
        var a = this;
        if (!Siapku_Bootstrap.isLogged) {
            window.location = "/login"
        } else {
            a.groupsAction(Siapku_Bootstrap.siapkuUser.username ? Siapku_Bootstrap.siapkuUser.username: Siapku_Bootstrap.siapkuUser.id)
        }
    },
    indexAction: function(b) {
        var a = this;
        if (b != this.currentUsername) {
            $(".js-app-container").empty();
            Siapku_Interface.forceClearScreen();
            Siapku_Bootstrap.layoutLoaded = false;
            Siapku_Bootstrap.widgetsLoaded = Array()
        }
        this.currentUsername = b;
        document.title = "Komunitas \u00bb Profil Anggota";
        if (!Siapku_Bootstrap.isLogged) {
            a.indexPublic(b)
        } else {
            a.indexLogin(b)
        }
    },
    initProfilLogin: function(d, c, b, a) {
        $(".js-app-container").empty();
        Siapku_Interface.forceClearScreen();
        Siapku_Utils.doAjax("/user/simple-profil", {
            username: d
        }, function() {}, function(e) {
            if (!e.error) {
                Siapku_Interface.loadTemplate("layout/user.html", function(g) {
                    var f = g(e);
                    $(f).hide().appendTo($(".js-app-container")).slideDown("fast");
                    $(f).promise().done(function() {
                        $(".workspc.head-wrap").css("overflow", "visible");
                        if (d == Siapku_Bootstrap.siapkuUser.username || d == Siapku_Bootstrap.siapkuUser.id) {
                            $(".global-shortcut .ic-card").addClass("on")
                        } else {
                            $(".global-shortcut .ic-card").removeClass("on")
                        }
                        Siapku_View_User.simpleProfil($(".work-sidebar-l"), {}, function() {
                            $(".js-user-profil-submenu").html(b);
                            $(".js-user-profil-submenu-list").empty();
                            $(a).appendTo($(".js-user-profil-submenu-list"));
                            Siapku_Bootstrap.widgetsLoaded.push("widget/user/left-sidebar.html")
                        });
                        if (c) {
                            c()
                        }
                        if (!_.include(Siapku_Bootstrap.widgetsLoaded, "widget/user/right-sidebar.html")) {
                            $(".js-right-cont").empty();
                            Siapku_Utils.doAjax("rss-sekolah/", false, function() {
                                loadRightId = Siapku_Interface.showMessage($(".js-right-cont"), "n", "full", "load", "Harap tunggu... ", "")
                            }, function(h) {
                                if (!h.error) {
                                    h.fb_app_id = Siapku_Bootstrap.environment.fb_app_id;
                                    Siapku_View_User.rssSekolah($(".js-right-cont"), h, function() {
                                        if (typeof loadRightId != "undefined" && loadRightId) {
                                            Siapku_Interface.hideMessage(loadRightId, -1);
                                            loadRightId = false
                                        }
                                    })
                                }
                                Siapku_Bootstrap.widgetsLoaded.push("widget/user/right-sidebar.html")
                            }, function() {})
                        }
                    })
                });
                Siapku_Bootstrap.layoutLoaded = "layouts/user.html"
            } else {
                $(".js-app-container").append('<div style="display: table;" class="workspc"><div class="workspc-l"><div class="workspc"><div class="work-main"><div class="warn-cont" style="display: block;"><div alt="err" class="warn full"><span alt="">' + e.desc + "</span></div></div></div></div></div></div>")
            }
        }, function() {})
    },
    indexPublic: function(b, a) {
        Siapku_Utils.doAjax("user/public-profil", {
            username: b
        }, function() {}, function(c) {
            Siapku_View_User.publicProfil($(".js-app-container"), c, a)
        }, function() {});
        Siapku_Bootstrap.layoutLoaded = "layout/profil_user_public.html";
        Siapku_Bootstrap.widgetsLoaded = Array()
    },
    indexLogin: function(d) {
        var b = this;
        if (d != this.currentUsername) {
            $(".js-app-container").empty();
            Siapku_Interface.forceClearScreen();
            Siapku_Bootstrap.layoutLoaded = false;
            Siapku_Bootstrap.widgetsLoaded = Array()
        }
        this.currentUsername = d;
        var a = "";
        var c = "Profil";
        a += '<li class="on"><a class="act-info js-collapswitch" href="#!/user/' + d + '">Profil komunitas</a><dd></dd></li>';
        a += '<li><a class="act-mail js-collapswitch" href="#!/user/' + d + '/contact/">Kontak</a><dd></dd></li>';
        document.title = "Komunitas \u00bb Profil Anggota";
        if (Siapku_Bootstrap.layoutLoaded != "layouts/user.html" || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/user/left-sidebar.html") || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/user/right-sidebar.html")) {
            this.initProfilLogin(d, function() {
                b.profil(d)
            }, c, a)
        } else {
            $(".js-user-profil-submenu").html(c);
            $(".js-user-profil-submenu-list").empty();
            $(a).appendTo($(".js-user-profil-submenu-list"));
            b.profil(d)
        }
    },
    profil: function(a) {
        $(".work-main").empty();
        $(".head-avatar.head-cat").removeClass("size-80");
        $(".head-avatar.head-cat").removeClass("size-50");
        $(".head-avatar.head-cat").addClass("size-80");
        Siapku_Utils.doAjax("user/profil", {
            username: a
        }, function() {
            loadMainId = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", "Data sedang dimuat")
        }, function(b) {
            $(".app-menu2.app-head-menu ul li").removeClass("on");
            $(".js-user-profil").addClass("on");
            Siapku_View_User.profil($(".work-main"), b);
            Siapku_Bootstrap.widgetsLoaded.push("widget/user/main-profil.html")
        }, function() {
            if (typeof loadMainId != "undefined" && loadMainId) {
                Siapku_Interface.hideMessage(loadMainId, -1);
                loadMainId = false
            }
        })
    },
    contactAction: function(d) {
        document.title = "Komunitas \u00bb Profil Anggota";
        if (!Siapku_Bootstrap.isLogged) {
            this.navigate("/#!/user/" + d, true);
            return false
        }
        if (d != this.currentUsername) {
            $(".js-app-container").empty();
            Siapku_Interface.forceClearScreen();
            Siapku_Bootstrap.layoutLoaded = false;
            Siapku_Bootstrap.widgetsLoaded = Array()
        }
        this.currentUsername = d;
        var b = this;
        var a = "";
        var c = "Profil";
        a += '<li><a class="act-info js-collapswitch" href="#!/user/' + d + '">Profil komunitas</a><dd></dd></li>';
        a += '<li class="on"><a class="act-mail js-collapswitch" href="#!/user/' + d + '/contact/">Kontak</a><dd></dd></li>';
        if (Siapku_Bootstrap.layoutLoaded != "layouts/user.html" || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/user/left-sidebar.html") || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/user/right-sidebar.html")) {
            this.initProfilLogin(d, function() {
                b.contact(d)
            }, c, a)
        } else {
            $(".js-user-profil-submenu").html(c);
            $(".js-user-profil-submenu-list").empty();
            $(a).appendTo($(".js-user-profil-submenu-list"));
            b.contact(d)
        }
    },
    contact: function(a) {
        $(".work-main").empty();
        $(".head-avatar.head-cat").removeClass("size-80");
        $(".head-avatar.head-cat").removeClass("size-50");
        $(".head-avatar.head-cat").addClass("size-80");
        Siapku_Utils.doAjax("user/contact", {
            username: a
        }, function() {
            loadMainId = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", "Data sedang dimuat")
        }, function(b) {
            $(".app-menu2.app-head-menu ul li").removeClass("on");
            $(".js-user-profil").addClass("on");
            Siapku_View_User.contact($(".work-main"), b);
            Siapku_Bootstrap.widgetsLoaded.push("widget/user/main-contact.html")
        }, function() {
            if (typeof loadMainId != "undefined" && loadMainId) {
                Siapku_Interface.hideMessage(loadMainId, -1);
                loadMainId = false
            }
        })
    },
    activityAction: function(e, c) {
        document.title = "Komunitas \u00bb Aktivitas Anggota";
        if (!Siapku_Bootstrap.isLogged) {
            this.navigate("/#!/user/" + e, true);
            return false
        }
        if (e != this.currentUsername) {
            $(".js-app-container").empty();
            Siapku_Interface.forceClearScreen();
            Siapku_Bootstrap.layoutLoaded = false;
            Siapku_Bootstrap.widgetsLoaded = Array()
        }
        this.currentUsername = e;
        var b = this;
        var a = "";
        var d = "Aktivitas";
        a += '<li class="on"><a class="act-post js-collapswitch" href="#!/user/' + e + '/activity">Aktivitas</a><dd></dd></li>';
        a += '<li class=""><a class="act-lead js-collapswitch" href="#!/user/' + e + '/friends/followers">Pengikut</a><dd></dd></li>';
        a += '<li class=""><a class="act-folow js-collapswitch" href="#!/user/' + e + '/friends/followed">Mengikuti</a><dd></dd></li>';
        a += '<li class=""><a class="act-grup js-collapswitch" href="#!/user/' + e + '/groups">Komunitas</a><dd></dd></li>';
        if (Siapku_Bootstrap.layoutLoaded != "layouts/user.html" || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/user/left-sidebar.html") || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/user/right-sidebar.html")) {
            this.initProfilLogin(e, function() {
                $(".app-menu2.app-head-menu ul li").removeClass("on");
                $(".js-user-aktivitas").addClass("on");
                b.activity(e, c)
            }, d, a)
        } else {
            $(".js-user-profil-submenu").html(d);
            $(".js-user-profil-submenu-list").empty();
            $(a).appendTo($(".js-user-profil-submenu-list"));
            $(".app-menu2.app-head-menu ul li").removeClass("on");
            $(".js-user-aktivitas").addClass("on");
            b.activity(e, c)
        }
    },
    activity: function(c, a) {
        $(".work-main").empty();
        $(".head-avatar.head-cat").removeClass("size-80");
        $(".head-avatar.head-cat").removeClass("size-50");
        if (!_.isArray(a)) {
            if (!a) {
                a = "all"
            }
            a = a.split(",");
            if (!_.isArray(a)) {
                var b = [];
                b.push(a);
                a = b
            }
        }
        Siapku_Utils.doAjax("user/timeline", {
            username: c,
            filter: a
        }, function() {
            loadActivityId = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", "Data sedang dimuat", "prepend")
        }, function(d) {
            d.filter = a;
            Siapku_View_User.activity($(".work-main"), d, function() {
                $(".js-more-activity").die().live("click", function() {
                    var e = $(this).attr("rel");
                    var f = $(this);
                    Siapku_Utils.doAjax("user/timeline", {
                        username: c,
                        filter: a,
                        page: e
                    }, function() {
                        $(f).addClass("ic-load")
                    }, function(g) {
                        Siapku_View_User.moreActivity($(".js-timeline-content"), g, function() {
                            $(f).attr("rel", parseInt(e) + 1);
                            Siapku_Interface.lazyImage()
                        })
                    }, function() {
                        $(f).removeClass("ic-load")
                    })
                })
            })
        }, function() {
            if (typeof loadActivityId != "undefined" && loadActivityId) {
                Siapku_Interface.hideMessage(loadActivityId, -1);
                loadActivityId = false
            }
        })
    },
    followedAction: function(g, d, b, f) {
        document.title = "Komunitas \u00bb Pertemanan Anggota";
        if (!Siapku_Bootstrap.isLogged) {
            this.navigate("/#!/user/" + g, true);
            return false
        }
        if (g != this.currentUsername) {
            $(".js-app-container").empty();
            Siapku_Interface.forceClearScreen();
            Siapku_Bootstrap.layoutLoaded = false;
            Siapku_Bootstrap.widgetsLoaded = Array()
        }
        this.currentUsername = g;
        var c = this;
        var a = "";
        var e = "Aktivitas";
        a += '<li class=""><a class="act-post js-collapswitch" href="#!/user/' + g + '/activity">Aktivitas</a><dd></dd></li>';
        a += '<li class=""><a class="act-lead js-collapswitch" href="#!/user/' + g + '/friends/followers">Pengikut</a><dd></dd></li>';
        a += '<li class="on"><a class="act-folow js-collapswitch" href="#!/user/' + g + '/friends/followed">Mengikuti</a><dd></dd></li>';
        a += '<li class=""><a class="act-grup js-collapswitch" href="#!/user/' + g + '/groups">Komunitas</a><dd></dd></li>';
        if (Siapku_Bootstrap.layoutLoaded != "layouts/user.html" || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/user/left-sidebar.html") || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/user/right-sidebar.html")) {
            this.initProfilLogin(g, function() {
                c.followed(g, d, b, f)
            }, e, a)
        } else {
            $(".js-user-profil-submenu").html(e);
            $(".js-user-profil-submenu-list").empty();
            $(a).appendTo($(".js-user-profil-submenu-list"));
            c.followed(g, d, b, f)
        }
    },
    followed: function(d, b, a, c) {
        $(".work-main").empty();
        $(".head-avatar.head-cat").removeClass("size-80");
        $(".head-avatar.head-cat").removeClass("size-50");
        if (!b) {
            b = 1
        }
        if (!a) {
            a = 20
        }
        if (!c) {
            c = "thumb"
        }
        if (!_.include(["thumb", "list", "tbl"], c)) {
            c = "thumb"
        }
        Siapku_Utils.doAjax("user/followed", {
            username: d,
            page: b,
            limit: a
        }, function() {
            loadFollowedId = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", "Data sedang dimuat", "prepend")
        }, function(e) {
            e.display = c;
            e.friendType = "followed";
            Siapku_View_User.friends($(".work-main"), e, function() {
                if (e.followed) {
                    var f = {};
                    f.display = e.display;
                    f.page = e.followed.page;
                    f.pages = e.followed.pages;
                    f.limit = e.followed.limit;
                    f.limiter = false;
                    f.pagerId = "_user_friends_" + d;
                    Siapku_Interface.generatePagingWithRoute("/#!/user/" + d + "/friends/followed", f, function(g) {
                        $(g).appendTo(".js-user-friends-container")
                    });
                    $(".app-menu2.app-head-menu ul li").removeClass("on");
                    $(".js-user-aktivitas").addClass("on")
                }
            })
        }, function() {
            if (typeof loadFollowedId != "undefined" && loadFollowedId) {
                Siapku_Interface.hideMessage(loadFollowedId, -1);
                loadFollowedId = false
            }
        })
    },
    followersAction: function(g, d, b, f) {
        document.title = "Komunitas \u00bb Pertemanan Anggota";
        if (!Siapku_Bootstrap.isLogged) {
            this.navigate("/#!/user/" + g, true);
            return false
        }
        if (g != this.currentUsername) {
            $(".js-app-container").empty();
            Siapku_Interface.forceClearScreen();
            Siapku_Bootstrap.layoutLoaded = false;
            Siapku_Bootstrap.widgetsLoaded = Array()
        }
        this.currentUsername = g;
        var c = this;
        var a = "";
        var e = "Aktivitas";
        a += '<li class=""><a class="act-post js-collapswitch" href="#!/user/' + g + '/activity">Aktivitas</a><dd></dd></li>';
        a += '<li class="on"><a class="act-lead js-collapswitch" href="#!/user/' + g + '/friends/followers">Pengikut</a><dd></dd></li>';
        a += '<li class=""><a class="act-folow js-collapswitch" href="#!/user/' + g + '/friends/followed">Mengikuti</a><dd></dd></li>';
        a += '<li class=""><a class="act-grup js-collapswitch" href="#!/user/' + g + '/groups">Komunitas</a><dd></dd></li>';
        if (Siapku_Bootstrap.layoutLoaded != "layouts/user.html" || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/user/left-sidebar.html") || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/user/right-sidebar.html")) {
            this.initProfilLogin(g, function() {
                c.followers(g, d, b, f)
            }, e, a)
        } else {
            $(".js-user-profil-submenu").html(e);
            $(".js-user-profil-submenu-list").empty();
            $(a).appendTo($(".js-user-profil-submenu-list"));
            c.followers(g, d, b, f)
        }
    },
    followers: function(d, b, a, c) {
        $(".work-main").empty();
        $(".head-avatar.head-cat").removeClass("size-80");
        $(".head-avatar.head-cat").removeClass("size-50");
        if (!b) {
            b = 1
        }
        if (!a) {
            a = 20
        }
        if (!c) {
            c = "thumb"
        }
        if (!_.include(["thumb", "list", "tbl"], c)) {
            c: "thumb"
        }
        Siapku_Utils.doAjax("user/followers", {
            username: d,
            page: b,
            limit: a
        }, function() {
            loadFollowedId = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", "Data sedang dimuat", "prepend")
        }, function(e) {
            e.display = c;
            e.friendType = "followers";
            Siapku_View_User.friends($(".work-main"), e, function() {
                if (e.followers) {
                    var f = {};
                    f.display = e.display;
                    f.page = e.followers.page;
                    f.pages = e.followers.pages;
                    f.limit = e.followers.limit;
                    f.limiter = false;
                    f.pagerId = "_user_friends_" + d;
                    Siapku_Interface.generatePagingWithRoute("/#!/user/" + d + "/friends/followers", f, function(g) {
                        $(g).appendTo(".js-user-friends-container")
                    });
                    $(".app-menu2.app-head-menu ul li").removeClass("on");
                    $(".js-user-aktivitas").addClass("on")
                }
            })
        }, function() {
            if (typeof loadFollowedId != "undefined" && loadFollowedId) {
                Siapku_Interface.hideMessage(loadFollowedId, -1);
                loadFollowedId = false
            }
        })
    },
    groupsAction: function(g, d, b, f) {
        document.title = "Komunitas \u00bb Komunitas Anggota";
        if (!Siapku_Bootstrap.isLogged) {
            this.navigate("/#!/user/" + g, true);
            return false
        }
        if (g != this.currentUsername) {
            $(".js-app-container").empty();
            Siapku_Interface.forceClearScreen();
            Siapku_Bootstrap.layoutLoaded = false;
            Siapku_Bootstrap.widgetsLoaded = Array()
        }
        this.currentUsername = g;
        var c = this;
        var a = "";
        var e = "Aktivitas";
        a += '<li class=""><a class="act-post js-collapswitch" href="#!/user/' + g + '/activity">Aktivitas</a><dd></dd></li>';
        a += '<li class=""><a class="act-lead js-collapswitch" href="#!/user/' + g + '/friends/followers">Pengikut</a><dd></dd></li>';
        a += '<li class=""><a class="act-folow js-collapswitch" href="#!/user/' + g + '/friends/followed">Mengkuti</a><dd></dd></li>';
        a += '<li class="on"><a class="act-grup js-collapswitch" href="#!/user/' + g + '/groups">Komunitas</a><dd></dd></li>';
        if (Siapku_Bootstrap.layoutLoaded != "layouts/user.html" || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/user/left-sidebar.html") || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/user/right-sidebar.html")) {
            this.initProfilLogin(g, function() {
                c.groups(g, d, b, f)
            }, e, a)
        } else {
            $(".js-user-profil-submenu").html(e);
            $(".js-user-profil-submenu-list").empty();
            $(a).appendTo($(".js-user-profil-submenu-list"));
            c.groups(g, d, b, f)
        }
    },
    groups: function(d, b, a, c) {
        $(".work-main").empty();
        $(".head-avatar.head-cat").removeClass("size-80");
        $(".head-avatar.head-cat").removeClass("size-50");
        if (!b) {
            b = 1
        }
        if (!a) {
            a = 20
        }
        if (!c) {
            c = "thumb"
        }
        if (!_.include(["thumb", "list", "tbl"], c)) {
            c: "thumb"
        }
        Siapku_Utils.doAjax("user/groups", {
            username: d,
            page: b,
            limit: a
        }, function() {
            loadFollowedId = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", "Data sedang dimuat", "prepend")
        }, function(e) {
            e.display = c;
            Siapku_View_User.groups($(".work-main"), e, function() {
                if (e.groups) {
                    var f = {};
                    f.display = e.display;
                    f.page = e.groups.page;
                    f.pages = e.groups.pages;
                    f.limit = e.groups.limit;
                    f.limiter = false;
                    f.pagerId = "_user_groups_" + d;
                    Siapku_Interface.generatePagingWithRoute("/#!/user/" + d + "/groups", f, function(g) {
                        $(g).appendTo(".js-user-groups-container")
                    });
                    $(".app-menu2.app-head-menu ul li").removeClass("on");
                    $(".js-user-aktivitas").addClass("on")
                }
            })
        }, function() {
            if (typeof loadFollowedId != "undefined" && loadFollowedId) {
                Siapku_Interface.hideMessage(loadFollowedId, -1);
                loadFollowedId = false
            }
        })
    },
    collectionAction: function(g, d, e, b) {
        document.title = "Komunitas \u00bb Koleksi Anggota";
        if (!Siapku_Bootstrap.isLogged) {
            this.navigate("/#!/user/" + g, true);
            return false
        }
        if (g != this.currentUsername) {
            $(".js-app-container").empty();
            Siapku_Interface.forceClearScreen();
            Siapku_Bootstrap.layoutLoaded = false;
            Siapku_Bootstrap.widgetsLoaded = Array()
        }
        this.currentUsername = g;
        if (!d) {
            d = "file"
        }
        var c = this;
        var a = "";
        var f = "Koleksi";
        a += '<li class="' + (d == "file" ? "on": "") + '"><a class="act-file js-collapswitch" href="#!/user/' + g + '/collection">Berkas</a><dd></dd></li>';
        a += '<li class="' + (d == "image" ? "on": "") + '"><a class="act-img js-collapswitch" href="#!/user/' + g + '/collection/image">Gambar</a><dd></dd></li>';
        a += '<li class="' + (d == "videoembed" ? "on": "") + '"><a class="act-vid js-collapswitch" href="#!/user/' + g + '/collection/videoembed">Video</a><dd></dd></li>';
        a += '<li class="' + (d == "link" ? "on": "") + '"><a class="act-link js-collapswitch" href="#!/user/' + g + '/collection/link">Tautan</a><dd></dd></li>';
        if (Siapku_Bootstrap.layoutLoaded != "layouts/user.html" || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/user/left-sidebar.html") || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/user/right-sidebar.html")) {
            this.initProfilLogin(g, function() {
                c.collection(g, d, e, b)
            }, f, a)
        } else {
            $(".js-user-profil-submenu").html(f);
            $(".js-user-profil-submenu-list").empty();
            $(a).appendTo($(".js-user-profil-submenu-list"));
            c.collection(g, d, e, b)
        }
    },
    collection: function(d, b, c, a) {
        $(".work-main").empty();
        $(".head-avatar.head-cat").removeClass("size-80");
        $(".head-avatar.head-cat").removeClass("size-50");
        if (!c) {
            c = 1
        }
        if (!a) {
            a = 10
        }
        if (!b) {
            b = "file"
        }
        if (!_.include(["image", "file", "link", "videoembed"], b)) {
            b = "file"
        }
        Siapku_Utils.doAjax("status/galeries", {
            username: d,
            page: c,
            limit: a,
            filter: b
        }, function() {
            loadFollowedId = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", "Data sedang dimuat", "prepend")
        }, function(e) {
            if (!e) {
                e = {}
            }
            e.display = "";
            e.filter = b;
            e.username = d;
            Siapku_View_User.collection($(".work-main"), e, function() {
                if (typeof e.list != "undefined") {
                    var f = {};
                    f.display = e.display;
                    f.page = e.page;
                    f.pages = e.pages;
                    f.limit = e.limit;
                    f.limiter = [10, 20, 30];
                    f.pagerId = "_user_collection_" + d;
                    Siapku_Interface.generatePagingWithRoute("/#!/user/" + d + "/collection/" + b, f, function(g) {
                        $(g).appendTo(".js-user-collection-container")
                    })
                }
                $(".app-menu2.app-head-menu ul li").removeClass("on");
                $(".js-user-collection").addClass("on")
            })
        }, function() {
            if (typeof loadFollowedId != "undefined" && loadFollowedId) {
                Siapku_Interface.hideMessage(loadFollowedId, -1);
                loadFollowedId = false
            }
        })
    },
    wacanaAction: function(f, d, b) {
        document.title = "Komunitas \u00bb Wacana Anggota";
        if (!Siapku_Bootstrap.isLogged) {
            this.navigate("/#!/user/" + f, true);
            return false
        }
        if (f != this.currentUsername) {
            $(".js-app-container").empty();
            Siapku_Interface.forceClearScreen();
            Siapku_Bootstrap.layoutLoaded = false;
            Siapku_Bootstrap.widgetsLoaded = Array()
        }
        this.currentUsername = f;
        var c = this;
        var a = "";
        var e = "";
        if (Siapku_Bootstrap.layoutLoaded != "layouts/user.html" || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/user/left-sidebar.html") || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/user/right-sidebar.html")) {
            this.initProfilLogin(f, function() {
                c.wacana(f, d, b)
            }, e, a)
        } else {
            $(".js-user-profil-submenu").html(e);
            $(".js-user-profil-submenu-list").empty();
            $(a).appendTo($(".js-user-profil-submenu-list"));
            c.wacana(f, d, b)
        }
    },
    wacana: function(c, b, a) {
        $(".work-main").empty();
        $(".head-avatar.head-cat").removeClass("size-80");
        $(".head-avatar.head-cat").removeClass("size-50");
        if (!b) {
            b = 1
        }
        if (!a) {
            a = 5
        }
        Siapku_Utils.doAjax("user/wacana", {
            username: c,
            page: b,
            limit: a
        }, function() {
            loadFollowedId = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", "Data sedang dimuat", "prepend")
        }, function(d) {
            if (!d) {
                d = {}
            }
            d.username = c;
            Siapku_View_User.wacana($(".work-main"), d, function() {
                if (typeof d.feed != "undefined" && d.feed) {
                    var e = {};
                    e.display = "";
                    e.page = d.page;
                    e.pages = d.pages;
                    e.limit = 5;
                    e.limiter = false;
                    e.pagerId = "_user_wacana_" + c;
                    Siapku_Interface.generatePagingWithRoute("/#!/user/" + c + "/wacana", e, function(f) {
                        $(f).appendTo(".js-user-wacana-container")
                    })
                }
                $(".app-menu2.app-head-menu ul li").removeClass("on");
                $(".js-user-wacana").addClass("on")
            })
        }, function() {
            if (typeof loadFollowedId != "undefined" && loadFollowedId) {
                Siapku_Interface.hideMessage(loadFollowedId, -1);
                loadFollowedId = false
            }
        })
    }
};
var Siapku_Router_User = Backbone.Router.extend(Siapku_Controller_User);
var Siapku_Controller_Group = {
    currentGroupname: false,
    routes: {
        "!/group/siap/:k_siap": "indexSiapAction",
        "!/group/siap/:k_siap/": "indexSiapAction",
        "!/group/siap/:k_siap/uavatar": "upAvatarSiapAction",
        "!/group/siap/:k_siap/uavatar/": "upAvatarSiapAction",
        "!/group/:groupname": "indexAction",
        "!/group/:groupname/": "indexAction",
        "!/group/:groupname/delete": "deleteAction",
        "!/group/:groupname/delete/": "deleteAction",
        "!/group/:groupname/activity/filter/:filter": "activityAction",
        "!/group/:groupname/activity/filter/:filter/": "activityAction",
        "!/group/:groupname/activity": "activityAction",
        "!/group/:groupname/activity/": "activityAction",
        "!/group/:groupname/members/:page/:limit/:display": "membersAction",
        "!/group/:groupname/members/:page/:limit/:display/": "membersAction",
        "!/group/:groupname/members": "membersAction",
        "!/group/:groupname/members/": "membersAction",
        "!/group/:groupname/admins/:page/:limit/:display": "adminsAction",
        "!/group/:groupname/admins/:page/:limit/:display/": "adminsAction",
        "!/group/:groupname/admins": "adminsAction",
        "!/group/:groupname/admins/": "adminsAction",
        "!/group/:groupname/collection/:filter/:page/:limit": "collectionAction",
        "!/group/:groupname/collection/:filter/:page/:limit/": "collectionAction",
        "!/group/:groupname/collection/:filter": "collectionAction",
        "!/group/:groupname/collection/:filter/": "collectionAction",
        "!/group/:groupname/collection/": "collectionAction",
        "!/group/:groupname/collection": "collectionAction",
        "!/group/:groupname/reports/:page/:limit/": "reportsAction",
        "!/group/:groupname/reports/:page/:limit": "reportsAction",
        "!/group/:groupname/reports": "reportsAction",
        "!/group/:groupname/reports/": "reportsAction"
    },
    indexAction: function(b) {
        var a = this;
        if (b != this.currentGroupname) {
            $(".js-app-container").empty();
            Siapku_Interface.forceClearScreen();
            Siapku_Bootstrap.layoutLoaded = false;
            Siapku_Bootstrap.widgetsLoaded = Array()
        }
        this.currentGroupname = b;
        document.title = "Komunitas \u00bb Profil Komunitas";
        if (!Siapku_Bootstrap.isLogged) {
            a.indexPublic(b)
        } else {
            a.indexLogin(b)
        }
    },
    indexSiapAction: function(a) {
        Siapku_Utils.denyNoLogin();
        var b = this;
        $(".js-app-container").empty();
        Siapku_Interface.forceClearScreen();
        Siapku_Bootstrap.layoutLoaded = false;
        Siapku_Bootstrap.widgetsLoaded = Array();
        document.title = "Komunitas \u00bb Profil Komunitas";
        b.indexSiap(a)
    },
    upAvatarSiapAction: function(a) {
        Siapku_Utils.denyNoLogin();
        var b = this;
        $(".js-app-container").empty();
        Siapku_Interface.forceClearScreen();
        Siapku_Bootstrap.layoutLoaded = false;
        Siapku_Bootstrap.widgetsLoaded = Array();
        document.title = "Komunitas \u00bb Profil Komunitas";
        b.indexSiap(a);
        $(".js-modal-image-simple").die().live("click", function(f) {
            f.preventDefault();
            var g = new Date();
            var c = g.getTime();
            $("body").css({
                overflow: "hidden"
            });
            Siapku_Interface.loadTemplate("modal/group/avatar.html", function(d) {
                d = d({
                    title: "Gambar Profil Komunitas",
                    desc: false,
                    modalId: "avatar_" + c,
                    content: ""
                });
                $(d).hide().appendTo("body").show();
                $("#modal_group_avatar_" + c).promise().done(function() {
                    var e = $(this).find(".js-modal-content").width();
                    $(this).find(".modalbox-dialog").css({
                        width: e,
                        "margin-top": 20
                    });
                    $(this).hide().show();
                    $(this).find(".js-close-modal").die().live("click", function(h) {
                        h.preventDefault();
                        $("#modal_group_avatar_" + c).find(".modalbox-cls").trigger("click");
                        return false
                    });
                    Siapku_Utils.initUpload({
                        dropEl: "drop_avatar_" + c,
                        browseBtn: "browse_avatar_" + c,
                        uploadBtn: "upload_avatar_" + c,
                        listEl: "list_avatar_" + c,
                        k_siap: a,
                        group_id: false,
                        url: "/group/upload-avatar",
                        filters: [{
                            title: "Image files",
                            extensions: "jpg,gif,png"
                        }],
                        init: function(h) {},
                        callback: function(i) {
                            if (i.error) {
                                var h = Siapku_Interface.showMessage($("#modal_group_avatar_" + c).find(".js-modal-content"), "n", "full", "err", "", i.desc, "prepend");
                                return
                            } else {
                                if (typeof h != "undefined" && h) {
                                    Siapku_Interface.hideMessage(h, -1);
                                    h = false
                                }
                                $("#modal_group_avatar_" + c).find(".modalbox-cls").trigger("click");
                                Siapku_Bootstrap.layoutLoaded = "";
                                Siapku_Bootstrap.widgetsLoaded = [];
                                $(window).trigger("hashchange")
                            }
                        }
                    })
                })
            });
            return false
        })
    },
    deleteAction: function(b) {
        var a = this;
        if (b != this.currentGroupname) {
            $(".js-app-container").empty();
            Siapku_Interface.forceClearScreen();
            Siapku_Bootstrap.layoutLoaded = false;
            Siapku_Bootstrap.widgetsLoaded = Array()
        }
        this.currentGroupname = b;
        document.title = "Komunitas \u00bb Hapus Komunitas";
        if (!Siapku_Bootstrap.isLogged) {
            a.indexPublic(b)
        } else {
            a.deleteAction(b)
        }
    },
    indexPublic: function(a, b) {
        $(".js-app-container").empty();
        Siapku_Utils.doAjax("group/public-profil", {
            groupname: a
        }, function() {}, function(c) {
            Siapku_Interface.loadTemplate("layout/profil_group_public.html", function(e) {
                var d = e(c);
                $(d).hide().appendTo($(".js-app-container")).slideDown("fast");
                $(d).promise().done(function() {
                    if (b) {
                        b()
                    }
                })
            });
            Siapku_Bootstrap.layoutLoaded = "layout/profil_group_public.html";
            Siapku_Bootstrap.widgetsLoaded = Array();
            Siapku_Interface.forceClearScreen()
        }, function() {})
    },
    indexLogin: function(c) {
        var b = this;
        var a = "";
        var d = "";
        if (Siapku_Bootstrap.layoutLoaded != "layouts/group.html" || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/group/left-sidebar.html") || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/group/right-sidebar.html")) {
            this.initProfilLogin(c, function() {
                b.profil(c)
            }, d, a)
        } else {
            $(".js-user-profil-submenu").html(d);
            $(".js-user-profil-submenu-list").empty();
            $(a).appendTo($(".js-user-profil-submenu-list"));
            b.profil(c)
        }
    },
    indexSiap: function(b) {
        var c = this;
        var a = "";
        var d = "";
        this.initProfilSiap(b, function(e) {
            c.profil(e)
        }, d, a)
    },
    deleteAction: function(c) {
        var b = this;
        var d = "";
        var a = "";
        if (Siapku_Bootstrap.layoutLoaded != "layouts/group.html" || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/group/left-sidebar.html") || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/group/right-sidebar.html")) {
            this.initProfilLogin(c, function() {
                b.deleteProfil(c)
            }, d, a)
        } else {
            $(".js-user-profil-submenu").html(d);
            $(".js-user-profil-submenu-list").empty();
            $(a).appendTo($(".js-user-profil-submenu-list"));
            b.deleteProfil(c)
        }
    },
    initProfilLogin: function(a, d, c, b) {
        $(".js-app-container").empty();
        Siapku_Interface.forceClearScreen();
        Siapku_Utils.doAjax("/group/simple-profil", {
            groupname: a
        }, function() {}, function(e) {
            if (!e.error) {
                Siapku_Interface.loadTemplate("layout/group.html", function(g) {
                    var f = g(e);
                    $(f).hide().appendTo($(".js-app-container")).slideDown("fast");
                    $(f).promise().done(function() {
                        $(".workspc.head-wrap").css("overflow", "visible");
                        Siapku_View_Group.simpleProfil($(".work-sidebar-l"), {}, function() {
                            $(".js-user-profil-submenu").html(c);
                            $(".js-user-profil-submenu-list").empty();
                            $(b).appendTo($(".js-user-profil-submenu-list"));
                            $(".js-user-profil-submenu-list").promise().done(function() {
                                if (d) {
                                    d(e)
                                }
                            });
                            Siapku_Bootstrap.widgetsLoaded.push("widget/group/left-sidebar.html")
                        });
                        if (!_.include(Siapku_Bootstrap.widgetsLoaded, "widget/group/right-sidebar.html")) {
                            $(".js-right-cont").empty();
                            Siapku_Utils.doAjax("rss-sekolah/", false, function() {
                                loadRightId = Siapku_Interface.showMessage($(".js-right-cont"), "n", "full", "load", "Harap tunggu... ", "")
                            }, function(h) {
                                if (!h.error) {
                                    h.fb_app_id = Siapku_Bootstrap.environment.fb_app_id;
                                    Siapku_View_User.rssSekolah($(".js-right-cont"), h, function() {
                                        if (typeof loadRightId != "undefined" && loadRightId) {
                                            Siapku_Interface.hideMessage(loadRightId, -1);
                                            loadRightId = false
                                        }
                                    })
                                }
                                Siapku_Bootstrap.widgetsLoaded.push("widget/group/right-sidebar.html")
                            }, function() {})
                        }
                    })
                });
                Siapku_Bootstrap.layoutLoaded = "layouts/group.html"
            } else {
                $(".js-app-container").append('<div style="display: table;" class="workspc"><div class="workspc-l"><div class="workspc"><div class="work-main"><div class="warn-cont" style="display: block;"><div alt="err" class="warn full"><span alt="">' + e.desc + "</span></div></div></div></div></div></div>")
            }
        }, function() {})
    },
    initProfilSiap: function(a, d, c, b) {
        $(".js-app-container").empty();
        Siapku_Interface.forceClearScreen();
        Siapku_Utils.doAjax("/group/simple-profil", {
            k_siap: a
        }, function() {}, function(e) {
            if (!e.error) {
                Siapku_Interface.loadTemplate("layout/group.html", function(g) {
                    var f = g(e);
                    $(f).hide().appendTo($(".js-app-container")).slideDown("fast");
                    $(f).promise().done(function() {
                        $(".workspc.head-wrap").css("overflow", "visible");
                        Siapku_View_Group.simpleProfil($(".work-sidebar-l"), {}, function() {
                            $(".js-user-profil-submenu").html(c);
                            $(".js-user-profil-submenu-list").empty();
                            $(b).appendTo($(".js-user-profil-submenu-list"));
                            Siapku_Bootstrap.widgetsLoaded.push("widget/group/left-sidebar.html")
                        });
                        if (d) {
                            d(e.group_info.groupname)
                        }
                        if (!_.include(Siapku_Bootstrap.widgetsLoaded, "widget/group/right-sidebar.html")) {
                            $(".js-right-cont").empty();
                            Siapku_Utils.doAjax("rss-sekolah/", false, function() {
                                loadRightId = Siapku_Interface.showMessage($(".js-right-cont"), "n", "full", "load", "Harap tunggu... ", "")
                            }, function(h) {
                                if (!h.error) {
                                    h.fb_app_id = Siapku_Bootstrap.environment.fb_app_id;
                                    Siapku_View_User.rssSekolah($(".js-right-cont"), h, function() {
                                        if (typeof loadRightId != "undefined" && loadRightId) {
                                            Siapku_Interface.hideMessage(loadRightId, -1);
                                            loadRightId = false
                                        }
                                    })
                                }
                                Siapku_Bootstrap.widgetsLoaded.push("widget/group/right-sidebar.html")
                            }, function() {})
                        }
                    })
                });
                Siapku_Bootstrap.layoutLoaded = "layouts/group.html"
            } else {
                $(".js-app-container").append('<div style="display: table;" class="workspc"><div class="workspc-l"><div class="workspc"><div class="work-main"><div class="warn-cont" style="display: block;"><div alt="err" class="warn full"><span alt="">' + e.desc + "</span></div></div></div></div></div></div>")
            }
        }, function() {})
    },
    profil: function(a) {
        $(".work-main").empty();
        $(".head-avatar.head-cat").removeClass("size-80");
        $(".head-avatar.head-cat").addClass("size-80");
        Siapku_Utils.doAjax("group/simple-profil", {
            groupname: a
        }, function() {
            loadMainId = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", "Data sedang dimuat")
        }, function(b) {
            $(".app-menu2.app-head-menu ul li").removeClass("on");
            $(".js-group-profil").addClass("on");
            if (b.i_owner) {
                $(".js-user-profil-submenu-list").empty();
                var c = '<li class="on"><a class="act-info" href="#!/group/' + a + '">Profil</a><dd></dd></li>';
                c += '<li><a class="act-del" href="#!/group/' + a + '/delete">Tutup Komunitas</a><dd></dd></li>';
                $(c).appendTo($(".js-user-profil-submenu-list"))
            }
            Siapku_View_Group.profil($(".work-main"), b);
            Siapku_Bootstrap.widgetsLoaded.push("widget/group/main-profil.html")
        }, function() {
            if (typeof loadMainId != "undefined" && loadMainId) {
                Siapku_Interface.hideMessage(loadMainId, -1);
                loadMainId = false
            }
        })
    },
    deleteProfil: function(a) {
        $(".work-main").empty();
        $(".head-avatar.head-cat").removeClass("size-80");
        $(".head-avatar.head-cat").addClass("size-80");
        Siapku_Utils.doAjax("group/simple-profil", {
            groupname: a
        }, function() {
            loadMainId = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", "Data sedang dimuat")
        }, function(b) {
            $(".app-menu2.app-head-menu ul li").removeClass("on");
            $(".js-group-profil").addClass("on");
            if (b.i_owner) {
                $(".js-user-profil-submenu-list").empty();
                var c = '<li class=""><a class="act-info" href="#!/group/' + a + '">Profil</a><dd></dd></li>';
                c += '<li class="on"><a class="act-del" href="#!/group/' + a + '/delete">Tutup Komunitas</a><dd></dd></li>';
                $(c).appendTo($(".js-user-profil-submenu-list"))
            } else {
                window.location = "#!/group/" + a
            }
            Siapku_View_Group.deleteProfil($(".work-main"), b);
            Siapku_Bootstrap.widgetsLoaded.push("widget/group/delete.html")
        }, function() {
            if (typeof loadMainId != "undefined" && loadMainId) {
                Siapku_Interface.hideMessage(loadMainId, -1);
                loadMainId = false
            }
        })
    },
    activityAction: function(c, d) {
        document.title = "Komunitas \u00bb Aktivitas Komunitas";
        if (!Siapku_Bootstrap.isLogged) {
            this.navigate("/#!/group/" + c, true);
            return false
        }
        if (c != this.currentGroupname) {
            $(".js-app-container").empty();
            Siapku_Interface.forceClearScreen();
            Siapku_Bootstrap.layoutLoaded = false;
            Siapku_Bootstrap.widgetsLoaded = Array()
        }
        this.currentGroupname = c;
        var b = this;
        var a = "";
        var e = "";
        a += '<li class="on js-group-left-activity"><a class="act-posts" href="#!/group/' + c + '/activity">Percakapan</a><dd></dd></li>';
        a += '<li class="js-group-left-reports"><a class="act-bad" href="#!/group/' + c + '/reports">Kiriman Bermasalah</a><dd></dd></li>';
        if (Siapku_Bootstrap.layoutLoaded != "layouts/group.html" || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/group/left-sidebar.html") || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/group/right-sidebar.html")) {
            this.initProfilLogin(c, function(f) {
                if (!f.i_admin) {
                    $(".js-group-left-reports").remove()
                }
                $(".app-menu2.app-head-menu ul li").removeClass("on");
                $(".js-group-aktivitas").addClass("on");
                b.activity(c, d)
            }, e, a)
        } else {
            $(".js-user-profil-submenu").html(e);
            $(".js-user-profil-submenu-list").empty();
            $(a).appendTo($(".js-user-profil-submenu-list"));
            $(".app-menu2.app-head-menu ul li").removeClass("on");
            $(".js-group-aktivitas").addClass("on");
            $(".js-group-left-activity").addClass("on");
            $(".js-group-left-reports").removeClass("on");
            b.activity(c, d)
        }
    },
    activity: function(a, b) {
        $(".work-main").empty();
        $(".head-avatar.head-cat").removeClass("size-80");
        if (!_.isArray(b)) {
            if (!b) {
                b = "all"
            }
            b = b.split(",");
            if (!_.isArray(b)) {
                var c = [];
                c.push(b);
                b = c
            }
        }
        Siapku_Utils.doAjax("group/timeline", {
            groupname: a,
            filter: b
        }, function() {
            loadActivityId = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", "Data sedang dimuat", "prepend")
        }, function(d) {
            d.filter = b;
            Siapku_View_Group.activity($(".work-main"), d, function() {
                $(".js-more-activity").die().live("click", function() {
                    var e = $(this).attr("rel");
                    var f = $(this);
                    Siapku_Utils.doAjax("group/timeline", {
                        groupname: a,
                        filter: b,
                        page: e
                    }, function() {
                        $(f).addClass("ic-load")
                    }, function(g) {
                        Siapku_View_Group.moreActivity($(".js-timeline-content"), g, function() {
                            $(f).attr("rel", parseInt(e) + 1);
                            Siapku_Interface.lazyImage()
                        })
                    }, function() {
                        $(f).removeClass("ic-load")
                    })
                })
            })
        }, function() {
            if (typeof loadActivityId != "undefined" && loadActivityId) {
                Siapku_Interface.hideMessage(loadActivityId, -1);
                loadActivityId = false
            }
        })
    },
    reportsAction: function(d, e, b) {
        document.title = "Komunitas \u00bb Laporan Komunitas";
        if (!Siapku_Bootstrap.isLogged) {
            this.navigate("/#!/group/" + d, true);
            return false
        }
        if (d != this.currentGroupname) {
            $(".js-app-container").empty();
            Siapku_Interface.forceClearScreen();
            Siapku_Bootstrap.layoutLoaded = false;
            Siapku_Bootstrap.widgetsLoaded = Array()
        }
        this.currentGroupname = d;
        var c = this;
        var a = "";
        var f = "";
        a += '<li class="js-group-left-activity"><a class="act-posts" href="#!/group/' + d + '/activity">Percakapan</a><dd></dd></li>';
        a += '<li class="on js-group-left-reports"><a class="act-bad" href="#!/group/' + d + '/reports">Kiriman Bermasalah</a><dd></dd></li>';
        if (Siapku_Bootstrap.layoutLoaded != "layouts/group.html" || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/group/left-sidebar.html") || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/group/right-sidebar.html")) {
            this.initProfilLogin(d, function(g) {
                if (!g.i_admin) {
                    Siapku_Controller_Group.navigate("/#!/group/" + d, true)
                }
                $(".app-menu2.app-head-menu ul li").removeClass("on");
                $(".js-group-aktivitas").addClass("on");
                c.reports(d, e, b)
            }, f, a)
        } else {
            $(".js-user-profil-submenu").html(f);
            $(".js-user-profil-submenu-list").empty();
            $(a).appendTo($(".js-user-profil-submenu-list"));
            $(".app-menu2.app-head-menu ul li").removeClass("on");
            $(".js-group-aktivitas").addClass("on");
            $(".js-group-left-reports").addClass("on");
            $(".js-group-left-activity").removeClass("on");
            c.reports(d, e, b)
        }
    },
    reports: function(b, c, a) {
        $(".work-main").empty();
        $(".head-avatar.head-cat").removeClass("size-80");
        Siapku_Utils.doAjax("report/lists", {
            groupname: b,
            page: c,
            limit: a,
            type: ["post", "comment"],
            is_ignored: 0,
            is_finished: 0
        }, function() {
            loadReportsId = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", "Data sedang dimuat", "prepend")
        }, function(d) {
            d.groupname = b;
            Siapku_View_Group.reports($(".work-main"), d, function() {
                if (d.reports) {
                    var e = {};
                    e.page = d.reports.page;
                    e.pages = d.reports.pages;
                    e.limit = d.reports.limit;
                    e.limiter = [10, 20, 50];
                    e.pagerId = "_group_reports_" + b;
                    Siapku_Interface.generatePagingWithRoute("/#!/group/" + b + "/reports", e, function(f) {
                        $(f).appendTo(".js-group-reports-container")
                    });
                    $(".app-menu2.app-head-menu ul li").removeClass("on");
                    $(".js-group-members").addClass("on")
                }
            })
        }, function() {
            if (typeof loadReportsId != "undefined" && loadReportsId) {
                Siapku_Interface.hideMessage(loadReportsId, -1);
                loadReportsId = false
            }
        })
    },
    membersAction: function(d, e, b, g) {
        document.title = "Komunitas \u00bb Anggota Komunitas";
        if (!Siapku_Bootstrap.isLogged) {
            this.navigate("/#!/group/" + d, true);
            return false
        }
        if (d != this.currentGroupname) {
            $(".js-app-container").empty();
            Siapku_Interface.forceClearScreen();
            Siapku_Bootstrap.layoutLoaded = false;
            Siapku_Bootstrap.widgetsLoaded = Array()
        }
        this.currentGroupname = d;
        var c = this;
        var a = "";
        var f = "";
        a += '<li class="on"><a class="act-folow js-collapswitch" href="#!/group/' + d + '/members">Anggota</a><dd></dd></li>';
        a += '<li class=""><a class="act-admin js-collapswitch" href="#!/group/' + d + '/admins">Administrator</a><dd></dd></li>';
        if (Siapku_Bootstrap.layoutLoaded != "layouts/group.html" || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/group/left-sidebar.html") || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/group/right-sidebar.html")) {
            this.initProfilLogin(d, function() {
                c.members(d, e, b, g)
            }, f, a)
        } else {
            $(".js-user-profil-submenu").html(f);
            $(".js-user-profil-submenu-list").empty();
            $(a).appendTo($(".js-user-profil-submenu-list"));
            c.members(d, e, b, g)
        }
    },
    adminsAction: function(d, e, b, g) {
        document.title = "Komunitas \u00bb Anggota Komunitas";
        if (!Siapku_Bootstrap.isLogged) {
            this.navigate("/#!/group/" + d, true);
            return false
        }
        if (d != this.currentGroupname) {
            $(".js-app-container").empty();
            Siapku_Interface.forceClearScreen();
            Siapku_Bootstrap.layoutLoaded = false;
            Siapku_Bootstrap.widgetsLoaded = Array()
        }
        this.currentGroupname = d;
        var c = this;
        var a = "";
        var f = "";
        a += '<li class=""><a class="act-folow js-collapswitch" href="#!/group/' + d + '/members">Anggota</a><dd></dd></li>';
        a += '<li class="on"><a class="act-admin js-collapswitch" href="#!/group/' + d + '/admins">Administrator</a><dd></dd></li>';
        if (Siapku_Bootstrap.layoutLoaded != "layouts/group.html" || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/group/left-sidebar.html") || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/group/right-sidebar.html")) {
            this.initProfilLogin(d, function() {
                c.admins(d, e, b, g)
            }, f, a)
        } else {
            $(".js-user-profil-submenu").html(f);
            $(".js-user-profil-submenu-list").empty();
            $(a).appendTo($(".js-user-profil-submenu-list"));
            c.admins(d, e, b, g)
        }
    },
    members: function(b, c, a, d) {
        $(".work-main").empty();
        $(".head-avatar.head-cat").removeClass("size-80");
        if (!c) {
            c = 1
        }
        if (!a) {
            a = 20
        }
        if (!d) {
            d = "thumb"
        }
        if (!_.include(["thumb", "list", "tbl"], d)) {
            d: "thumb"
        }
        Siapku_Utils.doAjax("group/members", {
            groupname: b,
            page: c,
            limit: a
        }, function() {
            loadFollowedId = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", "Data sedang dimuat", "prepend")
        }, function(e) {
            e.display = d;
            e.friendType = "members";
            Siapku_View_Group.members($(".work-main"), e, function() {
                if (e.members) {
                    var f = {};
                    f.display = e.display;
                    f.page = e.members.page;
                    f.pages = e.members.pages;
                    f.limit = e.members.limit;
                    f.limiter = false;
                    f.pagerId = "_group_members_" + b;
                    Siapku_Interface.generatePagingWithRoute("/#!/group/" + b + "/members", f, function(g) {
                        $(g).appendTo(".js-group-members-container")
                    });
                    $(".app-menu2.app-head-menu ul li").removeClass("on");
                    $(".js-group-members").addClass("on")
                }
            })
        }, function() {
            if (typeof loadFollowedId != "undefined" && loadFollowedId) {
                Siapku_Interface.hideMessage(loadFollowedId, -1);
                loadFollowedId = false
            }
        })
    },
    admins: function(b, c, a, d) {
        $(".work-main").empty();
        $(".head-avatar.head-cat").removeClass("size-80");
        if (!c) {
            c = 1
        }
        if (!a) {
            a = 20
        }
        if (!d) {
            d = "thumb"
        }
        if (!_.include(["thumb", "list", "tbl"], d)) {
            d: "thumb"
        }
        Siapku_Utils.doAjax("group/admins", {
            groupname: b,
            page: c,
            limit: a
        }, function() {
            loadFollowedId = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", "Data sedang dimuat", "prepend")
        }, function(e) {
            e.display = d;
            e.friendType = "admins";
            Siapku_View_Group.members($(".work-main"), e, function() {
                if (e.admins) {
                    var f = {};
                    f.display = e.display;
                    f.page = e.admins.page;
                    f.pages = e.admins.pages;
                    f.limit = e.admins.limit;
                    f.limiter = false;
                    f.pagerId = "_group_members_" + b;
                    Siapku_Interface.generatePagingWithRoute("/#!/group/" + b + "/admins", f, function(g) {
                        $(g).appendTo(".js-group-members-container")
                    });
                    $(".app-menu2.app-head-menu ul li").removeClass("on");
                    $(".js-group-members").addClass("on")
                }
            })
        }, function() {
            if (typeof loadFollowedId != "undefined" && loadFollowedId) {
                Siapku_Interface.hideMessage(loadFollowedId, -1);
                loadFollowedId = false
            }
        })
    },
    collectionAction: function(d, e, f, b) {
        document.title = "Komunitas \u00bb Koleksi Komunitas";
        if (!Siapku_Bootstrap.isLogged) {
            this.navigate("/#!/group/" + d, true);
            return false
        }
        if (d != this.currentGroupname) {
            $(".js-app-container").empty();
            Siapku_Interface.forceClearScreen();
            Siapku_Bootstrap.layoutLoaded = false;
            Siapku_Bootstrap.widgetsLoaded = Array()
        }
        this.currentGroupname = d;
        var c = this;
        var a = "";
        var g = "";
        if (Siapku_Bootstrap.layoutLoaded != "layouts/group.html" || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/group/left-sidebar.html") || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/group/right-sidebar.html")) {
            this.initProfilLogin(d, function() {
                c.collection(d, e, f, b)
            }, g, a)
        } else {
            $(".js-user-profil-submenu").html(g);
            $(".js-user-profil-submenu-list").empty();
            $(a).appendTo($(".js-user-profil-submenu-list"));
            c.collection(d, e, f, b)
        }
    },
    collection: function(b, c, d, a) {
        $(".work-main").empty();
        $(".head-avatar.head-cat").removeClass("size-80");
        if (!d) {
            d = 1
        }
        if (!a) {
            a = 20
        }
        if (!c) {
            c = "file"
        }
        if (!_.include(["image", "file", "link", "videoembed"], c)) {
            c = "file"
        }
        Siapku_Utils.doAjax("status/galeries", {
            groupname: b,
            page: d,
            limit: a,
            filter: c
        }, function() {
            loadFollowedId = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", "Data sedang dimuat", "prepend")
        }, function(e) {
            if (!e) {
                e = {}
            }
            e.display = "";
            e.filter = c;
            e.groupname = b;
            Siapku_View_Group.collection($(".work-main"), e, function() {
                if (typeof e.list != "undefined") {
                    var f = {};
                    f.display = e.display;
                    f.page = e.page;
                    f.pages = e.pages;
                    f.limit = e.limit;
                    f.limiter = false;
                    f.pagerId = "_group_collection_" + b;
                    Siapku_Interface.generatePagingWithRoute("/#!/group/" + b + "/collection/" + c, f, function(g) {
                        $(g).appendTo(".js-group-collection-container")
                    })
                }
                $(".app-menu2.app-head-menu ul li").removeClass("on");
                $(".js-group-collection").addClass("on")
            })
        }, function() {
            if (typeof loadFollowedId != "undefined" && loadFollowedId) {
                Siapku_Interface.hideMessage(loadFollowedId, -1);
                loadFollowedId = false
            }
        })
    }
};
var Siapku_Router_Group = Backbone.Router.extend(Siapku_Controller_Group);
var Siapku_Controller_Direktori = {
    routes: {
        "!/users": "usersAction",
        "!/users/": "usersAction",
        "!/users/filter/:position": "usersFilterAction",
        "!/users/filter/:position/": "usersFilterAction",
        "!/users/filter/:position/:page/:limit/:display": "usersFilterAction",
        "!/users/filter/:position/:page/:limit/:display/": "usersFilterAction",
        "!/users/filter/:filter/key/:key": "usersFilterKeyAction",
        "!/users/filter/:filter/key/:key/": "usersFilterKeyAction",
        "!/users/filter/:position/key/:key/:page/:limit/:display": "usersFilterKeyAction",
        "!/users/filter/:position/key/:key/:page/:limit/:display/": "usersFilterKeyAction",
        "!/groups": "groupsAction",
        "!/groups/": "groupsAction",
        "!/groups/filter/:filter": "groupsFilterAction",
        "!/groups/filter/:filter/": "groupsFilterAction",
        "!/groups/filter/:filter/:page/:limit/:display": "groupsFilterAction",
        "!/groups/filter/:filter/:page/:limit/:display/": "groupsFilterAction",
        "!/groups/sekolah/:k_jenjang": "groupsSekolahAction",
        "!/groups/sekolah/:k_jenjang/": "groupsSekolahAction",
        "!/groups/sekolah/:k_jenjang/:k_propinsi/:k_kota/:k_status/:key/:page/:limit/:display": "groupsSekolahAction",
        "!/groups/sekolah/:k_jenjang/:k_propinsi/:k_kota/:k_status/:key/:page/:limit/:display/": "groupsSekolahAction",
        "!/groups/sekolah/:k_jenjang/:k_propinsi/:k_kota/:k_status/:page/:limit/:display": "groupsSekolahNoKeyAction",
        "!/groups/sekolah/:k_jenjang/:k_propinsi/:k_kota/:k_status/:page/:limit/:display/": "groupsSekolahNoKeyAction",
        "!/groups/sekolah/:k_jenjang/:k_propinsi/:k_kota/:k_status/:key": "groupsSekolahAction",
        "!/groups/sekolah/:k_jenjang/:k_propinsi/:k_kota/:k_status/:key/": "groupsSekolahAction",
        "!/groups/sekolah/:k_jenjang/:k_propinsi/:k_kota/:k_status": "groupsSekolahAction",
        "!/groups/sekolah/:k_jenjang/:k_propinsi/:k_kota/:k_status/": "groupsSekolahAction",
        "!/groups/filter/:filter/key/:key": "groupsFilterKeyAction",
        "!/groups/filter/:filter/key/:key/": "groupsFilterKeyAction",
        "!/groups/filter/:filter/key/:key/:page/:limit/:display": "groupsFilterKeyAction",
        "!/groups/filter/:filter/key/:key/:page/:limit/:display/": "groupsFilterKeyAction"
    },
    usersLayoutBuilder: function(a) {
        if (Siapku_Bootstrap.layoutLoaded != "layouts/users.html") {
            $(".js-app-container").empty();
            Siapku_Bootstrap.layoutLoaded = false;
            Siapku_Bootstrap.widgetsLoaded = [];
            Siapku_Interface.loadHtml("layouts/users.html", $(".js-app-container"), false, false, function() {
                Siapku_Bootstrap.layoutLoaded = "layouts/users.html";
                if (!Siapku_Bootstrap.isLogged) {
                    $(".head-shorcut").hide()
                } else {
                    $(".head-shorcut").show()
                }
                a()
            })
        } else {
            a()
        }
    },
    usersWidgetBuilder: function(a, b) {
        if (!_.include(Siapku_Bootstrap.widgetsLoaded, "widget/users/left-sidebar.html")) {
            Siapku_Utils.doAjax("users/count", false, function() {
                loadLeftId = Siapku_Interface.showMessage($(".work-sidebar-l"), "n", "full", "load", "Harap tunggu... ", "")
            }, function(c) {
                if (!c.error) {
                    Siapku_Interface.loadTemplate("widget/users/left-sidebar.html", function(e) {
                        var d = e(c.data);
                        $(d).hide().appendTo($(".work-sidebar-l")).slideDown("fast");
                        $(d).promise().done(function() {
                            $(".menu-l ul li").removeClass("on");
                            if (a == "guru") {
                                $(".menu-l ul li .js-left-guru").parent().addClass("on")
                            } else {
                                if (a == "siswa") {
                                    $(".menu-l ul li .js-left-siswa").parent().addClass("on")
                                } else {
                                    if (a == "staf") {
                                        $(".menu-l ul li .js-left-staf").parent().addClass("on")
                                    } else {
                                        if (a == "alumni") {
                                            $(".menu-l ul li .js-left-alumni").parent().addClass("on")
                                        } else {
                                            if (a == "ortu") {
                                                $(".menu-l ul li .js-left-ortu").parent().addClass("on")
                                            } else {
                                                if (a == "umum") {
                                                    $(".menu-l ul li .js-left-umum").parent().addClass("on")
                                                } else {
                                                    if (a == "mahasiswa") {
                                                        $(".menu-l ul li .js-left-mahasiswa").parent().addClass("on")
                                                    } else {
                                                        if (a == "dosen") {
                                                            $(".menu-l ul li .js-left-dosen").parent().addClass("on")
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        })
                    })
                } else {
                    if (typeof loadLeftId != "undefined" && loadLeftId) {
                        Siapku_Interface.hideMessage(loadLeftId, -1);
                        loadLeftId = false
                    }
                }
                Siapku_Bootstrap.widgetsLoaded.push("widget/users/left-sidebar.html")
            }, function() {
                if (typeof loadLeftId != "undefined" && loadLeftId) {
                    Siapku_Interface.hideMessage(loadLeftId, -1);
                    loadLeftId = false
                }
            })
        } else {
            $(".menu-l ul li").removeClass("on");
            if (a == "guru") {
                $(".menu-l ul li .js-left-guru").parent().addClass("on")
            } else {
                if (a == "siswa") {
                    $(".menu-l ul li .js-left-siswa").parent().addClass("on")
                } else {
                    if (a == "staf") {
                        $(".menu-l ul li .js-left-staf").parent().addClass("on")
                    } else {
                        if (a == "alumni") {
                            $(".menu-l ul li .js-left-alumni").parent().addClass("on")
                        } else {
                            if (a == "ortu") {
                                $(".menu-l ul li .js-left-ortu").parent().addClass("on")
                            } else {
                                if (a == "umum") {
                                    $(".menu-l ul li .js-left-umum").parent().addClass("on")
                                } else {
                                    if (a == "mahasiswa") {
                                        $(".menu-l ul li .js-left-mahasiswa").parent().addClass("on")
                                    } else {
                                        if (a == "dosen") {
                                            $(".menu-l ul li .js-left-dosen").parent().addClass("on")
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (!_.include(Siapku_Bootstrap.widgetsLoaded, "widget/users/right-sidebar.html")) {
            $(".js-right-cont").empty();
            Siapku_Utils.doAjax("rss-sekolah/", false, function() {
                loadRightId = Siapku_Interface.showMessage($(".js-right-cont"), "n", "full", "load", "Harap tunggu... ", "")
            }, function(c) {
                if (!c.error) {
                    c.fb_app_id = Siapku_Bootstrap.environment.fb_app_id;
                    Siapku_View_User.rssSekolah($(".js-right-cont"), c, function() {
                        if (typeof loadRightId != "undefined" && loadRightId) {
                            Siapku_Interface.hideMessage(loadRightId, -1);
                            loadRightId = false
                        }
                    })
                }
                Siapku_Bootstrap.widgetsLoaded.push("widget/users/right-sidebar.html")
            }, function() {})
        }
        b()
    },
    usersDataBuilder: function(c, b, d, a, e) {
        Siapku_Utils.doAjax("users/lists", {
            filter: c,
            key: b,
            page: d,
            limit: a
        }, function() {
            $(".work-main").empty();
            dataLoader = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", " Data sedang dimuat", "append")
        }, function(f) {
            if (f.users) {
                Siapku_View_Direktori.listUser($(".work-main"), f, c, b, d, a, e)
            } else {
                if (f.error) {
                    Siapku_Interface.showMessage($(".work-main"), "n", "full", "error", "Maaf !", f.desc, "prepend")
                }
            }
        }, function() {
            if (typeof dataLoader != "undefined" && dataLoader) {
                Siapku_Interface.hideMessage(dataLoader, -1);
                dataLoader = false
            }
        })
    },
    usersAction: function() {
        this.usersFilterAction("guru", 1, 20, "thumb")
    },
    usersFilterAction: function(c, d, a, e) {
        document.title = "Komunitas \u00bb Direktori Anggota";
        if (!_.include(["guru", "siswa", "staf", "alumni", "ortu", "umum", "mahasiswa", "dosen"], c)) {
            c = "guru"
        }
        if (!d) {
            d = 1
        }
        if (!a) {
            a = 20
        }
        if (!e) {
            e = "thumb"
        }
        var b = this;
        this.usersLayoutBuilder(function() {
            b.usersWidgetBuilder(c, function() {
                b.usersDataBuilder(c, "", d, a, e)
            })
        })
    },
    usersFilterKeyAction: function(d, c, e, a, f) {
        document.title = "Komunitas \u00bb Direktori Anggota";
        if (!_.include(["guru", "siswa", "staf", "alumni", "ortu", "umum", "mahasiswa", "dosen"], d)) {
            d = "guru"
        }
        if (!e) {
            e = 1
        }
        if (!a) {
            a = 20
        }
        if (!f) {
            f = "thumb"
        }
        var b = this;
        this.usersLayoutBuilder(function() {
            b.usersWidgetBuilder(d, function() {
                b.usersDataBuilder(d, c, e, a, f)
            })
        })
    },
    groupsLayoutBuilder: function(a) {
        if (Siapku_Bootstrap.layoutLoaded != "layouts/groups.html") {
            $(".js-app-container").empty();
            Siapku_Bootstrap.layoutLoaded = false;
            Siapku_Bootstrap.widgetsLoaded = [];
            Siapku_Interface.loadHtml("layouts/groups.html", $(".js-app-container"), false, false, function() {
                Siapku_Bootstrap.layoutLoaded = "layouts/groups.html";
                if (!Siapku_Bootstrap.isLogged) {
                    $(".head-shorcut").hide()
                } else {
                    $(".head-shorcut").show()
                }
                a()
            })
        } else {
            a()
        }
    },
    groupsWidgetBuilder: function(a, b) {
        if (!_.include(Siapku_Bootstrap.widgetsLoaded, "widget/groups/left-sidebar.html")) {
            Siapku_Utils.doAjax("groups/count", false, function() {
                loadLeftId = Siapku_Interface.showMessage($(".work-sidebar-l"), "n", "full", "load", "Harap tunggu... ", "")
            }, function(c) {
                if (!c.error) {
                    Siapku_Interface.loadTemplate("widget/groups/left-sidebar.html", function(e) {
                        var d = e(c.data);
                        $(d).hide().appendTo($(".work-sidebar-l")).slideDown("fast");
                        $(d).promise().done(function() {
                            $(".menu-l ul li").removeClass("on");
                            if (a == "departemen") {
                                $(".menu-l ul li .js-left-departemen").parent().addClass("on")
                            } else {
                                if (a == "tk") {
                                    $(".menu-l ul li .js-left-tk").parent().addClass("on")
                                } else {
                                    if (a == "sd") {
                                        $(".menu-l ul li .js-left-sd").parent().addClass("on")
                                    } else {
                                        if (a == "smp") {
                                            $(".menu-l ul li .js-left-smp").parent().addClass("on")
                                        } else {
                                            if (a == "sma") {
                                                $(".menu-l ul li .js-left-sma").parent().addClass("on")
                                            } else {
                                                if (a == "umum") {
                                                    $(".menu-l ul li .js-left-umum").parent().addClass("on")
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (Siapku_Bootstrap.isLogged) {
                                $(".js-create-new-group").show()
                            } else {
                                $(".js-create-new-group").hide()
                            }
                        })
                    })
                } else {
                    if (typeof loadLeftId != "undefined" && loadLeftId) {
                        Siapku_Interface.hideMessage(loadLeftId, -1);
                        loadLeftId = false
                    }
                }
                Siapku_Bootstrap.widgetsLoaded.push("widget/groups/left-sidebar.html")
            }, function() {
                if (typeof loadLeftId != "undefined" && loadLeftId) {
                    Siapku_Interface.hideMessage(loadLeftId, -1);
                    loadLeftId = false
                }
            })
        } else {
            $(".menu-l ul li").removeClass("on");
            if (a == "departemen") {
                $(".menu-l ul li .js-left-departemen").parent().addClass("on")
            } else {
                if (a == "tk") {
                    $(".menu-l ul li .js-left-tk").parent().addClass("on")
                } else {
                    if (a == "sd") {
                        $(".menu-l ul li .js-left-sd").parent().addClass("on")
                    } else {
                        if (a == "smp") {
                            $(".menu-l ul li .js-left-smp").parent().addClass("on")
                        } else {
                            if (a == "sma") {
                                $(".menu-l ul li .js-left-sma").parent().addClass("on")
                            } else {
                                if (a == "umum") {
                                    $(".menu-l ul li .js-left-umum").parent().addClass("on")
                                }
                            }
                        }
                    }
                }
            }
        }
        if (!_.include(Siapku_Bootstrap.widgetsLoaded, "widget/groups/right-sidebar.html")) {
            $(".js-right-cont").empty();
            Siapku_Utils.doAjax("rss-sekolah/", false, function() {
                loadRightId = Siapku_Interface.showMessage($(".js-right-cont"), "n", "full", "load", "Harap tunggu... ", "")
            }, function(c) {
                if (!c.error) {
                    c.fb_app_id = Siapku_Bootstrap.environment.fb_app_id;
                    Siapku_View_User.rssSekolah($(".js-right-cont"), c, function() {
                        if (typeof loadRightId != "undefined" && loadRightId) {
                            Siapku_Interface.hideMessage(loadRightId, -1);
                            loadRightId = false
                        }
                    })
                }
                Siapku_Bootstrap.widgetsLoaded.push("widget/groups/right-sidebar.html")
            }, function() {})
        }
        b()
    },
    groupsDataBuilder: function(c, b, d, a, e) {
        Siapku_Utils.doAjax("groups/lists", {
            filter: c,
            key: b,
            page: d,
            limit: a
        }, function() {
            $(".work-main").empty();
            dataLoader = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", " Data sedang dimuat", "append")
        }, function(f) {
            if (f.groups) {
                Siapku_View_Direktori.listGroup($(".work-main"), f, c, b, d, a, e)
            } else {
                if (f.error) {
                    Siapku_Interface.showMessage($(".work-main"), "n", "full", "error", "Maaf !", f.desc, "prepend")
                }
            }
        }, function() {
            if (typeof dataLoader != "undefined" && dataLoader) {
                Siapku_Interface.hideMessage(dataLoader, -1);
                dataLoader = false
            }
        })
    },
    groupsDataSekolahBuilder: function(f, b, h, g, c, d, a, e) {
        if (f == "tk") {
            f = 0
        } else {
            if (f == "sd") {
                f = 1
            } else {
                if (f == "smp") {
                    f = 2
                } else {
                    if (f == "sma") {
                        f = 3
                    }
                }
            }
        }
        Siapku_Utils.doAjax("groups/form-sekolah", {}, function() {
            $(".work-main").empty();
            dataLoader = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", " Data sedang dimuat", "append")
        }, function(j) {
            var i = j.data;
            if (i && b && h && g) {
                Siapku_Utils.doAjax("groups/lists-sekolah", {
                    k_jenjang: f,
                    k_propinsi: b,
                    k_kota: h,
                    k_status: g,
                    key: c,
                    page: d,
                    limit: a
                }, function() {
                    $(".work-main").empty();
                    dataLoaderList = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", " Data sedang dimuat", "append")
                }, function(k) {
                    if (!k.error) {
                        Siapku_View_Direktori.listGroupSekolah($(".work-main"), k, i, f, b, h, g, c, d, a, e)
                    } else {
                        Siapku_Interface.showMessage($(".work-main"), "n", "full", "err", "Maaf! ", " " + k.desc, "prepend")
                    }
                }, function() {
                    if (typeof dataLoaderList != "undefined" && dataLoaderList) {
                        Siapku_Interface.hideMessage(dataLoaderList, -1);
                        dataLoaderList = false
                    }
                })
            } else {
                var j = {};
                j.groups = false;
                Siapku_View_Direktori.listGroupSekolah($(".work-main"), j, i, f, b, h, g, c, d, a, e)
            }
        }, function() {
            if (typeof dataLoader != "undefined" && dataLoader) {
                Siapku_Interface.hideMessage(dataLoader, -1);
                dataLoader = false
            }
        })
    },
    groupsAction: function() {
        this.groupsFilterAction("departemen", 1, 20, "thumb")
    },
    groupsFilterAction: function(c, d, a, e) {
        document.title = "Komunitas \u00bb Direktori Komunitas";
        if (!_.include(["departemen", "umum"], c)) {
            c = "umum"
        }
        if (!d) {
            d = 1
        }
        if (!a) {
            a = 20
        }
        if (!e) {
            e = "thumb"
        }
        var b = this;
        this.groupsLayoutBuilder(function() {
            b.groupsWidgetBuilder(c, function() {
                b.groupsDataBuilder(c, "", d, a, e)
            })
        })
    },
    groupsFilterKeyAction: function(d, c, e, a, f) {
        document.title = "Komunitas \u00bb Direktori Komunitas";
        if (!_.include(["departemen", "umum"], d)) {
            d = "umum"
        }
        if (!e) {
            e = 1
        }
        if (!a) {
            a = 20
        }
        if (!f) {
            f = "thumb"
        }
        var b = this;
        this.groupsLayoutBuilder(function() {
            b.groupsWidgetBuilder(d, function() {
                b.groupsDataBuilder(d, c, e, a, f)
            })
        })
    },
    groupsSekolahNoKeyAction: function(e, b, g, f, c, a, d) {
        this.groupsSekolahAction(e, b, g, f, false, c, a, d)
    },
    groupsSekolahAction: function(h, i, a, e, f, d, b, c) {
        document.title = "Komunitas \u00bb Direktori Komunitas";
        if (!d) {
            d = 1
        }
        if (!b) {
            b = 20
        }
        if (!c) {
            c = "thumb"
        }
        if (!f) {
            f = ""
        }
        var g = this;
        this.groupsLayoutBuilder(function() {
            g.groupsWidgetBuilder(h, function() {
                g.groupsDataSekolahBuilder(h, i, a, e, f, d, b, c)
            })
        })
    }
};
var Siapku_Router_Direktori = Backbone.Router.extend(Siapku_Controller_Direktori);
var Siapku_Controller_Post = {
    currentUsername: false,
    currentGroupname: false,
    routes: {
        "!/post/:post_id": "indexAction",
        "!/post/:post_id/": "indexAction"
    },
    indexAction: function(b) {
        var a = this;
        if (!Siapku_Bootstrap.isLogged) {
            a.indexPublic(b)
        } else {
            a.indexLogin(b)
        }
    },
    indexLogin: function(b) {
        var a = this;
        var c = false;
        Siapku_Utils.doAjax("/status/detail", {
            post_id: b,
            type: "public"
        }, function() {}, function(f) {
            if (!f.error) {
                if (!f.groupId) {
                    var h = f.user.username ? f.user.username: f.user.id;
                    if (h != a.currentUsername) {
                        $(".js-app-container").empty();
                        Siapku_Interface.forceClearScreen();
                        Siapku_Bootstrap.layoutLoaded = false;
                        Siapku_Bootstrap.widgetsLoaded = Array()
                    }
                    a.currentUsername = h;
                    var d = "";
                    var g = "";
                    document.title = "Komunitas \u00bb Detail Post";
                    if (Siapku_Bootstrap.layoutLoaded != "layouts/user.html" || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/user/left-sidebar.html") || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/user/right-sidebar.html")) {
                        Siapku_Controller_User.initProfilLogin(h, function() {
                            a.postDetail(f)
                        }, g, d)
                    } else {
                        $(".js-user-profil-submenu").html(g);
                        $(".js-user-profil-submenu-list").empty();
                        $(d).appendTo($(".js-user-profil-submenu-list"));
                        a.postDetail(f)
                    }
                } else {
                    var e = f.group.groupname;
                    if (e != a.currentGroupname) {
                        $(".js-app-container").empty();
                        Siapku_Interface.forceClearScreen();
                        Siapku_Bootstrap.layoutLoaded = false;
                        Siapku_Bootstrap.widgetsLoaded = Array()
                    }
                    a.currentGroupname = e;
                    var d = "";
                    var g = "";
                    document.title = "Komunitas \u00bb Detail Post";
                    if (Siapku_Bootstrap.layoutLoaded != "layouts/group.html" || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/group/left-sidebar.html") || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/group/right-sidebar.html")) {
                        Siapku_Controller_Group.initProfilLogin(e, function() {
                            a.postDetail(f)
                        }, g, d)
                    } else {
                        $(".js-user-profil-submenu").html(g);
                        $(".js-user-profil-submenu-list").empty();
                        $(d).appendTo($(".js-user-profil-submenu-list"));
                        a.postDetail(f)
                    }
                }
            } else {
                $(".js-app-container").empty();
                $(".js-app-container").append('<div style="display: table;" class="workspc"><div class="workspc-l"><div class="workspc"><div class="work-main"><div class="warn-cont" style="display: block;"><div alt="err" class="warn full"><span alt="">' + f.desc + "</span></div></div></div></div></div></div>")
            }
        }, function() {})
    },
    indexPublic: function(b) {
        var a = this;
        var c = false;
        Siapku_Utils.doAjax("/status/detail", {
            post_id: b,
            type: "public"
        }, function() {}, function(e) {
            if (!e.error) {
                if (!e.groupId) {
                    var f = e.user.username ? e.user.username: e.user.id;
                    if (f != a.currentUsername) {
                        $(".js-app-container").empty();
                        Siapku_Interface.forceClearScreen();
                        Siapku_Bootstrap.layoutLoaded = false;
                        Siapku_Bootstrap.widgetsLoaded = Array()
                    }
                    a.currentUsername = f;
                    document.title = "Komunitas \u00bb Detail Post";
                    if (Siapku_Bootstrap.layoutLoaded != "layouts/user.html" || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/user/left-sidebar.html") || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/user/right-sidebar.html")) {
                        Siapku_Controller_User.indexPublic(f, function() {
                            a.postDetail(e)
                        })
                    } else {
                        a.postDetail(e)
                    }
                } else {
                    var d = e.group.groupname;
                    if (d != a.currentGroupname) {
                        $(".js-app-container").empty();
                        Siapku_Interface.forceClearScreen();
                        Siapku_Bootstrap.layoutLoaded = false;
                        Siapku_Bootstrap.widgetsLoaded = Array()
                    }
                    a.currentGroupname = d;
                    document.title = "Komunitas \u00bb Detail Post";
                    if (Siapku_Bootstrap.layoutLoaded != "layout/profil_group_public.html") {
                        Siapku_Controller_Group.indexPublic(d, function() {
                            a.postDetail(e)
                        })
                    } else {
                        a.postDetail(e)
                    }
                }
            } else {
                $(".js-app-container").empty();
                $(".js-app-container").append('<div style="display: table;" class="workspc"><div class="workspc-l"><div class="workspc"><div class="work-main"><div class="warn-cont" style="display: block;"><div alt="err" class="warn full"><span alt="">' + e.desc + "</span></div></div></div></div></div></div>")
            }
        }, function() {})
    },
    postDetail: function(a) {
        if (Siapku_Bootstrap.isLogged) {
            $(".work-main").empty()
        }
        $(".head-avatar.head-cat").removeClass("size-80");
        $(".head-avatar.head-cat").removeClass("size-50");
        $(".head-avatar.head-cat").addClass("size-50");
        if (Siapku_Bootstrap.isLogged) {
            Siapku_Utils.doAjax("status/comments", {
                post_id: a.id,
                type: "public"
            }, function() {
                loadMainId = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", "Data sedang dimuat")
            }, function(b) {
                if (typeof b.list !== "undefined" && b.list) {
                    a.comment = b.list
                } else {
                    a.comment = []
                }
                Siapku_View_Post.detail($(".work-main"), a);
                Siapku_Bootstrap.widgetsLoaded.push("status/single.html")
            }, function() {
                if (typeof loadMainId != "undefined" && loadMainId) {
                    Siapku_Interface.hideMessage(loadMainId, -1);
                    loadMainId = false
                }
            })
        } else {
            a.comment = [];
            Siapku_View_Post.detail($(".js-post-content"), a)
        }
    }
};
var Siapku_Router_Post = Backbone.Router.extend(Siapku_Controller_Post);
var Siapku_Controller_Mail = {
    currentUsername: false,
    routes: {
        "!/mail": "indexAction",
        "!/mail/": "indexAction",
        "!/mail/search/:search/:page/:limit/": "searchAction",
        "!/mail/search/:search/:page/:limit": "searchAction",
        "!/mail/search/:search/": "searchAction",
        "!/mail/search/:search": "searchAction",
        "!/mail/detail/:post_id/": "detailAction",
        "!/mail/detail/:post_id": "detailAction",
        "!/mail/:page/:limit": "indexAction",
        "!/mail/:page/:limit/": "indexAction"
    },
    indexAction: function(d, a) {
        if (!Siapku_Utils.denyNoLogin()) {
            return false
        }
        if (!d) {
            d = 1
        }
        if (!a) {
            a = 5
        }
        var c = "";
        document.title = "Komunitas \u00bb Dasbor Surat";
        var e = "lists";
        var b = this;
        this.mailLayoutBuilder(function() {
            b.mailWidgetBuilder(e, function() {
                b.mailDataBuilder(e, d, a, c)
            })
        })
    },
    detailAction: function(b) {
        if (!Siapku_Utils.denyNoLogin()) {
            return false
        }
        document.title = "Komunitas \u00bb Dasbor Surat";
        var c = "detail";
        var a = this;
        this.mailLayoutBuilder(function() {
            a.mailWidgetBuilder(c, function() {
                a.mailDataBuilder(c, false, false, b)
            })
        })
    },
    searchAction: function(c, d, a) {
        if (!Siapku_Utils.denyNoLogin()) {
            return false
        }
        if (!d) {
            d = 1
        }
        if (!a) {
            a = 5
        }
        document.title = "Komunitas \u00bb Dasbor Surat";
        var e = "lists";
        var b = this;
        this.mailLayoutBuilder(function() {
            b.mailWidgetBuilder(e, function() {
                b.mailDataBuilder(e, d, a, c)
            })
        })
    },
    mailLayoutBuilder: function(b) {
        var a = [];
        $.each(Siapku_Bootstrap.widgetsLoaded, function(c, d) {
            if (d != "widget/mail/left-sidebar.html" && d != "widget/dashboard/right-sidebar.html") {} else {
                a.push(d)
            }
        });
        Siapku_Bootstrap.widgetsLoaded = a;
        if (Siapku_Bootstrap.layoutLoaded != "layouts/dashboard.html") {
            $(".js-app-container").empty();
            Siapku_Bootstrap.layoutLoaded = false;
            Siapku_Bootstrap.widgetsLoaded = [];
            Siapku_Utils.doAjax("user/simple-profil", {
                username: "current"
            }, function() {}, function(c) {
                if (!c.error) {
                    Siapku_Interface.loadTemplate("layout/dashboard.html", function(e) {
                        var d = e(c);
                        $(d).hide().appendTo($(".js-app-container")).slideDown("fast");
                        $(d).promise().done(function() {
                            $(".app-head-menu ul li").removeClass("on");
                            $(".app-head-menu ul li a[href*=mail]").parent().addClass("on");
                            $(".workspc").attr("style", "");
                            if ($(".work-sidebar-l").length == 0) {
                                $(".workspc-l .workspc").prepend('<div style="width:140px" class="work-sidebar-l"></div>')
                            }
                            b()
                        })
                    })
                } else {}
                Siapku_Bootstrap.layoutLoaded = "layouts/dashboard.html"
            }, function() {})
        } else {
            $(".app-head-menu ul li").removeClass("on");
            $(".app-head-menu ul li a[href*=mail]").parent().addClass("on");
            if ($(".work-sidebar-l").length == 0) {
                $(".workspc-l .workspc").prepend('<div style="width:140px" class="work-sidebar-l"></div>')
            }
            b()
        }
    },
    mailWidgetBuilder: function(a, b) {
        if (!_.include(Siapku_Bootstrap.widgetsLoaded, "widget/mail/left-sidebar.html")) {
            Siapku_Interface.loadTemplate("widget/mail/left-sidebar.html", function(d) {
                var c = d({});
                $(".work-sidebar-l").empty();
                $(c).hide().appendTo($(".work-sidebar-l")).slideDown("fast");
                $(c).promise().done(function() {
                    Siapku_Bootstrap.widgetsLoaded.push("widget/mail/left-sidebar.html")
                })
            })
        } else {}
        if (!_.include(Siapku_Bootstrap.widgetsLoaded, "widget/dashboard/right-sidebar.html")) {
            $(".js-right-cont").empty();
            Siapku_Utils.doAjax("rss-sekolah/", false, function() {
                loadRightId = Siapku_Interface.showMessage($(".js-right-cont"), "n", "full", "load", "Harap tunggu... ", "")
            }, function(c) {
                if (!c.error) {
                    c.fb_app_id = Siapku_Bootstrap.environment.fb_app_id;
                    Siapku_View_User.rssSekolah($(".js-right-cont"), c, function() {
                        if (typeof loadRightId != "undefined" && loadRightId) {
                            Siapku_Interface.hideMessage(loadRightId, -1);
                            loadRightId = false
                        }
                    })
                }
                Siapku_Bootstrap.widgetsLoaded.push("widget/dashboard/right-sidebar.html")
            }, function() {})
        }
        b()
    },
    mailDataBuilder: function(d, c, a, b) {
        if (d == "lists") {
            Siapku_Utils.doAjax("status/private/lists", {
                page: c,
                limit: a,
                search: b
            }, function() {
                $(".work-main").empty();
                loadMailsId = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", "Data sedang dimuat", "prepend")
            }, function(e) {
                e.search = b;
                Siapku_View_Mail.list($(".work-main"), e, function() {
                    if (!e.error) {
                        var f = {};
                        f.display = "";
                        f.page = e.page;
                        f.pages = e.pages;
                        f.limit = e.limit;
                        f.limiter = [5, 10, 20];
                        f.pagerId = "_user_mail_";
                        Siapku_Interface.generatePagingWithRoute("/#!/mail", f, function(g) {
                            $(g).appendTo(".js-user-mail-container")
                        })
                    }
                })
            }, function() {
                if (typeof loadMailsId != "undefined" && loadMailsId) {
                    Siapku_Interface.hideMessage(loadMailsId, -1);
                    loadMailsId = false
                }
            })
        } else {
            if (d == "detail") {
                Siapku_Utils.doAjax("/status/detail", {
                    post_id: b,
                    type: "private"
                }, function() {
                    $(".work-main").empty();
                    loadMailsId = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", "Data sedang dimuat", "prepend")
                }, function(e) {
                    Siapku_View_Mail.detail($(".work-main"), e, function() {
                        var f = {};
                        Siapku_Utils.doAjax("status/comments", {
                            post_id: b,
                            type: "private"
                        }, function() {
                            loadCommentId = Siapku_Interface.showMessage($(".js-comment-container"), "n", "full", "load", "Harap tunggu... ", "Data sedang dimuat", "prepend")
                        }, function(h) {
                            var g = {};
                            if (typeof h.list !== "undefined" && h.list) {
                                g.comment = h.list
                            } else {
                                g.comment = []
                            }
                            Siapku_View_Mail.comment($(".js-comment-container"), g)
                        }, function() {
                            if (typeof loadCommentId != "undefined" && loadCommentId) {
                                Siapku_Interface.hideMessage(loadCommentId, -1);
                                loadCommentId = false
                            }
                        })
                    })
                }, function() {
                    if (typeof loadMailsId != "undefined" && loadMailsId) {
                        Siapku_Interface.hideMessage(loadMailsId, -1);
                        loadMailsId = false
                    }
                })
            }
        }
    }
};
var Siapku_Router_Mail = Backbone.Router.extend(Siapku_Controller_Mail);
var Siapku_Controller_Notification = {
    routes: {
        "!/notifications": "indexAction",
        "!/notifications/": "indexAction"
    },
    indexAction: function() {
        if (!Siapku_Utils.denyNoLogin()) {
            return false
        }
        document.title = "Komunitas \u00bb Dasbor Notifikasi";
        var a = this;
        this.notificationLayoutBuilder(function() {
            a.notificationWidgetBuilder(false, function() {
                a.notificationDataBuilder()
            })
        })
    },
    notificationLayoutBuilder: function(b) {
        var a = [];
        $.each(Siapku_Bootstrap.widgetsLoaded, function(c, d) {
            if (d != "widget/notification/left-sidebar.html" && d != "widget/dashboard/right-sidebar.html") {} else {
                a.push(d)
            }
        });
        Siapku_Bootstrap.widgetsLoaded = a;
        if (Siapku_Bootstrap.layoutLoaded != "layouts/dashboard.html") {
            $(".js-app-container").empty();
            Siapku_Bootstrap.layoutLoaded = false;
            Siapku_Bootstrap.widgetsLoaded = [];
            Siapku_Utils.doAjax("user/simple-profil", {
                username: "current"
            }, function() {}, function(c) {
                if (!c.error) {
                    Siapku_Interface.loadTemplate("layout/dashboard.html", function(e) {
                        var d = e(c);
                        $(d).hide().appendTo($(".js-app-container")).slideDown("fast");
                        $(d).promise().done(function() {
                            $(".app-head-menu ul li").removeClass("on");
                            $(".app-head-menu ul li a[href*=mail]").parent().addClass("on");
                            $(".workspc").attr("style", "");
                            b()
                        })
                    })
                } else {}
                Siapku_Bootstrap.layoutLoaded = "layouts/dashboard.html"
            }, function() {})
        } else {
            $(".app-head-menu ul li").removeClass("on");
            $(".app-head-menu ul li a[href*=mail]").parent().addClass("on");
            b()
        }
    },
    notificationWidgetBuilder: function(a, b) {
        if (!_.include(Siapku_Bootstrap.widgetsLoaded, "widget/notification/left-sidebar.html")) {
            Siapku_Interface.loadTemplate("widget/notification/left-sidebar.html", function(d) {
                var c = d({});
                $(".work-sidebar-l").empty();
                $(c).hide().appendTo($(".work-sidebar-l")).slideDown("fast");
                $(c).promise().done(function() {
                    Siapku_Bootstrap.widgetsLoaded.push("widget/notification/left-sidebar.html")
                })
            })
        } else {}
        if (!_.include(Siapku_Bootstrap.widgetsLoaded, "widget/dashboard/right-sidebar.html")) {
            $(".js-right-cont").empty();
            Siapku_Utils.doAjax("rss-sekolah/", false, function() {
                loadRightId = Siapku_Interface.showMessage($(".js-right-cont"), "n", "full", "load", "Harap tunggu... ", "")
            }, function(c) {
                if (!c.error) {
                    c.fb_app_id = Siapku_Bootstrap.environment.fb_app_id;
                    Siapku_View_User.rssSekolah($(".js-right-cont"), c, function() {
                        if (typeof loadRightId != "undefined" && loadRightId) {
                            Siapku_Interface.hideMessage(loadRightId, -1);
                            loadRightId = false
                        }
                    })
                }
                Siapku_Bootstrap.widgetsLoaded.push("widget/dashboard/right-sidebar.html")
            }, function() {})
        }
        b()
    },
    notificationDataBuilder: function(d, c, a, b) {
        Siapku_Utils.doAjax("status/notification/lists", {
            page: 1,
            limit: 10
        }, function() {
            $(".work-main").empty();
            loadMailsId = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", "Data sedang dimuat", "prepend")
        }, function(e) {
            Siapku_View_Notification.list($(".work-main"), e, function() {
                $(".js-more-activity").die().live("click", function() {
                    var f = $(this).attr("rel");
                    var g = $(this);
                    Siapku_Utils.doAjax("status/notification/lists", {
                        page: f
                    }, function() {
                        $(g).addClass("ic-load")
                    }, function(h) {
                        if (!h.error && h.notifications) {
                            Siapku_Interface.loadTemplate("status/notif.html", function(j) {
                                var i = j(h);
                                if (i.indexOf("li") > 0) {
                                    $(i).hide().appendTo($(".js-timeline-content")).slideDown("fast");
                                    $(i).promise().done(function() {
                                        $(g).attr("rel", parseInt(f) + 1);
                                        Siapku_Interface.lazyImage()
                                    })
                                }
                            })
                        }
                    }, function() {
                        $(g).removeClass("ic-load")
                    })
                })
            })
        }, function() {
            if (typeof loadMailsId != "undefined" && loadMailsId) {
                Siapku_Interface.hideMessage(loadMailsId, -1);
                loadMailsId = false
            }
        })
    }
};
var Siapku_Router_Notification = Backbone.Router.extend(Siapku_Controller_Notification);
var Siapku_Controller_Friends = {
    routes: {
        "!/friends": "followersAction",
        "!/friends/": "followersAction",
        "!/friends/followers/:page/:limit/:display": "followersAction",
        "!/friends/followers/:page/:limit/:display/": "followersAction",
        "!/friends/followers": "followersAction",
        "!/friends/followers/": "followersAction",
        "!/friends/followed/:page/:limit/:display": "followedAction",
        "!/friends/followed/:page/:limit/:display/": "followedAction",
        "!/friends/followed": "followedAction",
        "!/friends/followed/": "followedAction",
        "!/friends/recommendation/fb": "fbIndexAction",
        "!/friends/recommendation/fb/": "fbIndexAction",
        "!/friends/recommendation/fb/:filter": "fbRecommendation",
        "!/friends/recommendation/fb/:filter/": "fbRecommendation",
        "!/friends/recommendation/fb/:filter/:page/:limit": "fbRecommendation",
        "!/friends/recommendation/fb/:filter/:page/:limit/": "fbRecommendation",
        "!/friends/recommendation/fb/:filter/:page/:limit/:display": "fbRecommendation",
        "!/friends/recommendation/fb/:filter/:page/:limit/:display/": "fbRecommendation",
        "!/friends/recommendation/tw": "twIndexAction",
        "!/friends/recommendation/tw/": "twIndexAction",
        "!/friends/recommendation/tw/:filter": "twRecommendation",
        "!/friends/recommendation/tw/:filter/": "twRecommendation",
        "!/friends/recommendation/tw/:filter/:page/:limit": "twRecommendation",
        "!/friends/recommendation/tw/:filter/:page/:limit/": "twRecommendation",
        "!/friends/recommendation/tw/:filter/:page/:limit/:display": "twRecommendation",
        "!/friends/recommendation/tw/:filter/:page/:limit/:display/": "twRecommendation",
        "!/friends/recommendation/int": "intIndexAction",
        "!/friends/recommendation/int/": "intIndexAction",
        "!/friends/recommendation/int/:filter": "intRecommendation",
        "!/friends/recommendation/int/:filter/": "intRecommendation",
        "!/friends/recommendation/int/:filter/:page/:limit": "intRecommendation",
        "!/friends/recommendation/int/:filter/:page/:limit/": "intRecommendation",
        "!/friends/recommendation/int/:filter/:page/:limit/:display": "intRecommendation",
        "!/friends/recommendation/int/:filter/:page/:limit/:display/": "intRecommendation"
    },
    friendsLayoutBuilder: function(b) {
        var a = [];
        $.each(Siapku_Bootstrap.widgetsLoaded, function(c, d) {
            if (d != "widget/friends/left-sidebar.html" && d != "widget/dashboard/right-sidebar.html") {} else {
                a.push(d)
            }
        });
        Siapku_Bootstrap.widgetsLoaded = a;
        if (Siapku_Bootstrap.layoutLoaded != "layouts/dashboard.html") {
            $(".js-app-container").empty();
            Siapku_Bootstrap.layoutLoaded = false;
            Siapku_Bootstrap.widgetsLoaded = [];
            Siapku_Utils.doAjax("user/simple-profil", {
                username: "current"
            }, function() {}, function(c) {
                if (!c.error) {
                    Siapku_Interface.loadTemplate("layout/dashboard.html", function(e) {
                        var d = e(c);
                        $(d).hide().appendTo($(".js-app-container")).slideDown("fast");
                        $(d).promise().done(function() {
                            b();
                            $(".app-head-menu ul li").removeClass("on");
                            $(".app-head-menu ul li a[href*=friends]").parent().addClass("on");
                            if ($(".work-sidebar-l").length == 0) {
                                $(".workspc-l .workspc").prepend('<div style="width:140px" class="work-sidebar-l"></div>')
                            }
                        })
                    })
                } else {}
                Siapku_Bootstrap.layoutLoaded = "layouts/dashboard.html"
            }, function() {})
        } else {
            $(".app-head-menu ul li").removeClass("on");
            $(".app-head-menu ul li a[href*=friends]").parent().addClass("on");
            if ($(".work-sidebar-l").length == 0) {
                $(".workspc-l .workspc").prepend('<div style="width:140px" class="work-sidebar-l"></div>')
            }
            b()
        }
    },
    friendsWidgetBuilder: function(a, b) {
        if (true || !_.include(Siapku_Bootstrap.widgetsLoaded, "widget/friends/left-sidebar.html")) {
            Siapku_Interface.loadTemplate("widget/friends/left-sidebar.html", function(d) {
                var c = d({
                    section: a
                });
                $(".work-sidebar-l").empty();
                $(c).hide().appendTo($(".work-sidebar-l")).show();
                $(c).promise().done(function() {
                    Siapku_Bootstrap.widgetsLoaded.push("widget/friends/left-sidebar.html")
                })
            })
        } else {}
        if (!_.include(Siapku_Bootstrap.widgetsLoaded, "widget/dashboard/right-sidebar.html")) {
            $(".js-right-cont").empty();
            Siapku_Utils.doAjax("rss-sekolah/", false, function() {
                loadRightId = Siapku_Interface.showMessage($(".js-right-cont"), "n", "full", "load", "Harap tunggu... ", "")
            }, function(c) {
                if (!c.error) {
                    c.fb_app_id = Siapku_Bootstrap.environment.fb_app_id;
                    Siapku_View_User.rssSekolah($(".js-right-cont"), c, function() {
                        if (typeof loadRightId != "undefined" && loadRightId) {
                            Siapku_Interface.hideMessage(loadRightId, -1);
                            loadRightId = false
                        }
                    })
                }
                Siapku_Bootstrap.widgetsLoaded.push("widget/dashboard/right-sidebar.html")
            }, function() {})
        }
        if (b) {
            b()
        }
    },
    friendsDataBuilder: function(b, e, c, a, d, f) {
        if (b == "fb") {
            e = "fb-" + e;
            Siapku_Utils.doAjax("recommendation/" + e, {
                page: c,
                limit: a
            }, function() {
                $(".work-main").empty();
                dataLoader = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", " Data sedang dimuat", "append")
            }, function(g) {
                Siapku_View_Friends.fbList($(".work-main"), g, e, c, a, d, f)
            }, function() {
                if (typeof dataLoader != "undefined" && dataLoader) {
                    Siapku_Interface.hideMessage(dataLoader, -1);
                    dataLoader = false
                }
            })
        }
        if (b == "tw") {
            e = "tw-" + e;
            Siapku_Utils.doAjax("recommendation/" + e, {
                page: c,
                limit: a
            }, function() {
                $(".work-main").empty();
                dataLoader = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", " Data sedang dimuat", "append")
            }, function(g) {
                Siapku_View_Friends.twList($(".work-main"), g, e, c, a, d, f)
            }, function() {
                if (typeof dataLoader != "undefined" && dataLoader) {
                    Siapku_Interface.hideMessage(dataLoader, -1);
                    dataLoader = false
                }
            })
        }
        if (b == "int") {
            e = "int-" + e;
            Siapku_Utils.doAjax("recommendation/" + e, {
                page: c,
                limit: a
            }, function() {
                $(".work-main").empty();
                dataLoader = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", " Data sedang dimuat", "append")
            }, function(g) {
                Siapku_View_Friends.intList($(".work-main"), g, e, c, a, d, f)
            }, function() {
                if (typeof dataLoader != "undefined" && dataLoader) {
                    Siapku_Interface.hideMessage(dataLoader, -1);
                    dataLoader = false
                }
            })
        }
        if (b == "followers") {
            e = "followers-";
            Siapku_Utils.doAjax("user/followers", {
                username: "current",
                page: c,
                limit: a
            }, function() {
                $(".work-main").empty();
                dataLoader = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", " Data sedang dimuat", "append")
            }, function(g) {
                Siapku_View_Friends.followers($(".work-main"), g, e, c, a, d, f)
            }, function() {
                if (typeof dataLoader != "undefined" && dataLoader) {
                    Siapku_Interface.hideMessage(dataLoader, -1);
                    dataLoader = false
                }
            })
        }
        if (b == "followed") {
            e = "followed-";
            Siapku_Utils.doAjax("user/followed", {
                username: "current",
                page: c,
                limit: a
            }, function() {
                $(".work-main").empty();
                dataLoader = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", " Data sedang dimuat", "append")
            }, function(g) {
                Siapku_View_Friends.followed($(".work-main"), g, e, c, a, d, f)
            }, function() {
                if (typeof dataLoader != "undefined" && dataLoader) {
                    Siapku_Interface.hideMessage(dataLoader, -1);
                    dataLoader = false
                }
            })
        }
    },
    followersAction: function(c, a, d) {
        if (!Siapku_Utils.denyNoLogin()) {
            return false
        }
        document.title = "Komunitas \u00bb Pertemanan";
        if (!c) {
            c = 1
        }
        if (!a) {
            a = 20
        }
        if (!d) {
            d = "thumb"
        }
        var b = this;
        this.friendsLayoutBuilder(function() {
            b.friendsDataBuilder("followers", false, c, a, d, function() {
                b.friendsWidgetBuilder("followers-", false)
            })
        })
    },
    followedAction: function(c, a, d) {
        if (!Siapku_Utils.denyNoLogin()) {
            return false
        }
        document.title = "Komunitas \u00bb Pertemanan";
        if (!c) {
            c = 1
        }
        if (!a) {
            a = 20
        }
        if (!d) {
            d = "thumb"
        }
        var b = this;
        this.friendsLayoutBuilder(function() {
            b.friendsDataBuilder("followed", false, c, a, d, function() {
                b.friendsWidgetBuilder("followed-", false)
            })
        })
    },
    fbIndexAction: function() {
        this.fbRecommendation("fb-not-followed", 1, 20, "thumb")
    },
    twIndexAction: function() {
        this.twRecommendation("tw-not-followed", 1, 20, "thumb")
    },
    intIndexAction: function() {
        this.intRecommendation("int-not-followed", 1, 20, "thumb")
    },
    fbRecommendation: function(c, d, a, e) {
        if (!Siapku_Utils.denyNoLogin()) {
            return false
        }
        document.title = "Komunitas \u00bb Rekomendasi Facebook";
        if (!_.include(["followed", "not-joined", "not-followed"], c)) {
            c = "not-followed"
        }
        if (!d) {
            d = 1
        }
        if (!a) {
            a = 20
        }
        if (!e) {
            e = "thumb"
        }
        var b = this;
        this.friendsLayoutBuilder(function() {
            b.friendsDataBuilder("fb", c, d, a, e, function() {
                b.friendsWidgetBuilder("fb-" + c, false)
            })
        })
    },
    twRecommendation: function(c, d, a, e) {
        if (!Siapku_Utils.denyNoLogin()) {
            return false
        }
        document.title = "Komunitas \u00bb Rekomendasi Twitter";
        if (!_.include(["followed", "not-joined", "not-followed"], c)) {
            c = "not-followed"
        }
        if (!d) {
            d = 1
        }
        if (!a) {
            a = 20
        }
        if (!e) {
            e = "thumb"
        }
        var b = this;
        this.friendsLayoutBuilder(function() {
            b.friendsDataBuilder("tw", c, d, a, e, function() {
                b.friendsWidgetBuilder("tw-" + c, false)
            })
        })
    },
    intRecommendation: function(c, d, a, e) {
        if (!Siapku_Utils.denyNoLogin()) {
            return false
        }
        document.title = "Komunitas \u00bb Rekomendasi SIAPKu";
        if (!_.include(["not-followed"], c)) {
            c = "not-followed"
        }
        if (!d) {
            d = 1
        }
        if (!a) {
            a = 20
        }
        if (!e) {
            e = "thumb"
        }
        var b = this;
        this.friendsLayoutBuilder(function() {
            b.friendsDataBuilder("int", c, d, a, e, function() {
                b.friendsWidgetBuilder("int-" + c, false)
            })
        })
    }
};
var Siapku_Router_Friends = Backbone.Router.extend(Siapku_Controller_Friends);
var Siapku_Controller_Trend = {
    routes: {
        "!/trend": "trendAction",
        "!/trend/": "trendAction"
    },
    trendLayoutBuilder: function(b) {
        var a = [];
        $.each(Siapku_Bootstrap.widgetsLoaded, function(c, d) {
            if (d != "widget/trend/left-sidebar.html" && d != "widget/dashboard/right-sidebar.html") {} else {
                a.push(d)
            }
        });
        Siapku_Bootstrap.widgetsLoaded = a;
        if (Siapku_Bootstrap.layoutLoaded != "layouts/dashboard.html") {
            $(".js-app-container").empty();
            Siapku_Bootstrap.layoutLoaded = false;
            Siapku_Bootstrap.widgetsLoaded = [];
            Siapku_Utils.doAjax("user/simple-profil", {
                username: "current"
            }, function() {}, function(c) {
                if (!c.error) {
                    Siapku_Interface.loadTemplate("layout/dashboard.html", function(e) {
                        var d = e(c);
                        $(d).hide().appendTo($(".js-app-container")).slideDown("fast");
                        $(d).promise().done(function() {
                            if ($(".work-sidebar-l").length > 0) {
                                $(".work-sidebar-l").remove()
                            }
                            b();
                            $(".app-head-menu ul li").removeClass("on");
                            $(".app-head-menu ul li a[href*=trend]").parent().addClass("on")
                        })
                    })
                } else {}
                Siapku_Bootstrap.layoutLoaded = "layouts/dashboard.html"
            }, function() {})
        } else {
            $(".app-head-menu ul li").removeClass("on");
            $(".app-head-menu ul li a[href*=trend]").parent().addClass("on");
            if ($(".work-sidebar-l").length > 0) {
                $(".work-sidebar-l").remove()
            }
            b()
        }
    },
    trendDataBuilder: function(b) {
        $(".work-main").empty();
        var a = '<div><div class="feed-popular fl js-main-left" style="width:347px; margin-right:15px"></div><div class="feed-popular fl js-main-mid" style="width:347px; margin-right:15px"></div><div class="fl js-main-right" style="width:300px"><div class="section half fl js-main-right-user"></div><div class="half fl js-main-right-group"></div></div></div>';
        $(".work-main").append(a);
        $(a).promise().done(function() {
            Siapku_Utils.doAjax("trend/post-most-comment", {
                page: 1,
                limit: 5
            }, function() {
                loadMainLeftId = Siapku_Interface.showMessage($(".js-main-left"), "n", "full", "load", "Harap tunggu... ", "")
            }, function(c) {
                Siapku_View_Trend.postMostComment($(".js-main-left"), c, function() {
                    if (typeof loadMainLeftId != "undefined" && loadMainLeftId) {
                        Siapku_Interface.hideMessage(loadMainLeftId, -1);
                        loadMainLeftId = false
                    }
                    Siapku_Utils.doAjax("trend/post-most-new", {
                        page: 1,
                        limit: 5
                    }, function() {
                        loadMainLeftId = Siapku_Interface.showMessage($(".js-main-left"), "n", "full", "load", "Harap tunggu... ", "")
                    }, function(d) {
                        Siapku_View_Trend.postMostNew($(".js-main-left"), d, function() {
                            if (typeof loadMainLeftId != "undefined" && loadMainLeftId) {
                                Siapku_Interface.hideMessage(loadMainLeftId, -1);
                                loadMainLeftId = false
                            }
                        })
                    }, function() {})
                })
            }, function() {});
            Siapku_Utils.doAjax("trend/post-most-fav", {
                page: 1,
                limit: 5
            }, function() {
                loadMainMidId = Siapku_Interface.showMessage($(".js-main-mid"), "n", "full", "load", "Harap tunggu... ", "")
            }, function(c) {
                Siapku_View_Trend.postMostFav($(".js-main-mid"), c, function() {
                    if (typeof loadMainMidId != "undefined" && loadMainMidId) {
                        Siapku_Interface.hideMessage(loadMainMidId, -1);
                        loadMainMidId = false
                    }
                })
            }, function() {});
            Siapku_Utils.doAjax("trend/user-most-followed", {
                page: 1,
                limit: 12
            }, function() {
                loadMainRightUserId = Siapku_Interface.showMessage($(".js-main-right-user"), "n", "full", "load", "Harap tunggu... ", "")
            }, function(c) {
                Siapku_View_Trend.userMostFollowed($(".js-main-right-user"), c, function() {
                    if (typeof loadMainRightUserId != "undefined" && loadMainRightUserId) {
                        Siapku_Interface.hideMessage(loadMainRightUserId, -1);
                        loadMainRightUserId = false
                    }
                    Siapku_Utils.doAjax("trend/user-most-post", {
                        page: 1,
                        limit: 12
                    }, function() {
                        loadMainRightUserId = Siapku_Interface.showMessage($(".js-trend-anggota-content"), "n", "full", "load", "Harap tunggu... ", "")
                    }, function(d) {
                        Siapku_View_Trend.userMostPost($(".js-trend-anggota-content"), d, function() {
                            if (typeof loadMainRightUserId != "undefined" && loadMainRightUserId) {
                                Siapku_Interface.hideMessage(loadMainRightUserId, -1);
                                loadMainRightUserId = false
                            }
                            Siapku_Utils.doAjax("trend/user-most-comment", {
                                page: 1,
                                limit: 12
                            }, function() {
                                loadMainRightUserId = Siapku_Interface.showMessage($(".js-trend-anggota-content"), "n", "full", "load", "Harap tunggu... ", "")
                            }, function(e) {
                                Siapku_View_Trend.userMostComment($(".js-trend-anggota-content"), e, function() {
                                    if (typeof loadMainRightUserId != "undefined" && loadMainRightUserId) {
                                        Siapku_Interface.hideMessage(loadMainRightUserId, -1);
                                        loadMainRightUserId = false
                                    }
                                    Siapku_Utils.doAjax("trend/user-most-new", {
                                        page: 1,
                                        limit: 12
                                    }, function() {
                                        loadMainRightUserId = Siapku_Interface.showMessage($(".js-trend-anggota-content"), "n", "full", "load", "Harap tunggu... ", "")
                                    }, function(f) {
                                        Siapku_View_Trend.userMostNew($(".js-trend-anggota-content"), f, function() {
                                            if (typeof loadMainRightUserId != "undefined" && loadMainRightUserId) {
                                                Siapku_Interface.hideMessage(loadMainRightUserId, -1);
                                                loadMainRightUserId = false
                                            }
                                        })
                                    }, function() {})
                                })
                            }, function() {})
                        })
                    }, function() {})
                })
            }, function() {});
            Siapku_Utils.doAjax("trend/group-most-member", {
                page: 1,
                limit: 12
            }, function() {
                loadMainRightGroupId = Siapku_Interface.showMessage($(".js-main-right-group"), "n", "full", "load", "Harap tunggu... ", "")
            }, function(c) {
                Siapku_View_Trend.groupMostMember($(".js-main-right-group"), c, function() {
                    if (typeof loadMainRightGroupId != "undefined" && loadMainRightGroupId) {
                        Siapku_Interface.hideMessage(loadMainRightGroupId, -1);
                        loadMainRightGroupId = false
                    }
                    Siapku_Utils.doAjax("trend/group-most-post", {
                        page: 1,
                        limit: 12
                    }, function() {
                        loadMainRightGroupId = Siapku_Interface.showMessage($(".js-trend-group-content"), "n", "full", "load", "Harap tunggu... ", "")
                    }, function(d) {
                        Siapku_View_Trend.groupMostPost($(".js-trend-group-content"), d, function() {
                            if (typeof loadMainRightGroupId != "undefined" && loadMainRightGroupId) {
                                Siapku_Interface.hideMessage(loadMainRightGroupId, -1);
                                loadMainRightGroupId = false
                            }
                            Siapku_Utils.doAjax("trend/group-most-new", {
                                page: 1,
                                limit: 12
                            }, function() {
                                loadMainRightGroupId = Siapku_Interface.showMessage($(".js-trend-group-content"), "n", "full", "load", "Harap tunggu... ", "")
                            }, function(e) {
                                Siapku_View_Trend.groupMostNew($(".js-trend-group-content"), e, function() {
                                    if (typeof loadMainRightGroupId != "undefined" && loadMainRightGroupId) {
                                        Siapku_Interface.hideMessage(loadMainRightGroupId, -1);
                                        loadMainRightGroupId = false
                                    }
                                })
                            }, function() {})
                        })
                    }, function() {})
                })
            }, function() {})
        })
    },
    trendWidgetBuilder: function(a) {
        Siapku_Bootstrap.widgetsLoaded.push("widget/trend/left-sidebar.html");
        if (!_.include(Siapku_Bootstrap.widgetsLoaded, "widget/dashboard/right-sidebar.html")) {
            $(".js-right-cont").empty();
            Siapku_Utils.doAjax("rss-sekolah/", false, function() {
                loadRightId = Siapku_Interface.showMessage($(".js-right-cont"), "n", "full", "load", "Harap tunggu... ", "")
            }, function(b) {
                if (!b.error) {
                    b.fb_app_id = Siapku_Bootstrap.environment.fb_app_id;
                    Siapku_View_User.rssSekolah($(".js-right-cont"), b, function() {
                        if (typeof loadRightId != "undefined" && loadRightId) {
                            Siapku_Interface.hideMessage(loadRightId, -1);
                            loadRightId = false
                        }
                    })
                }
                Siapku_Bootstrap.widgetsLoaded.push("widget/dashboard/right-sidebar.html")
            }, function() {})
        }
        if (a) {
            a()
        }
    },
    trendAction: function() {
        if (!Siapku_Utils.denyNoLogin()) {
            return false
        }
        document.title = "Komunitas \u00bb Terpopuler";
        var a = this;
        this.trendLayoutBuilder(function() {
            a.trendWidgetBuilder(function() {
                a.trendDataBuilder(false)
            })
        })
    }
};
var Siapku_Router_Trend = Backbone.Router.extend(Siapku_Controller_Trend);
var Siapku_Controller_Admin = {
    currentUsername: false,
    routes: {
        "!/admin": "indexAction",
        "!/admin/": "indexAction",
        "!/admin/reports": "reportsAction",
        "!/admin/reports/": "reportsAction",
        "!/admin/reports/:page/:limit": "reportsAction",
        "!/admin/reports/:page/:limit/": "reportsAction"
    },
    adminLayoutBuilder: function(b) {
        var a = [];
        $.each(Siapku_Bootstrap.widgetsLoaded, function(c, d) {
            if (d != "widget/dashboard/left-sidebar.html" && d != "widget/dashboard/right-sidebar.html") {} else {
                a.push(d)
            }
        });
        Siapku_Bootstrap.widgetsLoaded = a;
        if (Siapku_Bootstrap.layoutLoaded != "layouts/admin.html") {
            $(".js-app-container").empty();
            Siapku_Bootstrap.layoutLoaded = false;
            Siapku_Bootstrap.widgetsLoaded = [];
            Siapku_Utils.doAjax("user/simple-profil", {
                username: "current"
            }, function() {}, function(c) {
                if (!c.error) {
                    Siapku_Interface.loadTemplate("layout/admin.html", function(e) {
                        var d = e(c);
                        $(d).hide().appendTo($(".js-app-container")).slideDown("fast");
                        $(d).promise().done(function() {
                            b();
                            $(".app-head-menu ul li").removeClass("on");
                            $(".app-head-menu ul li a[href*=admin]").parent().addClass("on");
                            if ($(".work-sidebar-l").length == 0) {
                                $(".workspc-l .workspc").prepend('<div style="width:140px" class="work-sidebar-l"></div>')
                            }
                        })
                    })
                } else {}
                Siapku_Bootstrap.layoutLoaded = "layouts/admin.html"
            }, function() {})
        } else {
            $(".app-head-menu ul li").removeClass("on");
            $(".app-head-menu ul li a[href*=admin]").parent().addClass("on");
            if ($(".work-sidebar-l").length == 0) {
                $(".workspc-l .workspc").prepend('<div style="width:140px" class="work-sidebar-l"></div>')
            }
            b()
        }
    },
    adminWidgetBuilder: function(a, b) {
        if (!_.include(Siapku_Bootstrap.widgetsLoaded, "widget/admin/left-sidebar.html")) {
            $(".work-sidebar-l").empty();
            Siapku_View_Admin.left($(".work-sidebar-l"), {
                section: a
            })
        } else {}
        if (!_.include(Siapku_Bootstrap.widgetsLoaded, "widget/admin/right-sidebar.html")) {
            $(".js-right-cont").empty();
            Siapku_Utils.doAjax("rss-sekolah/", false, function() {
                loadRightId = Siapku_Interface.showMessage($(".js-right-cont"), "n", "full", "load", "Harap tunggu... ", "")
            }, function(c) {
                if (!c.error) {
                    c.fb_app_id = Siapku_Bootstrap.environment.fb_app_id;
                    Siapku_View_User.rssSekolah($(".js-right-cont"), c, function() {
                        if (typeof loadRightId != "undefined" && loadRightId) {
                            Siapku_Interface.hideMessage(loadRightId, -1);
                            loadRightId = false
                        }
                    })
                }
                Siapku_Bootstrap.widgetsLoaded.push("widget/admin/right-sidebar.html")
            }, function() {})
        }
        b()
    },
    indexAction: function() {
        $("#global-header .js-komunitas-dasbor").addClass("selected");
        $("#global-header .js-komunitas-menu").removeClass("selected");
        if (!Siapku_Utils.denyNoLogin()) {
            return false
        }
        if (Siapku_Bootstrap.siapkuUser.is_network_admin == 0) {
            Backbone.history.loadUrl("!/dashboard")
        }
        document.title = "Komunitas \u00bb Pengelolaan";
        var a = this;
        this.adminLayoutBuilder(function() {
            a.adminWidgetBuilder("statistic", function() {
                $(".work-main").empty();
                Siapku_View_Admin.statistic($(".work-main"), {})
            })
        })
    },
    reportsAction: function(c, a) {
        $("#global-header .js-komunitas-dasbor").addClass("selected");
        $("#global-header .js-komunitas-menu").removeClass("selected");
        if (!Siapku_Utils.denyNoLogin()) {
            return false
        }
        if (Siapku_Bootstrap.siapkuUser.is_network_admin == 0) {
            Backbone.history.loadUrl("!/dashboard")
        }
        document.title = "Komunitas \u00bb Pengelolaan Pelaporan";
        $(".work-main").empty();
        var b = this;
        this.adminLayoutBuilder(function() {
            b.adminWidgetBuilder("report", function() {
                Siapku_Utils.doAjax("report/lists", {
                    page: c,
                    limit: a,
                    type: ["post", "comment"],
                    is_ignored: 0,
                    is_finished: 0
                }, function() {
                    loadReportsId = Siapku_Interface.showMessage($(".work-main"), "n", "full", "load", "Harap tunggu... ", "Data sedang dimuat", "prepend")
                }, function(d) {
                    Siapku_View_Admin.reports($(".work-main"), d, function() {
                        if (d.reports) {
                            var e = {};
                            e.page = d.reports.page;
                            e.pages = d.reports.pages;
                            e.limit = d.reports.limit;
                            e.limiter = [10, 20, 50];
                            e.pagerId = "_admin_reports_";
                            Siapku_Interface.generatePagingWithRoute("/#!/admin/reports", e, function(f) {
                                $(f).appendTo(".js-admin-reports-container")
                            });
                            $(".app-menu2.app-head-menu ul li").removeClass("on");
                            $(".js-group-members").addClass("on")
                        }
                    })
                }, function() {
                    if (typeof loadReportsId != "undefined" && loadReportsId) {
                        Siapku_Interface.hideMessage(loadReportsId, -1);
                        loadReportsId = false
                    }
                })
            })
        })
    }
};
var Siapku_Router_Admin = Backbone.Router.extend(Siapku_Controller_Admin);
var Siapku_Bootstrap = {
    isLogged: false,
    userId: false,
    siapkuUser: false,
    pasporUser: false,
    environment: false,
    appError: false,
    layoutLoaded: false,
    sharer: false,
    siapkuUrl: false,
    userAvatar: false,
    widgetsLoaded: Array(),
    environmentLoader: false,
    environmentLoader: function(b) {
        var a = b;
        $.ajax({
            type: "POST",
            url: "/environment",
            dataType: "json",
            data: [],
            success: function(c) {
                if (!c.error) {
                    Siapku_Bootstrap.environment = c;
                    if (c.is_logged) {
                        Siapku_Bootstrap.isLogged = true;
                        Siapku_Bootstrap.siapkuUser = c.siapku_user;
                        Siapku_Bootstrap.pasporUser = c.paspor_user;
                        Siapku_Bootstrap.userId = c.authed_user;
                        Siapku_Bootstrap.sharer = c.sharer;
                        Siapku_Bootstrap.siapkuUrl = c.url;
                        Siapku_Bootstrap.userAvatar = c.user_avatar
                    } else {
                        Siapku_Bootstrap.isLogged = false;
                        Siapku_Bootstrap.userId = false;
                        Siapku_Bootstrap.siapkuUser = false;
                        Siapku_Bootstrap.pasporUser = false
                    }
                    if (Siapku_Bootstrap.siapkuUser.active == 0 && window.location.hash != "#!/inactive") {
                        window.location.hash = "!/inactive/"
                    }
                } else {
                    Siapku_Bootstrap.appError = true
                }
            },
            beforeSend: function(d, c) {
                $.xhrPool.push(d)
            },
            complete: function(d, c) {
                $.xhrPool.pop();
                a()
            }
        })
    },
    reloadEnvironment: function(c) {
        var b = c;
        var a = document.createElement("IFRAME");
        a.style.width = 640 + "px";
        a.style.height = 480 + "px";
        a.style.display = "none";
        a.allowTransparency = "true";
        a.id = "environment-iframe";
        a.src = "/environment?upload_ajax=true";
        document.body.appendChild(a);
        $("#environment-iframe").load(function() {
            var d = JSON.parse($("body textarea", this.contentWindow.document).html());
            if (!d.error) {
                Siapku_Bootstrap.environment = d;
                if (d.is_logged) {
                    Siapku_Bootstrap.isLogged = true;
                    Siapku_Bootstrap.siapkuUser = d.siapku_user;
                    Siapku_Bootstrap.pasporUser = d.paspor_user;
                    Siapku_Bootstrap.userId = d.authed_user;
                    Siapku_Bootstrap.sharer = d.sharer;
                    Siapku_Bootstrap.siapkuUrl = d.url;
                    Siapku_Bootstrap.userAvatar = d.user_avatar
                } else {
                    Siapku_Bootstrap.isLogged = false;
                    Siapku_Bootstrap.userId = false;
                    Siapku_Bootstrap.siapkuUser = false;
                    Siapku_Bootstrap.pasporUser = false
                }
            } else {
                Siapku_Bootstrap.appError = true
            }
            setTimeout(function() {
                $("#environment-iframe").remove();
                b()
            }, 50)
        })
    }
};
var Siapku_Utils = {
    userCard: function(m, d, n) {
        var j = "modalcardhov_" + m;
        var h = $("#" + j);
        if ($(d).length != -1 && $(d).is(":visible") && $(h).length > 0 && false) {
            h.css({
                top: 0,
                left: 0
            });
            var i = h.outerWidth(true);
            var c = $(d).outerWidth();
            var l = $(d).innerHeight();
            var b = $(d).offset().left;
            var a = $(d).offset().top;
            var g = (b >= $("body").innerWidth() - i) ? true: false;
            var f = b - (g ? (i - c - 11) + (h.is(".sdw") ? 3: 0) : 11);
            var k = (i < c ? i - 20: c);
            if (k < 15) {
                k = 15
            }
            var e = a + l + 8;
            h.find(".point").css({
                width: k,
                height: 9,
                top: -9
            });
            if (g) {
                h.find(".point").css({
                    left: "",
                    right: 10
                })
            } else {
                h.find(".point").css({
                    left: 10,
                    right: ""
                })
            }
            h.css({
                top: e,
                left: f
            });
            h.show();
            h.css({
                display: "block"
            })
        } else {
            if ($(d).length != -1 && $(d).is(":visible")) {
                n.loadTemplate("modal/card.html", function(z) {
                    var q = z({
                        modaltipId: j
                    });
                    $("body").append($(q));
                    var v = $("#" + j);
                    v.css({
                        top: 0,
                        left: 0
                    });
                    var w = v.outerWidth(true);
                    var r = $(d).outerWidth();
                    var y = $(d).innerHeight();
                    var p = $(d).offset().left;
                    var o = $(d).offset().top;
                    var u = (p >= $("body").innerWidth() - w) ? true: false;
                    var t = p - (u ? (w - r - 11) + (v.is(".sdw") ? 3: 0) : 11);
                    var x = (w < r ? w - 20: r);
                    if (x < 15) {
                        x = 15
                    }
                    var s = o + y + 8;
                    v.find(".point").css({
                        width: x,
                        height: 9,
                        top: -9
                    });
                    if (u) {
                        v.find(".point").css({
                            left: "",
                            right: 10
                        })
                    } else {
                        v.find(".point").css({
                            left: 10,
                            right: ""
                        })
                    }
                    v.css({
                        top: s,
                        left: t
                    });
                    v.show();
                    v.css({
                        display: "block"
                    });
                    v.promise().done(function() {
                        v.css({
                            "padding-left": "10px",
                            "padding-right": "10px",
                            "padding-top": "10px"
                        });
                        var A = false;
                        if ($(d).length != -1 && $(d).is(":visible")) {
                            Siapku_Utils.doAjax("/user/detail", {
                                user_id: m
                            }, function() {
                                if (typeof A != "undefined" && A) {
                                    n.hideMessage(A, -1);
                                    A = false
                                }
                            }, function(B) {
                                if (!B.error) {
                                    v.css({
                                        padding: "0px"
                                    });
                                    B.STATIK_IMG_PATH = Siapku_Interface.statikUrl + Siapku_Interface.statikPath + "/" + Siapku_Interface.statikVersion + "/img/";
                                    Siapku_View_User.card(v, B)
                                } else {
                                    n = Siapku_Interface.showMessage(v, "n", "full", "err", "Maaf, ", B.desc, "append")
                                }
                            }, function() {
                                if ($(d).length == -1 || !$(d).is(":visible")) {
                                    $(v).remove()
                                }
                            })
                        }
                    })
                })
            }
        }
    },
    groupCard: function(m, d, n) {
        var j = "modalcardhovgroup_" + m;
        var h = $("#" + j);
        if ($(d).length != -1 && $(d).is(":visible") && $(h).length > 0 && false) {
            h.css({
                top: 0,
                left: 0
            });
            var i = h.outerWidth(true);
            var c = $(d).outerWidth();
            var l = $(d).innerHeight();
            var b = $(d).offset().left;
            var a = $(d).offset().top;
            var g = (b >= $("body").innerWidth() - i) ? true: false;
            var f = b - (g ? (i - c - 11) + (h.is(".sdw") ? 3: 0) : 11);
            var k = (i < c ? i - 20: c);
            if (k < 15) {
                k = 15
            }
            var e = a + l + 8;
            h.find(".point").css({
                width: k,
                height: 9,
                top: -9
            });
            if (g) {
                h.find(".point").css({
                    left: "",
                    right: 10
                })
            } else {
                h.find(".point").css({
                    left: 10,
                    right: ""
                })
            }
            h.css({
                top: e,
                left: f
            });
            h.show();
            h.css({
                display: "block"
            })
        } else {
            if ($(d).length != -1 && $(d).is(":visible")) {
                n.loadTemplate("modal/card.html", function(z) {
                    var q = z({
                        modaltipId: j
                    });
                    $("body").append($(q));
                    var v = $("#" + j);
                    v.css({
                        top: 0,
                        left: 0
                    });
                    var w = v.outerWidth(true);
                    var r = $(d).outerWidth();
                    var y = $(d).innerHeight();
                    var p = $(d).offset().left;
                    var o = $(d).offset().top;
                    var u = (p >= $("body").innerWidth() - w) ? true: false;
                    var t = p - (u ? (w - r - 11) + (v.is(".sdw") ? 3: 0) : 11);
                    var x = (w < r ? w - 20: r);
                    if (x < 15) {
                        x = 15
                    }
                    var s = o + y + 8;
                    v.find(".point").css({
                        width: x,
                        height: 9,
                        top: -9
                    });
                    if (u) {
                        v.find(".point").css({
                            left: "",
                            right: 10
                        })
                    } else {
                        v.find(".point").css({
                            left: 10,
                            right: ""
                        })
                    }
                    v.css({
                        top: s,
                        left: t
                    });
                    v.show();
                    v.css({
                        display: "block"
                    });
                    v.promise().done(function() {
                        v.css({
                            "padding-left": "10px",
                            "padding-right": "10px",
                            "padding-top": "10px"
                        });
                        var A = false;
                        if ($(d).length != -1 && $(d).is(":visible")) {
                            Siapku_Utils.doAjax("/group/detail", {
                                group_id: m
                            }, function() {
                                if (typeof A != "undefined" && A) {
                                    n.hideMessage(A, -1);
                                    A = false
                                }
                            }, function(B) {
                                if (!B.error) {
                                    v.css({
                                        padding: "0px"
                                    });
                                    B.STATIK_IMG_PATH = Siapku_Interface.statikUrl + Siapku_Interface.statikPath + "/" + Siapku_Interface.statikVersion + "/img/";
                                    Siapku_View_Group.card(v, B)
                                } else {
                                    n = Siapku_Interface.showMessage(v, "n", "full", "err", "Maaf, ", B.desc, "append")
                                }
                            }, function() {
                                if ($(d).length == -1 || !$(d).is(":visible")) {
                                    $(v).remove()
                                }
                            })
                        }
                    })
                })
            }
        }
    },
    modalRelationUser: function(a, b, d) {
        $("body").css({
            overflow: "hidden"
        });
        d.loadTemplate("modal/custom.html", function(e) {
            e = e({
                title: "Relasi Pengguna",
                desc: false,
                modalId: "_relation_" + a,
                width: "600px",
                widthCont: "580px",
                content: ""
            });
            $(e).hide().appendTo("body").fadeIn("fast");
            $("#modal_custom_relation_" + a).promise().done(function() {
                Siapku_Utils.doAjax("/user/relation", {
                    user_id: a
                }, function() {
                    if (typeof userRelationErrId != "undefined" && userRelationErrId) {
                        d.hideMessage(userRelationErrId, -1);
                        userRelationErrId = false
                    }
                    userRelationLoad = d.showMessage($(".js-modal-content"), "n", "full", "load", "Harap tunggu... ", " Data sedang dimuat", "prepend")
                }, function(f) {
                    if (f.error) {
                        userRelationErrId = d.showMessage($(".js-modal-content"), "n", "full", "err", "Maaf, ", f.desc, "prepend")
                    } else {
                        d.loadTemplate("user/relation.html", function(g) {
                            relationTemplate = g(f);
                            f.pagerId = "_relation_" + a;
                            f.limiter = [5, 10, 20];
                            d.generatePagingNonRoute(f, function(h) {
                                relationTemplate += h;
                                $(relationTemplate).appendTo(".js-modal-content");
                                $(relationTemplate).promise().done(function() {
                                    $(".direktori-thumb").filter(":visible").siapListClearFix(">li")
                                })
                            })
                        })
                    }
                }, function() {
                    if (typeof userRelationLoad != "undefined" && userRelationLoad) {
                        d.hideMessage(userRelationLoad, -1);
                        userRelationLoad = false
                    }
                })
            })
        });
        $("#pager_limiter_relation_" + a + " ul li a").die().live("click", function(i) {
            i.preventDefault();
            var h = 1;
            var g = $(this).attr("rel");
            var f = $("#modal_custom_relation_" + a).find(".js-switch-display-type").find(".on").attr("rel");
            c(a, h, g, f)
        });
        $("#pager_page_relation_" + a + " ul li a").die().live("click", function(i) {
            i.preventDefault();
            var g = $("#pager_limiter_relation_" + a + " ul li[class=on] a").attr("rel");
            var h = $(this).attr("rel");
            var f = $("#modal_custom_relation_" + a).find(".js-switch-display-type").find(".on").attr("rel");
            c(a, h, g, f)
        });
        $("#pager_relation_" + a + " .nav-group .nav .next").die().live("click", function(i) {
            i.preventDefault();
            var g = $("#pager_limiter_relation_" + a + " ul li[class=on] a").attr("rel");
            var h = $("#pager_page_relation_" + a + " ul li[class=on] a").attr("rel");
            var f = $("#modal_custom_relation_" + a).find(".js-switch-display-type").find(".on").attr("rel");
            c(a, parseInt(h) + 1, g, f)
        });
        $("#pager_relation_" + a + " .nav-group .nav .prev").die().live("click", function(i) {
            i.preventDefault();
            var g = $("#pager_limiter_relation_" + a + " ul li[class=on] a").attr("rel");
            var h = $("#pager_page_relation_" + a + " ul li[class=on] a").attr("rel");
            var f = $("#modal_custom_relation_" + a).find(".js-switch-display-type").find(".on").attr("rel");
            c(a, parseInt(h) - 1, g, f)
        });
        function c(g, h, f, e) {
            $(".js-modal-content").empty();
            Siapku_Utils.doAjax("/user/relation", {
                user_id: g,
                page: h,
                limit: f
            }, function() {
                if (typeof userRelationErrId != "undefined" && userRelationErrId) {
                    d.hideMessage(userRelationErrId, -1);
                    userRelationErrId = false
                }
                userRelationLoad = d.showMessage($(".js-modal-content"), "n", "full", "load", "Harap tunggu... ", " Data sedang dimuat", "prepend")
            }, function(i) {
                if (i.error) {
                    userRelationErrId = d.showMessage($(".js-modal-content"), "n", "full", "err", "Maaf, ", i.desc, "prepend")
                } else {
                    d.loadTemplate("user/relation.html", function(j) {
                        i.displayTipe = e;
                        relationTemplate = j(i);
                        i.pagerId = "_relation_" + g;
                        i.limiter = [5, 10, 20];
                        d.generatePagingNonRoute(i, function(k) {
                            relationTemplate += k;
                            $(relationTemplate).appendTo(".js-modal-content");
                            $(relationTemplate).promise().done(function() {
                                $(".direktori-thumb").filter(":visible").siapListClearFix(">li")
                            })
                        })
                    })
                }
            }, function() {
                if (typeof userRelationLoad != "undefined" && userRelationLoad) {
                    d.hideMessage(userRelationLoad, -1);
                    userRelationLoad = false
                }
            })
        }
    },
    modalRelationUserOnGroup: function(b, a, d) {
        $("body").css({
            overflow: "hidden"
        });
        d.loadTemplate("modal/custom.html", function(e) {
            e = e({
                title: "Relasi Pengguna dengan Komunitas",
                desc: false,
                modalId: "_relation_group_" + b,
                width: "600px",
                widthCont: "580px",
                content: ""
            });
            $(e).hide().appendTo("body").fadeIn("fast");
            $("#modal_custom_relation_group_" + b).promise().done(function() {
                Siapku_Utils.doAjax("/user/relation-on-group", {
                    group_id: b
                }, function() {
                    if (typeof userRelationErrId != "undefined" && userRelationErrId) {
                        d.hideMessage(userRelationErrId, -1);
                        userRelationErrId = false
                    }
                    userRelationLoad = d.showMessage($(".js-modal-content"), "n", "full", "load", "Harap tunggu... ", " Data sedang dimuat", "prepend")
                }, function(f) {
                    if (f.error) {
                        userRelationErrId = d.showMessage($(".js-modal-content"), "n", "full", "err", "Maaf, ", f.desc, "prepend")
                    } else {
                        d.loadTemplate("user/relation.html", function(g) {
                            relationTemplate = g(f);
                            f.pagerId = "_relation_group_" + b;
                            f.limiter = [5, 10, 20];
                            d.generatePagingNonRoute(f, function(h) {
                                relationTemplate += h;
                                $(relationTemplate).appendTo(".js-modal-content");
                                $(relationTemplate).promise().done(function() {
                                    $(".direktori-thumb").filter(":visible").siapListClearFix(">li")
                                })
                            })
                        })
                    }
                }, function() {
                    if (typeof userRelationLoad != "undefined" && userRelationLoad) {
                        d.hideMessage(userRelationLoad, -1);
                        userRelationLoad = false
                    }
                })
            })
        });
        $("#pager_limiter_relation_group_" + b + " ul li a").die().live("click", function(i) {
            i.preventDefault();
            var h = 1;
            var g = $(this).attr("rel");
            var f = $("#modal_custom_relation_group_" + b).find(".js-switch-display-type").find(".on").attr("rel");
            c(b, h, g, f)
        });
        $("#pager_page_relation_group_" + b + " ul li a").die().live("click", function(i) {
            i.preventDefault();
            var g = $("#pager_limiter_relation_group_" + b + " ul li[class=on] a").attr("rel");
            var h = $(this).attr("rel");
            var f = $("#modal_custom_relation_group_" + b).find(".js-switch-display-type").find(".on").attr("rel");
            c(b, h, g, f)
        });
        $("#pager_relation_group_" + b + " .nav-group .nav .next").die().live("click", function(i) {
            i.preventDefault();
            var g = $("#pager_limiter_relation_group_" + b + " ul li[class=on] a").attr("rel");
            var h = $("#pager_page_relation_group_" + b + " ul li[class=on] a").attr("rel");
            var f = $("#modal_custom_relation_group_" + b).find(".js-switch-display-type").find(".on").attr("rel");
            c(b, parseInt(h) + 1, g, f)
        });
        $("#pager_relation_group_" + b + " .nav-group .nav .prev").die().live("click", function(i) {
            i.preventDefault();
            var g = $("#pager_limiter_relation_group_" + b + " ul li[class=on] a").attr("rel");
            var h = $("#pager_page_relation_group_" + b + " ul li[class=on] a").attr("rel");
            var f = $("#modal_custom_relation_group_" + b).find(".js-switch-display-type").find(".on").attr("rel");
            c(b, parseInt(h) - 1, g, f)
        });
        function c(g, h, f, e) {
            $(".js-modal-content").empty();
            Siapku_Utils.doAjax("/user/relation-on-group", {
                group_id: g,
                page: h,
                limit: f
            }, function() {
                if (typeof userRelationErrId != "undefined" && userRelationErrId) {
                    d.hideMessage(userRelationErrId, -1);
                    userRelationErrId = false
                }
                userRelationLoad = d.showMessage($(".js-modal-content"), "n", "full", "load", "Harap tunggu... ", " Data sedang dimuat", "prepend")
            }, function(i) {
                if (i.error) {
                    userRelationErrId = d.showMessage($(".js-modal-content"), "n", "full", "err", "Maaf, ", i.desc, "prepend")
                } else {
                    d.loadTemplate("user/relation.html", function(j) {
                        i.displayTipe = e;
                        relationTemplate = j(i);
                        i.pagerId = "_relation_group_" + g;
                        i.limiter = [5, 10, 20];
                        d.generatePagingNonRoute(i, function(k) {
                            relationTemplate += k;
                            $(relationTemplate).appendTo(".js-modal-content");
                            $(relationTemplate).promise().done(function() {
                                $(".direktori-thumb").filter(":visible").siapListClearFix(">li")
                            })
                        })
                    })
                }
            }, function() {
                if (typeof userRelationLoad != "undefined" && userRelationLoad) {
                    d.hideMessage(userRelationLoad, -1);
                    userRelationLoad = false
                }
            })
        }
    },
    modalRelationGroup: function(a, b, d) {
        $("body").css({
            overflow: "hidden"
        });
        d.loadTemplate("modal/custom.html", function(e) {
            e = e({
                title: "Relasi Komunitas",
                desc: false,
                modalId: "_relation_" + a,
                width: "600px",
                widthCont: "580px",
                content: ""
            });
            $(e).hide().appendTo("body").fadeIn("fast");
            $("#modal_custom_relation_" + a).promise().done(function() {
                Siapku_Utils.doAjax("/group/relation", {
                    user_id: a
                }, function() {
                    if (typeof userRelationErrId != "undefined" && userRelationErrId) {
                        d.hideMessage(userRelationErrId, -1);
                        userRelationErrId = false
                    }
                    userRelationLoad = d.showMessage($(".js-modal-content"), "n", "full", "load", "Harap tunggu... ", " Data sedang dimuat", "prepend")
                }, function(f) {
                    if (f.error) {
                        userRelationErrId = d.showMessage($(".js-modal-content"), "n", "full", "err", "Maaf, ", f.desc, "prepend")
                    } else {
                        d.loadTemplate("group/relation.html", function(g) {
                            relationTemplate = g(f);
                            f.pagerId = "_relation_" + a;
                            f.limiter = [5, 10, 20];
                            d.generatePagingNonRoute(f, function(h) {
                                relationTemplate += h;
                                $(relationTemplate).appendTo(".js-modal-content");
                                $(relationTemplate).promise().done(function() {
                                    $(".direktori-thumb").filter(":visible").siapListClearFix(">li")
                                })
                            })
                        })
                    }
                }, function() {
                    if (typeof userRelationLoad != "undefined" && userRelationLoad) {
                        d.hideMessage(userRelationLoad, -1);
                        userRelationLoad = false
                    }
                })
            })
        });
        $("#pager_limiter_relation_" + a + " ul li a").die().live("click", function(i) {
            i.preventDefault();
            var h = $("#pager_page_relation_" + a + " ul li[class=on] a").attr("rel");
            var g = $(this).attr("rel");
            var f = $("#modal_custom_relation_" + a).find(".js-switch-display-type").find(".on").attr("rel");
            c(a, h, g, f)
        });
        $("#pager_page_relation_" + a + " ul li a").die().live("click", function(i) {
            i.preventDefault();
            var g = $("#pager_limiter_relation_" + a + " ul li[class=on] a").attr("rel");
            var h = $(this).attr("rel");
            var f = $("#modal_custom_relation_" + a).find(".js-switch-display-type").find(".on").attr("rel");
            c(a, h, g, f)
        });
        $("#pager_relation_" + a + " .nav-group .nav .next").die().live("click", function(i) {
            i.preventDefault();
            var g = $("#pager_limiter_relation_" + a + " ul li[class=on] a").attr("rel");
            var h = $("#pager_page_relation_" + a + " ul li[class=on] a").attr("rel");
            var f = $("#modal_custom_relation_" + a).find(".js-switch-display-type").find(".on").attr("rel");
            c(a, parseInt(h) + 1, g, f)
        });
        $("#pager_relation_" + a + " .nav-group .nav .prev").die().live("click", function(i) {
            i.preventDefault();
            var g = $("#pager_limiter_relation_" + a + " ul li[class=on] a").attr("rel");
            var h = $("#pager_page_relation_" + a + " ul li[class=on] a").attr("rel");
            var f = $("#modal_custom_relation_" + a).find(".js-switch-display-type").find(".on").attr("rel");
            c(a, parseInt(h) - 1, g, f)
        });
        function c(g, h, f, e) {
            $(".js-modal-content").empty();
            Siapku_Utils.doAjax("/group/relation", {
                user_id: g,
                page: h,
                limit: f
            }, function() {
                if (typeof userRelationErrId != "undefined" && userRelationErrId) {
                    d.hideMessage(userRelationErrId, -1);
                    userRelationErrId = false
                }
                userRelationLoad = d.showMessage($(".js-modal-content"), "n", "full", "load", "Harap tunggu... ", " Data sedang dimuat", "prepend")
            }, function(i) {
                if (i.error) {
                    userRelationErrId = d.showMessage($(".js-modal-content"), "n", "full", "err", "Maaf, ", i.desc, "prepend")
                } else {
                    d.loadTemplate("group/relation.html", function(j) {
                        i.displayTipe = e;
                        relationTemplate = j(i);
                        i.pagerId = "_relation_" + g;
                        i.limiter = [5, 10, 20];
                        d.generatePagingNonRoute(i, function(k) {
                            relationTemplate += k;
                            $(relationTemplate).appendTo(".js-modal-content");
                            $(relationTemplate).promise().done(function() {
                                $(".direktori-thumb").filter(":visible").siapListClearFix(">li")
                            })
                        })
                    })
                }
            }, function() {
                if (typeof userRelationLoad != "undefined" && userRelationLoad) {
                    d.hideMessage(userRelationLoad, -1);
                    userRelationLoad = false
                }
            })
        }
    },
    modalPostList: function(a, c, i) {
        var f = a.substring(0, a.indexOf("_"));
        var b = a.replace(f + "_", "");
        var g = "modal_post_" + a;
        var d = $("#" + g);
        var e = $(c).css("background");
        var h = $(c).css("height");
        $(c).css({
            background: "none",
            height: "12px"
        });
        $(c).addClass("ic-load");
        Siapku_Utils.doAjax("/status/detail", {
            post_id: b,
            type: f
        }, function() {}, function(j) {
            if (!j.error) {
                i.loadTemplate("modal/post.html", function(v) {
                    j.modaltipId = g;
                    j.sharer = Siapku_Bootstrap.sharer;
                    j.siapkuUrl = Siapku_Bootstrap.siapkuUrl;
                    var m = v(j);
                    $(m).hide().appendTo("body").slideDown("fast");
                    var r = $("#" + g);
                    r.css({
                        top: 0,
                        left: 0
                    });
                    var s = r.outerWidth(true);
                    var n = $(c).outerWidth();
                    var u = $(c).innerHeight();
                    var l = $(c).offset().left;
                    var k = $(c).offset().top;
                    var q = (l >= $("body").innerWidth() - s) ? true: false;
                    var p = l - (q ? (s - n - 11) + (r.is(".sdw") ? 3: 0) : 11);
                    var t = (s < n ? s - 20: n);
                    if (t < 15) {
                        t = 15
                    }
                    var o = k + u + 8;
                    r.find(".point").css({
                        width: t,
                        height: 9,
                        top: -9
                    });
                    if (q) {
                        r.find(".point").css({
                            left: "",
                            right: 10
                        })
                    } else {
                        r.find(".point").css({
                            left: 10,
                            right: ""
                        })
                    }
                    r.css({
                        top: o,
                        left: p
                    });
                    r.show();
                    r.css({
                        display: "block"
                    })
                })
            } else {
                i = Siapku_Interface.showMessage(d, "n", "full", "err", "Maaf, ", j.desc, "append")
            }
        }, function() {
            $(c).css({
                background: e,
                height: h
            });
            $(c).removeClass("ic-load")
        })
    },
    modalCommentList: function(h, b, i) {
        var e = h.substring(0, h.indexOf("_"));
        var a = h.replace(e + "_", "");
        var f = "modal_comment_" + h;
        var c = $("#" + f);
        var d = $(b).css("background");
        var g = $(b).css("height");
        $(b).css({
            background: "none",
            height: "12px"
        });
        $(b).addClass("ic-load");
        Siapku_Utils.doAjax("/comment/detail", {
            comment_id: a,
            type: e
        }, function() {}, function(j) {
            if (!j.error) {
                i.loadTemplate("modal/comment.html", function(v) {
                    j.modaltipId = f;
                    var m = v(j);
                    $(m).hide().appendTo("body").slideDown("fast");
                    var r = $("#" + f);
                    r.css({
                        top: 0,
                        left: 0
                    });
                    var s = r.outerWidth(true);
                    var n = $(b).outerWidth();
                    var u = $(b).innerHeight();
                    var l = $(b).offset().left;
                    var k = $(b).offset().top;
                    var q = (l >= $("body").innerWidth() - s) ? true: false;
                    var p = l - (q ? (s - n - 11) + (r.is(".sdw") ? 3: 0) : 11);
                    var t = (s < n ? s - 20: n);
                    if (t < 15) {
                        t = 15
                    }
                    var o = k + u + 8;
                    r.find(".point").css({
                        width: t,
                        height: 9,
                        top: -9
                    });
                    if (q) {
                        r.find(".point").css({
                            left: "",
                            right: 10
                        })
                    } else {
                        r.find(".point").css({
                            left: 10,
                            right: ""
                        })
                    }
                    r.css({
                        top: o,
                        left: p
                    });
                    r.show();
                    r.css({
                        display: "block"
                    })
                })
            } else {
                i = Siapku_Interface.showMessage(c, "n", "full", "err", "Maaf, ", j.desc, "append")
            }
        }, function() {
            $(b).css({
                background: d,
                height: g
            });
            $(b).removeClass("ic-load")
        })
    },
    modalDefaultTags: function(c, i) {
        var f = new Date();
        var e = f.getTime();
        var a = "modal_tags_" + e;
        var h = $("#" + a);
        var b = $(c).css("background");
        var g = $(c).css("height");
        $(c).css({
            background: "none",
            height: "12px"
        });
        $(c).addClass("ic-load");
        Siapku_Utils.doAjax("/status/default-tags", {}, function() {}, function(d) {
            if (!d.error) {
                i.loadTemplate("modal/tags.html", function(u) {
                    d.modaltipId = a;
                    var l = u(d);
                    $(l).hide().appendTo("body").slideDown("fast");
                    var q = $("#" + a);
                    q.css({
                        top: 0,
                        left: 0
                    });
                    var r = q.outerWidth(true);
                    var m = $(c).outerWidth();
                    var t = $(c).innerHeight();
                    var k = $(c).offset().left;
                    var j = $(c).offset().top;
                    var p = (k >= $("body").innerWidth() - r) ? true: false;
                    var o = k - (p ? (r - m - 11) + (q.is(".sdw") ? 3: 0) : 11);
                    var s = (r < m ? r - 20: m);
                    if (s < 15) {
                        s = 15
                    }
                    var n = j + t + 8;
                    q.find(".point").css({
                        width: s,
                        height: 9,
                        top: -9
                    });
                    if (p) {
                        q.find(".point").css({
                            left: "",
                            right: 10
                        })
                    } else {
                        q.find(".point").css({
                            left: 10,
                            right: ""
                        })
                    }
                    q.css({
                        top: n,
                        left: o
                    });
                    q.show();
                    q.css({
                        display: "block"
                    })
                })
            } else {
                i = Siapku_Interface.showMessage(h, "n", "full", "err", "Maaf, ", d.desc, "append")
            }
        }, function() {
            $(c).css({
                background: b,
                height: g
            });
            $(c).removeClass("ic-load")
        })
    },
    modalPostFilter: function(a, i, j) {
        var e = new Date();
        var g = e.getTime();
        var f = "modal_postfilter_" + g;
        var b = $("#" + f);
        var c = $(a).css("background");
        var h = $(a).css("height");
        j.loadTemplate("modal/post/filter.html", function(u) {
            var v = {};
            v.modaltipId = f;
            v.rel = i.split("|");
            v.rel[1] = v.rel[1].split(",");
            var l = u(v);
            $(l).hide().appendTo("body").slideDown("fast");
            var q = $("#" + f);
            q.css({
                top: 0,
                left: 0
            });
            var r = q.outerWidth(true);
            var m = $(a).outerWidth();
            var t = $(a).innerHeight();
            var k = $(a).offset().left;
            var d = $(a).offset().top;
            var p = (k >= $("body").innerWidth() - r) ? true: false;
            var o = k - (p ? (r - m - 11) + (q.is(".sdw") ? 3: 0) : 11);
            var s = (r < m ? r - 20: m);
            if (s < 15) {
                s = 15
            }
            var n = d + t + 8;
            q.find(".point").css({
                width: s,
                height: 9,
                top: -9
            });
            if (p) {
                q.find(".point").css({
                    left: "",
                    right: 10
                })
            } else {
                q.find(".point").css({
                    left: 10,
                    right: ""
                })
            }
            q.css({
                top: n,
                left: o
            });
            q.show();
            q.css({
                display: "block"
            })
        })
    },
    doAjax: function(b, d, c, e, a) {
        $.ajax({
            type: "POST",
            url: b,
            dataType: "json",
            data: d || [],
            success: function(f) {
                if (e) {
                    e(f)
                }
            },
            beforeSend: function(g, f) {
                $.xhrPool.push(g);
                if (c) {
                    c(g, f)
                }
            },
            complete: function(g, f) {
                $.xhrPool.pop();
                if (a) {
                    a(g, f)
                }
            }
        })
    },
    initRouter: function(c) {
        $.xhrPool.abortAll();
        var a = Siapku_Bootstrap.isLogged;
        var b = Siapku_Bootstrap.userId;
        Siapku_Bootstrap.reloadEnvironment(function() {
            if (Siapku_Bootstrap.appError) {
                alert("SIAPKu Application Error")
            } else {
                var e = Siapku_Bootstrap.isLogged;
                var d = Siapku_Bootstrap.userId;
                Siapku_Interface.baseUrl = Siapku_Bootstrap.environment.url;
                Siapku_Interface.statikUrl = Siapku_Bootstrap.environment.statik_url;
                Siapku_Interface.statikVersion = Siapku_Bootstrap.environment.statik_version;
                Siapku_Interface.statikPath = Siapku_Bootstrap.environment.statik_path;
                Siapku_Interface.htmlCache = Siapku_Bootstrap.environment.html_cache;
                if (Siapku_Bootstrap.siapkuUser.active == 0 && window.location.hash != "#!/inactive") {
                    window.location.hash = "!/inactive/"
                }
                if (a !== e || b !== d) {
                    window.location.reload();
                    return false
                } else {
                    var f = window.location.hash;
                    if (f && typeof _gaq !== "undefined") {
                        _gaq.push(["_trackPageview", f])
                    }
                    if (c) {
                        c()
                    }
                }
            }
        })
    },
    denyNoLogin: function() {
        if (!Siapku_Bootstrap.isLogged) {
            var c = Siapku_Interface;
            var b = new Date();
            var a = b.getTime();
            $("body").css({
                overflow: "hidden"
            });
            c.loadTemplate("modal/nologin.html", function(d) {
                d = d({
                    title: "",
                    desc: false,
                    modalId: "_message_" + a,
                    login: "/login?next=" + escape(window.location.href).replace("+", "%2B").replace("%20", "+").replace("*", "%2A").replace("/", "%2F").replace("@", "%40")
                });
                $(d).hide().appendTo("body").show();
                $("#nologin_message_" + a).promise().done(function() {
                    var e = $(this).find(".js-content-msg").width();
                    $(this).find(".modalbox-dialog").css({
                        width: e + 10,
                        "margin-top": (($("#nologin_message_" + a).height() - $("#nologin_message_" + a).find(".modalbox-cont").height()) / 2)
                    });
                    $(this).hide().show()
                })
            });
            return false
        }
        return true
    },
    initUpload: function(a) {
        a = $.extend({}, a || {});
        var b = new plupload.Uploader({
            browse_button: a.browseBtn,
            drop_element: a.dropEl,
            flash_swf_url: Siapku_Interface.statikUrl + Siapku_Interface.statikPath + "/" + Siapku_Interface.statikVersion + "/js/lib/plupload/js/plupload.flash.swf",
            max_file_size: "2mb",
            filters: a.filters,
            runtimes: "html5,flash",
            url: a.url
        });
        b.bind("Init", function(c, d) {
            $("#" + a.listEl).empty();
            if (typeof a.init == "function") {
                a.init(d)
            }
        });
        $("#" + a.uploadBtn).click(function(c) {
            b.start();
            c.preventDefault()
        });
        b.init();
        b.bind("BeforeUpload", function(c, d) {
            c.settings.multipart_params = {
                group_id: a.group_id,
                k_siap: a.k_siap
            }
        });
        b.bind("FilesAdded", function(c, e) {
            if (c.files.length > 1) {
                while (c.files.length > 1) {
                    if (c.files.length > 1) {
                        c.removeFile(c.files[0])
                    }
                }
            }
            var d = c.files[0];
            $("#" + a.listEl).html('<div id="' + d.id + '" class="input loading"><div class="bar js-upload-bar"></div><span class="ic lbl ic-img">' + d.name + " (" + plupload.formatSize(d.size) + ")</span></div>").show();
            c.refresh()
        });
        b.bind("UploadProgress", function(c, d) {
            var e = $("#" + d.id);
            e.find(".js-upload-bar").css("width", d.percent + "%")
        });
        b.bind("FileUploaded", function(c, f, d) {
            var h = $("#" + f.id);
            h.find(".js-upload-bar").css("width", "100%");
            if (typeof a.callback == "function") {
                try {
                    d.response = JSON.parse(d.response)
                } catch(g) {
                    d.response = {}
                }
                a.callback(d.response)
            }
        })
    },
    readCookie: function(b) {
        var e = b + "=";
        var a = document.cookie.split(";");
        for (var d = 0; d < a.length; d++) {
            var f = a[d];
            while (f.charAt(0) == " ") {
                f = f.substring(1, f.length)
            }
            if (f.indexOf(e) == 0) {
                return f.substring(e.length, f.length)
            }
        }
        return null
    }
};
var url = location.href;
var rootUrl = url.substring(0, url.indexOf("/", 14)) + "/";
var hoverTimeOut = new Array();
var relocate = false;
if (window.location.href.replace(rootUrl, "") != "") {
    var currentQuery = window.location.href.replace(rootUrl, "");
    if (currentQuery.indexOf("#!") != 0) {
        relocate = true;
        currentQuery = currentQuery.replace("//", "/");
        currentQuery = currentQuery.replace("?_escaped_fragment_=", "");
        window.location = rootUrl + "#!/" + currentQuery
    }
}
$.xhrPool = [];
$.xhrPool.abortAll = function() {
    $(this).each(function(a, b) {
        b.abort()
    })
};
$(document).ready(function() {
    if (!relocate) {
        $(window).bind("hashchange", function() {
            $("#global-header").find(".selected").removeClass("selected");
            $("#global-header").find(".on").removeClass("on");
            $("#global-header").find(".js-komunitas-submenu").slideUp("fast");
            $("#global-header").find(".js-dinas-submenu").slideUp("fast");
            $("#global-header").find(".js-sekolah-submenu").slideUp("fast");
            $("#global-header").find(".js-psb-submenu").slideUp("fast");
            $("#global-header").find(".js-search-form").slideUp("fast");
            $("#global-header").find(".js-cred-box").slideUp("fast");
            $("#global-header").find(".js-search-result-siswa-header").slideUp("fast");
            $("#global-header").find(".js-search-result-siswa-list").slideUp("fast");
            $("#global-header").find(".js-search-result-guru-header").slideUp("fast");
            $("#global-header").find(".js-search-result-guru-list").slideUp("fast");
            $("#global-header").find(".js-search-result-sekolah-header").slideUp("fast");
            $("#global-header").find(".js-search-result-sekolah-list").slideUp("fast");
            $("#global-header").find(".js-search-result").slideUp("fast");
            $("#global-header").find(".js-mail-box").slideUp("fast");
            $("#global-header").find(".js-notif-box").slideUp("fast");
            if (window.location.href.indexOf("dashboard") != -1 || window.location.href.indexOf("mail") != -1 || window.location.href.indexOf("!/friends") != -1 || window.location.href.indexOf("!/trend") != -1) {
                $("#global-header").find(".js-komunitas-menu").removeClass("selected");
                $("#global-header").find(".js-komunitas-dasbor").removeClass("selected");
                $("#global-header").find(".js-komunitas-dasbor").addClass("selected")
            } else {
                $("#global-header").find(".js-komunitas-dasbor").removeClass("selected");
                $("#global-header").find(".js-komunitas-menu").removeClass("selected");
                $("#global-header").find(".js-komunitas-menu").addClass("selected")
            }
            Backbone.history.stop();
            Siapku_Utils.initRouter(function() {
                Siapku_Interface.forceClearScreen();
                Backbone.history.start();
                Backbone.history.stop()
            })
        });
        Siapku_Bootstrap.environmentLoader(function() {
            if (Siapku_Bootstrap.appError) {
                alert("SIAPKu Application Error")
            } else {
                Siapku_Interface.baseUrl = Siapku_Bootstrap.environment.url;
                Siapku_Interface.statikUrl = Siapku_Bootstrap.environment.statik_url;
                Siapku_Interface.statikVersion = Siapku_Bootstrap.environment.statik_version;
                Siapku_Interface.statikPath = Siapku_Bootstrap.environment.statik_path;
                Siapku_Interface.htmlCache = Siapku_Bootstrap.environment.html_cache;
                Siapku_Interface.initUi();
                $("html").fadeIn("slow");
                siapkuRouterPortal = new Siapku_Router_Portal;
                siapkuRouterUser = new Siapku_Router_User;
                siapkuRouterGroup = new Siapku_Router_Group;
                siapkuRouterDashboard = new Siapku_Router_Dashboard;
                siapkuRouterDirektori = new Siapku_Router_Direktori;
                siapkuRouterPost = new Siapku_Router_Post;
                siapkuRouterMail = new Siapku_Router_Mail;
                siapkuRouterNotification = new Siapku_Router_Notification;
                siapkuRouterFriends = new Siapku_Router_Friends;
                siapkuRouterTrend = new Siapku_Router_Trend;
                siapkuRouterAdmin = new Siapku_Router_Admin;
                Backbone.history.start();
                Backbone.history.stop()
            }
        })
    }
    $.expr[":"].internal = function(g, c, f, a) {
        var e = $(g),
        b = e.attr("href") || "",
        d;
        if (b.indexOf("javascript") != -1 || !b) {
            return true
        }
        d = b.substring(0, rootUrl.length) === rootUrl || b.indexOf(":") === -1;
        return d
    };
    $("a:not(:internal)").live("click", function(a) {});
    $("a:internal").live("click", function(a) {});
    $("a").each(function() {
        if (window.parent.location != window.location) {
            $(this).attr("target", "_top")
        }
    })
});