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
  if(Ember.isEqual(true, this.get('session.data.authenticated.resetpassword'))){
   this.transitionTo('dashboard.resetpassword');
  }



  var user = this.store.findRecord('user',this.get('session.data.authenticated.user_id'));

},

  actions: {
    logout() {

      this.get('session').invalidate();
      this.transitionTo('login');
    },


    
  }
});
