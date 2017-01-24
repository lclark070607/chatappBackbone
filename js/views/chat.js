module.exports = Backbone.View.extend({
    initialize: function () {
        this.model.on('change', this.render, this);
        this.model.on('add', this.render, this);
        setInterval(() => {
            this.model.fetch();
        }, 5000);
    },

    events: {
        'click .button': 'updateChat',
    },

    //handler for the button click
    updateChat: function () {
        const newChat = this.el.querySelector('#chat').value;
        const newUser = this.el.querySelector('#userName').value;

        this.model.createNew(newChat);
        this.model.createNew(newUser);
    },

    render: function () {

        const template = document.querySelector('#chat-template').innerHTML;

        this.el.querySelector('#chatMessages').innerHTML = '';
        for (let i = 0; i < this.model.models.length; i++) {

            const m = this.model.models[i];
            const li = document.createElement('li');

            li.innerHTML = Mustache.render(
                template,
                {
                    from: m.get('from'),
                    message: m.get('message'),
                }
            );

            const parent = this.el.querySelector('#chatMessages');
            parent.appendChild(li);
        }
    },
});