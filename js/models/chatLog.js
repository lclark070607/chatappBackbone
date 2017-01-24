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