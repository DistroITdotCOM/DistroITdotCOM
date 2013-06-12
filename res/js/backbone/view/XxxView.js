HomeView = Backbone.View.extend({
    initialize:function(){
        this.render();
    },
    render:function(){
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

RoleView = Backbone.View.extend({
    initialize:function(){
        this.render();
    },
    render:function(){
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

AddView = Backbone.View.extend({
    events: {
        submit: "add"
    },
    initialize:function(){
        this.render();
    },
    render:function(){
        $(this.el).html(this.template());
        return this;
    },
    add: function() {
        var data = {
            role: $("#input-role").val(),
            desc: $("#input-desc").val()
        };
        new AddModel().add(data)
    }
});

EditView = Backbone.View.extend({
    events: {
        submit: "edit"
    },
    initialize:function(){
        this.render();
    },
    render:function(){
        $(this.el).html(this.template(this.model));
        return this;
    },
    edit: function() {
        var data = {
            id: $("#input-id").val(),
            role: $("#input-role").val(),
            desc: $("#input-desc").val()
        };
        new EditModel().edit(data)
    }
});