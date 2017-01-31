import Ember from 'ember';

export default Ember.Controller.extend({
session: Ember.inject.service('session'),

restriction: {country: "in"},


  isCreatePostButtonDisabled: Ember.computed('place', 'needsprovides', 'lookingfor', function() {
    if(Ember.isEmpty(this.get('place')) || Ember.isEmpty(this.get('needsprovides')) || Ember.isEmpty(this.get('lookingfor'))){
    return true;
    }
    else{
      return false;
    }
  }),



  actions:{

    focusOut(location){
      console.log(location);
      console.log("focusout");
    },


    placeChanged(location){
      console.log(location);
      console.log("placechanged");
    },
    createPost(){
      var controller = this;
      var user = controller.get('store').findRecord('user', controller.get('session.data.authenticated.user_id'));


user.then(function(user){



  var posttitle = "#"+controller.get('place') + "#"+controller.get("needsprovides") + "#"+controller.get("lookingfor");

  var newpost = controller.store.createRecord('post',{
    user: user,
    title: posttitle,
  });


  newpost.save().then(function(success){
    console.log(success);
  },function(error){
    console.log(error);
  });

});

    },
  }
});
