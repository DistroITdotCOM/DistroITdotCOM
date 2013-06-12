var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'home',
        //        'index.html': 'home',
        ':level': 'blockGrid', 
        'block/:level/:num': 'blockNum'
    //        '*actions': 'defaultAction'       	
    },
    initialize: function () {
        this.homeView = new HomeView();
        $('#content').html(this.homeView.el);
    },
    home : function(){
        $("td").css("background-color","#f2f2f2");
    },
    blockGrid : function(level){
        grid(level);
    },
    blockNum: function(level,num){
        gridNum(level,num);
    }
});

function grid(level){
    $("td").css("background-color","#f2f2f2");
    $("#"+level).css("background-color","#80c8e5");
}

function gridNum(level,num){
    grid(level);
    $("#"+level).html(num);
}