Backbone.sync = function (method, model) {
    if (method === 'create' || method === 'update') {
        const request = new XMLHttpRequest();
        request.open('POST', 'http://api.queencityiron.com/chats');

        let chats = {
            from: model.get('from'),
            message: model.get('message'),
        };

        request.send(JSON.stringify(message));
    }

    if (method === 'read') {
        const request = new XMLHttpRequest();
        request.open('GET', 'http://api.queencityiron.com/chats');
        request.addEventListener('load', function () {
            const response = JSON.parse(request.responseText);

            for (let i = 0; i < response.chats.length; i++) {
                let msg = new ChatModel();
                msg.set('from', response.chats[i].from);
                msg.set('message', response.chats[i].message);
                model.add(msg);
                model.trigger('change');
        });
        request.send();
        }  
    };



// const ChatModel = require('./models/chat');
const ChatLog = require('./models/chatLog');
const ChatView = require('./views/chat');

window.addEventListener('load', function () {
    const log = new ChatLog();
    const view = new ChatView({
        el: document.querySelector('main'),
        model: log,
    });

    view.render();
    console.log('this list has been populated');
});




