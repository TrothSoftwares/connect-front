import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{

session: Ember.inject.service('session'),





setupController: function(controller) {


  if(Ember.isEqual(false, this.get('session.data.authenticated.otpconfirmed'))){
    controller.set('otpConfirmed',false );
   this.transitionTo('authenticateotp');
  }
  if(Ember.isEqual(true, this.get('session.data.authenticated.otpconfirmed'))){
    controller.set('otpConfirmed',true );
  }

},

  actions: {
    logout() {

      this.get('session').invalidate();
      this.transitionTo('login');
    },


    createPost(){
      var controller = this.get('controller');

      var newpost = controller.store.createRecord('post');

      newpost.save().then(function(success){
        console.log(success);
      },function(error){
        console.log(error);
      });
    }
  }
});
