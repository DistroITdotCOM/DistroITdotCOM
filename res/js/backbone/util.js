util = {
    loadTemplate: function(views, callback) {
        var deferreds = [];
        $.each(views, function(index, view) {
            if (window[view]) {
                deferreds.push($.get(site+'res/template/' + view + '.html', function(data) {
                    window[view].prototype.template = _.template(data);
                }));
            } else {
                alert(view + " not found");
            }
        });
        $.when.apply(null, deferreds).done(callback);
    },
    writeCookie: function(cookieName, cookieValue, expireHours, path, domain){
        var date =  new Date(); 
        date.setHours(date.getHours + expireHours); 
        document.cookie = cookieName+'='+ 
        cookieValue+'; expires='+date+'; path='+ 
        path+'; domain='+domain; 
    },
    readCookie: function(cookieName){
        var textArray = document.cookie.split(';'); 
        for(var i = 0; i < textArray.length; i++){ 
            var textPiece = textArray[i]; 
            while(textPiece(0)==' ') 
                textPiece = textPiece.substring(1,textPiece.length); 
            if (textPiece.indexOf(cookieName)== 0) 
                return textPiece.substring(cookieName.length,c.length); 
        } 
    },
    showMessage: function(){
        
    },
    hideMessage: function(){
        
    }
};