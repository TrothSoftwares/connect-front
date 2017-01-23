import Ember from 'ember';

export default Ember.Controller.extend({
session: Ember.inject.service('session'),


  isCreatePostButtonDisabled: Ember.computed('poststring', function() {
    if(Ember.isEmpty(this.get('poststring'))){
    return true;
    }
    else{
      return false;
    }
  }),



  actions:{
    createPost(){
      var controller = this;
      var user = controller.get('store').findRecord('user', controller.get('session.data.authenticated.user_id'));


user.then(function(user){
  var newpost = controller.store.createRecord('post',{
    user: user,
    title:controller.get('poststring'),
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
