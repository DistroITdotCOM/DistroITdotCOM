/*!** Begin site JS ***/
/*!** Begin file: berniaga_login.js ***/
$(function() {
    $(".carousel").carousel({
        interval: 2500
    });
    $(".lft").click(function() {
        $(".carousel").carousel("prev")
    });
    $(".rght").click(function() {
        $(".carousel").carousel("next")
    });
    $("#myCarousel").bind("slid", function() {
        $(".current").removeClass("current");
        $("#nav" + $("#myCarousel .active").index("#myCarousel .item")).addClass("current")
    });
    $("#big-fb-login").bind("click", function() {
        var id = this.id;
        if ($("#fxLoader").size() >= 0) {
            $("#fxLoader").remove();
            createLoaderLayer("Login dengan akun Facebook.")
        }
        loader();
        $("#boxLoader").css("width", "400px");
        $("#fxLoader").css("background-color", "rgba(0,0,0,0.7)");
        FB.login(handleSessionResponse, {
            scope: "offline_access,read_stream,publish_stream,email,user_status,user_interests"
        });
        return true
    });
    window.fbAsyncInit = function() {
        FB.init({
            appId: CommonFacebookAppId,
            status: true,
            cookie: true,
            xfbml: true,
            oauth: true,
            channelUrl: CommonBase_urlAw + "/channel.htm",
            frictionlessRequests: true
        });
        FB.getLoginStatus(handleSessionResponse)
    }; (function(d) {
        var js,
        id = "facebook-jssdk";
        if (d.getElementById(id)) {
            return
        }
        js = d.createElement("script");
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        d.getElementsByTagName("head")[0].appendChild(js)
    } (document))
});
function handleSessionResponse(response) {
    if (response.status == "connected") {
        if (response.authResponse.userID) {
            fbid = response.authResponse.userID;
            if (_referer == "") {
                if (document.referrer != "") {
                    referrerLink = document.referrer
                } else {
                    referrerLink = "/"
                }
            } else {
                referrerLink = CommonBase_urlAi + "/personal/account/"
            }
            loaded();
            if ($("#fxLoader").size() >= 0) {
                $("#fxLoader").remove();
                createLoaderLayer("Login dengan akun Facebook.")
            }
            loader();
            $("#boxLoader").css("width", "400px");
            $("#fxLoader").css("background-color", "rgba(0,0,0,0.7)");
            api_data = "fb_token=" + response.authResponse.accessToken + "&via=desktop";
            $.post(CommonBase_urlAw + "/api/fbauth_login.json", api_data, function(data) {
                setCookie("fb_data_challenge", data.data.user_id, 1, "/", _sitename);
                setCookie("key_challenge", data.data.session_challenge, 1, "/", _sitename);
                document.location.replace(referrerLink)
            }, "json")
        } else {
            location.href = CommonBase_urlAi + "/personal/account"
        }
    } else {
        loaded()
    }
}
function carogoto(state) {
    $(".carousel").carousel(state)
}
/*!** End file: berniaga_login.js ***/
/*!** Begin file: bootstrap-transition.js ***/
    ! function($) {
    $(function() {
        $.support.transition = (function() {
            var transitionEnd = (function() {
                var el = document.createElement("bootstrap"),
                transEndEventNames = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    msTransition: "MSTransitionEnd",
                    transition: "transitionend"
                },
                name;
                for (name in transEndEventNames) {
                    if (el.style[name] !== undefined) {
                        return transEndEventNames[name]
                    }
                }
            } ());
            return transitionEnd && {
                end: transitionEnd
            }
        })()
    })
} (window.jQuery);
/*!** End file: bootstrap-transition.js ***/
/*!** Begin file: bootstrap-carousel.js ***/
    ! function($) {
    var Carousel = function(element, options) {
        this.$element = $(element);
        this.options = options;
        this.options.slide && this.slide(this.options.slide);
        this.options.pause == "hover" && this.$element.on("mouseenter", $.proxy(this.pause, this)).on("mouseleave", $.proxy(this.cycle, this))
    };
    Carousel.prototype = {
        cycle: function(e) {
            if (!e) {
                this.paused = false
            }
            this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));
            return this
        },
        to: function(pos) {
            var $active = this.$element.find(".active"),
            children = $active.parent().children(),
            activePos = children.index($active),
            that = this;
            if (pos > (children.length - 1) || pos < 0) {
                return
            }
            if (this.sliding) {
                return this.$element.one("slid", function() {
                    that.to(pos)
                })
            }
            if (activePos == pos) {
                return this.pause().cycle()
            }
            return this.slide(pos > activePos ? "next": "prev", $(children[pos]))
        },
        pause: function(e) {
            if (!e) {
                this.paused = true
            }
            clearInterval(this.interval);
            this.interval = null;
            return this
        },
        next: function() {
            if (this.sliding) {
                return
            }
            return this.slide("next")
        },
        prev: function() {
            if (this.sliding) {
                return
            }
            return this.slide("prev")
        },
        slide: function(type, next) {
            var $active = this.$element.find(".active"),
            $next = next || $active[type](),
            isCycling = this.interval,
            direction = type == "next" ? "left": "right",
            fallback = type == "next" ? "first": "last",
            that = this,
            e = $.Event("slide");
            this.sliding = true;
            isCycling && this.pause();
            $next = $next.length ? $next: this.$element.find(".item")[fallback]();
            if ($next.hasClass("active")) {
                return
            }
            if ($.support.transition && this.$element.hasClass("slide")) {
                this.$element.trigger(e);
                if (e.isDefaultPrevented()) {
                    return
                }
                $next.addClass(type);
                $next[0].offsetWidth;
                $active.addClass(direction);
                $next.addClass(direction);
                this.$element.one($.support.transition.end, function() {
                    $next.removeClass([type, direction].join(" ")).addClass("active");
                    $active.removeClass(["active", direction].join(" "));
                    that.sliding = false;
                    setTimeout(function() {
                        that.$element.trigger("slid")
                    }, 0)
                })
            } else {
                this.$element.trigger(e);
                if (e.isDefaultPrevented()) {
                    return
                }
                $active.removeClass("active");
                $next.addClass("active");
                this.sliding = false;
                this.$element.trigger("slid")
            }
            isCycling && this.cycle();
            return this
        }
    };
    $.fn.carousel = function(option) {
        return this.each(function() {
            var $this = $(this),
            data = $this.data("carousel"),
            options = $.extend({}, $.fn.carousel.defaults, typeof option == "object" && option);
            if (!data) {
                $this.data("carousel", (data = new Carousel(this, options)))
            }
            if (typeof option == "number") {
                data.to(option)
            } else {
                if (typeof option == "string" || (option = options.slide)) {
                    data[option]()
                } else {
                    if (options.interval) {
                        data.cycle()
                    }
                }
            }
        })
    };
    $.fn.carousel.defaults = {
        interval: 5000,
        pause: "hover"
    };
    $.fn.carousel.Constructor = Carousel;
    $(function() {
        $("body").on("click.carousel.data-api", "[data-slide]", function(e) {
            var $this = $(this),
            href,
            $target = $($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "")),
            options = !$target.data("modal") && $.extend({}, $target.data(), $this.data());
            $target.carousel(options);
            e.preventDefault()
        })
    })
} (window.jQuery);
/*!** End file: bootstrap-carousel.js ***/
/*!** Begin file: berniaga_loader.js ***/
function createLoaderLayer(customMessage) {
    var message = (typeof customMessage == "undefined") ? "menyimpan": customMessage;
    $("body").append('<div id="fxLoader" align="center" style="display:none;"><div id="boxLoader"><table><tr><td width="24"></td><td style="padding: 3px 0 0 10px;">' + message + "</td></tr></table></div></div>")
}
function destroyLoaderLayer() {
    $("#fxLoader").remove()
}
if ($("#fxLoader").size() == 0) {
    createLoaderLayer()
}
function loader() {
    $("#fxLoader").css({
        position: "fixed",
        top: 0,
        width: "100%",
        height: "100%"
    });
    $("#boxLoader").css({
        padding: "4px 0",
        width: "200px",
        color: "#FFFFFF",
        "font-weight": "bold"
    }).addClass("ui-corner-bl").addClass("ui-corner-br");
    $("#fxLoader").show()
}
function loaded() {
    $("#fxLoader").fadeOut()
}
function progress(step, segment) {
    var prg_width = 200;
    var node = document.getElementById("progress");
    var w = node.style.width.match(/\d+/);
    var div = prg_width / segment;
    var bar = 0;
    if (step == 1) {
        w = 0
    }
    if (segment == step) {
        bar = prg_width
    } else {
        bar = parseInt(w) + div
    }
    var prgss = node.style.width = bar + "px"
}
function checkForm(save) {
    var count = 0;
    var segment = 7;
    var email = $("#email").val();
    var phone = $("#phone").val();
    var region = $("#region").val();
    var province = $("#province").val();
    var area = $("#area").val();
    var zipcode = $("#zip").val();
    if (save != 0) {
        count++
    }
    if (email != "") {
        count++
    }
    if (phone != "") {
        count++
    }
    if (parseInt(region) != 0) {
        count++
    }
    if (province != "") {
        count++
    }
    if (area != "") {
        count++
    }
    if (zipcode != "") {
        count++
    }
    for (i = 1; i <= count; i++) {
        progress(i, segment)
    }
}
$(function() {
    if (typeof(appl) != "undefined") {
        if (appl == "personal" && current_state == "account") {
            var email = $("#email").val();
            var phone = $("#phone").val();
            var region = $("#region").val();
            var province = $("#province").val();
            var area = $("#area").val();
            var zipcode = $("#zip").val();
            if (email != "" && phone != "" && parseInt(region) != 0 && province != "" && area != "" && zipcode != "") {
                var stat = 1
            } else {
                var stat = 0
            }
            checkForm(stat);
            $("input, select").live("click", function() {
                checkForm(stat)
            });
            $("button#save").live("click", function() {
                checkForm(1)
            })
        }
    }
});
/*!** End file: berniaga_loader.js ***/
/*!** Begin file: all_bootstrap_pages.js ***/
function Onload(func) {
    if (typeof(func) != "function") {
        return
    }
    var oldonload = window.onload;
    if (typeof(window.onload) != "function") {
        window.onload = func
    } else {
        window.onload = function() {
            oldonload();
            func()
        }
    }
}
function document_write_override(str) {
    if (str.toLowerCase().indexOf("src=") > 0) {
        if (str.toLowerCase().indexOf("script") >= 0) {
            str = str.substring(str.toLowerCase().indexOf("src"));
            var script = str.replace(/^[^"']+["']/, "").replace(/["'][^"']+$/, "");
            include_script(script);
            return
        } else {
            if (str.toLowerCase().indexOf("img") >= 0) {
                str = str.substring(str.toLowerCase().indexOf("src"));
                var script = str.replace(/^[^"']+["']/, "").replace(/["'][^"']+$/, "");
                var img = new Image;
                img.src = script;
                return
            }
        }
    }
    document.write_org(str)
}
function include_script(src, callback) {
    var script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    if (callback) {
        script.onload = callback;
        script.onreadystatechange = function() {
            if (this.readyState == "complete" || this.readyState == "loaded") {
                this.onload();
                this.onload = this.onreadystatechange = null
            }
        }
    }
    document.getElementsByTagName("head")[0].appendChild(script)
}
function effect(idObj) {
    var thisObj = $("#" + idObj);
    if (thisObj.css("display") == "none") {
        thisObj.show()
    } else {
        thisObj.hide()
    }
}
function popup_twitter(id) {
    var width = 500;
    var height = 360;
    var left = (screen.width - width) / 2;
    var top = (screen.height - height) / 2;
    var params = "width=" + width + ", height=" + height;
    params += ", top=" + top + ", left=" + left;
    params += ", directories=no";
    params += ", location=no";
    params += ", menubar=no";
    params += ", resizable=no";
    params += ", scrollbars=no";
    params += ", status=no";
    params += ", toolbar=no";
    var urlreal = escape(window.location.href).replace(/\+/g, "%2B");
    var url = "http://twitter.com/share";
    url += "?url=" + urlreal + escape("#xtor=AD-55-[" + id + "]");
    url += "&via=berniaga";
    url += "&text=" + escape(document.title);
    url += "&related=berniaga";
    newwin = window.open(url, "Twitter_berniaga", params);
    if (window.focus) {
        newwin.focus()
    }
    return false
}
function Pixel(url, where, cp, ap, cc, ac, qh, cookie) {
    var src;
    var d = new Date();
    if (!where) {
        where = "failure_" + window.location.host.replace(/\.|:/gi, "_") + window.location.pathname.replace(/\/|\./g, "_")
    }
    src = url + "/1x1_pages_" + where;
    if (cp) {
        src += "_c" + cp
    } else {
        src += "_cpuk"
    }
    if (ap) {
        src += "_a" + ap
    } else {
        src += "_apuk"
    }
    if (cc) {
        src += "_" + cc
    }
    if (ac) {
        src += "_" + ac
    }
    if (qh) {
        src += "_qh" + qh
    }
    src = src + ".gif?r=" + d.getTime();
    if (cookie && getCookie(cookie)) {
        src += "&" + cookie + "=1"
    }
    if (document.write_org != null) {
        document.write_org('<img src="' + src + '" height="1" width="1" id="stats_1x1">')
    } else {
        document.write('<img src="' + src + '" height="1" width="1" id="stats_1x1">')
    }
}
function setCookie(name, value, expires, path, domain, secure) {
    var today = new Date();
    today.setTime(today.getTime());
    if (expires) {
        expires = expires * 1000 * 60 * 60 * 24
    }
    var expires_date = new Date(today.getTime() + (expires));
    document.cookie = name + "=" + escape(value) + ((expires) ? ";expires=" + expires_date.toGMTString() : "") + ((path) ? ";path=" + path: "") + ((domain) ? ";domain=" + domain: "") + ((secure) ? ";secure": "")
}
function getCookie(name) {
    var start = document.cookie.indexOf(name + "=");
    var len = start + name.length + 1;
    if (!start && name != document.cookie.substring(0, name.length)) {
        return null
    }
    if (start == -1) {
        return null
    }
    var end = document.cookie.indexOf(";", len);
    if (end == -1) {
        end = document.cookie.length
    }
    return unescape(document.cookie.substring(len, end))
}
function deleteCookie(name, path, domain) {
    if (getCookie(name)) {
        document.cookie = name + "=" + ((path) ? ";path=" + path: "") + ((domain) ? ";domain=" + domain: "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT"
    }
}
/*!** End file: all_bootstrap_pages.js ***/
/*!** End site JS ***/
