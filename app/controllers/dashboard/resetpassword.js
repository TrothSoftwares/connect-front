import Ember from 'ember';

export default Ember.Controller.extend({
session: Ember.inject.service('session'),
isButtonDisabled: Ember.computed('password', 'password_confirmation'  , function() {

  if(Ember.isEmpty(this.get('password')) || Ember.isEmpty(this.get('password_confirmation')) || this.get('password')!== this.get('password_confirmation') ){
    return true;
  }
  else{
    return false;
  }

  }),

  actions:{

    resetpassword(){
      var controller = this;
      var user = controller.store.findRecord('user',controller.get('session.data.authenticated.user_id'));

      user.then(function(user){
        user.set('password', controller.get('password'));
        user.set('password_confirmation', controller.get('password_confirmation'));
        user.save().then(function(){
           controller.get('session').set("data.authenticated.resetpassword", false);
           var localauthsession = JSON.parse(localStorage.getItem("ember_simple_auth-session"));

           localauthsession.authenticated.resetpassword = false;

           localStorage.setItem("ember_simple_auth-session",JSON.stringify(localauthsession));

          controller.transitionToRoute('dashboard');
        });
      });

    },

  }

});
