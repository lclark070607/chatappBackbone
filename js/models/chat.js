module.exports = Backbone.Model.extend({

    defaults: {
        from: 'Unknown',
        message: 'Unknown',
        id: null,
    },

    changeName(val) {
        this.set('from', val);
        this.save();

    },

    changeMessage(msg) {
        this.set('message', msg);
        this.save();
    },

    changeId(id) {
        idAttribute: "chatModule_id";
    },
    
});