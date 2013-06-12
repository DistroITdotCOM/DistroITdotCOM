XxxRouter = Backbone.Router.extend({
    routes: {
        '': 'homeData',
        '/': 'homeData',
        'one/:level': 'blockGrid',
        'one/:level/': 'blockGrid',
        'two/:level/:num': 'blockNum',
        'two/:level/:num/': 'blockNum',
        'role': 'viewData',
        'role/': 'viewData',
        'role/add': 'addData',
        'role/add/': 'addData',
        'role/edit/:id': 'editData',
        'role/edit/:id/': 'editData',
        'role/delete/:id': 'removeData',
        'role/delete/:id/': 'removeData'
    },
    initialize: function() {

    },
    homeData: function() {
        util.loadTemplate(['HomeView'], function() {
            var homeModel = new HomeModel();
            homeModel.fetch({
                success: function() {
                    $("#content").html(new HomeView({
                        model: homeModel
                    }).el);
                    $("td").css("background-color", "#f2f2f2");
                }
            });
        });
    },
    blockGrid: function(level) {
        util.loadTemplate(['HomeView'], function() {
            var homeModel = new HomeModel();
            homeModel.fetch({
                success: function() {
                    $("#content").html(new HomeView({
                        model: homeModel
                    }).el);
                    HomeFunction.grid(level);
                }
            });
        });
    },
    blockNum: function(level, num) {
        $.when($.get('res/template/HomeView.html', function(data) {
            window['HomeView'].prototype.template = _.template(data);
        })).done(function() {
            var homeModel = new HomeModel();
            homeModel.fetch({
                success: function() {
                    $("#content").html(new HomeView({
                        model: homeModel
                    }).el);
                    HomeFunction.gridNum(level, num);
                }
            });
        });
    },
    viewData: function() {
        util.loadTemplate(['RoleView'], function() {
            var roleModel = new RoleModel();
            roleModel.fetch({
                success: function() {
                    $("#content").html(new RoleView({
                        model: roleModel
                    }).el);
                    if (trigger) {
                        $("#nested-content").html('<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">×</button>\n\
<strong>Well done!</strong> You successfully read this important alert message.</div>');
                    }
                }
            });
        });
    },
    addData: function() {
        util.loadTemplate(['AddView'], function() {
            $("#content").html(new AddView().el);
        });
    },
    editData: function(id) {
        util.loadTemplate(['EditView'], function() {
            var editModel = new EditModel({
                id: id
            });
            editModel.fetch({
                success: function(collection, response) {
                    $("#content").html(new EditView({
                        model: response[0]
                    }).el);
                }
            });
        });
    },
    removeData: function(id) {
        new RemoveModel().remove(id)
    }
});
app = new XxxRouter();
Backbone.history.start();