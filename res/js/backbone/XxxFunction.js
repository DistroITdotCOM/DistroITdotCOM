HomeFunction = {
    grid: function(level){
        $("td").css("background-color","#f2f2f2");
        $("#"+level).css("background-color","#80c8e5");
    },
    gridNum: function(level,num){
        this.grid(level);
        $("#"+level).html(num);
    }
};