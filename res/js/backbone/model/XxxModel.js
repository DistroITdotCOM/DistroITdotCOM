HomeModel = Backbone.Model.extend({
    urlRoot : '/xxx/home_data'
});

RoleModel = Backbone.Model.extend({
    urlRoot : '/xxx/role_data'
});

AddModel = Backbone.Model.extend({
    add: function(data){
        $.ajax({
            type: "POST",
            url: "/xxx/home_add",
            dataType: "json",
            data: {
                myData:JSON.stringify(data)
            },
            success: function(){
                trigger = "Success";
                app.navigate('role', true);
            },
            beforeSend: function(){},
            complete: function(){},
            error: function(){
                alert("error");
            }
        })
    }
});

EditModel = Backbone.Model.extend({
    urlRoot : '/xxx/home_edit',
    
    edit: function(data){
        $.ajax({
            type: "POST",
            url: "/xxx/home_edit",
            dataType: "json",
            data: {
                myData:JSON.stringify(data)
            },
            success: function(){
                window.location.hash = 'role';
            },
            beforeSend: function(){},
            complete: function(){},
            error: function(){
                alert("error");
            }
        })
    }
});

RemoveModel = Backbone.Model.extend({
    remove: function(data){
        $.ajax({
            type: "POST",
            url: "/xxx/home_delete",
            dataType: "json",
            data: {
                myData:JSON.stringify(data)
            },
            success: function(){
                window.location.hash = 'role';
            },
            beforeSend: function(){},
            complete: function(){},
            error: function(){
                alert("error");
            }
        })
    }
});