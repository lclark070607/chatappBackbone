(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
Backbone.sync = function (method, model) {
    if (method === 'create' || method === 'update') {
        const request = new XMLHttpRequest();
        request.open('POST', 'http://api.queencityiron.com/chats');
        request.addEventLister('load'), function () {
            const response = JSON.parse(request.responseText);

            model.set('from', response.from);
            model.set('message', response.message);
            model.trigger('change');

            response.send();

        }
    };

    // if (method === 'read') {
    //     const request = new XMLHttpRequest();
    //     request.open('GET', 'http://api.queencityiron.com/chats');
    //     request.addEventListener('load', function () {
    //         const response = JSON.parse(request.responseText);

    //         for (let i = 0; i < response.chats.length; i++) {
    //             let msg = new ChatModel();
    //             msg.set('from', response.chats[i].from);
    //             msg.set('message'), response.chats[i].message);
    //             model.add();
    //         }
    //     }       
    // };
};


const ChatModel = require('./models/chat');
const ChatLog = require('./models/chatLog');
const ChatView = require('./views/chat');

window.addEventListener('load', function () {
    const log = new ChatLog();
    const view = new ChatView({
        el: document.querySelector('main'), 
        model: log, 
    });

    view.render(); 
});





},{"./models/chat":2,"./models/chatLog":3,"./views/chat":4}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
const ChatModel = require('./chat'); //import the model

module.exports = Backbone.Collection.extend({
    //Type of model stored in this collection
    //Every collection contains some type of model
    model: ChatModel,

    createNew: function(newUser, newMsg) {
        console.log('creating new chat');  //when you click a button it will result in this console.log
        //Create a new model and set its name.
        //Add the new model to the collection.
        const newChat = new ChatModel();
        newChat.set('from', newUser); //this is what's changing unknown name
        newChat.set('message', newMsg);

        this.add(newChat);
        this.save();
    },
});
},{"./chat":2}],4:[function(require,module,exports){
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
},{}]},{},[1]);
