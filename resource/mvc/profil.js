$(document).ready(function() {
    var h = false;
    var j = false;
    var c = false;
    var q = false;
    var l = false;
    var i = false;
    var n = false;
    var r = false;
    var g = false;
    var a = false;
    var k = false;
    var v = false;
    var d = false;
    var o = false;
    var x = Backbone.Model.extend({
        url: "/profil/info",
        fullname: "-",
        siapkuRole: "-",
        kSiapkuRole: "-",
        gender: "-",
        dataGender: "-",
        tmpLhr: "-",
        birthdate: "-",
        location: "-",
        aboutMe: "-",
        tags: "-",
        roles: false,
        months: false,
        tahunMin: false,
        tahunMax: false,
        dateSel: false,
        monthSel: false,
        yearSel: false,
        parse: function(y, z) {
            this.fullname = (y.data.fullname && y.data.fullname != "") ? y.data.fullname: this.fullname;
            this.siapkuRole = (y.data.siapkuRole && y.data.siapkuRole != "") ? y.data.siapkuRole: this.siapkuRole;
            this.gender = (y.data.gender && y.data.gender != "") ? y.data.gender: this.gender;
            this.tmpLhr = (y.data.tmpLhr && y.data.tmpLhr != "") ? y.data.tmpLhr: this.tmpLhr;
            this.birthdate = (y.data.birthdate && y.data.birthdate != "") ? y.data.birthdate: this.birthdate;
            this.location = (y.data.location && y.data.location != "") ? y.data.location: this.location;
            this.aboutMe = (y.data.aboutMe && y.data.aboutMe != "") ? y.data.aboutMe: this.aboutMe;
            this.tags = (y.data.tags && y.data.tags != "") ? y.data.tags: this.tags;
            this.tahunMax = (y.data.configTahunMax && y.data.configTahunMax != "") ? y.data.configTahunMax: this.tahunMax;
            this.tahunMin = (y.data.configTahunMin && y.data.configTahunMin != "") ? y.data.configTahunMin: this.tahunMin;
            this.months = (y.data.configBulan && y.data.configBulan != "") ? y.data.configBulan: this.months;
            this.dateSel = (y.data.dateSelected && y.data.dateSelected != "") ? y.data.dateSelected: this.dateSel;
            this.monthSel = (y.data.monthSelected && y.data.monthSelected != "") ? y.data.monthSelected: this.monthSel;
            this.yearSel = (y.data.yearSelected && y.data.yearSelected != "") ? y.data.yearSelected: this.yearSel;
            this.roles = (y.data.roles && y.data.roles != "") ? y.data.roles: this.roles;
            this.dataGender = (y.data.dataGender && y.data.dataGender != "") ? y.data.dataGender: this.dataGender;
            this.kSiapkuRole = (y.data.kSiapkuRole && y.data.kSiapkuRole != "") ? y.data.kSiapkuRole: this.kSiapkuRole;
            z.call()
        },
        fetch: function(z) {
            var y = this;
            $.ajax({
                type: "POST",
                url: y.url,
                dataType: "json",
                data: [],
                success: function(A) {
                    if (h) {
                        siapAkunFunctions.hideMessage(h);
                        h = false
                    }
                    if (!A.error) {
                        y.parse(A, z)
                    } else {
                        h = siapAkunFunctions.showMessage($(".work-main"), "full", "err", "Maaf, ", A.desc)
                    }
                },
                beforeSend: function(B, A) {
                    if (j) {
                        siapAkunFunctions.hideMessage(j);
                        j = false
                    }
                    q = siapAkunFunctions.showMessage($(".work-main"), "full", "load", "Harap tunggu... ", " Data sedang diproses")
                },
                complete: function(B, A) {
                    siapAkunFunctions.hideMessage(q)
                }
            })
        },
        save: function(z) {
            var y = this;
            $.ajax({
                type: "POST",
                url: y.url + "/save",
                dataType: "json",
                data: z,
                success: function(A) {
                    if (j) {
                        siapAkunFunctions.hideMessage(j);
                        j = false
                    }
                    if (!A.error) {
                        l = "Berhasil ! ";
                        i = "Data Informasi Personal berhasil diperbaharui";
                        s.navigate("#!/info", true)
                    } else {
                        j = siapAkunFunctions.showMessage($(".js-editor-info"), "full", "err", "Error !", A.desc, "prepend")
                    }
                },
                beforeSend: function(B, A) {
                    if (j) {
                        siapAkunFunctions.hideMessage(j);
                        j = false
                    }
                    q = siapAkunFunctions.showMessage($(".js-editor-info"), "full", "load", "Harap tunggu... ", " Data sedang disimpan", "prepend")
                },
                complete: function(B, A) {
                    siapAkunFunctions.hideMessage(q)
                }
            })
        }
    });
    var m = Backbone.Model.extend({
        url: "/profil/contact",
        website: "-",
        personalPhone: "-",
        workPhone: "-",
        imSkype: false,
        imIcq: false,
        imGtalk: false,
        imMsn: false,
        imYahoo: false,
        imAim: false,
        imJabber: false,
        profLinkedin: false,
        profFacebook: false,
        profMyspace: false,
        profTwitter: false,
        profFlickr: false,
        profFriendfeed: false,
        profYoutube: false,
        profDelicious: false,
        profDigg: false,
        profMixx: false,
        profFavit: false,
        profEdno23: false,
        parse: function(y, z) {
            this.website = (y.data.website[0]) ? y.data.website: this.website;
            this.personalPhone = (y.data.personalPhone[0]) ? y.data.personalPhone: this.personalPhone;
            this.workPhone = (y.data.workPhone) ? y.data.workPhone: this.workPhone;
            this.imSkype = (y.data.imSkype) ? y.data.imSkype: this.imSkype;
            this.imIcq = (y.data.imIcq) ? y.data.imIcq: this.imIcq;
            this.imGtalk = (y.data.imGtalk) ? y.data.imGtalk: this.imGtalk;
            this.imMsn = (y.data.imMsn) ? y.data.imMsn: this.imMsn;
            this.imYahoo = (y.data.imYahoo) ? y.data.imYahoo: this.imYahoo;
            this.imAim = (y.data.imAim) ? y.data.imAim: this.imAim;
            this.imJabber = (y.data.imJabber) ? y.data.imJabber: this.imJabber;
            this.profLinkedin = (y.data.profLinkedin) ? y.data.profLinkedin: this.profLinkedin;
            this.profFacebook = (y.data.profFacebook) ? y.data.profFacebook: this.profFacebook;
            this.profMyspace = (y.data.profMyspace) ? y.data.profMyspace: this.profMyspace;
            this.profTwitter = (y.data.profTwitter) ? y.data.profTwitter: this.profTwitter;
            this.profFlickr = (y.data.profFlickr) ? y.data.profFlickr: this.profFlickr;
            this.profFriendfeed = (y.data.profFriendfeed) ? y.data.profFriendfeed: this.profFriendfeed;
            this.profYoutube = (y.data.profYoutube) ? y.data.profYoutube: this.profYoutube;
            this.profDelicious = (y.data.profDelicious) ? y.data.profDelicious: this.profDelicious;
            this.profDigg = (y.data.profDigg) ? y.data.profDigg: this.profDigg;
            this.profMixx = (y.data.profMixx) ? y.data.profMixx: this.profMixx;
            this.profFavit = (y.data.profFavit) ? y.data.profFavit: this.profFavit;
            this.profEdno23 = (y.data.profEdno23) ? y.data.profEdno23: this.profEdno23;
            z.call()
        },
        fetch: function(z) {
            var y = this;
            $.ajax({
                type: "POST",
                url: y.url,
                dataType: "json",
                data: [],
                success: function(A) {
                    if (h) {
                        siapAkunFunctions.hideMessage(h);
                        h = false
                    }
                    if (!A.error) {
                        y.parse(A, z)
                    } else {
                        h = siapAkunFunctions.showMessage($(".work-main"), "full", "err", "Maaf, ", A.desc)
                    }
                },
                beforeSend: function(B, A) {
                    if (j) {
                        siapAkunFunctions.hideMessage(j);
                        j = false
                    }
                    q = siapAkunFunctions.showMessage($(".work-main"), "full", "load", "Harap tunggu... ", " Data sedang diproses")
                },
                complete: function(B, A) {
                    siapAkunFunctions.hideMessage(q)
                }
            })
        },
        save: function(z) {
            var y = this;
            $.ajax({
                type: "POST",
                url: y.url + "/save",
                dataType: "json",
                data: z,
                success: function(A) {
                    if (j) {
                        siapAkunFunctions.hideMessage(j);
                        j = false
                    }
                    if (!A.error) {
                        l = "Berhasil ! ";
                        i = "Data Detil Kontak berhasil diperbaharui";
                        s.navigate("#!/contact", true)
                    } else {
                        j = siapAkunFunctions.showMessage($(".js-editor-contact"), "full", "err", "Error !", A.desc, "prepend")
                    }
                },
                beforeSend: function(B, A) {
                    if (j) {
                        siapAkunFunctions.hideMessage(j);
                        j = false
                    }
                    q = siapAkunFunctions.showMessage($(".js-editor-contact"), "full", "load", "Harap tunggu... ", " Data sedang disimpan", "prepend")
                },
                complete: function(B, A) {
                    siapAkunFunctions.hideMessage(q)
                }
            })
        }
    });
    var w = Backbone.Model.extend({
        url: "/profil/avatar",
        avatar: false,
        avatarThumb1: false,
        avatarThumb2: false,
        avatarThumb3: false,
        parse: function(y, z) {
            this.avatar = (y.data.avatar) ? y.data.avatar: this.avatar;
            this.avatarThumb1 = (y.data.avatarThumb1) ? y.data.avatarThumb1: this.avatarThumb1;
            this.avatarThumb2 = (y.data.avatarThumb2) ? y.data.avatarThumb2: this.avatarThumb2;
            this.avatarThumb3 = (y.data.avatarThumb3) ? y.data.avatarThumb3: this.avatarThumb3;
            z.call()
        },
        fetch: function(z) {
            var y = this;
            $.ajax({
                type: "POST",
                url: y.url,
                dataType: "json",
                data: [],
                success: function(A) {
                    if (h) {
                        siapAkunFunctions.hideMessage(h);
                        h = false
                    }
                    if (!A.error) {
                        y.parse(A, z)
                    } else {
                        h = siapAkunFunctions.showMessage($(".work-main"), "full", "err", "Maaf, ", A.desc)
                    }
                },
                beforeSend: function(B, A) {
                    if (j) {
                        siapAkunFunctions.hideMessage(j);
                        j = false
                    }
                    q = siapAkunFunctions.showMessage($(".work-main"), "full", "load", "Harap tunggu... ", " Data sedang diproses")
                },
                complete: function(B, A) {
                    siapAkunFunctions.hideMessage(q)
                }
            })
        },
        save: function(y) {},
        deleteIt: function() {
            var y = this;
            $.ajax({
                type: "POST",
                url: y.url + "/delete",
                dataType: "json",
                data: [],
                success: function(z) {
                    if (!z.error) {
                        if (q) {
                            siapAkunFunctions.hideMessage(q)
                        }
                        y.fetch(function() {
                            v.initialize();
                            c = siapAkunFunctions.showMessage($(".js-container-avatar"), "full", "ok", "Berhasil ! ", "Data Gambar Profil berhasil dihapus", "prepend");
                            setTimeout(function() {
                                siapAkunFunctions.hideMessage(c, 1000)
                            }, 2500)
                        })
                    } else {
                        j = siapAkunFunctions.showMessage($(".js-container-avatar"), "full", "err", "Error !", z.desc, "prepend")
                    }
                },
                beforeSend: function(A, z) {
                    if (j) {
                        siapAkunFunctions.hideMessage(j);
                        j = false
                    }
                    q = siapAkunFunctions.showMessage($(".js-container-avatar"), "full", "load", "Harap tunggu... ", " Data sedang disimpan", "prepend")
                },
                complete: function(A, z) {
                    siapAkunFunctions.hideMessage(q)
                }
            })
        }
    });
    var b = Backbone.View.extend({
        el: ".js-container-info",
        initialize: function() {
            this.fullname = $(this.el).find(".js-fullname");
            this.siapkuRole = $(this.el).find(".js-siapkuRole");
            this.gender = $(this.el).find(".js-gender");
            this.tmpLhr = $(this.el).find(".js-tmpLhr");
            this.birthdate = $(this.el).find(".js-birthdate");
            this.location = $(this.el).find(".js-location");
            this.aboutMe = $(this.el).find(".js-aboutMe");
            this.tags = $(this.el).find(".js-tags");
            this.render()
        },
        render: function() {
            this.fullname.html(this.model.fullname);
            this.siapkuRole.html(this.model.siapkuRole);
            this.gender.html(this.model.gender);
            this.tmpLhr.html(this.model.tmpLhr);
            this.birthdate.html(this.model.birthdate);
            this.location.html(this.model.location);
            this.aboutMe.html(this.model.aboutMe);
            this.tags.html(this.model.tags)
        }
    });
    var p = Backbone.View.extend({
        el: ".js-container-contact",
        initialize: function() {
            this.website = $(this.el).find(".js-website");
            this.personalPhone = $(this.el).find(".js-personalPhone");
            this.messanger = $(this.el).find(".js-messanger");
            this.extProfil = $(this.el).find(".js-extProfil");
            this.render()
        },
        render: function() {
            if (this.model.website[0] != "-") {
                this.website.html('<a href=" ' + this.model.website[0] + ' " target="_blank">' + _.escape(this.model.website[0]) + "</a>")
            } else {
                this.website.html("-")
            }
            this.personalPhone.html(_.escape(this.model.personalPhone[0]));
            var y = ('<ul class="se-icon">');
            if (this.model.imYahoo[0]) {
                y += ('<li class="se-ym"><a>' + _.escape(this.model.imYahoo[0]) + "</a></li>")
            }
            if (this.model.imGtalk[0]) {
                y += ('<li class="se-gtalk"><a>' + _.escape(this.model.imGtalk[0]) + "</a></li>")
            }
            if (this.model.imSkype[0]) {
                y += ('<li class="se-sky"><a>' + _.escape(this.model.imSkype[0]) + "</a></li>")
            }
            y += ("</ul>");
            y += ('<ul class="se-icon">');
            if (this.model.imMsn[0]) {
                y += ('<li class="se-msn"><a>' + _.escape(this.model.imMsn[0]) + "</a></li>")
            }
            if (this.model.imJabber[0]) {
                y += ('<li class="se-jab"><a>' + _.escape(this.model.imJabber[0]) + "</a></li>")
            }
            if (this.model.imIcq[0]) {
                y += ('<li class="se-imIcq"><a>' + _.escape(this.model.imIcq[0]) + "</a></li>")
            }
            y += ("</ul>");
            this.messanger.html(y);
            var y = ('<ul class="se-icon">');
            if (this.model.profLinkedin[0]) {
                y += ('<li class="se-linkedin"><a href="' + this.model.profLinkedin[1] + '" target="_blank">' + _.escape(this.model.profLinkedin[0]) + "</a></li>")
            }
            if (this.model.profFacebook[0]) {
                y += ('<li class="se-fb"><a href="' + this.model.profFacebook[1] + '">' + _.escape(this.model.profFacebook[0]) + "</a></li>")
            }
            if (!this.model.profFacebook[0] && this.model.profFacebook[1]) {
                y += ('<li class="se-fb"><a href="' + this.model.profFacebook[1] + '">' + _.escape("facebook") + "</a></li>")
            }
            if (this.model.profMyspace[0]) {
                y += ('<li class="se-myspc"><a href="' + this.model.profMyspace[1] + '">' + _.escape(this.model.profMyspace[0]) + "</a></li>")
            }
            if (this.model.profTwitter[0]) {
                y += ('<li class="se-twitter"><a href="' + this.model.profTwitter[1] + '">' + _.escape(this.model.profTwitter[0]) + "</a></li>")
            }
            if (this.model.profFlickr[0]) {
                y += ('<li class="se-flickr"><a href="' + this.model.profFlickr[1] + '">' + _.escape(this.model.profFlickr[0]) + "</a></li>")
            }
            y += ("</ul>");
            y += ('<ul class="se-icon">');
            if (this.model.profFriendfeed[0]) {
                y += ('<li class="se-ff"><a href="' + this.model.profFriendfeed[1] + '">' + _.escape(this.model.profFriendfeed[0]) + "</a></li>")
            }
            if (this.model.profYoutube[0]) {
                y += ('<li class="se-youtube"><a href="' + this.model.profYoutube[1] + '">' + _.escape(this.model.profYoutube[0]) + "</a></li>")
            }
            if (this.model.profDelicious[0]) {
                y += ('<li class="se-delcius"><a href="' + this.model.profDelicious[1] + '">' + _.escape(this.model.profDelicious[0]) + "</a></li>")
            }
            if (this.model.profDigg[0]) {
                y += ('<li class="se-digg"><a href="' + this.model.profDigg[1] + '">' + _.escape(this.model.profDigg[0]) + "</a></li>")
            }
            if (this.model.profMixx[0]) {
                y += ('<li class="se-mixx"><a href="' + this.model.profMixx[1] + '">' + _.escape(this.model.profMixx[0]) + "</a></li>")
            }
            y += ("</ul>");
            this.extProfil.html(y)
        }
    });
    var f = Backbone.View.extend({
        el: ".js-container-avatar",
        events: {
            "click .js-delete-avatar": "deleteIt"
        },
        initialize: function() {
            this.avatar = $(this.el).find(".js-avatar");
            this.avatarThumb1 = $(this.el).find(".js-avatarThumb1");
            this.avatarThumb2 = $(this.el).find(".js-avatarThumb2");
            this.avatarThumb3 = $(this.el).find(".js-avatarThumb3");
            this.render()
        },
        render: function() {
            this.avatar.attr("src", this.model.avatar);
            this.avatarThumb1.attr("src", this.model.avatarThumb1);
            this.avatarThumb2.attr("src", this.model.avatarThumb2);
            this.avatarThumb3.attr("src", this.model.avatarThumb3)
        },
        deleteIt: function() {
            this.model.deleteIt()
        }
    });
    var u = Backbone.View.extend({
        el: ".js-editor-contact",
        events: {
            submit: "save"
        },
        initialize: function() {
            this.website = $(this.el).find(".js-website");
            this.personalPhone = $(this.el).find(".js-personalPhone");
            this.workPhone = $(this.el).find(".js-workPhone");
            this.imSkype = $(this.el).find(".js-imSkype");
            this.imIcq = $(this.el).find(".js-imIcq");
            this.imGtalk = $(this.el).find(".js-imGtalk");
            this.imMsn = $(this.el).find(".js-imMsn");
            this.imYahoo = $(this.el).find(".js-imYahoo");
            this.imJabber = $(this.el).find(".js-imJabber");
            this.profLinkedin = $(this.el).find(".js-profLinkedin");
            this.profFacebook = $(this.el).find(".js-profFacebook");
            this.profMyspace = $(this.el).find(".js-profMyspace");
            this.profTwitter = $(this.el).find(".js-profTwitter");
            this.profFlickr = $(this.el).find(".js-profFlickr");
            this.profFriendfeed = $(this.el).find(".js-profFriendfeed");
            this.profYoutube = $(this.el).find(".js-profYoutube");
            this.profDelicious = $(this.el).find(".js-profDelicious");
            this.profDigg = $(this.el).find(".js-profDigg");
            this.profMixx = $(this.el).find(".js-profMixx");
            this.profFavit = $(this.el).find(".js-profFavit");
            this.profEdno23 = $(this.el).find(".js-profEdno23");
            this.render()
        },
        render: function() {
            var y = this;
            this.website.val(this.model.website[0] != "-" ? this.model.website[0] : "http://");
            this.personalPhone.val((this.model.personalPhone[0] != "-" ? this.model.personalPhone[0] : ""));
            this.imSkype.val(this.model.imSkype[0]);
            this.imIcq.val(this.model.imIcq[0]);
            this.imGtalk.val(this.model.imGtalk[0]);
            this.imMsn.val(this.model.imMsn[0]);
            this.imYahoo.val(this.model.imYahoo[0]);
            this.imJabber.val(this.model.imJabber[0]);
            this.profLinkedin.val(this.model.profLinkedin[1]);
            this.profFacebook.val(this.model.profFacebook[1]);
            this.profMyspace.val(this.model.profMyspace[1]);
            this.profTwitter.val(this.model.profTwitter[1]);
            this.profFlickr.val(this.model.profFlickr[1]);
            this.profFriendfeed.val(this.model.profFriendfeed[1]);
            this.profYoutube.val(this.model.profYoutube[1]);
            this.profDelicious.val(this.model.profDelicious[1]);
            this.profDigg.val(this.model.profDigg[1]);
            this.profMixx.val(this.model.profMixx[1]);
            this.profFavit.val(this.model.profFavit[1]);
            this.profEdno23.val(this.model.profEdno23[1])
        },
        save: function() {
            var y = {
                website: this.website.val(),
                personal_phone: this.personalPhone.val(),
                im_yahoo: this.imYahoo.val(),
                im_gtalk: this.imGtalk.val(),
                im_skype: this.imSkype.val(),
                im_msn: this.imMsn.val(),
                im_jabber: this.imJabber.val(),
                im_icq: this.imIcq.val(),
                prof_linkedin: this.profLinkedin.val(),
                prof_facebook: this.profFacebook.val(),
                prof_myspace: this.profMyspace.val(),
                prof_twitter: this.profTwitter.val(),
                prof_flickr: this.profFlickr.val(),
                prof_friendfeed: this.profFriendfeed.val(),
                prof_youtube: this.profYoutube.val(),
                prof_delicious: this.profDelicious.val(),
                prof_digg: this.profDigg.val(),
                prof_mixx: this.profMixx.val()
            };
            this.model.save(y)
        }
    });
    var e = Backbone.View.extend({
        el: ".js-editor-info",
        events: {
            submit: "save"
        },
        initialize: function() {
            this.fullname = $(this.el).find(".js-fullname");
            this.siapkuRole = $(this.el).find(".js-siapkuRole");
            this.gender = $(this.el).find(".js-gender");
            this.tmpLhr = $(this.el).find(".js-tmpLhr");
            this.birthdate = $(this.el).find(".js-birthdate");
            this.dateSel = $(this.el).find(".js-dateSel");
            this.monthSel = $(this.el).find(".js-monthSel");
            this.yearSel = $(this.el).find(".js-yearSel");
            this.location = $(this.el).find(".js-location");
            this.aboutMe = $(this.el).find(".js-aboutMe");
            this.tags = $(this.el).find(".js-tags");
            this.render()
        },
        render: function() {
            var z = this;
            this.fullname.val(this.model.fullname != "-" ? this.model.fullname: "");
            $.each(this.model.roles, function(A, B) {
                z.siapkuRole.append('<option value="' + A + '" ' + (z.model.kSiapkuRole == A ? 'selected="selected"': "") + ">" + B + "</option>")
            });
            this.gender.append('<input type="radio" name="gender" id="input-gender-m" value="m" ' + (this.model.dataGender == "m" ? 'checked="checked"': "") + ' /><label for="input-gender-m">Laki-laki</label>');
            this.gender.append('<input type="radio" name="gender" id="input-gender-f" value="f" ' + (this.model.dataGender == "f" ? 'checked="checked"': "") + ' /><label for="input-gender-f">Perempuan</label>');
            this.tmpLhr.val(this.model.tmpLhr != "-" ? this.model.tmpLhr: "");
            if (!this.model.dateSel) {
                this.dateSel.append('<option value="0" selected="selected">&nbsp;</option>')
            }
            for (var y = 1; y <= 31; y++) {
                this.dateSel.append(' <option value="' + y + '" ' + (this.model.dateSel == y ? 'selected="selected"': "") + ">" + y + "</option>")
            }
            if (!this.model.monthSel) {
                this.monthSel.append('<option value="0" selected="selected">&nbsp;</option>')
            }
            for (var y = 1; y <= 12; y++) {
                this.monthSel.append(' <option value="' + y + '" ' + (this.model.monthSel == y ? 'selected="selected"': "") + ">" + this.model.months[y] + "</option>")
            }
            if (!this.model.yearSel) {
                this.yearSel.append('<option value="0" selected="selected">&nbsp;</option>')
            }
            for (var y = this.model.tahunMax; y >= this.model.tahunMin; y--) {
                this.yearSel.append(' <option value="' + y + '" ' + (this.model.yearSel == y ? 'selected="selected"': "") + ">" + y + "</option>")
            }
            this.location.val(this.model.location != "-" ? this.model.location: "");
            this.aboutMe.html(this.model.aboutMe != "-" ? this.model.aboutMe: "");
            this.tags.html(this.model.tags != "-" ? this.model.tags: "")
        },
        save: function() {
            var y = {
                fullname: this.fullname.val(),
                location: this.location.val(),
                gender: $("input[name=gender]:checked").val(),
                tmplhr: this.tmpLhr.val(),
                date: this.dateSel.val(),
                month: this.monthSel.val(),
                year: this.yearSel.val(),
                aboutme: this.aboutMe.val(),
                tags: this.tags.val(),
                role: this.siapkuRole.val()
            };
            this.model.save(y)
        }
    });
    var t = Backbone.Router.extend({
        routes: {
            "!/info/edit": "profileInfoEdit",
            "!/info": "profileInfo",
            "!/contact/edit": "profileContactEdit",
            "!/contact": "profileContact",
            "!/avatar": "profileAvatar",
            "*actions": "profileInfo"
        },
        profileInfo: function() {
            $(".js-side-menu li").removeClass("on");
            $(".js-side-menu li .act-useri").parent().addClass("on");
            siapAkunFunctions.loadHtml("profil", "info", false, false, $(".work-main"), function() {
                n = new x();
                n.fetch(function() {
                    a = new b({
                        model: n
                    });
                    siapAkunFunctions.dataLoaded($(".work-main").children().get(0));
                    if (l && i) {
                        c = siapAkunFunctions.showMessage($(".work-main"), "full", "ok", l, i, "prepend", 400);
                        l = false;
                        i = false;
                        setTimeout(function() {
                            siapAkunFunctions.hideMessage(c, 1000)
                        }, 2500)
                    }
                })
            })
        },
        profileInfoEdit: function() {
            $(".js-side-menu li").removeClass("on");
            $(".js-side-menu li .act-useri").parent().addClass("on");
            siapAkunFunctions.loadHtml("profil", "info_edit", false, false, $(".work-main"), function() {
                if (!n) {
                    n = new x();
                    n.fetch(function() {
                        d = new e({
                            model: n
                        })
                    })
                } else {
                    d = new e({
                        model: n
                    })
                }
                siapAkunFunctions.dataLoaded($(".work-main").children().get(0))
            })
        },
        profileContact: function() {
            $(".js-side-menu li").removeClass("on");
            $(".js-side-menu li .act-kontak").parent().addClass("on");
            siapAkunFunctions.loadHtml("profil", "contact", false, false, $(".work-main"), function() {
                r = new m();
                r.fetch(function() {
                    k = new p({
                        model: r
                    });
                    siapAkunFunctions.dataLoaded($(".work-main").children().get(0));
                    if (l && i) {
                        c = siapAkunFunctions.showMessage($(".work-main"), "full", "ok", l, i, "prepend", 400);
                        l = false;
                        i = false;
                        setTimeout(function() {
                            siapAkunFunctions.hideMessage(c, 1000)
                        }, 2500)
                    }
                })
            })
        },
        profileContactEdit: function() {
            $(".js-side-menu li").removeClass("on");
            $(".js-side-menu li .act-kontak").parent().addClass("on");
            siapAkunFunctions.loadHtml("profil", "contact_edit", false, false, $(".work-main"), function() {
                if (!r) {
                    r = new m();
                    r.fetch(function() {
                        o = new u({
                            model: r
                        })
                    })
                } else {
                    o = new u({
                        model: r
                    })
                }
                siapAkunFunctions.dataLoaded($(".work-main").children().get(0))
            })
        },
        profileAvatar: function() {
            $(".js-side-menu li").removeClass("on");
            $(".js-side-menu li .act-img").parent().addClass("on");
            siapAkunFunctions.loadHtml("profil", "avatar", false, false, $(".work-main"), function() {
                g = new w();
                g.fetch(function() {
                    v = new f({
                        model: g
                    });
                    siapAkunFunctions.dataLoaded($(".work-main").children().get(0))
                });
                $("input[type=file]").each(function() {
                    if (!$.browser.chrome) {
                        $("label[for=" + this.id + "]").click(function() {
                            $("#" + $(this).attr("for")).trigger("click")
                        })
                    }
                }).change(function() {
                    var y = this.value;
                    if ($.browser.chrome) {
                        y = y.replace(/^.*\\/, "")
                    }
                    if (y.length > 23) {
                        y = y.substring(0, 9) + " ... " + y.substring(y.length - 11, y.length)
                    }
                    $(this).siblings(".input-file-mask").find("span").text(y)
                }).addClass("hideit").after('<div class="input-file-mask input"><a class="button">Pilih file</a><span></span></div>');
                $(".input-file-mask").click(function() {
                    $(this).siblings("input[type=file]").trigger("click")
                });
                $(".js-upload-avatar").live("submit", function() {
                    var y = {
                        url: g.url + "/save",
                        type: "post",
                        dataType: "json",
                        iframe: true,
                        clearForm: true,
                        resetForm: false,
                        beforeSubmit: function() {
                            $(".js-upload-avatar #rdbtn").attr("disabled", "disabled");
                            $(".js-upload-avatar #rdbtn").css("min-width", "150px");
                            if (j) {
                                siapAkunFunctions.hideMessage(j);
                                j = false
                            }
                            q = siapAkunFunctions.showMessage($(".js-container-avatar"), "full", "load", "Harap tunggu... ", " Gambar sedang diunggah", "prepend")
                        },
                        success: function(z) {
                            siapAkunFunctions.hideMessage(q);
                            if (!z.error) {
                                v.model.fetch(function() {
                                    v.initialize();
                                    c = siapAkunFunctions.showMessage($(".js-container-avatar"), "full", "ok", "Berhasil ! ", "Data Gambar Profil berhasil diperbaharui", "prepend");
                                    setTimeout(function() {
                                        siapAkunFunctions.hideMessage(c, 1000)
                                    }, 2500);
                                    $(".js-upload-avatar").each(function() {
                                        this.reset()
                                    });
                                    $(".js-upload-avatar input[type=file]").siblings(".input-file-mask").find("span").text("")
                                })
                            } else {
                                j = siapAkunFunctions.showMessage($(".js-container-avatar"), "full", "err", "Error !", z.desc, "prepend")
                            }
                            $(".js-upload-avatar #rdbtn").removeAttr("disabled");
                            $(".js-upload-avatar #rdbtn").css("width", "auto")
                        }
                    };
                    $(this).ajaxSubmit(y);
                    return false
                })
            })
        }
    });
    var s = new t;
    Backbone.history.start();
    $(".js-trigger-edit").live("click", function() {
        s.navigate("#!/info/edit", true)
    });
    $(".js-contact-edit").live("click", function() {
        s.navigate("#!/contact/edit", true)
    })
});